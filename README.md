## Noticias Artigos

O Noticias Artigos tem o intuito de trazer noticias sobre tecnologia de maneira mais resumida em formato de artigo curto.
E foi desenvolvido com **Next.js (App Router)** no frontend e **FastAPI** no backend, com autenticação segura via cookies `HttpOnly`, proteção contra força bruta e painel administrativo completo para gerenciamento de publicações.

### Tela Inicial
![Print da Tela Inicial](https://archive.org/download/noticias_artigos_home/noticias_artigos_home.PNG)

A Página inicial apresenta cards de artigos com titulos e descrição prévia. ao lado uma aba de recomendação.

### Admin
![Print Admin](https://archive.org/download/noticias_artigos_home/noticias_artigos_admin.PNG)

A Página de Admin lista os artigos publicados e também faz um gerenciamento de 'Editar' e 'Excluir'. E também publicar um novo post.


## 🛠 Tecnologias Utilizadas
Este projeto foi construído com uma arquitetura moderna, focada em segurança, performance e escalabilidade:

* **Frontend:** Next.js - Tailwind, TypeScript
* **Backend:** FastAPI - ApiRest, JWT
* **Banco de Dados:** Neon (PostgreSQ)

## Estrutura do Projeto

```text
.
├── backend/
│   ├── main.py              # Rotas da API, CORS, rate limiting e autenticação
│   ├── models.py            # Modelos SQLAlchemy (Post, Usuario)
│   ├── schemas.py           # Schemas Pydantic (validação de entrada/saída)
│   ├── database.py          # Conexão com o PostgreSQL
│   └── requirements.txt     # Dependências Python
│
└── frontend/
    ├── app/
    │   ├── layout.tsx       # Layout raiz com Header envolvido em Suspense
    │   ├── page.tsx         # Página inicial (SSR + ListaArtigos)
    │   └── admin/
    │       └── page.tsx     # Dashboard administrativo (CRUD + paginação)
    ├── components/
    │   ├── Header.tsx       # Cabeçalho com verificação de sessão e logout
    │   ├── LoginModal.tsx   # Modal de autenticação
    │   ├── ListaArtigos.tsx # Listagem com botão "Carregar mais artigos"
    │   ├── ArticleCard.tsx  # Card de exibição de artigo
    │   └── Sidebar.tsx      # Barra lateral de recomendados
    └── lib/
        └── api.ts           # Tipagens e funções de consumo da API
