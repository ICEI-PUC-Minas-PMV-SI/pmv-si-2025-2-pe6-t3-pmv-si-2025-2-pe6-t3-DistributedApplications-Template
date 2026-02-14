## Análise Crítica e Proposta de Melhorias no Processo de Análise e Desenvolvimento

Esta seção avalia a eficácia do processo e das metodologias adotadas, propondo ajustes para aprimorar a gestão, a comunicação e a qualidade das entregas.

### 1. Crítica sobre a Metodologia e Estrutura de Equipe

O processo de desenvolvimento adotou um modelo inicial baseado em **divisão por _features_ completas** (cada membro responsável por _frontend_ e _backend_ de uma funcionalidade).

- **Vantagem:** Essa abordagem garantiu uma clara divisão da carga de trabalho no contexto acadêmico e promoveu a **autonomia** individual.

- **Ponto Crítico:** A longo prazo, essa separação gera **silos de conhecimento** e **dependência técnica** em relação a cada _feature_. Além disso, compromete a **qualidade e a uniformidade** do código, pois a experiência em _frontend_ e _backend_ pode variar drasticamente entre os membros, afetando a manutenibilidade do projeto.

- **Proposta de Melhoria:** Adotar formalmente uma **Metodologia Ágil (Scrum ou Kanban)**.

- **Estrutura da Equipe:** Migrar para uma organização baseada em **especialização** (ex: um ou dois _backends_ focados em FastAPI, um ou dois _frontends_ focados em React Native). Isso melhora a qualidade técnica e facilita o **_Code Review_**.

- **Processo:** Implementar _Sprints_ curtas para planejamento e adaptação. A metodologia Ágil facilita a **incorporação de _insights_** de melhoria na arquitetura (como Cache e Processamento Batch) de forma planejada, essas mudanças estruturantes alavancam o produto.


### 2. Análise e Priorização de Requisitos

A utilização da matriz **MoSCoW** para levantamento e priorização de requisitos se mostrou valiosa.

- **Ponto Positivo:** O uso da MoSCoW foi fundamental para **aprender a priorizar atividades** e para focar os esforços da equipe apenas nos requisitos de alta criticidade (**M – _Must Have_**), garantindo o cumprimento do objetivo principal no prazo acadêmico.

- **Ponto a Melhorar:** A análise inicial, embora detalhada, não previu todos os **Requisitos Não Funcionais (RNFs)** de _performance_ a longo prazo (ex: a necessidade de Cache e _Batch Processing_ para o RNF-005).

- **Proposta de Melhoria:** Na fase de Análise, incluir uma etapa de **Arquitetura de Riscos/Desempenho** para cada **RF** crítico, simulando cenários de alto volume para identificar proativamente gargalos (_load balancing_, _caching_, filas de mensagem) antes da codificação.


### 3. Comunicação e Gestão de Fluxo de Trabalho

A comunicação e a gestão do _workflow_ foram concentradas em ferramentas que não são ideais para o ambiente profissional.

- **Ponto Crítico:** A dependência do **grupo de WhatsApp** para comunicação diária e decisões urgentes **não é escalável** e causa a perda de **histórico** de decisões importantes. O Quadro de Tarefas em formato estático (tabela) não refletiu a dinâmica real do desenvolvimento.

- **Proposta de Melhoria em Ferramentas:**

- **Gestão de Tarefas (Workflow):** Substituir o quadro estático pelo uso de uma ferramenta de gestão Ágil, como **Jira** ou o **GitHub Projects Board** com colunas dinâmicas (_To Do_, _In Progress_, _Review_, _Done_). Isso centraliza o _tracking_ e melhora a **transparência** do projeto.

- **Comunicação:** Migrar a comunicação do WhatsApp para um canal profissional como **Slack** ou **Microsoft Teams**. Isso permite a criação de **canais temáticos** (ex: `#dev-backend`, `#issues-criticas`), facilita a busca por decisões passadas e reduz a dispersão do foco.


A implementação dessas mudanças transformaria o processo atual em um _workflow_ **mais resiliente, transparente e alinhado com as melhores práticas do mercado**.
