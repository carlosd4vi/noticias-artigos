import type { Post } from "./api";

export const MOCK_POSTS: Post[] = [
  {
    id: "8acde77e-e511-4d08-8cc3-8841cf211120",
    titulo: "Agentes de IA assumem rotinas corporativas",
    descricao:
      "Sistemas autônomos deixaram de apenas responder perguntas e agora executam fluxos completos entre planilhas, e-mails e ERPs.\n\nEmpresas que adotam agentes focam menos em tarefas repetitivas e mais em supervisão estratégica e auditoria de decisões.",
    data_criada: "2026-11-27T14:30:00.000Z",
  },
  {
    id: "1b2c3d4e-1111-4a2b-9c3d-100000000002",
    titulo: "Arquitetura limpa no Next.js App Router: o que realmente escala",
    descricao:
      "Separar Server Components para busca inicial de dados e Client Components apenas nas bordas interativas reduz drasticamente o bundle enviado ao navegador.\n\nAlém da performance, a manutenção de rotas protegidas e estados de paginação torna-se muito mais previsível em equipes maiores.",
    data_criada: "2026-11-26T18:15:00.000Z",
  },
  {
    id: "1b2c3d4e-1111-4a2b-9c3d-100000000003",
    titulo: "Por que cookies HttpOnly superam o localStorage na autenticação",
    descricao:
      "Armazenar tokens JWT no localStorage expõe a sessão do usuário a qualquer script malicioso injetado via XSS.\n\nCom cookies HttpOnly e diretiva SameSite=Lax, o navegador gerencia o envio das credenciais automaticamente sem expor o token ao JavaScript da página.",
    data_criada: "2026-11-25T11:40:00.000Z",
  },
  {
    id: "1b2c3d4e-1111-4a2b-9c3d-100000000004",
    titulo: "O avanço das baterias de estado sólido na mobilidade urbana",
    descricao:
      "Protótipos comerciais apresentados este ano demonstram recargas de 80% em menos de doze minutos, com maior estabilidade térmica.\n\nA redução no peso dos pacotes de células promete transformar não apenas carros elétricos, mas também frotas leves de entrega.",
    data_criada: "2026-11-24T09:20:00.000Z",
  },
  {
    id: "1b2c3d4e-1111-4a2b-9c3d-100000000005",
    titulo: "FastAPI e Pydantic v2: validação de dados em alta velocidade",
    descricao:
      "A reescrita do núcleo do Pydantic em Rust consolidou o FastAPI como uma das escolhas mais rápidas do ecossistema Python para microsserviços.\n\nA tipagem estática integrada gera documentação OpenAPI automática e reduz erros de contrato entre frontend e backend.",
    data_criada: "2026-11-23T16:05:00.000Z",
  },
  {
    id: "1b2c3d4e-1111-4a2b-9c3d-100000000006",
    titulo: "Infraestrutura verde: data centers apostam em resfriamento líquido",
    descricao:
      "O crescimento da computação de alta densidade elevou o consumo energético dos servidores tradicionais refrigerados a ar.\n\nSistemas de imersão e placas frias diretas nos processadores já cortam em até 40% o gasto elétrico com climatização.",
    data_criada: "2026-11-22T13:50:00.000Z",
  },
  {
    id: "1b2c3d4e-1111-4a2b-9c3d-100000000007",
    titulo: "Paginação por offset vs. cursor: quando usar cada abordagem",
    descricao:
      "Consultas com skip e limit são simples de implementar e suficientes para catálogos e portais editoriais de médio porte.\n\nJá em feeds infinitos com milhares de inserções por segundo, a paginação baseada em cursor evita duplicidades e mantém o tempo de resposta constante.",
    data_criada: "2026-11-21T10:10:00.000Z",
  },
  {
    id: "1b2c3d4e-1111-4a2b-9c3d-100000000008",
    titulo: "Cibersegurança na prática: limitando ataques de força bruta",
    descricao:
      "Rotas de autenticação sem controle de taxa são alvos constantes de varreduras automatizadas na web.\n\nImplementar bloqueios temporários por endereço IP e respostas padronizadas protege a disponibilidade da aplicação sem depender de infraestrutura complexa.",
    data_criada: "2026-11-20T19:00:00.000Z",
  },
  {
    id: "1b2c3d4e-1111-4a2b-9c3d-100000000009",
    titulo: "O papel da tipografia editorial na leitura em telas",
    descricao:
      "Portais de notícias e análise dependem de hierarquia visual clara, contraste equilibrado e largura de linha controlada para evitar fadiga ocular.\n\nCombinar fontes serifadas nos títulos com sans-serif limpa no corpo do texto melhora a escaneabilidade.",
    data_criada: "2026-11-19T15:35:00.000Z",
  },
  {
    id: "1b2c3d4e-1111-4a2b-9c3d-100000000010",
    titulo: "Bancos de dados serverless e o fim das conexões ociosas",
    descricao:
      "Plataformas modernas separam computação e armazenamento, permitindo escalar a zero quando não há tráfego ativo.\n\nPara projetos independentes e MVPs, esse modelo elimina custos fixos mensais sem abrir mão da compatibilidade total com PostgreSQL.",
    data_criada: "2026-11-18T08:45:00.000Z",
  },
  {
    id: "1b2c3d4e-1111-4a2b-9c3d-100000000011",
    titulo: "Automação de testes end-to-end em aplicações full-stack",
    descricao:
      "Garantir que o fluxo de login, criação e edição funcione após cada alteração reduz o medo de refatorar código em produção.\n\nTestes focados nas jornadas críticas do usuário entregam mais confiança do que métricas isoladas de cobertura.",
    data_criada: "2026-11-17T17:25:00.000Z",
  },
  {
    id: "1b2c3d4e-1111-4a2b-9c3d-100000000012",
    titulo: "Design minimalista em painéis administrativos",
    descricao:
      "Interfaces de gestão eficientes priorizam leitura rápida de tabelas, modais contextualizados e ações destrutivas com confirmação.\n\nRemover ruído visual acelera o trabalho diário de editores e operadores de conteúdo.",
    data_criada: "2026-11-16T12:10:00.000Z",
  },
  {
    id: "1b2c3d4e-1111-4a2b-9c3d-100000000013",
    titulo: "A evolução das APIs RESTful na era da web moderna",
    descricao:
      "Mesmo com alternativas como GraphQL e gRPC, o padrão REST continua dominante pela simplicidade de cacheamento HTTP e facilidade de depuração.\n\nBoas práticas de versionamento e códigos de status semânticos mantêm a API previsível por anos.",
    data_criada: "2026-11-15T09:50:00.000Z",
  },
  {
    id: "1b2c3d4e-1111-4a2b-9c3d-100000000014",
    titulo: "Como estruturar projetos de portfólio que chamam atenção técnica",
    descricao:
      "Mais do que telas bonitas, recrutadores buscam entender decisões de arquitetura, tratamento de erros e preocupações com segurança.\n\nDocumentar o fluxo de autenticação, disponibilizar modo de demonstração e manter o código limpo diferenciam o repositório.",
    data_criada: "2026-11-14T16:40:00.000Z",
  },
];