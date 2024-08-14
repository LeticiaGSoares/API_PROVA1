# Dia 01

### **Dia 1: Configuração e Recursos Básicos (3,33)**

**Objetivo**: Configuração inicial do projeto, compreensão de modelagem de dados e rotas básicas.

1. **Configuração do Ambiente:**
    - Configurar um projeto Node.js com Javascript.
    - Configurar o Express e o MYSQL como banco de dados.
2. **Modelagem Inicial:**
    - Criar modelos de dados para evento, palestrante, e participante.
    - Criar as tabelas no banco de dados MYSql.
3. **Rotas Básicas:**
    - **Rota para criar um novo palestrante:**
        - POST `/eventos/palestrantes`
        - Dados: `{ "nome": "Nome do Palestrante", "expertise": "Área de Especialização" }`
    - **Rota para listar todos os palestrantes:**
        - GET `/eventos/palestrantes`



# Dia 02

### **Dia 2: Funcionalidades Avançadas (3,33)**

**Objetivo**: Implementação de funcionalidades complexas, autenticação e gerenciamento de relacionamentos.

1. **Gerenciamento de Eventos:**
    - **Rota para criar um novo evento:**
        - POST `/eventos/criar`
        - Dados: `{ "titulo": "Título do Evento", "data": "2024-08-15", "palestrantesId": [1, 3] }`
    - **Rota para listar todos os eventos com detalhes dos palestrantes:**
        - GET `/eventos/agenda`
2. **Autenticação e Participantes:**
    - Implementar autenticação básica para proteger rotas de criação e listagem.
    - **Rota para registrar um novo participante:**
        - POST `/eventos/participantes/registrar`
        - Dados: `{ "nome": "Nome do Participante", "email": "email@exemplo.com" }`
3. **Inscrição de Participantes em Eventos:**
    - **Rota para inscrever um participante em um evento:**
        - POST `/eventos/inscrever`
        - Dados: `{ "participanteId": 2, "eventoId": 1 }`