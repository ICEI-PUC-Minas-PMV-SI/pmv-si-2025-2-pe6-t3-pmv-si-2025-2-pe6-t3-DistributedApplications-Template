# Front-end Web

O Front-end Web da plataforma tem como principal objetivo oferecer uma interface **moderna, intuitiva e responsiva** que facilite a interação entre o usuário e os serviços disponibilizados pela API. O sistema busca proporcionar uma experiência fluida, segura e acessível, permitindo que hóspedes, administradores e gerentes de hotéis interajam com as funcionalidades do sistema de forma simples e eficiente.

## Projeto da Interface Web

O projeto da interface foi elaborado com foco em **usabilidade e experiência do usuário (UX)**, seguindo boas práticas de design responsivo e interatividade. A aplicação foi dividida em módulos visuais correspondentes aos principais fluxos do sistema:

1. **Página Inicial (Home)**:
- Exibe uma barra de pesquisa com filtros de destino, datas e quantidade de hóspedes.
- Mostra seções com destaques, hotéis recomendados e promoções em destaque.
- Inclui um rodapé com links institucionais e informações de contato.

2. **Página de Resultados de Busca**:
- Lista os hotéis filtrados conforme os critérios do usuário.
- Cada item da lista mostra nome, imagem, preço, avaliação e botão “Ver Detalhes”.
- Filtros laterais permitem refinar a busca (por preço, avaliação, comodidades etc.).

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
- Usuários podem editar suas próprias avaliações, admins podem excluir qualquer uma

6. **Área do Usuário (Dashboard)**:
- Exibe as reservas ativas e passadas do usuário.
- Permite editar dados pessoais, cancelar reservas e enviar avaliações.
- Possui controle de autenticação via JWT para proteger as informações.

### Wireframes

**Página de Login**

<img width="400" alt="wireframe1luiz" src="https://github.com/user-attachments/assets/5139eccb-2739-479d-a88a-da3d06378182" />
<img width="400" alt="wireframe2luiz" src="https://github.com/user-attachments/assets/c3c464f7-be00-4f1f-aa55-040da759e39a" />

---

**Página de Reservas**

<img width="400" alt="wireframe" src="https://github.com/user-attachments/assets/7141c46a-0eac-4c02-ae32-2c25b9a6d33a" />
<img width="400" alt="wireframe2" src="https://github.com/user-attachments/assets/146e7a82-3f10-426d-a3a2-25001655b419" />

---
**Página de Avaliações de Hotéis**

<img width="400" alt="wireframeRosetti" src="https://github.com/user-attachments/assets/ae57ec7b-f674-49d6-a5c7-82b55f7111d0" />
<img width="400"  alt="wireframeRosetti2" src="https://github.com/user-attachments/assets/10290df4-c8b8-4700-a613-fef294cbf054" />

---
**Página de Cadastro de Hotéis**

<img width="400" alt="wireframe1matheus" src="https://github.com/user-attachments/assets/052a76dc-e37b-4216-bef6-34fe3afb11d2" />
<img width="400" alt="wireframe2matheus" src="https://github.com/user-attachments/assets/15c4c6b1-1f33-4ad1-8029-1af5654b1082" />

---
**Página de Cadastro de Usuários**

<img width="400" alt="wireframe11luiz" src="https://github.com/user-attachments/assets/4ac3fffd-f02b-48d5-9b03-6747a68d9f85" />
<img width="400" alt="wireframe22luiz" src="https://github.com/user-attachments/assets/1fa7c192-aa4a-49b1-b3c7-cab583c13cd8" />



### Design Visual

O design da aplicação foi pensado para oferecer uma experiência agradável, moderna e intuitiva em todos os dispositivos. Utilizando **React Native com Expo**, o objetivo é garantir uma interface **multiplataforma**, funcionando de forma fluida tanto em Android quanto em iOS, a partir de uma única base de código.

O estilo visual segue uma linha **minimalista e funcional**, priorizando clareza e conforto visual. A paleta de cores combina:
- Azul-escuro (**#1E3A8A**) para transmitir confiança
- Laranja (**#F27F12**) para destacar ações importantes
- Além de branco (**#FFFFFF**) e cinza-claro (**#F3F4F6**) como base neutra.
<img width="600" alt="Paleta" src="https://github.com/user-attachments/assets/f33ef05f-f453-4e52-bcdc-9f3d7c10ac8f" />

A **tipografia** principal é *Poppins* (ou *Roboto*, conforme o sistema), com tamanhos e pesos adaptados para boa leitura em telas pequenas.

Os **ícones** seguem um padrão simples e reconhecível, utilizando bibliotecas como Expo Vector Icons, reforçando a usabilidade sem poluir a interface.

O **layout** é responsivo e utiliza Flexbox para ajustar os componentes conforme o tamanho da tela. Animações leves e feedbacks visuais indicam ações do usuário, tornando a navegação mais natural.
A aplicação também segue boas práticas de **acessibilidade**, como contraste adequado e áreas de toque confortáveis, garantindo uma boa experiência para todos os usuários.

## Fluxo de Dados

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

**Backend:** [FastAPI (Python)](https://fastapi.tiangolo.com/)  
- Framework leve e moderno, com suporte nativo a APIs RESTful.  
- Alta performance e facilidade de integração com bancos de dados e autenticação.  

**Frontend:** [React Native + Expo](https://docs.expo.dev/)  
- Permite desenvolvimento multiplataforma (iOS e Android) com uma única base de código.  
- Facilita criação de interfaces responsivas e interativas.  

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

A implantação da aplicação distribuída envolve a preparação do ambiente de produção, configuração de dependências e disponibilização dos serviços backend e frontend para uso público. A seguir, são descritas as etapas necessárias para o deploy completo do sistema.


1. **Requisitos de Hardware e Software**
- Hardware mínimo recomendado:
  - CPU: 2 vCPUs
  - Memória RAM: 4 GB
  - Armazenamento: 20 GB SSD
  - Conectividade: acesso à internet estável, com as portas 8000 (API) e 5432 (PostgreSQL) liberadas

- Software necessário:
  - Sistema operacional: Ubuntu Server 22.04 LTS (ou equivalente Linux)
  - Python: versão 3.13 ou superior
  - PostgreSQL: versão 15 ou superior
  - Git: controle de versão e integração contínua
  - MMAR: utilizado apenas em ambiente de desenvolvimento para expor o servidor local publicamente e facilitar testes com o frontend.

2. **Plataforma de Hospedagem**

A aplicação pode ser hospedada em provedores de nuvem como AWS, Render, DigitalOcean, Railway, Google Cloud Platform ou Azure, permitindo escalabilidade e monitoramento integrado.
Para ambientes menores, um VPS dedicado também é suficiente.

3. **Configuração do Ambiente**

  - Clonar o repositório:
    
  `git clone https://github.com/Andradev101/aluga-api-frontend.git`
  
  `cd aluga-api-frontend`

  - Configurar variáveis de ambiente:
  Crie um arquivo .env na raiz do projeto com os dados de conexão:

`DATABASE_URL=postgresql+psycopg2://usuario:senha@localhost:5432/nome_do_banco`

`SECRET_KEY=sua_chave_secreta`

`EXPO_PUBLIC_API_URL=https://sua-api-em-producao.com`

  - Instalar dependências:

`python -m venv .venv`

`source .venv/bin/activate`

`pip install -r requirements.txt`


4. **Deploy da Aplicação**

**Backend (FastAPI)**
- Fazer o build e iniciar o servidor Uvicorn com:

   `fastapi dev app/main.py`
  
*O servidor Uvicorn executará a aplicação na porta 8000.*

**Frontend (Expo / React Native)**
Certifique-se de configurar:
  - DATABASE_URL (para o PostgreSQL)
  - SECRET_KEY
  - CORS_ORIGINS (incluindo a URL do Expo, se necessário)
  - .env com: EXPO_PUBLIC_API_URL=https:sua-api-em-producao.com.dev

Inicie o app localmente:

`npm run start`

ou

`npx expo start`

*O Expo CLI abrirá o painel no navegador, permitindo rodar o app no Android Emulator, iOS Simulator ou Expo Go (via QR Code).*

Caso o backend esteja rodando localmente, utilize o MMAR para expor o servidor publicamente:

`mmar.exe client --local-port 8000`

Isso gerará uma URL pública temporária, que você deve usar em EXPO_PUBLIC_API_URL.


5. **Testes Pós-Implantação**

Após o deploy, é fundamental garantir que o sistema funcione corretamente no ambiente de produção:

Acesse o endpoint da API: *https://sua-api-em-producao.com/docs* e verifique se o Swagger UI está disponível.

Teste:

  - Autenticação JWT
  - Criação e listagem de reservas
  - Conexão com o banco de dados
  - Verifique o funcionamento do aplicativo mobile apontando para a URL pública da API.
  - Monitore logs e métricas do servidor (CPU, memória, tempo de resposta).

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

<img width="200" alt="registro1" src="https://github.com/user-attachments/assets/8f8bbee8-03ac-4772-aca3-f317e92bcbb5" />

<img alt="registro2" src="https://github.com/user-attachments/assets/0b10e6f0-f306-4423-8aa4-7576ddc4f791" />


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

![login1](https://github.com/user-attachments/assets/cfcddc97-9546-420a-9f86-15d3e1d66392)

<img width="800" alt="login1" src="https://github.com/user-attachments/assets/717a6406-d4b7-499f-b8c4-ac9f2074116b" />


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

<img width="400" alt="loginerro1" src="https://github.com/user-attachments/assets/b14e5428-c2f9-4135-ae9c-d54e8cfdcd8d" />

<img width="390" alt="loginerro2" src="https://github.com/user-attachments/assets/1600485e-d5a0-4054-a74a-30b350d6772e" />

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

<img width="400" alt="reserva1" src="https://github.com/user-attachments/assets/6122e782-9281-4b58-8095-61bfb53680e9" />

<img width="1000" alt="reserva2" src="https://github.com/user-attachments/assets/7b5d9925-1bee-4c3f-8e2e-e68abff65c3d" />

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

<img width="400" alt="reserva3" src="https://github.com/user-attachments/assets/a42f29d6-91f4-47a1-9759-0eb708632e71" />

<img width="1000" alt="reserva4" src="https://github.com/user-attachments/assets/73f9bcd0-2532-4586-9422-e06e4ed35d4d" />

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

<img width="400" alt="reserva5" src="https://github.com/user-attachments/assets/4b8f9a3f-b791-4cbe-8100-44aa12303cdb" />

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

<img width="1000" alt="avaliacao1" src="https://github.com/user-attachments/assets/76ec6165-17d8-4871-bb6b-39c48214c364" />

<img width="1000" alt="avaliacao2" src="https://github.com/user-attachments/assets/c1a2f247-2d71-4f05-a32a-fd432e4e3ac1" />

</details>

<details>
<summary><strong>✏️ Editar Avaliação</strong></summary>

<br>

- O usuário logado e autenticado deve **selecionar a aba de Avaliações** no canto inferior da página inicial.
- Na tela seguinte, deve escolher a avaliação que deseja editar.
- Em seguida, o usuário pode alterar o que desejar.
- Depois ele deve clicar em **Update**.

**Evidências**:

<img width="1000" alt="avaliacao3" src="https://github.com/user-attachments/assets/370c59ec-16a4-498f-9a74-0c2e48dc8ed2" />

<img width="1000" alt="avaliacao4" src="https://github.com/user-attachments/assets/bd6b8cf1-60b4-428b-9ac3-e512410baf81" />

</details>

<details>
<summary><strong>❌ Deletar Avaliação</strong></summary>

<br>

- O usuário logado e autenticado deve **selecionar a aba de Avaliações** no canto inferior da página inicial.
- Na tela seguinte, deve escolher a avaliação que deseja deletar.
- Em seguida, deve clicar em **Delete**.
- A avaliação desaparecerá e a página de Minhas Avaliações será carregada sem ela.

**Evidências**:

<img width="1000" alt="avaliacao5" src="https://github.com/user-attachments/assets/f07cbe63-0ca5-4f95-80ee-01ebcd4557e8" />

<img width="1000" alt="avaliacao6" src="https://github.com/user-attachments/assets/24bf9428-6171-400e-a191-334c938f2af7" />

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

<img width="1000" alt="hoteis1" src="https://github.com/user-attachments/assets/1cf98d18-b1c9-444f-a2ad-00d0eda93eb1" />

<img width="1000" alt="hoteis1" src="https://github.com/user-attachments/assets/6fc4afb9-bfa9-4bd9-b500-432a365ed8b1" />

<img width="1000" alt="hoteis2" src="https://github.com/user-attachments/assets/18e1c0a2-1828-497c-9e43-8feb1a076d61" />

<img width="1000" alt="hoteis3" src="https://github.com/user-attachments/assets/1b9b2703-8529-4c0b-8e22-04896658c7af" />

</details>

<details>
<summary><strong>❌ Cadastro de Hotel com Informações Inválidas</strong></summary>

<br>

- O usuário logado e autenticado deve **selecionar a aba Perfil** no canto inferior da página inicial.
- Deve selecionar a opção **Cadastrar Novo Hotel** na parte de Ações Administrativas.
- Na tela seguinte, deve preencher as informações do Hotel a ser cadastrado. Caso alguma informação obrigatória esteja faltando, o cadastro não é realizado.

**Evidências**:

<img width="800" alt="hoteis4" src="https://github.com/user-attachments/assets/759b823a-0d7e-4589-8050-31f2d4ce4481" />

<img width="800" alt="hoteis5" src="https://github.com/user-attachments/assets/37f0b892-6d24-4615-9e27-657274af5a7a" />

<img width="800" alt="hoteis6" src="https://github.com/user-attachments/assets/254b5ad2-d449-45f3-96f5-904e207524d8" />

</details>

</details>


# Referências

1. **Documentação React Native**: https://reactnative.dev/docs/getting-started
2. **Documentação TailWind CSS**: https://v2.tailwindcss.com/docs
3. **Repositório Mmar**: https://github.com/yusuf-musleh/mmar
4. **Documentação FASTAPI**: https://fastapi.tiangolo.com/#typer-the-fastapi-of-clis
5. **Documentação Python 3.13**: https://docs.python.org/pt-br/3/
6. **Documentação PostgreeSQL**: https://www.postgresql.org/docs/current/index.html

# Planejamento

##  Quadro de tarefas

Atualizado em: 02/11/2025

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Victor Pereira, Gustavo Rossetti, Luiz Andrade, Matheus Fraga       | Documentação   | 06/10/2025     | 02/11/2025 | ✔️    | 02/11/2025      |
| Matheus Fraga        | Feature Hotéis e Comodidades   | 06/10/2025     | 02/11/2025 | ✔️    |     02/11/2025            |
| Luiz Andrade        | Feature Usuários e Autenticação  | 06/10/2025    | 02/11/2025 | ✔️    |     22/10/2025            |
| Gustavo Rossetti        | Feature Avaliação   |  06/10/2025    | 02/11/2025 | ✔️    | 31/10/2025      |
| Victor Pereira       | Feature Reservas   |  06/10/2025    | 02/11/2025 | ✔️    | 01/11/2025      |

Legenda:
- ✔️: terminado
- 📝: em execução
- ⌛: atrasado
- ❌: não iniciado
