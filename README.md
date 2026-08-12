# 📊 Dashboard Financeiro

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![UX Research](https://img.shields.io/badge/UX_Research-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

Este projeto é a materialização de um estudo aprofundado de **UX Research** focado em gerenciamento financeiro doméstico, desenvolvido como entrega para o Desafio de Projeto da DIO (*Criando um Front-end Totalmente Componentizado na Prática com ReactJS*) - **MRV Front End SPA Developer**.

Diferente de painéis contábeis complexos, esta aplicação foi desenhada sob o conceito de **Engenharia de UX**, unindo acessibilidade cognitiva, fluxos rápidos e arquitetura front-end escalável.

---

## 🎯 1. O Problema e a Pesquisa de Usuário (UX Research)

O ecossistema atual de aplicativos financeiros exige alta carga cognitiva. Planilhas são exaustivas e apps tradicionais possuem fluxos longos de transação. 

Através de **Autoetnografia** e mapeamento de jornada, identifiquei a Persona principal:
* **👤 Persona:** Marina Silva (e perfis semelhantes).
* **📍 Contexto:** Mães, estudantes de tecnologia e profissionais em São Paulo, lidando com rotinas saturadas (dupla/tripla jornada).
* **⚠️ A Dor:** Escassez de tempo, fadiga mental ao fim do dia e ansiedade por não visualizar a saúde financeira de relance.

### 💡 A Solução (Alívios e Prazeres)
Para resolver essas dores, a interface foi projetada com base em dois pilares:
1. Substituição de tabelas numéricas exaustivas por um gráfico central (*Gastos vs Orçamento*). O cérebro processa o status financeiro instantaneamente, gerando alívio e sensação de controle.
2. Um botão flutuante de "Nova Despesa" com destaque máximo (Verde Esmeralda). Um clique, poucos campos, salvo.

---

## 🎨 2. Design System & Acessibilidade

As cores e tipografia não são meramente estéticas; foram escolhidas por **semântica e contraste** para reduzir a fadiga visual.

* **Cor de Ação Principal:** `Emerald Green (#10B981)` - Transmite positividade e clareza para a ação de adicionar receitas/despesas.
* **Cores Semânticas:** `Red (#EF4444)` para despesas, `Blue (#3B82F6)` para receitas, `Purple (#8B5CF6)` para o teto do orçamento.
* **Superfícies:** Fundos em `Off-white (#F3F4F6)` com cards em branco puro para criar respiro sem cansar os olhos (evitando o alto contraste do branco/preto absoluto).
* **Acessibilidade:** Uso rigoroso de HTML semântico (`<main>`, `<article>`, `<nav>`) e atributos `aria-*` para suporte completo a leitores de tela.

---

## 🏗️ 3. Decisões Técnicas e Arquitetura React

Trazendo a robustez arquitetural do Angular (separação de responsabilidades) para o ecossistema React, o projeto foi estruturado para ser escalável e de fácil manutenção:

* **Smart e Dumb Components:** Componentes visuais isolados em `/components` (ex: `Button`, `Card`) e componentes lógicos/de contexto em `/features` (ex: `TransactionList`, `DashboardChart`).
* **Custom Hooks como Services:** A lógica de requisição e regra de negócio foi retirada da interface e isolada em Hooks (ex: `useTransactions`), simulando a injeção de dependências (`@Injectable`) de frameworks opinativos.
* **Recharts:** Biblioteca escolhida para a renderização do Gráfico de Área, por ser leve, componentizada e responsiva.
* **Mock API:** Utilização do `json-server` para simular requisições RESTful consumindo o arquivo `db.json`.

---

## 🚀 4. Como Executar o Projeto Localmente

### Pré-requisitos
Certifique-se de ter o [Node.js](https://nodejs.org/) instalado na sua máquina (versão 18 ou superior).

### Passo a Passo

1. **Clone o repositório**
   ```bash
   git clone [https://github.com/miriaamaral/dashboard-financeiro-react.git](https://github.com/miriaamaral/dashboard-financeiro-react.git)
   ```
2. **Acesse a pasta do projeto**
    ```bash
    cd dashboard-financeiro-react
    ```
3. **Instale as dependências**
    ```bash
    npm install
    ```
4. **Inicie o Servidor da API (Mock)**
- Abra um terminal e rode:
    ```bash
    npx json-server --watch db.json --port 3333
    ```
5. **Inicie o Front-End (Vite)**
- Abra um novo terminal e rode:
    ```bash
    npm run dev
    ```
6. Acesse a aplicação em http://localhost:5173.

### ✍️ Autora
Miriã Amaral Front-End Developer (Angular/React) & UX Design Student Aplicando usabilidade real no código para combater interfaces que são lindas no papel, mas frustrantes na prática.