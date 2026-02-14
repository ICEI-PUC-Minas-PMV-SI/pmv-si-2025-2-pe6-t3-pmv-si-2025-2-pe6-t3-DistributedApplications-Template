# Front-end Móvel

O Front-end Móvel da plataforma tem como principal objetivo oferecer uma **interface intuitiva e responsiva** que facilite a interação entre o usuário e os serviços hoteleiros em dispositivos **Android e iOS**. O sistema busca proporcionar uma **experiência fluida, segura e acessível**, permitindo que hóspedes realizem buscas, reservas e avaliações de hotéis de forma prática diretamente de seus smartphones.

## Projeto da Interface

A interface móvel foi projetada para oferecer uma navegação simples, visualmente consistente e otimizada para dispositivos Android e iOS. **O layout segue princípios de design centrado no usuário**, priorizando clareza, acessibilidade e fluidez durante o uso.

A navegação é organizada em abas inferiores e fluxos internos, permitindo fácil acesso às principais funcionalidades: página inicial, busca de hotéis, reservas e avaliações. **As telas utilizam componentes padronizados, como cards e botões destacados**, garantindo uniformidade visual e, consequentemente, melhor entendimento para o usuário.

As interações foram desenvolvidas para serem intuitivas, com feedbacks visuais, validação de campos, etc. O objetivo é proporcionar uma experiência agradável, responsiva e eficiente em todas as etapas da jornada do usuário.

### Wireframes

<p align="center">
<strong>Página Inicial (deslogado) / Página Inicial (logado)</strong><br>
  
<img width="500" alt="homepage" src="https://github.com/user-attachments/assets/a329eb42-5e48-4406-a33b-6596513e6860" />
</p>

---

<p align="center">
<strong>Cadastro de Usuário / Configurações de Usuário</strong><br>
  
<img width="500" alt="cadastro e configs de users" src="https://github.com/user-attachments/assets/03794709-f314-410c-8076-809f74eb1f26" />
</p>

---

<p align="center">
<strong>Finalizar Reserva / Minhas Reservas</strong><br>
  
<img width="500" alt="wireframes reservas2" src="https://github.com/user-attachments/assets/70ab5481-5a72-4642-b71d-0ebf05e7ba57">
</p>

---

<p align="center">
<strong>Cadastro de Hotéis</strong><br>
  
<img width="250" alt="Cadastro de Hotel" src="https://github.com/user-attachments/assets/3cc98289-68cc-4137-9a72-6e167acf2004" />
</p>

---

<p align="center">
<strong>Avaliações (Reviews)</strong><br>

<img width="250" alt="Reviews" src="https://github.com/user-attachments/assets/47002bcd-1d3d-4bf5-9d73-a5a0dc320fda" />
</p>

### Design Visual

O design da aplicação móvel foi desenvolvido para oferecer uma experiência moderna, intuitiva e visualmente agradável em dispositivos móveis. Utilizando **React Native com Expo**, a interface segue princípios de design mobile-first, priorizando **usabilidade, performance e adaptação a diferentes tamanhos de tela**.

A **paleta de cores** foi cuidadosamente selecionada para transmitir confiança, profissionalismo e destacar elementos interativos:

  - **Azul-escuro (#1E3A8A):** Cor primária, utilizada em headers, botões principais e elementos de destaque, transmitindo confiança e estabilidade.
  - **Laranja (#F27F12):** Para destacar ações importantes.
  - **Branco (#FFFFFF):** Background principal, proporcionando clareza e espaçamento visual.
  - **Cinza-claro (#F3F4F6):** Background secundário para separação de seções e cards.
  - **Verde (#10B981):** Feedbacks positivos, confirmações e status "ativo".
  - **Vermelho (#EF4444):** Alertas, erros e ações de cancelamento.
  - **Amarelo (#F59E0B):** Sistema de avaliação (estrelas) e avisos.
<img width="900" alt="paleta" src="https://github.com/user-attachments/assets/3012ca89-dce0-462f-95ac-fbd436c06f27" />


A **tipografia** foi escolhida para garantir uma boa legibilidade em telas pequenas e diferentes resoluções:
 - Poppins / Roboto (conforme o sistema), com tamanhos e pesos adaptados para boa leitura em telas pequenas.
<img width="400" alt="TIPOGRAFIA" src="https://github.com/user-attachments/assets/1277d0d7-2df7-4ce2-a402-a8c9ea3792da" />

Principais **ícones** utilizados:
  - 🏠 Home / Início
  - 🔍 Buscar
  - 📋 Minhas Reservas
  - ⭐ Avaliação
  - 📅 Calendário

## Fluxo de Dados

O projeto da interface foi elaborado com foco em **usabilidade e experiência do usuário (UX)**, seguindo boas práticas de design responsivo e interatividade. A aplicação foi dividida em módulos visuais correspondentes aos principais fluxos do sistema:

1. **Página Inicial (Home)**:
- Exibe uma barra de pesquisa com filtros de preço e avaliações.
- Mostra seções com destaques e hotéis recomendados.
- Inclui um rodapé com links para navegar na aplicação.

2. **Página de Resultados de Busca**:
- Lista os hotéis filtrados conforme os critérios do usuário.
- Cada item da lista mostra nome, imagem, preço, avaliação e botão “Ver Detalhes”.
- Filtros laterais permitem refinar a busca (por preço e avaliação).

3. **Página de Detalhes do Hotel**:
- Descrição completa, tipo de quartos disponíveis e avaliações de outros usuários.
- Contém botões de ação como “Reservar Agora”.

4. **Página de Reserva**:
- Mostra os detalhes do quarto selecionado, datas da estadia e valor total.
- Permite ao usuário confirmar a reserva e selecionar o método de pagamento.
- Inclui mensagens de sucesso e redirecionamento após conclusão.

5. **Página de Avaliações de Hotéis**:
- Sistema CRUD completo para avaliações (buscar, criar, editar e excluir)
- Componente de Rating interativo com as estrelas (1 a 5)
- Filtro por hotel ou ver todas as avaliações
- Usuários podem editar suas próprias avaliações, admins podem excluir qualquer uma.

6. **Área do Usuário (Dashboard)**:
- Exibe as reservas ativas e passadas do usuário.
- Permite editar dados pessoais, cancelar reservas e enviar avaliações.
- Possui controle de autenticação via JWT para proteger as informações.



O diagrama de arquitetura abaixo foi desenvolvido com base no **estilo arquitetural baseado em serviços (SOA - Service-Oriented Architecture)**. Esse estilo foi escolhido para garantir:

  - **Desacoplamento** entre módulos, facilitando alterações futuras.
  - **Manutenabilidade**, permitindo atualização ou substituição de componentes sem afetar todo o sistema.
  - **Extensibilidade**, possibilitando a inclusão de novos serviços conforme o crescimento do projeto.
  - **Segurança e robustez**, assegurando que os dados dos usuários e transações sejam protegidos.
  - **Experiência do usuário de qualidade**, com respostas rápidas e confiáveis.

![diagrama de arquitetura](img/diagrams/solution-architecture.svg)

  O sistema é dividido em três camadas principais:

  1. **Frontend**: Responsável pela interface do usuário, interação e captura de dados.
  2. **Backend**: Processamento das regras de negócio, gerenciamento de reservas, autenticação, pagamentos e serviços relacionados.
  3. **Banco de Dados**: Armazenamento de informações persistentes, incluindo usuários, reservas, hotéis e transações.

## Tecnologias Utilizadas

**Frontend:** [React Native + Expo](https://docs.expo.dev/)  
- Permite desenvolvimento multiplataforma (iOS e Android) com uma única base de código.  
- Facilita criação de interfaces responsivas e interativas.

**Backend:** [FastAPI (Python)](https://fastapi.tiangolo.com/)  
- Framework leve e moderno, com suporte nativo a APIs RESTful.  
- Alta performance e facilidade de integração com bancos de dados e autenticação.  

**Mock de sistema de pagamento:** [Beeceptor](https://beeceptor.com/docs/beeceptor-features/)  
- Simula endpoints de pagamento para testes de integração.  
- Permite desenvolvimento e validação do fluxo financeiro sem necessidade de transações reais.

**Tunnel Mmar:** [Mmar](https://github.com/yusuf-musleh/mmar/blob/master/README.md) 
- Plataforma sem dependência que expõe uma URL HTTPS a partir do seu localhost para testes envolvendo cookies.
- Ocultação da porta usada pelo localhost.

## Considerações de Segurança

A segurança é um aspecto essencial no desenvolvimento da plataforma de gestão hoteleira distribuída, especialmente por lidar com dados sensíveis de usuários, reservas e transações financeiras. As principais considerações de segurança adotadas no sistema incluem:

1. **Autenticação e Autorização**:
O acesso aos recursos protegidos da API é controlado por meio de tokens JWT (JSON Web Tokens) e Cookies. Cada usuário autenticado recebe um token que contém informações de identificação e permissões, garantindo que apenas usuários autorizados possam realizar operações específicas, como criação, edição ou exclusão de reservas e avaliações.

2. **Criptografia de Senhas**:
As senhas dos usuários são criptografadas utilizando a biblioteca bcrypt, implementada através do pacote Passlib, antes de serem armazenadas no banco de dados. Isso impede que senhas sejam lidas mesmo em caso de vazamento de dados.

3. **Proteção de Rotas (Front-end + Backend)**
Tanto o front-end quanto o backend implementam mecanismos que bloqueiam o acesso não autorizado a telas e endpoints protegidos. Esse mecanismo impede que usuários acessem páginas ou dados restritos, mesmo que tentem navegar diretamente por URL ou manipular o aplicativo.

   - <ins>No Backend</ins>: Rotas críticas somente podem ser acessadas quando o token JWT é validado. Caso o token seja inválido ou expirado, a requisição é imediatamente rejeitada com código 401 (Unauthorized).
   - <ins>No Front-end</ins>: Cada tela sensível (como Minhas Reservas, Finalizar Reserva e Avaliações) é protegida por middlewares/guards que verificam a existência de um token ativo. Usuários não autenticados são automaticamente redirecionados para a tela de login.

4. **Proteção contra ataques comuns**:
O sistema adota práticas de mitigação contra ataques frequentes em aplicações web:
   - <ins>SQL Injection</ins>: as interações com o banco são realizadas via SQLAlchemy ORM, que abstrai as queries e evita injeções diretas.
   - <ins>Cross-Site Scripting (XSS)</ins>: validações rigorosas nos campos de entrada, utilizando Pydantic, impedem a inserção de scripts maliciosos.

5. **Comunicação Segura**:
Todas as requisições devem trafegar sob o protocolo HTTPS, garantindo a criptografia ponta a ponta dos dados enviados e recebidos entre clientes e servidores.

6. **Logs e Monitoramento**:
A API mantém registros de ações críticas, como tentativas de login, criação e cancelamento de reservas, e exclusões de dados. Isso permite rastrear atividades suspeitas e auditar o comportamento dos usuários e administradores.

7. **Controle de Acesso e Permissões**:
Usuários comuns têm acesso apenas aos recursos pessoais (como suas próprias reservas e avaliações), enquanto administradores possuem privilégios adicionais, como gerenciar hotéis e quartos. Essa separação garante o princípio do menor privilégio.

## Implantação

A implantação da aplicação envolve a preparação do ambiente backend, configuração do app mobile e disponibilização do sistema para testes ou produção. Como o frontend é desenvolvido em **React Native com Expo**, o processo inclui também o uso do Expo Go e do QR Code gerado pelo Expo CLI para facilitar execução e validação em dispositivos móveis.

### 1. Requisitos de Hardware e Software
- Hardware mínimo para o servidor (Backend):
  - CPU: 2 vCPUs
  - Memória RAM: 4 GB
  - Armazenamento: 20 GB SSD
  - Conectividade: acesso à internet estável, com as portas 8000 (API) e 5432 (PostgreSQL) liberadas

- Software necessário no servidor:
  - Sistema operacional: Ubuntu Server 22.04 LTS (ou equivalente Linux)
  - Python: versão 3.13 ou superior
  - PostgreSQL: versão 15 ou superior
  - Git: controle de versão e integração contínua
  - MMAR: utilizado apenas em ambiente de desenvolvimento para expor o servidor local publicamente e facilitar testes com o frontend.
 
- No Frontend (máquina do desenvolvedor):
  - Node.js 18+
  - Expo CLI
  - Expo Go (instalado no smartphone Android/iOS)

***

### 2. Plataforma de Hospedagem

Pode ser implantado em plataformas como:
  - Render
  - Railway
  - AWS
  - Google Cloud
  - DigitalOcean
  - Azure
  - Para ambientes de teste ou projetos menores, um VPS simples é suficiente.
  - O frontend mobile não é hospedado como um site — ele é executado via Expo Go durante desenvolvimento e pode ser distribuído via build (APK, AAB ou IPA) caso necessário.

***

### 3.1 Configuração do Ambiente Backend

  - Clonar o repositório:
    
  `git clone https://github.com/matheusfraga-tech/aluga-api-backend.git`
  
  `cd aluga-api-backend`

  - Configurar variáveis de ambiente:
  Crie um arquivo .env na raiz do projeto com os dados de conexão:

`DATABASE_URL=postgresql+psycopg2://usuario:senha@localhost:5432/nome_do_banco`

`SECRET_KEY=sua_chave_secreta`

`EXPO_PUBLIC_API_URL=https://sua-api-em-producao.com`

  - Instalar dependências:

`python -m venv .venv`

`source .venv/bin/activate`

`pip install -r requirements.txt`

### 3.2 Configuração do Ambiente Frontend

  - Clonar o repositório:
    
  `git clone https://github.com/Andradev101/aluga-api-frontend.git`
  
  `cd aluga-api-frontend`

***

### 4. Deploy da Aplicação

**Backend (FastAPI)**

- Fazer o build e iniciar o servidor Uvicorn com:

   `fastapi dev app/main.py`
  
*O servidor Uvicorn executará a aplicação na porta 8000.*

**MMAR**:

- Rode o MMAR através do seguinte comando no CMD:
`mmar.exe client --local-port 8000`

**Frontend (Expo / React Native)**

Certifique-se de configurar:
  - .env com: EXPO_PUBLIC_API_URL="link gerado no MMAR"

Inicie o app localmente:

`npm install`

e depois

`npx expo start`

*O Expo CLI abrirá o painel no navegador, permitindo rodar o app no Android Emulator, iOS Simulator ou Expo Go (via QR Code).*

***

### 5. Testes Pós-Implantação

**Testando no Celular com Expo Go (via QR Code)**

1. Instale o app Expo Go no smartphone (Android ou iOS).
2. Com o Expo CLI rodando, a página exibirá um QR Code.
3. No Android: basta abrir a câmera ou o próprio Expo Go e escanear o QR Code.
4. No iOS: o leitor de QR Code da câmera pode ser usado diretamente.
5. O Expo Go carregará o app imediatamente, consumindo a API configurada em EXPO_PUBLIC_API_URL.

## Testes

<details>
<summary><strong>🔐 TESTES DE REGISTRO</strong></summary>

<br>

<details>
<summary><strong>✅ Registro com informações válidas</strong></summary>

<br>

- Na página inicial, clicar em <strong>Sign Up</strong>.
- Preencher um nome de usuário que não exista ainda.
- Preencher uma senha com, no mínimo 8 caracteres, devendo incluir uma letra, um número e um símbolo.
- Selecionar uma data de nascimento que seja correspondente a uma pessoa maior de 18 anos.
- Preencher um email válido.
- Digitar um número de telefone válido.
- Preencher um nome.
- Preencher um sobrenome.
- Preencher um endereço.

**Evidências**:

<img width="738" height="1600" alt="image" src="https://github.com/user-attachments/assets/bf34d5ff-1cdc-483f-8523-70a82d0bc39e" />


</details>

<details>
<summary><strong>❌ Registro com informações inválidas</strong></summary>

<br>

- Na página inicial, clicar em <strong>Sign Up</strong>.
- Todos os campos devem estar preenchidos, caso contrário aparecerão avisos.
- O usuário deve selecionar uma data de nascimento que seja correspondente a uma pessoa maior de 18 anos, caso contrário, aparecerá um aviso.
- O usuário deve preencher um email corretamente, caso contrário, aparecerá um aviso.
- O usuário deve preencher um número de telefone válido, caso contrário, aparecerá um aviso.

**Evidências**:

<img width="200" alt="registro3" src="https://github.com/user-attachments/assets/a1f711d4-a965-4cc2-bdf6-8166f3c6824f" />

<img width="200" alt="registro4" src="https://github.com/user-attachments/assets/042090d2-661c-4bc7-b62a-4663feaf0994" />

<img width="200" alt="registro5" src="https://github.com/user-attachments/assets/e4dbde4b-54ae-4ad9-a81b-187ed1a8e45e" />

<img width="200" alt="registro6" src="https://github.com/user-attachments/assets/2e1e8588-49b6-4d9d-bac2-4699f2d1beb6" />

</details>

</details>

<br>

<details>
<summary><strong>🔑 TESTES DE LOGIN</strong></summary>

<br>

<details>
<summary><strong>✅ Login com informações válidas</strong></summary>

<br>

- Na página inicial, navegando até a parte de **Login**.
- O usuário preenche o seu username criado corretamente.
- O usuário preenche a sua senha escolhida para o username corretamente.
- O usuário clica no botão de **Login**.
- Ele é redirecionado para a página inicial da aplicação.


**Evidências**:

<img width="383" height="834" alt="Screenshot 2025-11-30 184127" src="https://github.com/user-attachments/assets/a8a6c4d3-c2e7-43f4-b01c-c5d725fd9470" />

<img width="385" height="835" alt="Screenshot 2025-11-30 184143" src="https://github.com/user-attachments/assets/df285d45-b1ff-4b3d-b50f-ad0f4d85f17a" />



</details>

<details>
<summary><strong>❌ Login com informações inválidas</strong></summary>

<br>

- Na página inicial, navegando até a parte de Login.
- O usuário preenche um username que não existe.
- O usuário preenche a senha incorretamente.
- O usuário clica no botão de **Login**.
- Um aviso em vermelho aparece indicando o erro.


**Evidências**:

<img width="386" height="835" alt="Screenshot 2025-11-30 184215" src="https://github.com/user-attachments/assets/12af988e-e4ec-4967-b3da-47164a1d29f6" />


</details>

</details>

<br>

<details>
<summary><strong>🛏️ TESTES DE RESERVA</strong></summary>

<br>

<details>
<summary><strong>📱 Reserva via PIX</strong></summary>

<br>

- O usuário logado e autenticado deve **selecionar um dos hotéis** a partir da busca.
- Na tela seguinte, deve clicar no botão **Reservar Agora**.
- Na tela seguinte, ele deve escolher o **tipo do quarto** que deseja.
- Em seguida, selecionar as **datas da estadia**.
- Depois disso, escolher o **método de pagamento PIX**.
- Marcar que leu e aceita os **Termos e Condições**.
- Clicar em **Confirmar Reserva**.
- Ele será redirecionado para uma tela informando que a Reserva foi Confirmada e com os Detalhes da Reserva.


**Evidências**:

<img width="384" height="835" alt="image" src="https://github.com/user-attachments/assets/572fc826-7b08-4f90-9624-35c9c9d3ca3c" />


<img width="383" height="833" alt="Screenshot 2025-11-30 183052" src="https://github.com/user-attachments/assets/dae9b990-0353-4f99-920e-7baa1d248fc4" />

<img width="385" height="837" alt="Screenshot 2025-11-30 183100" src="https://github.com/user-attachments/assets/a2e1161b-5da3-4fdd-830e-a48bc167742a" />


</details>

<details>
<summary><strong>💳 Reserva via Cartão de Crédito/Débito</strong></summary>

<br>

- O usuário logado e autenticado deve **selecionar um dos hotéis** a partir da busca.
- Na tela seguinte, deve clicar no botão **Reservar Agora**.
- Na tela seguinte, ele deve escolher o **tipo do quarto** que deseja.
- Em seguida, selecionar as **datas da estadia**.
- Depois disso, escolher o **método de pagamento Cartão de Crédito/Débito**.
- Preencher corretamente o número do cartão, nome no cartão, data de validade e CVV.
- Marcar que leu e aceita os **Termos e Condições**.
- Clicar em **Confirmar Reserva**.
- Ele será redirecionado para uma tela informando que a Reserva foi Confirmada e com os Detalhes da Reserva.


**Evidências**:

<img width="383" height="835" alt="image" src="https://github.com/user-attachments/assets/4f2452ff-ba25-4cbf-8c19-f48ef01fa21d" />


<img width="385" height="836" alt="Screenshot 2025-11-30 182539" src="https://github.com/user-attachments/assets/26908be9-4fa9-419f-a1fb-2be21de34cba" />

<img width="383" height="837" alt="Screenshot 2025-11-30 182550" src="https://github.com/user-attachments/assets/70ccc4a3-4c4f-4d2f-a2f1-63b9be3a5e29" />


</details>

<details>
<summary><strong>❌ Reserva com Informações Incorretas</strong></summary>

<br>

- O usuário logado e autenticado deve **selecionar um dos hotéis** a partir da busca.
- Na tela seguinte, deve clicar no botão **Reservar Agora**.
- Na tela de finalizar reserva, o usuário deve obrigatoriamente selecionar um quarto disponível, caso contrário avisos aparecerão.
- O usuário deve, obrigatoriamente, selecionar uma data válida, caso contrário avisos aparecerão.
- O usuário também deve, obrigatoriamente, preencher os campos do cartão, caso seja o modelo escolhido. Caso contrário, a reserva não é efetuada.
- O usuário deve declarar que leu os Termos e Condições, caso contrário, o botão de Confirmar fica desabilitado.


**Evidências**:

<img width="382" height="831" alt="image" src="https://github.com/user-attachments/assets/58d05d3c-d992-47b8-a5f9-478c8cbf8671" />


<img width="384" height="836" alt="Screenshot 2025-11-30 183527" src="https://github.com/user-attachments/assets/b9687c30-ceb8-4ec0-97e3-0c0dffb0c5df" />



</details>

</details>

<br>

<details>
<summary><strong>⭐ TESTES DE AVALIAÇÕES</strong></summary>

<br>

<details>
<summary><strong>📝 Criar Avaliação de Hotel</strong></summary>

<br>

- O usuário logado e autenticado deve **selecionar a aba de Avaliações** no canto inferior da página inicial.
- Na tela seguinte, deve clicar no botão **Avaliar Hotel**.
- Em seguida, ele deve selecionar o hotel que deseja fazer a avaliação.
- Selecionar a quantidade correspondente de estrelas que deseja dar para o hotel.
- Depois disso, escrever um comentário sobre o hotel.
- Clicar em **Criar Avaliação**.
- Após isso, ele será redirecionado para a página de Minhas Avaliações onde poderá visualizar as avaliações criadas.

**Evidências**:

<img width="384" height="833" alt="Screenshot 2025-11-30 182736" src="https://github.com/user-attachments/assets/69855d86-4cac-4ada-83bb-325ed2376f75" />

<img width="383" height="832" alt="Screenshot 2025-11-30 182750" src="https://github.com/user-attachments/assets/cffa4cc1-f1bd-4659-b8f2-e8e35bccabfa" />



</details>

<details>
<summary><strong>✏️ Editar Avaliação</strong></summary>

<br>

- O usuário logado e autenticado deve **selecionar a aba de Avaliações** no canto inferior da página inicial.
- Na tela seguinte, deve escolher a avaliação que deseja editar.
- Em seguida, o usuário pode alterar o que desejar.
- Depois ele deve clicar em **Update**.

**Evidências**:

<img width="375" height="830" alt="image" src="https://github.com/user-attachments/assets/23d5272e-f4ef-4a8f-9979-0c92564ea967" />


<img width="382" height="832" alt="Screenshot 2025-11-30 185849" src="https://github.com/user-attachments/assets/8ee22fbf-057b-474b-9119-b63c09e7a9f9" />



</details>

<details>
<summary><strong>❌ Deletar Avaliação</strong></summary>

<br>

- O usuário logado e autenticado deve **selecionar a aba de Avaliações** no canto inferior da página inicial.
- Na tela seguinte, deve escolher a avaliação que deseja deletar.
- Em seguida, deve clicar em **Delete**.
- A avaliação desaparecerá e a página de Minhas Avaliações será carregada sem ela.

**Evidências**:

<img width="382" height="832" alt="Screenshot 2025-11-30 185849" src="https://github.com/user-attachments/assets/00ff29d4-7af3-465f-b6c3-97b3111dfbf5" />


<img width="382" height="834" alt="image" src="https://github.com/user-attachments/assets/dd8ff947-17d8-46f9-aacd-a0f6994997fa" />



</details>

</details>

<br>

<details>
<summary><strong>🏨 TESTES DE CADASTRO DE HOTÉIS</strong></summary>

<br>

<details>
<summary><strong>✅ Cadastro de Hotel com Informações Válidas</strong></summary>

<br>

- O usuário logado e autenticado deve **selecionar a aba Perfil** no canto inferior da página inicial.
- Deve selecionar a opção **Cadastrar Novo Hotel** na parte de Ações Administrativas.
- Na tela seguinte, deve preencher as informações do Hotel a ser cadastrado. Todas com asteriscos são obrigatórias.
- Após o preenchimento, o usuário clica em **Cadastrar Hotel no Catálogo**.
- O hotel é cadastrado e é possível buscá-lo na lista com os demais.

**Evidências**:

<img width="384" height="833" alt="Screenshot 2025-11-30 191022" src="https://github.com/user-attachments/assets/590191d1-da2a-414b-92da-249535a835bf" />

<img width="381" height="832" alt="Screenshot 2025-11-30 191040" src="https://github.com/user-attachments/assets/661fdf31-6e77-469d-8e23-497842c726e5" />

<img width="385" height="825" alt="image" src="https://github.com/user-attachments/assets/8bb148e1-fb39-4fc2-9fe5-b8b271994348" />


</details>

<details>
<summary><strong>❌ Cadastro de Hotel com Informações Inválidas</strong></summary>

<br>

- O usuário logado e autenticado deve **selecionar a aba Perfil** no canto inferior da página inicial.
- Deve selecionar a opção **Cadastrar Novo Hotel** na parte de Ações Administrativas.
- Na tela seguinte, deve preencher as informações do Hotel a ser cadastrado. Caso alguma informação obrigatória esteja faltando, o cadastro não é realizado.

**Evidências**:

<img width="385" height="770" alt="Screenshot 2025-11-30 192247" src="https://github.com/user-attachments/assets/4435a288-f8fc-4cd2-a959-8390cd554516" />

<img width="383" height="767" alt="Screenshot 2025-11-30 192312" src="https://github.com/user-attachments/assets/f2aa3197-9e74-4cd2-8f6a-f76fe79d88e2" />

</details>

</details>

# Referências

1. **Documentação React Native**: https://reactnative.dev/docs/getting-started
2. **Microfundamento: Desenvolvimento de Aplicações Móveis**: Aulas ministradas pelo Prof. Kleber Jacques Ferreira de Souza.
3. **Documentação TailWind CSS**: https://v2.tailwindcss.com/docs
4. **Repositório Mmar**: https://github.com/yusuf-musleh/mmar
5. **Documentação FASTAPI**: https://fastapi.tiangolo.com/#typer-the-fastapi-of-clis
6. **Documentação Python 3.13**: https://docs.python.org/pt-br/3/
7. **Documentação PostgreeSQL**: https://www.postgresql.org/docs/current/index.html

# Planejamento

##  Quadro de tarefas

Atualizado em: 29/11/2025

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Victor Pereira, Gustavo Rossetti, Luiz Andrade, Matheus Fraga       | Documentação | 03/11/2025 | 30/11/2025 | ✔️ | 29/11/2025 |
| Matheus Fraga        | Desenvolvimento da feature de Hotéis e Comodidades (versão mobile) | 03/11/2025 | 30/11/2025  | ✔️ | 23/11/2025 |
| Luiz Andrade        | Desenvolvimento da feature de Usuários e Autenticação (versão mobile) | 03/11/2025 | 30/11/2025  | ✔️ | 23/11/2025 |
| Gustavo Rossetti        | Desenvolvimento da feature de Avaliações (versão mobile)  |  03/11/2025 | 30/11/2025 | ✔️ | 23/11/2025 |
| Victor Pereira       | Desenvolvimento da feature de Reservas (versão mobile)  | 03/11/2025 | 30/11/2025 | ✔️ | 23/11/2025 |
| Matheus Fraga        | Testes da Feature de Hotéis e Comodidades (versão mobile)   | 24/11/2025 | 30/11/2025  | ✔️ | 29/11/2025 |
| Luiz Andrade        | Testes da Feature de Usuários e Autenticação (versão mobile) | 24/11/2025 | 30/11/2025  | ✔️ | 29/11/2025 |
| Gustavo Rossetti        | Testes da Feature de Avaliações (versão mobile)  | 24/11/2025 | 30/11/2025 | ✔️    | 29/11/2025 |
| Victor Pereira       | Testes da Feature de Reservas (versão mobile)  | 24/11/2025 | 30/11/2025 | ✔️ | 29/11/2025 |

Legenda:
- ✔️: terminado
- 📝: em execução
- ⌛: atrasado
- ❌: não iniciado

