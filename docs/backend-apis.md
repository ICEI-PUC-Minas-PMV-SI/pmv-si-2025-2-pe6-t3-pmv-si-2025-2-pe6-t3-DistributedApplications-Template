# APIs e Web Services

Para este projeto, foi desenvolvida uma **API RESTful robusta** que atua como o componente central do sistema de gestão do hotel-fazenda.  
A API centraliza regras de negócio e acesso a dados, fornecendo uma interface **segura** e **bem definida** para frontend web e aplicativo móvel.

---

## Objetivos da API

Disponibilizar **endpoints seguros e performáticos** para gerenciar:
- Usuários e autenticação (pilar de segurança).
- Funcionalidades do hotel: produtos/cardápio e pedidos (orders).

---

## Modelagem da Aplicação
Padrão **Controller–Service–Repository** com separação clara de responsabilidades.

- **Controllers**: recebem requisições HTTP, validam dados e retornam respostas.  
- **Services**: regras de negócio (ex.: cálculo de total do pedido, hash de senha).  
- **Repositories**: acesso ao banco com **Entity Framework Core**.

---

### Entidades

#### User
- `Id` (int)  
- `Name` (string)  
- `Email` (string)  
- `PasswordHash` (string)  
- `Role` (enum: `Admin`, `Gerente`, `Hospede`)

DTOs: `CreateUserDto`, `UserViewDto`

#### Produto
- `Id` (int)  
- `Name` (string)  
- `Preco` (decimal)  
- `Estoque` (int)

#### Order (Pedido)
- `Id` (int)  
- `UserId` (int) – quem faz o pedido  
- `ProdutoId` (int) – item do cardápio  
- `Quantidade` (int)  
- `Total` (decimal) – **calculado** (`Preco × Quantidade`)  
- `Status` (enum: `Pendente`, `Em Preparo`, `Entregue`, `Cancelado`)  
- `DataPedido` (datetime)

**Regras principais (Order):**
- `Total` calculado no **Service** com base no preço vigente do produto.
- Apenas **Admin/Gerente** podem alterar `Status`.
- **Hospede** pode **criar** pedidos e **listar** os seus.

---

## Tecnologias

- **.NET 9 / ASP.NET Core** (endpoints REST)
- **Entity Framework Core** (SQL Server)
- **EF Core Migrations** (versionamento)
- **JWT** (autenticação)
- **BCrypt.Net-Next** (hash de senha)
- **Swagger (OpenAPI)** (documentação/testes)

---

### API Endpoints

Os endpoints são organizados por recursos. Atualmente:

### Documentação Cardápio Digital
Documentação realizada via Postman de acordo com a URL abaixo:
- https://documenter.getpostman.com/view/49021780/2sB3QGvCMA

#### Autenticação
- **POST** `/api/auth/login` → Recebe e-mail e senha e retorna um **JWT** válido.

#### Usuários
- **GET** `/api/users` → Retorna todos os usuários (**Admin/Gerente**)  
- **GET** `/api/users/{id}` → Retorna usuário específico (**Admin/Gerente**)  
- **POST** `/api/users` → Cria novo usuário (**Público**)  
- **PUT** `/api/users/{id}` → Atualiza usuário (**Admin**)  
- **DELETE** `/api/users/{id}` → Remove usuário (**Admin**)

#### Produtos

- **GET** `/api/produto` → Retorna todos os produtos (**Admin**)  
- **GET** `/api/produto/{id}` → Retorna produto específico (**Admin**)  
- **POST** `/api/produto` → Cria novo produto (**Admin**)  
- **PUT** `/api/produto/{id}` → Atualiza produto (**Admin**)  
- **DELETE** `/api/produto/{id}` → Remove produto (**Admin**)

#### Pedido (Orders)
- **GET** `/api/order` → Retorna todos os pedidos (**Admin/Gerente**)  
- **GET** `/api/order/{id}` → Retorna um pedido específico (**Admin/Gerente**)  
- **GET** `/api/order/user/{userId}` → Retorna todos os pedidos realizados por um usuário específico (**Hospede**)  
- **POST** `/api/order` → Cria um novo pedido (**Hospede**)  
- **PUT** `/api/order/{id}` → Atualiza o status de um pedido existente (**Gerente/Admin**)  
- **DELETE** `/api/order/{id}` → Cancela um pedido (**Gerente/Admin**)  

---

### Considerações de Segurança

- **Autenticação** via login que gera **JWT** assinado.  
- **Autorização** baseada em **Role-Based Access Control (RBAC)**.  
- Uso do atributo **`[Authorize]`** nos endpoints para restrição de acesso por papel.  
- **Senhas nunca em texto plano**: sempre hash com **BCrypt**.  
- **Boas práticas adicionais**: HTTPS obrigatório, CORS configurado, logs centralizados, rate limiting e validação de payloads.

---

### Implantação

A implantação da API será realizada em um ambiente de produção configurado para garantir **disponibilidade, segurança e performance**.

A plataforma escolhida é um **Servidor Virtual Privado (VPS)**, proporcionando equilíbrio entre custo e controle do ambiente, com configuração personalizada para os requisitos da aplicação.

**Requisitos mínimos do ambiente de produção**

**Hardware (VPS):**
- **CPU:** 2 vCores  
- **RAM:** 4 GB  
- **Armazenamento:** 50 GB SSD

**Software:**
- **Sistema Operacional:** Linux (Ubuntu 22.04 LTS ou superior)  
- **Servidor Web:** Nginx, configurado como **proxy reverso** para a aplicação **Kestrel**  
- **Runtime:** .NET 9  
- **Banco de Dados:** Instância do **SQL Server para Linux** ou serviço de banco gerenciado

**Fluxo de publicação:**
1. Build `Release` da API (.NET 9).  
2. Publicação com `dotnet publish` (self-contained opcional).  
3. Configuração do **systemd** para o serviço Kestrel.  
4. Nginx como proxy (TLS/HTTPS, compressão, cache estático).  
5. Variáveis de ambiente seguras (connection strings, JWT secret).  
6. Backup/restore do banco e **migrations** do EF Core.  
7. Monitoramento (health-checks, logs, métricas).

---

### Testes

- **Swagger UI** → Testes interativos rápidos, com a [documentação e evidências dos testes disponível aqui](https://sgapucminasbr-my.sharepoint.com/personal/1473720_sga_pucminas_br/_layouts/15/guestaccess.aspx?share=ETOvDMKM81tBv46wyxfZB_AB6CZnFM1sv2n0wfzCfWRZvg&rtime=E8VQDycE3kg).
---

# Referências

* **[Documentação Oficial do ASP.NET Core - Microsoft](https://learn.microsoft.com/pt-br/aspnet/core/)**
  * Principal fonte de consulta para a estrutura da API, configuração de serviços, middleware e melhores práticas da plataforma.

* **[Documentação Oficial do Entity Framework Core - Microsoft](https://learn.microsoft.com/pt-br/ef/core/)**
  * Referência para toda a camada de acesso a dados, incluindo configuração do DbContext, mapeamento de entidades, migrations e consultas.

* **[JSON Web Tokens (JWT)](https://jwt.io/)**
  * Site oficial com a especificação e ferramentas para depuração de tokens JWT, utilizado como base para a implementação da autenticação.

* **[Swashbuckle.AspNetCore - Repositório no GitHub](https://github.com/domaindrivendev/Swashbuckle.AspNetCore)**
  * Biblioteca utilizada para a geração da documentação interativa da API (Swagger UI). O repositório contém informações de configuração e uso.

* **[BCrypt.Net - Repositório no GitHub](https://github.com/BcryptNet/bcrypt.net)**
  * Referência da biblioteca utilizada para o hashing seguro das senhas de usuário, fundamental para a camada de segurança.

* **[Diretrizes de design de API REST - Microsoft Azure](https://learn.microsoft.com/pt-br/azure/architecture/best-practices/api-design)**
  * Um guia de melhores práticas para a construção de APIs RESTful, abordando convenções de nomenclatura, uso de verbos HTTP e códigos de status.

# Planejamento

## Quadro de tarefas

> Divisão de tarefas entre os membros do grupo e acompanhamento da execução.

### Semana 1

| Responsável | Tarefa/Requisito                                | Iniciado em | Prazo      | Status | Terminado em |
|:-------------|:-----------------------------------------------|:-----------:|:----------:|:------:|:------------:|
| Carlos       | Criar estrutura API                            | 04/09/2025  | 07/09/2025 | ✔️     | 05/09/2025   |
| Raphael      | Criar requisitos funcionais                    | 08/09/2025  | 02/09/2025 | ✔️     | 02/09/2025   |
| Déborah      | Definição da entidade Order e mapeamento inicial no banco | 05/09/2025  | 09/09/2025 | ✔️     | 08/09/2025   |
| AlunoK       | Personas 1                                     | 01/01/2024  | 12/02/2005 | ❌     |              |

---

### Semana 2

| Responsável | Tarefa/Requisito                                   | Iniciado em | Prazo      | Status | Terminado em |
|:-------------|:---------------------------------------------------|:-----------:|:----------:|:------:|:------------:|
| Carlos       | CRUD de usuários                                   | 08/09/2025  | 10/09/2025 | ✔️     | 09/09/2025   |
| Raphael      | Retificação de documentação                        | 12/09/2025  | 08/09/2025 | ✔️     | 08/09/2025   |
| Déborah      | Implementar camada Repository e Service de Order    | 10/09/2025  | 15/09/2025 | ✔️     | 15/09/2025   |
| AlunoK       | Script de login                                    | 01/01/2024  | 12/03/2024 | ❌     |              |

---

### Semana 3

| Responsável | Tarefa/Requisito                                         | Iniciado em | Prazo      | Status | Terminado em |
|:-------------|:---------------------------------------------------------|:-----------:|:----------:|:------:|:------------:|
| Carlos       | Login com autenticação                                   | 17/09/2025  | 20/09/2025 | ✔️     | 17/09/2025   |
| Raphael      | CRUD de produtos                                         | 19/09/2025  | 18/09/2025 | ✔️     | 18/09/2025   |
| Déborah      | Criação do OrderController e endpoints RESTful           | 18/09/2025  | 24/09/2025 | 📝     |              |
| AlunoK       | Ajustes no script de login                               | 01/01/2024  | 12/03/2024 | ❌     |              |

---

### Semana 4

| Responsável  | Tarefa/Requisito                           | Iniciado em | Prazo      | Status | Terminado em |
|:--------------|:------------------------------------------|:-----------:|:----------:|:------:|:------------:|
| Carlos        | Documentação e testes                     | 28/09/2025  | 05/10/2025 | ✔️     | 30/09/2025   |
| Junio Firmino | Criação Cardápio Digital API              | 28/09/2025  | 05/10/2025 | ✔️     |              |
| Raphael       | Documentação de testes                    | 27/09/2025  | 05/10/2025 | ✔️     | 05/10/2025   |
| Déborah       | Testes e documentação do módulo Order     | 29/09/2025  | 05/10/2025 | ✔️     | 05/10/2025   |

---

**Legenda:**  
✔️ terminado · 📝 em execução · ⌛ atrasado · ❌ não iniciado
