# Considerações finais


## Melhorias na Arquitetura do Projeto

A arquitetura atual, baseada em **Service-Oriented Architecture (SOA)**, foi fundamental para garantir o **desacoplamento lógico** dos serviços. No entanto, para alcançar a **escalabilidade (RNF-006)** exigida por uma plataforma de reservas no setor hoteleiro, propomos uma evolução arquitetural clara.

O atual _backend_ monolítico (mesmo que construído com FastAPI) concentra todos os serviços (Reservas, Usuários, Pagamentos) e representa um **ponto único de falha** e imaginando um cenário de sucesso do produto poderia gerar um **gargalo operacional** sob alto tráfego.

A melhoria estrutural mais relevante é a **transição gradual para um modelo de Microserviços** para os módulos mais críticos. Serviços como **Reservas de Quartos** e **Pagamentos e Transações** devem ser extraídos para _backends_ separados. Essa separação física permite que cada serviço seja **escalado horizontalmente** de forma independente, aumentando a resiliência do sistema. Para orquestrar essa nova estrutura, a introdução de um **API Gateway** (ex: Azure API Management) é fundamental, centralizando as requisições do frontend, simplificando a autenticação e garantindo que a arquitetura interna possa evoluir sem impacto no cliente.

---

## Avaliação dos Frameworks e Tecnologias

### 1. Frontend: React Native + Expo

A escolha inicial pelo **React Native com Expo** cumpriu o objetivo de **prova de conceito** em tempo acadêmico. No entanto, a experiência demonstrou que a abordagem _cross-platform_ para Web não é sustentável a longo prazo, limitando a capacidade de otimizar a performance e a usabilidade (RNF-001) para uma plataforma profissional. Vale ressaltar que a documentação é **bem extensa e rica em detalhes, proporcionando uma boa experiência de desenvolvimento** inicial.

Como melhoria, é indispensável a **separação do Frontend**. Propomos adotar o **React puro** para a interface Web e manter o **React Native** para aplicativos Mobile nativos. Essa refatoração garante uma **experiência do usuário (UX)** otimizada e nativa para cada plataforma, atendendo de forma mais eficaz aos requisitos de **responsividade (RNF-001)** e **tempo de resposta (RNF-005)**.

### 2. Backend: FastAPI

O **FastAPI** demonstrou ser um alicerce sólido. Sua **alta performance**, a facilidade de desenvolvimento de APIs RESTful e a documentação automática simplificaram o processo e se alinham perfeitamente com a necessidade de **escalabilidade (RNF-006)**. O _framework_ é **muito fácil e prático de trabalhar**, e sua documentação é eficiente, demonstrando diversos exemplos de implementação.

Em especial, o _framework_ deve ser **mantido** como base para a camada de serviços da aplicação. A _feature_ de **Injeção de Dependências** foi utilizada principalmente durante o desenvolvimento dos _cookies_ para autenticação de usuários e permite, com pouco código, envolver um _endpoint_ e torná-lo acessível apenas por uma _role_ específica (facilitando a futura implementação do gerenciamento de permissões).

### 3. Integração de Pagamentos: O Mock Beeceptor e a Evolução

Para o escopo acadêmico, a utilização do _mock_ **Beeceptor** foi eficaz para simular o endpoint de pagamento e validar o fluxo transacional. Contudo, em uma perspectiva de produto real, essa simulação deve evoluir para uma **integração com provedores de serviços de pagamento (PSP)**.

A recomendação é a integração com _players_ robustos e amplamente utilizados no mercado de _gateways_ de pagamento. Essa mudança é vital para atender completamente o **RF-002 (Pagamentos)** em um cenário real, garantindo **segurança, antifraude e flexibilidade** nas transações.

### 4. Ferramentas de Desenvolvimento e Teste

As ferramentas de apoio foram cruciais para a agilidade no desenvolvimento e, principalmente, para a validação dos requisitos de segurança da autenticação:

- **Bruno (Rest Explorer):** Este explorador REST _open-source_ foi essencial para os testes de backend. Destacou-se por sua capacidade de lidar corretamente com o **funcionamento de _secure cookies_**, sendo a única plataforma onde operaram conforme esperado. Sua facilidade de uso permitiu a **validação efetiva** do requisito de segurança de autenticação.

- **MMAR (Tunnel HTTPS):** Ferramenta de _tunneling_ crucial para os testes de autenticação em ambiente de desenvolvimento. Foi indispensável por prover um **certificado válido**, requisito de segurança para que os _browsers_ salvassem e utilizassem os _secure cookies_ corretamente, sem a necessidade de serviços pagos.

**Nota Técnica:** O uso do MMAR foi essencial, pois **não é trivial simular um ambiente de desenvolvimento com HTTPS** que seja funcional simultaneamente para o _backend_ (API), o _frontend web_ e o _mobile_. O MMAR resolveu essa complexidade inicial de forma prática.

**Evolução Proposta:** Sugere-se a transição para uma ferramenta mais robusta e profissional para o processo de desenvolvimento futuro, como o **Caddy** (servidor web _open-source_), ou outra solução que ofereça maior facilidade de configuração e gerenciamento de certificados, garantindo maior fluidez no ciclo de desenvolvimento contínuo.

---

## Propostas de Melhoria Estrutural e Otimização

### 1. Gerenciamento de Ativos Estáticos (Imagens e Mídias)

Um _gap_ crucial identificado na arquitetura atual é a gestão de **imagens e vídeos**. No setor de turismo, esses ativos não são apenas dados secundários; eles são o **principal fator de conversão orgânica**. Um cliente que acessa a plataforma, sem ser atraído por campanhas de marketing ou cupons, é conquistado pela **experiência visual imersiva** e pela clareza dos detalhes do hotel (RF-010). Portanto, a gestão de _assets_ é essencial para a **retenção orgânica** e a confiança do usuário.

Propomos a integração imediata de um **Serviço de Armazenamento de Objetos (Object Storage)**, como o **Azure Blob Storage**. Essa solução robusta é vital para:

**Melhoria de Performance:** Irá **descarregar** o _backend_ (FastAPI) do manuseio de arquivos estáticos. O _backend_ ficará responsável apenas pelo _core_ da regra de negócio, enquanto o Azure lida com o alto volume de tráfego de mídia.

**Escalabilidade e Redundância:** Garante maior **escalabilidade (RNF-006)** e acesso rápido a mídias globais, com alta redundância, garantindo que o fator de decisão do cliente esteja sempre disponível e carregue rapidamente (**RNF-005**).

Essa gestão de ativos é, portanto, um **investimento direto na qualidade da informação** e na **experiência do usuário**, elementos cruciais para a competitividade da plataforma.

### 2. Otimização de Dados e Performance

A experiência prática revelou oportunidades de melhoria focadas na performance e na modelagem de dados:

- **Revisão da Modelagem de Dados:** O modelo de dados deve passar por uma **revisão de normalização** e de relações para garantir a **integridade transacional** (reservas) e otimizar as consultas complexas de pesquisa e filtro (RF-007) a longo prazo.

- **Implementação de Cache Distribuído:** Para aliviar a carga do banco de dados e melhorar o **tempo de resposta (RNF-005)**, a implementação de uma camada de **Cache (Redis no Azure)** é indispensável. Dados consultados frequentemente, como a lista de hotéis e resultados de filtros, devem ser cacheados.

- **Processamento Assíncrono de Métricas (Batch Processing):** O cálculo das métricas de **Popularidade e Avaliações (RF-012e)**, feito síncrona após cada _push_, deve ser transformado em um **Processo Batch (em lote)** assíncrono. Utilizando um _worker_ ou **Azure Functions**, a atualização dessas colunas ocorrerá em intervalos regulares (ex: diariamente), garantindo que o sistema não seja sobrecarregado e aliviando a carga transacional do banco.

### 3. Autenticação e Gerenciamento de Permissões

A robustez da aplicação requer melhorias imediatas nos mecanismos de segurança e autorização, conforme identificado durante o desenvolvimento, com foco na usabilidade e extensibilidade:

- **Autenticação e Gestão de Sessão (Frontend):**

- A lógica será alterada para que a verificação de autenticação seja realizada **em cada chamada ao backend**, e não apenas durante a navegação entre páginas.

- Será implementada uma lógica de **aviso ao usuário** quando sua sessão estiver próxima de expirar, melhorando a experiência e prevenindo interrupções inesperadas.

- **Gerenciamento de Permissões (Backend):**

- Devido à restrição de tempo, o gerenciamento de permissões não foi completamente finalizado, sendo implementado apenas o essencial para cumprir com os requisitos básicos.

- **Status Atual:** O código do backend foi considerado bem-organizado e desenvolvido de forma **extensível** para permitir a fácil integração de um sistema de gerenciamento de permissões (**ACL/RBAC**) no futuro, garantindo que a autorização granular possa ser adicionada sem grandes refatorações.