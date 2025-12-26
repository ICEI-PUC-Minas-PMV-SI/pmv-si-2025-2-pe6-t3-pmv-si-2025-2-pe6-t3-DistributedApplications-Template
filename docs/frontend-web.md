# Front-end Web

O projeto Front-end Web do sistema **Hotel Fazenda** tem como objetivo oferecer uma interface moderna, intuitiva e responsiva, que permita aos usuários (hóspedes, garçons, gerentes e administradores) interagir com o sistema de forma prática e segura. A aplicação web é responsável por permitir o acesso ao cardápio digital, gestão de reservas, controle de quartos e autenticação por perfis, garantindo uma experiência fluida e eficiente tanto para o cliente final quanto para a equipe administrativa do hotel.

## Projeto da Interface Web

A interface foi desenvolvida em **React (Vite)**, integrando-se diretamente à API desenvolvida em **.NET 9**, com banco de dados **PostgreSQL**. O layout segue uma estética rústica e acolhedora, inspirada em hotéis fazenda, utilizando tons neutros e elementos visuais que remetem à natureza e ao conforto. O design foi pensado para ser funcional e agradável, com navegação simples, componentes reutilizáveis e foco na acessibilidade.

As principais páginas da aplicação são:
- **Home**: apresenta informações institucionais, imagens do hotel e botões de acesso rápido para reservas e cardápio digital.
- **Login**: tela de autenticação com validação de credenciais via API (JWT), direcionando o usuário para o painel de acordo com o seu perfil.
- **Dashboard (restrito)**: painel administrativo com funcionalidades distintas conforme o tipo de usuário.
  - **Administrador**: gestão completa de usuários e permissões.
  - **Gerente**: gerenciamento de quartos, reservas e cardápio.
  - **Garçom**: controle de pedidos e acompanhamento em tempo real.
- **Cardápio Digital**: visualização dos produtos disponíveis, com imagens, descrição e valores, além da funcionalidade de adicionar itens ao pedido.
- **Reservas e Quartos**: controle de disponibilidade, cadastro e histórico de reservas realizadas.

### Wireframes

Os wireframes do projeto foram elaborados para orientar a construção da interface, representando a disposição dos elementos e a hierarquia visual das páginas. Estão armazenados na pasta `docs/wireframes/`, incluindo os arquivos:
- `home.png`
- `login.png`
- `dashboard.png`
- `cardapio.png`
- `quartos.png`
- `reservas.png`

Esses modelos servem como base para a implementação das páginas, garantindo consistência no design e usabilidade.

### Design Visual

O estilo visual do sistema foi definido a partir de uma paleta de cores que remete ao ambiente de fazenda e natureza, mantendo um contraste adequado e leitura agradável. A tipografia e os ícones seguem um padrão simples e harmônico.

**Paleta de cores:**
- Bege de fundo: `#F5F1E8`
- Verde oliva escuro: `#3D5B3D`
- Verde oliva claro: `#5F7F5F`
- Marrom: `#6E4F3A`
- Branco para cards: `#FFFFFF`
- Cinza de texto: `#2B2B2B`

**Tipografia:**
- Títulos: *Merriweather* (serif)
- Texto: *Inter* (sans-serif)

**Ícones e logotipo:**
- Ícones padronizados com a biblioteca `lucide-react`.
- Ícones específicos armazenados na pasta `/public/icons` (exemplo: `quarto.png`).
- Logotipo oficial do projeto: `logoHF.pnj`.

O layout utiliza botões arredondados, sombras suaves, cards com fundo branco e bordas claras, além de efeitos visuais sutis para foco e interação.

## Fluxo de Dados

O fluxo de dados segue uma arquitetura cliente-servidor. A aplicação web consome os dados da API por meio de requisições HTTP utilizando **Axios**. O usuário realiza login, recebe um token JWT, e acessa as rotas conforme seu perfil. O token é armazenado em `localStorage` e injetado automaticamente nos cabeçalhos das requisições.

1. O usuário acessa a página de login e insere e-mail e senha.
2. A aplicação envia as credenciais para o endpoint `/api/Auth/login`.
3. A API valida o usuário e retorna um token JWT.
4. O front-end armazena o token e libera as rotas protegidas.
5. As demais páginas consomem os endpoints correspondentes (produtos, quartos, reservas, usuários).

## Tecnologias Utilizadas
- **Frontend:** React, Vite, React Router, Axios, Context API/Zustand.
- **Estilo:** CSS Modules, Tailwind ou Styled Components.
- **Ícones:** lucide-react.
- **Backend:** API em .NET 9 (JWT).
- **Banco de Dados:** PostgreSQL.
- **Testes:** Vitest, React Testing Library, Cypress.
- **Hospedagem:** Vercel, Netlify ou servidor Nginx.
- **Versionamento:** Git e GitHub.

## Considerações de Segurança

A aplicação adota práticas recomendadas para segurança de sistemas distribuídos:
- **Autenticação segura:** via JWT, emitido pela API após login.
- **Autorização baseada em papéis:** controle de acesso conforme perfil (Administrador, Gerente, Garçom).
- **Proteção contra XSS e CSRF:** sanitização de dados e uso de HTTPS.
- **Gerenciamento de sessão:** expiração automática do token e logout seguro.
- **Variáveis de ambiente:** armazenamento em arquivos `.env` sem informações sensíveis no repositório.
- **Criptografia:** tráfego protegido via HTTPS.

## Implantação

Para a implantação o grupo utilizou basicamente os recursos abaixos:

1. **Requisitos de Software**.   
- **Banco de dados:** PostgreSQL.   
- **Linguagem:**.NET9. 
   
2. **Requisitos de Hardware**.
- **CPU:** 2 vCPUs ou superior.
- **Memória RAM:** 4 GB (mínimo), 8 GB (recomendado).   
- **Armazenamento:** 40 GB de SSD.
   
## Testes

Os testes iniciaram-se com as primeiras entregas de cada módulo.

- **Módulo Login**.
  
A estratégia adotada inicialmente para o módulo de Login foi preencher os campos com os dados de um usuário já existente e verificar se o sistema apresenta o resultado esperado, neste caso, permissão para o uso do software, posteriormente, testamos com dados de um usuário qualquer o comportamento do sistema que apresentou o resultado esperado de negação ao uso do software.

![WhatsApp Image 2025-11-21 at 19 14 53](https://github.com/user-attachments/assets/9d39f948-29f4-4bf9-a115-9587b0beaff1)

![WhatsApp Image 2025-11-21 at 19 15 18](https://github.com/user-attachments/assets/ce9e4f25-d14d-4948-b3d4-71a96dacc3bf)

- **Módulo Pedidos**.

O módulo de pedidos possue diversos atributos, inicialmente, testamos o cadastro dos dados e se havia persistência no banco de dados. Depois de alguns erros enfrentados o grupo conseguiu resolver e atestar a persistência dos dados, nesta fase, fizemos o teste de exclusão de dados e, posterior, cadastro novo de um pedido de forma a verificar se a persistência criava um novo registro com novo número de índice. 

![WhatsApp Image 2025-11-21 at 19 15 59](https://github.com/user-attachments/assets/47bb3722-7a72-431d-8096-0c7bf2f4c419)

![WhatsApp Image 2025-11-21 at 19 16 15](https://github.com/user-attachments/assets/abf90986-6f3c-4098-b903-7fdf3e3a96dc)

- **Módulo Hospedagem**.

A estratégia adotada para este módulo de hospedagem consistiu e testar o cadastro inicial de um hóspede e observar o comportamento do sistema e a mudança de status do quarto, assim como a correção dos dados no banco de dados, depois testamos o atributo data da hospedagem que apresentou comportamento correto, ou seja, o hóspede na data cadastrada para o fim da estadia teve o status do quarto modificado de "ocupado" para "livre". Simulamos também a possibilidade de hospedagem num quarto não existente e o comportamento do sistema neste cenário.

![WhatsApp Image 2025-11-21 at 19 17 48](https://github.com/user-attachments/assets/9030fbde-130b-49ff-abc4-73ef41885f58)

![WhatsApp Image 2025-11-21 at 19 18 18](https://github.com/user-attachments/assets/8d35112f-bf6c-47ea-89bb-bf32a14c45b9)

![WhatsApp Image 2025-11-21 at 19 18 38](https://github.com/user-attachments/assets/895f6412-15f4-4119-8929-24b3a40ce881)

![WhatsApp Image 2025-11-21 at 19 18 50](https://github.com/user-attachments/assets/3483e2bc-50c2-4fdf-aa02-f5f588bcd6ff)

- **Módulo Produtos**.

Este módulo de produto é um dos mais importantes pois diversos módulos consomem os dados de produtos, por essa razão, o foco do teste foi verificar o cadastro, exclusão e edição dos dados. Posteriormente, testamos a integração dos dados com os demais módulos do sistema, enfrentamos alguns erros na recuperação dessas informações mas que foram sanadas no decorrer do desenvolvimento e testes.

![WhatsApp Image 2025-11-21 at 19 16 46](https://github.com/user-attachments/assets/dc56f5a5-2d7c-4a49-80fb-a358a3a8ed41)

![WhatsApp Image 2025-11-21 at 19 17 08](https://github.com/user-attachments/assets/aee2626d-1904-42b0-bc6b-620ab39354e1)

![WhatsApp Image 2025-11-21 at 19 17 24](https://github.com/user-attachments/assets/b1bad90e-0a07-4ed9-a359-6ef6e7e4c92b)

# Referências

O grupo utilizou como referência principal os conteúdos disponibilizados no microfundamento de desenvolvimento Web.

# Planejamento

##  Quadro de tarefas

> Apresente a divisão de tarefas entre os membros do grupo e o acompanhamento da execução, conforme o exemplo abaixo.

### Semana 1

Atualizado em: 06/10/2025

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Carlos       | Desenvolvimento módulo Login | 06/10/2025     | 17/10/2025 | ✔️    | 17/10/2025    |
| Raphael        | Testes    | 06/10/2025     | 17/10/2025 | ✔️    |          17/10/2025       |
| Déborah        | Desenvolvimento módulo Hospeddagem  | 06/10/2025     | 17/10/2025 | ✔️     |     17/10/2025            |
| Junio firmino        | Testes  |    06/10/2025        | 17/10/2025 | ✔️    |  17/10/2025     |
| André        | Desenvolvimento módulo pedido  |    06/10/2025        | 17/10/2025 | ✔️    |  17/10/2025     |


#### Semana 2

Atualizado em: 20/10/2025

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Carlos        | Desenvolvimento módulo Login   | 20/10/2025     | 30/10/2025 | ✔️    | 28/10/2025      |
| Raphael        | Testes    | 20/10/2025     | 30/10/2025 | ✔️    |     30/10/2025            |
| Déborah        | Desenvolvimento módulo Hospeddagem  | 20/10/2025     | 30/10/2025| ✔️    |   28/10/2025        |
| Junio Firmino        | Testes   |  22/10/2025    | 30/10/2025 | ✔️    |   30/10/2025|    |
| André        | Desenvolvimento módulo pedido  |  20/10/2025    | 30/10/2025 | ✔️    |    25/10/2025|   |

Legenda:
- ✔️: terminado
- 📝: em execução
- ⌛: atrasado
- ❌: não iniciado

