# main.py
import os
import time
from fastapi import FastAPI, Depends, Query, HTTPException, status, Response, Request
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

MAX_TENTATIVAS = 5
TEMPO_BLOQUEIO_SEGUNDOS = 5 * 60  # 5 minutos

# Armazena por IP: {"127.0.0.1": {"tentativas": 0, "bloqueado_ate": 0.0}}
tentativas_login: dict[str, dict] = {}

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/token")

def get_current_user(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Não autenticado",
        )

    try:
        # Usa as mesmas constantes SECRET_KEY e ALGORITHM que você já usa ao gerar o token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token inválido",
            )
        return username
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Sessão expirada. Faça login novamente.",
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido",
        )

# Configuração do CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,  # Obrigatório para cookies
    allow_methods=["*"],
    allow_headers=["*"],
)

# Todos os Posts

@app.get("/api/v1/posts", response_model=list[PostResponse])
def listar_posts(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=50),
    db: Session = Depends(get_db),
):
    return (
        db.query(Post)
        .order_by(Post.data_criada.desc())
        .offset(skip)
        .limit(limit)
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
def login(request: Request, response: Response, form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):

    client_ip = request.client.host if request.client else "unknown"
    agora = time.time()
    registro = tentativas_login.get(client_ip, {"tentativas": 0, "bloqueado_ate": 0.0})

    # 1. Verifica se o IP está bloqueado
    if registro["bloqueado_ate"] > agora:
        restante = int(registro["bloqueado_ate"] - agora)
        minutos, segundos = divmod(restante, 60)
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=f"Muitas tentativas. Tente novamente em {minutos}m {segundos:02d}s.",
        )
    usuario = db.query(Usuario).filter(Usuario.username == form_data.username).first()

    if not usuario or not pwd_context.verify(form_data.password, usuario.password_hash):
        registro["tentativas"] += 1

        if registro["tentativas"] >= MAX_TENTATIVAS:
            registro["bloqueado_ate"] = agora + TEMPO_BLOQUEIO_SEGUNDOS
            registro["tentativas"] = 0
            tentativas_login[client_ip] = registro
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Limite de 5 tentativas atingido. Tente novamente em 5m 00s.",
            )

        tentativas_login[client_ip] = registro
        restantes = MAX_TENTATIVAS - registro["tentativas"]
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Usuário ou senha inválidos. ({restantes} tentativa(s) restante(s))",
        )

    # 3. Se acertou, limpa o histórico de erros do IP
    tentativas_login.pop(client_ip, None)
    
    # 2. Confere se o usuário existe e se a senha está correta
    if not usuario or not pwd_context.verify(form_data.password, usuario.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Username ou senha incorretos"
        )
        
    # 3. SÓ AGORA gera o token
    expiracao = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    dados = {"sub": usuario.username, "exp": expiracao}
    token = jwt.encode(dados, SECRET_KEY, algorithm=ALGORITHM)

    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,     # Impede acesso via document.cookie (proteção contra XSS)
        samesite="lax",    # Proteção contra CSRF
        secure=False,      # Troque para True em produção (HTTPS)
        max_age=60 * 60 * 24,  # 24 horas (em segundos)
        path="/",
    )
    return {"message": "Login realizado com sucesso"}

# Verificar se está logado
@app.get("/api/v1/me")
def usuario_logado(usuario_atual: str = Depends(get_current_user)):
    return {"username": usuario_atual}

@app.post("/api/v1/logout")
def logout(response: Response):
    response.delete_cookie(key="access_token", path="/")
    return {"message": "Logout realizado"}    


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

@app.post("/api/v1/posts", response_model=PostResponse)
def criar_post(
    post: PostCreate,
    db: Session = Depends(get_db),
    usuario_atual: str = Depends(get_current_user), # <-- Bloqueia quem não tem o cookie válido
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
    post: PostUpdate,
    db: Session = Depends(get_db),
    usuario_atual: str = Depends(get_current_user), # <-- Protegida
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
    dados_para_atualizar = post.model_dump(exclude_unset=True)
    
    # Substitui os dados antigos pelos novos
    for chave, valor in dados_para_atualizar.items():
        setattr(post_salvo, chave, valor)

    # Salva no banco de dados
    db.commit()
    db.refresh(post_salvo)
    
    return post_salvo

    # Deletar Post

@app.delete("/api/v1/posts/{post_id}")
def deletar_post(
    post_id: UUID,
    db: Session = Depends(get_db),
    usuario_atual: str = Depends(get_current_user), # <-- Protegida
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