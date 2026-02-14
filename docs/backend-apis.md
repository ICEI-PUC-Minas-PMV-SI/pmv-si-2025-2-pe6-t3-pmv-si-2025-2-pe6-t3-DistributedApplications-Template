# APIs e Web Services

O sistema distribuído visa proporcionar uma plataforma de gestão hoteleira, agregando vários módulos independentes para suprir as necessidades básicas dos usuários, administração e o próprio hotel. A ferramenta oferece funcionalidades essenciais como autenticação segura, cadastro e validação de usuários, gerenciamento de hotéis e quartos, realização e controle de reservas, avaliações de estadia e integração com meios de pagamento.

Cada módulo foi projetado para operar de forma autônoma e comunicável via Web APIs, garantindo flexibilidade, escalabilidade e fácil manutenção do sistema. Toda a comunicação entre os módulos ocorre por meio de requisições HTTP e respostas em JSON, assegurando interoperabilidade, segurança e flexibilidade.

## Objetivos da API

O principal objetivo da API é centralizar e padronizar a comunicação entre os diferentes módulos do sistema distribuído, garantindo integração segura, eficiente e escalável entre os serviços. A API foi projetada para permitir tanto o uso interno (entre os módulos do próprio sistema) quanto o uso externo controlado (por aplicações clientes, como um painel administrativo ou aplicativo móvel).

Os objetivos específicos da API incluem:

1. **Gerenciar o ciclo de vida das reservas:**  
   Permitir que usuários autenticados possam criar, listar, atualizar e excluir reservas de quartos de forma simples e segura, mantendo o vínculo entre reserva, usuário e quarto.

2. **Centralizar autenticação e controle de acesso:**  
   Oferecer endpoints para cadastro, login e autenticação via JWT, garantindo que apenas usuários autorizados acessem os recursos apropriados.

3. **Padronizar a comunicação entre serviços:**  
   Servir como camada intermediária entre os módulos de usuários, quartos e reservas, utilizando o formato JSON e o protocolo HTTP com métodos RESTful.

4. **Garantir segurança e rastreabilidade:**  
   Aplicar políticas de autenticação, autorização e registro de ações (logs) para assegurar integridade e confiabilidade dos dados.

5. **Promover escalabilidade e modularidade:**  
   Manter os serviços desacoplados, permitindo que cada módulo evolua de forma independente e possa ser escalado conforme a demanda.

## Modelagem da Aplicação

- **Diagrama de Classes:**

<img width="700" height="827" alt="diagram2" src="https://github.com/user-attachments/assets/791ee2e4-296b-408b-907e-ae66dd41276e" />

---
- **Fluxo de login do usuário:**

<img width="420" alt="diagram1" src="https://github.com/user-attachments/assets/77014f78-4a81-4fb4-b52c-881b21aca1e1" />

---
- **Fluxo de criação de reserva de quartos:**

<img width="550" height="552" alt="diagram3" src="https://github.com/user-attachments/assets/58264655-bb22-41b9-944e-86f4f5e53d76" />

---
- **Modelagem Entidade-Relacionamento:**

<img width="600" height="792" alt="diagram4" src="https://github.com/user-attachments/assets/0e62d23e-9380-488b-a3ba-d056859b455e" />

## Tecnologias Utilizadas

### Backend
- **FastAPI:** Framework principal para criação da API RESTful.  
- **Python 3.13:** Linguagem de programação utilizada no backend.

### Banco de Dados
- **PostgreSQL:** Sistema gerenciador de banco de dados relacional (SGBD) utilizado para armazenamento das informações.  
- **SQLAlchemy:** ORM responsável por fazer a ponte entre o banco de dados e as entidades Python.

### Autenticação e Segurança
- **JWT (JSON Web Token):** Utilizado para autenticação e controle de acesso dos usuários.  
- **Passlib / bcrypt:** Bibliotecas utilizadas para criptografar senhas com segurança antes de armazená-las no banco de dados.

### Arquitetura e Organização
- **Pydantic:** Usado para definir e validar schemas de entrada e saída, garantindo consistência nos dados trafegados pela API.  
- **Uvicorn:** Servidor ASGI de alta performance responsável por executar a aplicação FastAPI, oferecendo suporte a requisições assíncronas e escalabilidade horizontal.

### Ambiente e Execução
- **Virtualenv (.venv):** Isolamento do ambiente Python para controle de dependências.  
- **Git e GitHub:** Controle de versão e colaboração entre desenvolvedores.

## API Endpoints

### Endpoint Reservas

- **Método:** GET  
- **URL:** /reservas  
- **Resposta:**  
  - Sucesso (200 OK)
    ```json
    {
        "message": "Success",
        "data": {
            "id": "081274f3-9feb-45a2-8296-c9205ff56af0",
            "user_id": "123",
            "room_id": 222,
            "date_checkin": "2025-12-20T14:00:00",
            "date_checkout": "2025-12-30T12:00:00"
        }
    }
    ```
  - Sucesso (200 OK, sem reservas)
    ```json
    {
        "message": "Success",
        "data": []
    }
    ```

- **Método:** GET  
- **URL:** /reservas/{id_reserva}  
- **Resposta:**  
  - Sucesso (200 OK)
    ```json
    {
        "message": "Success",
        "data": {
            "id": "081274f3-9feb-45a2-8296-c9205ff56af00",
            "user_id": "123",
            "room_id": 222,
            "date_checkin": "2025-12-20T14:00:00",
            "date_checkout": "2025-12-30T12:00:00"
        }
    }
    ```
  - Erro (404 Not Found)
    ```json
    {
        "message": "Erro",
        "data": {
            "detail": "Reservation not found"
        }
    }
    ```

- **Método:** POST  
- **URL:** /reservas  
- **Parâmetros:**  
    ```json
    {
        "room_id": 222,
        "date_checkin": "2025-12-20T14:00:00",
        "date_checkout": "2025-12-30T12:00:00"
    }
    ```
- **Resposta:**  
  - Sucesso (200 OK)
    ```json
    {
        "message": "Success",
        "data": {
            "id": "081274f3-9feb-45a2-8296-c9205ff56af0",
            "user_id": "123",
            "room_id": 222,
            "date_checkin": "2025-12-20T14:00:00",
            "date_checkout": "2025-12-30T12:00:00"
        }
    }
    ```

- **Método:** PATCH  
- **URL:** /reservas/{id_reserva}  
- **Resposta:**  
  - Sucesso (200 OK)
    ```json
    {
        "message": "Success",
        "data": {
            "id": "081274f3-9feb-45a2-8296-c9205ff56af0",
            "user_id": "123",
            "room_id": 999,
            "date_checkin": "2025-12-22T14:00:00",
            "date_checkout": "2025-12-28T12:00:00"
        }
    }
    ```
  - Erro (404 Not Found)
    ```json
    {
        "message": "Erro",
        "data": {
            "detail": "Reservation not found"
        }
    }
    ```

- **Método:** DELETE  
- **URL:** /reservas/{id_reserva}  
- **Resposta:**  
  - Sucesso (200 OK)
    ```json
    {
        "message": "Success",
        "data": {
            "message": "Reservation 081274f3-9feb-45a2-8296-c9205ff56af0 deleted successfully"
        }
    }
    ```
  - Erro (404 Not Found)
    ```json
    {
        "message": "Erro",
        "data": {
            "detail": "Reservation not found"
        }
    }
    ```

### Endpoint Avaliações

- **Método:** GET  
- **URL:** /hotels/{hotel_id}/reviews  
- **Parâmetros:** hotel_id: O ID do hotel que você deseja consultar.

**Respostas:**  
- Sucesso (200 OK)
    ```json
    {
        "message": "Success",
        "data": [
            {
                "rating": 5,
                "comment": "Excelente estadia!",
                "id": 1,
                "hotel_id": 1,
                "user": {
                    "user_name": "john_doe"
                }
            }
        ]
    }
    ```
- Erro (404 Not Found)
    ```json
    {
        "message": "Error",
        "data": {
            "detail": "Hotel not found"
        }
    }
    ```

- **Método:** POST  
- **URL:** /hotels/{hotel_id}/reviews  
- **Parâmetros:** Request Body JSON
    ```json
    {
        "rating": 5,
        "comment": "Adorei a experiência!"
    }
    ```
- Respostas:  
  - Sucesso (201 Created)
    ```json
    {
        "message": "Success",
        "data": {
            "rating": 5,
            "comment": "Adorei a experiência!",
            "id": 2,
            "hotel_id": 1,
            "user": {
                "user_name": "john_doe"
            }
        }
    }
    ```
  - Erro (401 Unauthorized)
    ```json
    {
        "message": "Error",
        "data": {
            "detail": "Não há um usuário 'logado'. Por favor, faça o login."
        }
    }
    ```

- **Método:** PUT  
- **URL:** /reviews/{review_id}  
- **Parâmetros:** Request Body JSON
    ```json
    {
        "rating": 3,
        "comment": "Atualizando meu comentário."
    }
    ```
- Respostas:  
  - Sucesso (200 OK)
    ```json
    {
        "message": "Success",
        "data": {
            "rating": 3,
            "comment": "Atualizando meu comentário.",
            "id": 2,
            "hotel_id": 1,
            "user": {
                "user_name": "john_doe"
            }
        }
    }
    ```
  - Erro (403 Forbidden)
    ```json
    {
        "message": "Error",
        "data": {
            "detail": "Not authorized"
        }
    }
    ```
  - Erro (404 Not Found)
    ```json
    {
        "message": "Error",
        "data": {
            "detail": "Review not found"
        }
    }
    ```

- **Método:** DELETE  
- **URL:** /reviews/{review_id}  
- **Respostas:**  
  - Sucesso (204 No Content)  
    *Sem corpo de resposta*  
  - Erro (403 Forbidden)
    ```json
    {
        "message": "Error",
        "data": {
            "detail": "Not authorized"
        }
    }
    ```
  - Erro (404 Not Found)
    ```json
    {
        "message": "Error",
        "data": {
            "detail": "Review not found"
        }
    }
    ```

## Considerações de Segurança

A segurança é um aspecto essencial no desenvolvimento da plataforma de gestão hoteleira distribuída, especialmente por lidar com dados sensíveis de usuários, reservas e transações financeiras. As principais considerações de segurança adotadas no sistema incluem:

1. **Autenticação e Autorização**:
O acesso aos recursos protegidos da API é controlado por meio de tokens JWT (JSON Web Tokens). Cada usuário autenticado recebe um token que contém informações de identificação e permissões, garantindo que apenas usuários autorizados possam realizar operações específicas, como criação, edição ou exclusão de reservas e avaliações.

2. **Criptografia de Senhas**:
As senhas dos usuários são criptografadas utilizando a biblioteca bcrypt, implementada através do pacote Passlib, antes de serem armazenadas no banco de dados. Isso impede que senhas sejam lidas mesmo em caso de vazamento de dados.

3. **Proteção contra ataques comuns**:
O sistema adota práticas de mitigação contra ataques frequentes em aplicações web:
   - SQL Injection: as interações com o banco são realizadas via SQLAlchemy ORM, que abstrai as queries e evita injeções diretas.
   - Cross-Site Scripting (XSS): validações rigorosas nos campos de entrada, utilizando Pydantic, impedem a inserção de scripts maliciosos.

4. **Comunicação Segura**:
Todas as requisições devem trafegar sob o protocolo HTTPS, garantindo a criptografia ponta a ponta dos dados enviados e recebidos entre clientes e servidores.

5. **Logs e Monitoramento**:
A API mantém registros de ações críticas, como tentativas de login, criação e cancelamento de reservas, e exclusões de dados. Isso permite rastrear atividades suspeitas e auditar o comportamento dos usuários e administradores.

6. **Controle de Acesso e Permissões**:
Usuários comuns têm acesso apenas aos recursos pessoais (como suas próprias reservas e avaliações), enquanto administradores possuem privilégios adicionais, como gerenciar hotéis e quartos. Essa separação garante o princípio do menor privilégio.

## Implantação

Para a implantação da aplicação distribuída em um ambiente de produção, foram considerados os seguintes requisitos e etapas:

1. **Requisitos de Hardware e Software**
- Servidor (mínimo recomendado):
   - CPU: 2 vCPUs
   - Memória RAM: 4 GB
   - Armazenamento: 20 GB SSD
   - Sistema Operacional: Linux (Ubuntu Server 22.04 LTS)

- Dependências de Software:
   - Python 3.13
   - FastAPI
   - Uvicorn (servidor ASGI)
   - PostgreSQL
   - SQLAlchemy
   - Pydantic
   - Passlib / bcrypt
   - Git e Virtualenv
 
2. **Plataforma de Hospedagem**

A aplicação pode ser hospedada em provedores de nuvem como AWS, Render, DigitalOcean, Railway, Google Cloud Platform ou Azure, permitindo escalabilidade e monitoramento integrado.
Para ambientes menores, um VPS dedicado também é suficiente.

3. **Configuração do Ambiente**
- Criar e ativar um ambiente virtual Python (python -m venv .venv).
- Instalar as dependências do projeto (pip install -r requirements.txt).
- Configurar variáveis de ambiente, como:
   - DATABASE_URL (string de conexão ao PostgreSQL)
   - JWT_SECRET_KEY (chave secreta para geração de tokens)
   - ENVIRONMENT (ambiente: desenvolvimento, teste ou produção)
 
4. **Deploy da Aplicação**
- Fazer o build e iniciar o servidor Uvicorn com:

   `fastapi dev app/main.py`

5. **Testes em Produção**

Após o deploy, realizar testes de:
- Conectividade com o banco de dados
- Respostas dos endpoints principais (autenticação, reservas, avaliações)
- Validação de tokens JWT

Essas etapas asseguram que a aplicação funcione corretamente, de forma segura e escalável, no ambiente de produção.

## Testes

- [**Testes Users**](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2025-2-pe6-t3-g3-t3-2025-2/blob/main/docs/users-api-testing.md)  
- [**Testes Auth**](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2025-2-pe6-t3-g3-t3-2025-2/blob/main/docs/auth-api-testing.md)  
- [**Testes Reservas**](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2025-2-pe6-t3-g3-t3-2025-2/blob/main/docs/reservas-api-testing.md)
- [**Testes hotéis**](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2025-2-pe6-t3-g3-t3-2025-2/blob/main/docs/hotels-api-testing.md)
- [**Testes comodidades dos hotéis**](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2025-2-pe6-t3-g3-t3-2025-2/blob/main/docs/amenities-api-testing.md)

# Referências

1. **Documentação FASTAPI**: https://fastapi.tiangolo.com/#typer-the-fastapi-of-clis
2. **Documentação Python 3.13**: https://docs.python.org/pt-br/3/
3. **Documentação PostgreeSQL**: https://www.postgresql.org/docs/current/index.html
4. **Documentação Uvicorn**: https://uvicorn.dev/

# Planejamento

## Quadro de tarefas

### Semanas 1-5

Atualizado em: 05/10/2025

| Responsável | Tarefa/Requisito      | Iniciado em | Prazo      | Status | Terminado em |
|------------|----------------------|------------|-----------|--------|--------------|
| Victor Pereira, Gustavo Rossetti, Luiz Andrade, Matheus Fraga     | Documentação          | 01/09/2025 | 05/10/2025 | ✔️    | 05/10/2025   |
| Victor Pereira     | Desenvolvimento da API (feature de Reservas de Hospedagens)          | 01/09/2025 | 28/09/2025 | ✔️     | 05/10/2025   |
| Matheus Fraga     | Desenvolvimento da API (feature de Hotéis e Comodidades)          | 01/09/2025 | 28/09/2025 | ✔️     | 05/10/2025   |
| Luiz Andrade     | Desenvolvimento da API (feature de Usuários/Login/Autenticação)          | 01/09/2025 | 28/09/2025 | ✔️     | 05/10/2025   |
| Gustavo Rossetti     | Desenvolvimento da API (feature de Feedbacks)          | 01/09/2025 | 28/09/2025 | ✔️     | 05/10/2025   |
| Victor Pereira     | Testes da API (feature de Reservas de Hospedagens)          | 28/09/2025 | 05/10/2025 | ✔️     | 05/10/2025   |
| Matheus Fraga     | Testes da API (feature de Hotéis e Comodidades)          | 28/09/2025 | 05/10/2025 | ✔️     | 05/10/2025   |
| Luiz Andrade     | Testes da API (feature de Usuários/Login/Autenticação)          | 28/09/2025 | 05/10/2025 | ✔️     | 05/10/2025   |
| Gustavo Rossetti     | Testes da API (feature de Feedbacks)          | 28/09/2025 | 05/10/2025 | ✔️     | 05/10/2025   |

Legenda:  
✔️: terminado  
📝: em execução  
⌛: atrasado  
❌: não iniciado
