# DSA 2026 — Desenvolvimento e Publicação de um Aplicativo Web
> **Projeto de Avaliação — Provão Paulista 2026**  
> **Tema:** Revisão Interativa de JavaScript e ReactJS com Persistência e Design Responsivo  
> **Autor:** Matheus  
> **Data de Entrega:** 16 de novembro de 2026 às 23:59  

---

## 🎯 Visão Geral do Projeto

O **DSA Quiz 2026** é uma aplicação web moderna desenvolvida em **ReactJS** com **Tailwind CSS**, criada para auxiliar estudantes a revisar os principais conceitos de **JavaScript** e **React** estudados ao longo do ano letivo de 2026 em DSA (Desenvolvimento de Sistemas / Aprendizagem) voltados para o **Provão Paulista**.

A aplicação foi estruturada segundo as melhores práticas de engenharia de software:
- **Componentização modular**: Cada elemento de interface possui responsabilidade única e recebe dados via *props*.
- **Reatividade com Hooks**: Uso integral de `useState` para gerenciamento do estado dinâmico e `useEffect` para sincronização com recursos externos.
- **Persistência Offline (`localStorage`)**: Capacidade de retomar o progresso do quiz de onde parou caso a aba seja recarregada ou fechada, além de armazenar o placar de líderes (*Leaderboard*).
- **Design Responsivo & Paleta Harmoniosa (Adobe Color)**: Adaptabilidade total para celulares e computadores, com suporte a Dark/Light Mode e contraste testado para acessibilidade WCAG AAA.
- **Efeitos Sonoros Procedurais**: Síntese de áudio harmônica em tempo real com a **Web Audio API** (sem arquivos pesados ou problemas de CORS na Vercel).
- **Feedback Imediato & Gamificação**: Explicações didáticas após cada resposta, sequência de acertos (*Combo Streak*), medalhas de classificação e animação festiva com `canvas-confetti`.

---

## 📋 Atendimento aos Requisitos da Avaliação

| Requisito | Como foi Implementado |
|---|---|
| **1. Desenvolvimento com Copilot / Componentização** | Interface dividida em componentes puros e reutilizáveis (`Navbar`, `QuestionCard`, `ProgressBar`, `StatsBar`, `ResultScreen`, `Leaderboard`, `CodeBlock`, etc.). Inclui modal integrado **"Guia & Explicação do Código"** para consulta e defesa oral. |
| **2. Interface Responsiva & Adobe Color** | Paleta com foco em *Indigo Profundo* (`#4F46E5`), *Cyan Tecnológico* (`#0EA5E9`), *Emerald* (`#10B981`) e *Rose* (`#EF4444`). Rótulos claros e botões adaptados para toque (mobile) e teclado (desktop: teclas 1-4 e Enter). |
| **3. Hooks useState e useEffect** | `useState` gerencia questão atual, pontuação acumulada, multiplicador de streak, resposta selecionada e status de submissão. `useEffect` gerencia restauração/gravação no `localStorage`, timer de 30s por questão com `clearInterval`, sincronização do tema dark/light e atalhos de teclado. |
| **4. Banco de Dados / Persistência** | Implementada arquitetura híbrida com **Supabase** (`@supabase/supabase-js`) para ranking global compartilhado entre alunos e **fallback offline com `localStorage`**. Suporta configuração via `.env` ou direto na interface ("⚙️ Conectar Supabase"). |
| **5. Publicação na Vercel** | Configuração otimizada com `vite.config.js` e `vercel.json` (SPA rewrites). Build testado com sucesso (`dist/`). |

---

## 🧠 Conteúdos de JavaScript & DSA Abordados nas Questões

1. **Variáveis & Tipos de Dados:** Diferenças entre `let`, `const` e `var`, escopo de bloco e mutabilidade de propriedades em objetos com `const`.
2. **Estruturas Condicionais:** Comparação estrita `===` vs coerção de tipos `==`, operador ternário encadeado `cond ? val1 : val2` e declarações `if / else`.
3. **Estruturas de Repetição & Métodos de Array:** Iteração moderna com `.map()`, `.filter()`, `.forEach()` e `.reduce()`, destacando por que o `map` é o método padrão de renderização de listas no React.
4. **Funções & Escopo:** Sintaxe de Arrow Functions `() => {}`, retorno implícito e parâmetros padrão (*Default Parameters*).
5. **Manipulação do DOM & Eventos:** Uso de `document.querySelector()` e escuta de eventos com `addEventListener()`.
6. **React Hooks & Ciclo de Vida:** Mecanismos de reatividade do `useState`, imutabilidade do estado, ciclo de dependências do `useEffect` e serialização `JSON.stringify` / `JSON.parse` no `localStorage`.

---

## 💻 Estrutura de Componentes

```text
src/
├── components/
│   ├── Navbar.jsx          # Topbar responsiva com pontuação, streak, tema e áudio
│   ├── ProgressBar.jsx     # Barra de progresso dinâmica animada (X de Y)
│   ├── CategoryBadge.jsx   # Etiqueta de tópico e nível de dificuldade
│   ├── CodeBlock.jsx       # Bloco de código com sintaxe JS e botão de copiar
│   ├── StatsBar.jsx        # Telemetria: cronômetro (30s), bônus e posição
│   ├── QuestionCard.jsx    # Cartão principal com opções (1-4), validação e explicação
│   ├── ResultScreen.jsx    # Desempenho final, medalha (Ouro/Prata/Bronze) e revisão
│   ├── Leaderboard.jsx     # Modal do ranking salvo no localStorage
│   └── CopilotHelpModal.jsx# Guia acadêmico com documentação para apresentação
├── data/
│   └── questions.js        # Banco estruturado de questões pedagógicas de DSA
├── utils/
│   ├── audio.js            # Sintetizador procedural com Web Audio API
│   └── storage.js          # Persistência no localStorage (sessão ativa e ranking)
├── App.jsx                 # Orquestrador central e gerenciador dos Hooks
├── index.css               # Diretivas do Tailwind CSS e animações
└── main.jsx                # Ponto de entrada do React 19
```

---

## 🔬 Como Explicar os Hooks ao Avaliador

### 1. `useState`
```javascript
const [score, setScore] = useState(0);
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
```
> *"Utilizamos o `useState` para controlar variáveis cujo valor pode mudar durante a execução da aplicação e precisa disparar uma nova renderização visual. Por exemplo, ao confirmar uma resposta correta, chamamos `setScore(prev => prev + 100)`, o que faz o React atualizar o cabeçalho imediatamente."*

### 2. `useEffect`
```javascript
// Exemplo: Salvar progresso no localStorage ao mudar a questão
useEffect(() => {
  if (quizState === 'quiz') {
    saveActiveSession({
      currentQuestionIndex,
      score,
      streak,
      userAnswers
    });
  }
}, [currentQuestionIndex, score, streak, userAnswers]);
```
> *"O `useEffect` serve para sincronizar o componente com efeitos externos (side-effects). Configuramos dependências específicas no array `[currentQuestionIndex, ...]`. Dessa forma, o React só executa a gravação no `localStorage` quando esses valores realmente mudam, economizando operações de disco."*

---

## 🗄️ Integração com Banco de Dados Supabase (Requisito 4)

O projeto conta com **arquitetura híbrida de persistência**:
- **Nuvem (Supabase):** Quando configurado, todas as pontuações e rankings são salvos em uma tabela PostgreSQL no Supabase, permitindo que múltiplos alunos e computadores compartilhem o mesmo placar em tempo real.
- **Local (Fallback Offline):** Se o Supabase não estiver conectado ou a rede falhar, a aplicação opera 100% de forma transparente utilizando o `localStorage` do navegador.

### Como Conectar o Supabase (Opcional):
1. Crie uma conta gratuita em **[supabase.com](https://supabase.com)** e crie um novo projeto.
2. No menu **SQL Editor**, execute o seguinte script:
   ```sql
   create table public.leaderboard (
     id bigint generated by default as identity primary key,
     name text not null,
     score integer not null,
     accuracy integer not null,
     total_time integer not null,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null
   );

   -- Habilita leitura e gravação para os participantes do Provão:
   alter table public.leaderboard enable row level security;
   create policy "Permitir leitura pública" on public.leaderboard for select using (true);
   create policy "Permitir inserção pública" on public.leaderboard for insert with check (true);
   ```
3. Copie a **Project URL** e a chave **anon public** (em *Project Settings > API*).
4. No aplicativo, abra o **Ranking** e clique em **"⚙️ Conectar / Configurar Supabase"** para colar as chaves (ou defina no arquivo `.env` como `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`).

---

## 🚀 Como Rodar Localmente

1. Abra o terminal na pasta do projeto:
   ```bash
   cd C:\Projetos\dsa-quiz-2026
   ```
2. Instale as dependências (já instaladas):
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Ou simplesmente dê dois cliques no arquivo:
   `C:\Projetos\iniciar-dsa-quiz.bat` (ou no atalho criado na sua Área de Trabalho).
   Acesse no navegador: **`http://localhost:5178`**.

---

## ☁️ Como Publicar na Vercel (Passo a Passo)

### Método 1: Via GitHub (Recomendado)
1. Crie um novo repositório no seu GitHub com o nome **`dsa-quiz-2026`** (público).
2. No terminal do projeto, execute:
   ```bash
   git remote add origin https://github.com/SEU_USUARIO/dsa-quiz-2026.git
   git branch -M main
   git push -u origin main
   ```
3. Acesse **[vercel.com/new](https://vercel.com/new)**:
   - Faça login com sua conta do GitHub.
   - Clique em **Import** ao lado do repositório `dsa-quiz-2026`.
   - A Vercel detectará o framework como **Vite** automaticamente.
   - Clique em **Deploy**.
4. Em menos de 1 minuto seu site estará no ar com uma URL do tipo:
   `https://dsa-quiz-2026-xxx.vercel.app`

### Método 2: Via Vercel CLI (Direto do Terminal)
1. Instale a CLI globalmente:
   ```bash
   npm i -g vercel
   ```
2. Na pasta `C:\Projetos\dsa-quiz-2026`, digite:
   ```bash
   vercel --prod
   ```
3. Siga as instruções no terminal para publicar instantaneamente.

---

## 🧪 Teste em Janela Anônima
Após a publicação:
1. Abra seu navegador em **Modo Anônimo** (`Ctrl + Shift + N`).
2. Cole o link público fornecido pela Vercel.
3. Responda a algumas perguntas, feche a aba e reabra para conferir o progresso restaurado do `localStorage`.
4. Copie a URL pública e envie no campo de resposta da tarefa até **16 de novembro de 2026 às 23:59**.
