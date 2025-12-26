# Front-end Móvel

Com o objetivo de ampliar a acessibilidade e a mobilidade do sistema do Hotel Fazenda Capitólio, foi desenvolvida uma versão mobile utilizando **React Native com Expo**. A aplicação móvel segue as diretrizes visuais da versão web, porém foi planejada para proporcionar uma experiência fluida, prática e otimizada para dispositivos móveis, garantindo agilidade operacional e maior flexibilidade tanto para clientes quanto para colaboradores.

A estrutura visual e arquitetural do projeto pode ser observada na organização das pastas conforme apresentado no print, contendo diretórios como `.expo`, `assets`, `constants`, `src`, além dos arquivos principais como `App.tsx`, `app.json` e `tsconfig.json`, que compõem a base do aplicativo.

## Projeto da Interface

A interface foi construída priorizando usabilidade, simplicidade e consistência visual com o front-end web. O desenvolvimento seguiu princípios modernos de UI/UX e utilizou componentes reutilizáveis, garantindo um fluxo de navegação claro e intuitivo para o usuário.

Entre os aspectos principais da interface:

- Navegação estruturada e acessível.
- Layout responsivo para diferentes tamanhos de tela.
- Feedback visual imediato ao usuário.
- Componentes reaproveitáveis, garantindo padronização.
- Estilo visual alinhado à identidade visual estabelecida.

### Design Visual

O design visual da aplicação segue os princípios aplicados na versão web, garantindo:

- **Paleta de cores institucional** do hotel.
- **Tipografia legível** e adaptada a telas móveis.
- **Ícones representativos** com uso de `react-native-vector-icons`.
- **Componentes reutilizáveis** como botões, inputs, cabeçalhos e cards.
- Hierarquia visual clara entre títulos, textos e elementos interativos.

## Fluxo de Dados

A comunicação entre o aplicativo e o back-end ocorre por meio de requisições HTTP enviadas à API .NET criada na etapa anterior. O fluxo segue os seguintes passos:

1. O usuário interage com o aplicativo.
2. O aplicativo envia requisições HTTP via serviços localizados em `src/services`.
3. A API processa as requisições e acessa o banco PostgreSQL.
4. O aplicativo recebe a resposta, atualiza estados internos e exibe informações ao usuário.
   
## Tecnologias Utilizadas

As tecnologias que compõem a solução móvel incluem:

- **React Native** — Desenvolvimento de interfaces nativas
- **Expo** — Execução, testes e empacotamento da aplicação
- **TypeScript** — Tipagem estática e manutenção mais segura
- **React Navigation** — Sistema de rotas e navegação
- **Axios / Fetch API** — Comunicação com o back-end
- **Jest** — Base para testes unitários
- **Vector Icons** — Biblioteca de ícones personalizáveis

## Considerações de Segurança

A aplicação segue boas práticas de segurança, incluindo:

- Autenticação via API com controle adequado de sessão.
- Validação de dados enviados e recebidos.
- Comunicação segura utilizando HTTPS.
- Armazenamento seguro dos dados essenciais no dispositivo.
- Tratamento de erros e exceções.
- Aplicação das recomendações de segurança do Expo e React Native.

## Implantação

Para a implantação do aplicativo móvel em um ambiente de produção, foram definidos os seguintes passos:

1. **Definir requisitos de hardware e software**  
   - Especificar versões mínimas de sistema operacional (Android/iOS), espaço em disco, memória e conexão de rede necessários para o uso adequado do aplicativo.  
   - Garantir que o ambiente de desenvolvimento e build possua Node.js, Expo CLI e demais dependências instaladas.

2. **Escolher a plataforma de distribuição**  
   - Selecionar as lojas oficiais para publicação (Google Play Store e/ou Apple App Store).  
   - Configurar contas de desenvolvedor e aceitar os termos de uso das plataformas escolhidas.

3. **Configurar o ambiente de build e variáveis de ambiente**  
   - Ajustar o arquivo `app.json` com nome do app, ícone, versão e identificadores dos pacotes.  
   - Configurar variáveis de ambiente para URLs da API, chaves de acesso e demais parâmetros sensíveis, evitando expor dados diretamente no código-fonte.

4. **Gerar a build e realizar o deploy**  
   - Executar o processo de build com o Expo (`npx expo build` ou serviço equivalente).  
   - Enviar os artefatos gerados (`.apk`, `.aab` ou `.ipa`) para as lojas selecionadas, seguindo as instruções específicas de cada plataforma.

5. **Realizar testes em produção monitorada**  
   - Validar o funcionamento do aplicativo em dispositivos reais, verificando login, consumo de API, navegação e desempenho.  
   - Monitorar logs, métricas e feedback dos usuários, aplicando correções quando necessário e planejando novas versões.

## Testes

A estratégia de testes para a versão mobile seguiu a mesma adotada para a versão web, ou seja, a cada módulo testou-se as funcionalidades e os resultados esperados.

- **Módulo Login**
  
Toda versão mobile seguiu os layout, cores e funcionalidades da versão web, com isso no módulo de login iniciamos os testes verificando o comportamento do sistema com um usuário já existente e com permissão de acesso, posteriormente, testamos o sistemas com um usuário fictício e sem acesso ao sistema, neste teste buscamos verificar os alertas previstos que a negação do acesso disparava.

![f8e26aa0-1a59-4ab0-84c5-b411312177b3](https://github.com/user-attachments/assets/afd04fac-6215-4a3c-afe3-c7de90544a9c)

![0b26dd90-7b8f-4288-99a6-4f8605370366](https://github.com/user-attachments/assets/bbbdd62f-6b82-4ab7-afe5-b943004fbc55)

![030faf2d-23cd-4d93-956d-cecab4fb1387](https://github.com/user-attachments/assets/32ab39f4-3896-45f6-b709-1fe507b102cd)


- **Módulo Pedidos**

O principal teste realizado no módulo de pedidos teve o objetivo de verificar a correta persistência de dados dos atributos no banco de dados na realização de um pedido novo por exemplo.

![0e4e49e0-fd45-4efb-885d-989555e71089](https://github.com/user-attachments/assets/ec8563f2-c891-4d8c-992b-7c13125437f0)

![079c971b-9b2e-42f8-ad4f-6e99976237c4](https://github.com/user-attachments/assets/d2fa49a5-6b58-4744-8946-0ee86fedb1a4)


- **Módulo Hospedagem**

O módulo de hospedagem teve uma especial atenção com os testes pois consiste na funcionalidade principal do hotel fazenda, e buscamos o mesmo comportarmento da versão web. Inicialmente testamos as condições de mudança dos status referente aos quartos, um segundo teste foi direcionado para os atributos datas no qual observou-se se com a data fim da estadia o sistema retornava o status do quarto para "livre", também testamos a possibilidade de realizar uma hospedagem num quarto não 
existente no sistema.

![b772f763-1eea-4133-bdb0-a96d90112765](https://github.com/user-attachments/assets/a49af9a5-283c-4be2-88e1-b6dd9b67d9b6)

![6ef7be73-9d36-4263-90ec-05fe9bd86310](https://github.com/user-attachments/assets/fd6ae521-24d2-45eb-8bea-4b608c7ecc20)


- **Módulo Produtos**

Este módulo de produto é um dos mais importantes pois seus dados são consumidos em outros módulos do sistema, por essa razão, o foco do teste foi verificar o cadastro e testamos a integração deste módulo com os demais módulos do sistema.

![7d5b3e27-dfbb-4fd9-83d9-cfa35af4c6e5](https://github.com/user-attachments/assets/d7ce4bfa-fb1e-4d0b-8dd8-180a788e4f16)

![35563a04-a38f-42a5-8e09-27e784a61e18](https://github.com/user-attachments/assets/75a20d85-a3bc-4493-93ed-6c1509a0c733)

![56ae780d-0fa3-4dcb-9d47-e6fcfa797aff](https://github.com/user-attachments/assets/455a6ba5-0219-4831-8adb-fe59daa42e55)


# Referências

O desenvolvimento do front-end móvel foi apoiado pelas aulas do microfundamento **“Desenvolvimento de Aplicações Móveis”**, que embasaram tecnicamente o uso do framework **React Native** e suas ferramentas para criação de soluções multiplataforma.

Documentações complementares:

- React Native: https://reactnative.dev  
- Expo: https://docs.expo.dev

# Planejamento

## Quadro de Tarefas

> A tabela abaixo apresenta a divisão de atividades e o acompanhamento da execução referente ao desenvolvimento da versão mobile do projeto.

### Semana 1 — Desenvolvimento Mobile

Período: **09/11 a 16/11**

| Responsável        | Tarefa/Requisito              | Iniciado em | Prazo     | Status | Terminado em |
|--------------------|-------------------------------|-------------|-----------|--------|--------------|
| André Raphael      | Desenvolvimento mobile        | 09/11/2025  | 16/11/2025 | ✔️     | 16/11/2025   |
| Carlos Eduardo     | Desenvolvimento mobile        | 09/11/2025  | 16/11/2025 | ✔️     | 16/11/2025   |
| Raphael            | Desenvolvimento mobile        | 09/11/2025  | 16/11/2025 | ✔️     | 16/11/2025   |

### Semana 2 — Testes e Documentação Mobile

Período: **23/11 a 30/11**

| Responsável        | Tarefa/Requisito              | Iniciado em | Prazo     | Status | Terminado em |
|--------------------|-------------------------------|-------------|-----------|--------|--------------|
| Déborah Matos      | Testes da aplicação mobile    | 23/11/2025  | 30/11/2025 | ✔️     | 30/11/2025   |
| Junio Firmino       | Documentação da versão mobile e apresentação | 23/11/2025  | 30/11/2025 | ✔️     | 30/11/2025   |

Legenda:
- ✔️: terminado
- 📝: em execução
- ⌛: atrasado
- ❌: não iniciado

