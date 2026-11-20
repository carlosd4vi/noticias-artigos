

-- Criar Tabela de Postagens

CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    data_criada TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar Tabela de Usuários (ADMIN)

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);