# main.py
import os
from fastapi import FastAPI, Depends, Query, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from db import get_db
from sqlalchemy import text
from typing import List
import jwt
import datetime
from dotenv import load_dotenv
from uuid import UUID

from models import Post, Usuario
from schemas import PostResponse, PostCreate, PostUpdate, UsuarioCreate, UsuarioResponse

app = FastAPI()

# Config JWT

SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/token")

def verificar_jwt(token: str = Depends(oauth2_scheme)):
    """Esta função intercepta a requisição e verifica se o token é válido"""
    try:
        # decodificar o token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload # Retorna quem está logado
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expirado")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido")

# Configuração do CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"], # Permite todos os métodos (GET, POST, etc)
    allow_headers=["*"],
)

# Todos os Posts

@app.get("/api/v1/posts", response_model=List[PostResponse])
def get_posts(db: Session = Depends(get_db), limite: int = Query(10)
    ):
    posts = (
        db.query(Post)
        .order_by(Post.data_criada.desc()) # Ordena do mais recente para o mais antigo
        .limit(limite)                     # Limita a quantidade de resultados
        .all()
    )
    return posts

# Um Post específico    

@app.get("/api/v1/posts/{post_id}", response_model=PostResponse)
def get_post(post_id: UUID, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.id == post_id).first()
    
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Não encontrado"
        )
        
    return post

    # Login

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
def gerar_hash_senha(senha_texto_puro):
    return pwd_context.hash(senha_texto_puro)

@app.post("/api/v1/login")
def login(dados_login: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # 1. Busca o usuário no banco de dados pelo email/username
    usuario = db.query(Usuario).filter(Usuario.username == dados_login.username).first()
    
    # 2. Confere se o usuário existe e se a senha está correta
    if not usuario or not pwd_context.verify(dados_login.password, usuario.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Username ou senha incorretos"
        )
        
    # 3. SÓ AGORA gera o token
    expiracao = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    dados = {"sub": usuario.username, "exp": expiracao}
    token = jwt.encode(dados, SECRET_KEY, algorithm=ALGORITHM)
    
    return {"access_token": token, "token_type": "bearer"}


@app.post("/api/v1/register", response_model=UsuarioResponse, status_code=status.HTTP_201_CREATED)
def registrar_usuario(usuario: UsuarioCreate, db: Session = Depends(get_db)):
    
    # 1. Verifica se o username já existe no banco
    usuario_existente = db.query(Usuario).filter(Usuario.username == usuario.username).first()
    
    if usuario_existente:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Este nome de usuário já está em uso"
        )
        
    # 2. Criptografa a senha antes de salvar
    senha_criptografada = gerar_hash_senha(usuario.password)
    
    # 3. Prepara o novo usuário para o banco
    novo_usuario = Usuario(
        username=usuario.username,
        password_hash=senha_criptografada
    )
    
    # 4. Salva no banco de dados Neon
    db.add(novo_usuario)
    db.commit()
    db.refresh(novo_usuario)
    
    # Retorna o id e username (baseado no UsuarioResponse)
    return novo_usuario


    # Criar Post

@app.post("/api/v1/posts", response_model=PostResponse, status_code=status.HTTP_201_CREATED)
def criar_post(
    post: PostCreate, # Valida o corpo da requisição (titulo e descricao)
    db: Session = Depends(get_db), # Injeta o banco
    usuario_logado: dict = Depends(verificar_jwt) # EXIGE O TOKEN JWT AQUI!
):
    # Cria o modelo para o banco de dados
    novo_post = Post(
        titulo=post.titulo,
        descricao=post.descricao,
        data_criada=datetime.datetime.utcnow()
        # ID e data_criada o banco/SQLAlchemy preenchem automaticamente
    )
    
    db.add(novo_post)      # Adiciona na sessão
    db.commit()            # Salva no banco de dados
    db.refresh(novo_post)  # Atualiza a variável com o ID e data gerados no Neon
    
    return novo_post

    # Atualizar Post

@app.patch("/api/v1/posts/{post_id}", response_model=PostResponse)
def atualizar_post(
    post_id: UUID, 
    post_atualizado: PostUpdate, 
    db: Session = Depends(get_db), 
    usuario_logado: dict = Depends(verificar_jwt) # Exige o Token
):
    # Busca o post
    post_salvo = db.query(Post).filter(Post.id == post_id).first()
    
    if not post_salvo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Post não encontrado"
        )

    # Pega apenas os dados que o usuário enviou na requisição
    # exclude_unset=True garante que campos não enviados sejam ignorados
    dados_para_atualizar = post_atualizado.model_dump(exclude_unset=True)
    
    # Substitui os dados antigos pelos novos
    for chave, valor in dados_para_atualizar.items():
        setattr(post_salvo, chave, valor)

    # Salva no banco de dados
    db.commit()
    db.refresh(post_salvo)
    
    return post_salvo

    # Deletar Post

@app.delete("/api/v1/posts/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
def deletar_post(
    post_id: UUID, 
    db: Session = Depends(get_db), 
    usuario_logado: dict = Depends(verificar_jwt) # Exige o Token
):
    # Procuea Post
    post_salvo = db.query(Post).filter(Post.id == post_id).first()
    
    if not post_salvo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Post não encontrado"
        )
        
    # Deleta do banco
    db.delete(post_salvo)
    db.commit()
    
    # Deletado com sucesso 204
    return