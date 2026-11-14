// Banco de Questões de Revisão DSA 2026 — JavaScript & ReactJS

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    category: "Variáveis & Tipos",
    difficulty: "Fácil",
    question: "Ao declarar uma variável com 'const' em JavaScript, qual das seguintes operações é permitida?",
    code: `const aluno = { nome: "Lucas", nota: 8.5 };
// Qual das linhas abaixo NÃO gera erro de execução?`,
    options: [
      "aluno = { nome: 'Marcos', nota: 9.0 };",
      "aluno.nota = 10.0;",
      "const aluno = 'Novo Objeto';",
      "delete aluno;"
    ],
    correctAnswer: 1,
    explanation: "A palavra-chave 'const' cria uma referência constante na memória, impedindo a reatribuição da variável inteira. No entanto, as propriedades internas de objetos e elementos de arrays declarados com const permanecem mutáveis, portanto 'aluno.nota = 10.0;' é totalmente válido.",
    tip: "'const' protege a ligação (binding) da variável, não o conteúdo interno de objetos ou arrays."
  },
  {
    id: 2,
    category: "Estruturas Condicionais",
    difficulty: "Fácil",
    question: "Qual será a saída exibida no console após a execução do código condicional abaixo?",
    code: `let pontos = "100";
let bonus = 100;

if (pontos === bonus) {
  console.log("Valores Estritamente Iguais");
} else if (pontos == bonus) {
  console.log("Valores Equivalentes por Coerção");
} else {
  console.log("Valores Totalmente Diferentes");
}`,
    options: [
      "Valores Estritamente Iguais",
      "Valores Equivalentes por Coerção",
      "Valores Totalmente Diferentes",
      "Gera erro de sintaxe (TypeError)"
    ],
    correctAnswer: 1,
    explanation: "O operador de igualdade estrita (===) verifica tanto o valor quanto o tipo do dado ('100' é String e 100 é Number, logo é falso). Já o operador (==) realiza coerção de tipos antes de comparar, convertendo a string em número e resultando em true.",
    tip: "Em JavaScript profissional e entrevistas técnicas, prefira sempre === para evitar bugs com coerção implícita."
  },
  {
    id: 3,
    category: "Estruturas de Repetição",
    difficulty: "Médio",
    question: "O código abaixo utiliza o método de iteração 'filter' em um array de notas de DSA. Qual será o array resultante?",
    code: `const notas = [4.5, 7.0, 9.5, 5.0, 8.0, 6.0];
const aprovados = notas.filter(nota => nota >= 7.0);

console.log(aprovados);`,
    options: [
      "[7.0, 9.5, 8.0]",
      "[4.5, 5.0, 6.0]",
      "[true, false, true, false, true, false]",
      "[7.0, 9.5, 5.0, 8.0, 6.0]"
    ],
    correctAnswer: 0,
    explanation: "O método Array.prototype.filter() percorre cada elemento do array e retorna um novo array contendo apenas os elementos que retornarem 'true' na função de teste. Os valores 7.0, 9.5 e 8.0 são os únicos maiores ou iguais a 7.0.",
    tip: "Diferente do 'map', o 'filter' altera o tamanho do array resultante, mantendo apenas os elementos válidos."
  },
  {
    id: 4,
    category: "Estruturas de Repetição",
    difficulty: "Médio",
    question: "Qual a principal diferença entre os métodos 'map' e 'forEach' ao percorrer uma lista de dados em JavaScript?",
    code: `const numeros = [1, 2, 3];
const resultadoMap = numeros.map(n => n * 2);
const resultadoForEach = numeros.forEach(n => n * 2);`,
    options: [
      "Ambos retornam um novo array idêntico com os valores transformados.",
      "'map' retorna um novo array transformado, enquanto 'forEach' retorna undefined e é usado para efeitos colaterais.",
      "'forEach' é mais rápido e sempre retorna um booleano.",
      "'map' altera o array original diretamente, enquanto 'forEach' cria uma cópia profunda."
    ],
    correctAnswer: 1,
    explanation: "O método 'map' gera e retorna um novo array com os resultados da função chamada em cada elemento (muito usado no React para renderizar listas). O 'forEach' não retorna nada (retorna 'undefined') e serve para executar ações externas para cada item.",
    tip: "No React, usamos .map() dentro do JSX para transformar dados em elementos visuais (tags)."
  },
  {
    id: 5,
    category: "Funções & Escopo",
    difficulty: "Médio",
    question: "Qual será o valor impresso no console ao invocar a Arrow Function com retorno implícito abaixo?",
    code: `const calcularMedia = (n1, n2 = 10) => (n1 + n2) / 2;

console.log(calcularMedia(6));`,
    options: [
      "NaN",
      "6",
      "8",
      "Erro: parâmetro n2 não fornecido"
    ],
    correctAnswer: 2,
    explanation: "JavaScript suporta Parâmetros Predefinidos (Default Parameters). Quando o segundo argumento 'n2' não é passado, ele assume o valor padrão 10. Assim, o cálculo realizado é (6 + 10) / 2 = 16 / 2 = 8.",
    tip: "Parâmetros padrão evitam que valores ausentes virem 'undefined' e gerem 'NaN' em cálculos."
  },
  {
    id: 6,
    category: "Manipulação do DOM",
    difficulty: "Fácil",
    question: "Qual método da API do DOM é recomendado pelo padrão moderno do JavaScript para selecionar o primeiro elemento que coincida com um seletor CSS?",
    code: `// Como capturar o botão de confirmação com classe .btn-confirmar?
const botao = document._________________('.btn-confirmar');`,
    options: [
      "querySelector",
      "getElementById",
      "getElementsByClassName",
      "searchSelector"
    ],
    correctAnswer: 0,
    explanation: "O método 'document.querySelector()' aceita qualquer seletor CSS válido (.classe, #id, tag[attr]) e retorna o primeiro elemento coincidente no documento HTML, sendo a forma mais versátil e moderna de seleção.",
    tip: "Para selecionar todos os elementos com a mesma classe, utiliza-se 'document.querySelectorAll()'."
  },
  {
    id: 7,
    category: "React: useState",
    difficulty: "Médio",
    question: "No React, por que devemos atualizar o estado utilizando a função modificadora (setScore) em vez de atribuir diretamente (score = score + 1)?",
    code: `const [score, setScore] = useState(0);

// Forma CORRETA:
setScore(prev => prev + 1);

// Forma INCORRETA:
// score = score + 1;`,
    options: [
      "A atribuição direta impede que o JavaScript compile o código e causa erro fatal no navegador.",
      "A função modificadora avisa o React que o estado mudou, disparando o ciclo de renderização para atualizar a interface visual.",
      "Porque variáveis de estado no React são constantes congeladas por Object.freeze.",
      "A função setScore é apenas uma convenção estética e não tem impacto no comportamento da tela."
    ],
    correctAnswer: 1,
    explanation: "O React baseia sua reatividade no controle de estado. Modificar a variável diretamente não aciona o algoritmo de reconciliação (Virtual DOM). Ao chamar a função 'setScore', o React agenda uma nova renderização do componente para refletir os novos dados na tela.",
    tip: "Regra de ouro do React: trate o estado sempre como imutável e use a função setter correspondente."
  },
  {
    id: 8,
    category: "React: useEffect",
    difficulty: "Médio",
    question: "Considere o hook 'useEffect' abaixo. Em quais situações a função interna do efeito será executada?",
    code: `useEffect(() => {
  console.log("Efeito executado!");
  localStorage.setItem('dsa_progresso', JSON.stringify(progresso));
}, [progresso]);`,
    options: [
      "Apenas uma vez, quando o componente é montado pela primeira vez.",
      "Em toda e qualquer renderização do componente, independentemente de qual variável mudar.",
      "Na montagem inicial e sempre que o valor da variável 'progresso' for alterado.",
      "Apenas quando o usuário clicar em um botão ou fechar a janela."
    ],
    correctAnswer: 2,
    explanation: "O array de dependências '[progresso]' instrui o React a executar a função do efeito durante a montagem inicial do componente e subsequentes renderizações onde o valor da dependência 'progresso' tenha sofrido alteração.",
    tip: "Se o array de dependências for vazio '[]', o efeito roda estritamente uma única vez após a primeira montagem."
  },
  {
    id: 9,
    category: "Persistência & LocalStorage",
    difficulty: "Fácil",
    question: "O localStorage armazena dados exclusivamente como texto (strings). Qual função nativa do JavaScript é usada para converter um objeto em string antes de salvá-lo?",
    code: `const pontuacao = { acertos: 9, total: 10, aluno: "Matheus" };
// Como salvar corretamente no localStorage?
localStorage.setItem('resultado', _________________(pontuacao));`,
    options: [
      "JSON.stringify",
      "JSON.parse",
      "Object.toString()",
      "pontuacao.serialize()"
    ],
    correctAnswer: 0,
    explanation: "A função 'JSON.stringify(dado)' serializa objetos e arrays JavaScript em uma string formatada em JSON. Para restaurar o objeto de volta a partir do texto do localStorage, utilizamos 'JSON.parse(string)'.",
    tip: "Lembre-se: 'stringify' transforma em string (salvar); 'parse' faz o parse para objeto (ler)."
  },
  {
    id: 10,
    category: "Estruturas Condicionais",
    difficulty: "Médio",
    question: "Qual será a mensagem resultante da avaliação com Operador Ternário encadeado?",
    code: `const notaFinal = 7.5;
const status = notaFinal >= 9.0 
  ? "Excelente (A)" 
  : notaFinal >= 7.0 
  ? "Aprovado (B)" 
  : "Recuperação (C)";

console.log(status);`,
    options: [
      "Excelente (A)",
      "Aprovado (B)",
      "Recuperação (C)",
      "undefined"
    ],
    correctAnswer: 1,
    explanation: "A primeira condição (7.5 >= 9.0) é falsa, então a expressão após o primeiro ':' é avaliada. A segunda condição (7.5 >= 7.0) é verdadeira, resultando na string 'Aprovado (B)'.",
    tip: "O operador ternário é uma forma concisa de escrever condicionais if/else em uma única linha dentro de expressões JSX."
  }
];

export const CATEGORIES = [
  "Todas",
  "Variáveis & Tipos",
  "Estruturas Condicionais",
  "Estruturas de Repetição",
  "Funções & Escopo",
  "Manipulação do DOM",
  "React: useState & useEffect"
];
