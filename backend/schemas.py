from uuid import UUID
from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class UsuarioCreate(BaseModel):
    username: str
    password: str

class UsuarioResponse(BaseModel):
    id: int
    username: str

    class Config:
        from_attributes = True

class PostUpdate(BaseModel):
    titulo: Optional[str] = None
    descricao: Optional[str] = None

class PostCreate(BaseModel):
    titulo: str
    descricao: str

class PostResponse(BaseModel):
    id: UUID
    titulo: str
    descricao: str
    data_criada: datetime | None = None

    class Config:
        from_attributes = True