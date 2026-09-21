// Banco de Dados dos Flashcards
const allCards = [
    // Espelhos Planos
    {
        category: 'plano',
        tag: 'Espelhos Planos',
        question: 'Qual é o nome do fenômeno que consiste na mudança de direção de um raio luminoso quando a luz incide sobre uma superfície e retorna para o meio em que estava se propagando?',
        answer: 'Reflexão.'
    },
    {
        category: 'plano',
        tag: 'Espelhos Planos',
        question: 'Quando associamos dois ou mais espelhos planos, ou seja, colocamos os espelhos lado a lado, as imagens que se formulam multiplicam-se, compondo um ângulo(a) e na medida que (a) diminui, o número de imagem aumenta. Qual o cálculo para definir o número de imagens(n) fornecidas pelos espelhos?',
        answer: 'n = 360º/a - 1.'
    },
    {
        category: 'plano',
        tag: 'Espelhos Planos',
        question: 'Uma pessoa está a 3m de um espelho plano. Qual é a distância entre ela e sua imagem?',
        answer: '6m. A imagem fica 3m atrás do espelho, então 3 + 3 = 6m.'
    },
    
    // Espelhos Côncavos
    {
        category: 'concavo',
        tag: 'Espelhos Côncavos',
        question: 'Um objeto está a 30 cm de um espelho côncavo cuja distância focal é 10cm. Qual é a distância da imagem?',
        answer: 'Pela equação dos espelhos: 1/f = 1/p + 1/p\' => 1/10 = 1/30 + 1/p\' logo, p\' = 15cm.'
    },
    {
        category: 'concavo',
        tag: 'Espelhos Côncavos',
        question: 'Qual é a única posição do objeto no espelho côncavo que produz uma imagem VIRTUAL e DIREITA?',
        answer: 'Quando o objeto está posicionado Entre o Foco (F) e o Vértice (V) do espelho. A imagem também fica Maior que o objeto.'
    },
    {
        category: 'concavo',
        tag: 'Espelhos Côncavos',
        question: 'O que acontece com a imagem quando o objeto é colocado Exatamente sobre o Foco (F) de um espelho côncavo?',
        answer: 'Forma-se uma imagem Imprópria (os raios refletidos saem paralelos e não se cruzam para formar imagem).'
    },
    {
        category: 'concavo',
        tag: 'Espelhos Côncavos',
        question: 'Onde se forma a imagem quando o objeto está sobre o Centro de Curvatura (C)?',
        answer: 'A imagem se forma exatamente sobre o Centro de Curvatura (C). Ela é Real, Invertida e do Mesmo Tamanho que o objeto.'
    },

    // Espelhos Convexos
    {
        category: 'convexo',
        tag: 'Espelhos Convexos',
        question: 'Quais são as únicas características da imagem formada por um Espelho Convexo para qualquer objeto real?',
        answer: 'A imagem é sempre VIRTUAL, DIREITA e MENOR que o objeto (localizada entre o Vértice V e o Foco F, atrás do espelho).'
    },
    {
        category: 'convexo',
        tag: 'Espelhos Convexos',
        question: 'Qual é a principal aplicação prática dos Espelhos Convexos devido às suas propriedades?',
        answer: 'São usados para ampliar o Campo de Visão (como em retrovisores de ônibus/carros, saídas de garagens e espelhos de segurança em lojas).'
    },

    // Equações e Cálculos
    {
        category: 'calculos',
        tag: 'Equação de Gauss',
        question: 'Qual é a Equação dos Espelhos Esféricos (Equação de Gauss)?',
        answer: '1/f = 1/p + 1/p\' (onde f = distância focal, p = distância do objeto, p\' = distância da imagem).'
    },
    {
        category: 'calculos',
        tag: 'Convenção de Sinais',
        question: 'Na convenção de sinais, qual é o sinal da Distância Focal (f) para espelhos côncavos e convexos?',
        answer: 'Côncavo: f > 0 (Positivo). Convexo: f < 0 (Negativo).'
    },
    {
        category: 'calculos',
        tag: 'Aumento Linear (A)',
        question: 'Qual é a fórmula do Aumento Linear Transversal (A) e o significado do seu sinal?',
        answer: 'A = -p\'/p = i/o. Se A > 0, a imagem é Direita. Se A < 0, a imagem é Invertida.'
    }
];

// Estado do Aplicativo
let currentCards = [...allCards];
let currentIndex = 0;
let isFlipped = false;
let currentCategory = 'all';

// Elementos DOM
const cardInner = document.getElementById('card-inner');
const cardTag = document.getElementById('card-tag');
const cardQuestion = document.getElementById('card-question');
const cardAnswer = document.getElementById('card-answer');
const cardCounter = document.getElementById('card-counter');

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    updateCard();
    setupKeyboard();
});

// Atualiza a exibição do cartão
function updateCard() {
    if (isFlipped) {
        isFlipped = false;
        cardInner.classList.remove('rotate-y-180');
    }

    setTimeout(() => {
        const card = currentCards[currentIndex];
        cardTag.textContent = card.tag;
        cardQuestion.textContent = card.question;
        cardAnswer.textContent = card.answer;
        cardCounter.textContent = `Cartão ${currentIndex + 1} de ${currentCards.length}`;
    }, isFlipped ? 150 : 0);
}

// Virar o Cartão
function flipCard() {
    isFlipped = !isFlipped;
    if (isFlipped) {
        cardInner.classList.add('rotate-y-180');
    } else {
        cardInner.classList.remove('rotate-y-180');
    }
}

// Próximo Cartão
function nextCard() {
    if (currentCards.length === 0) return;
    currentIndex = (currentIndex + 1) % currentCards.length;
    updateCard();
}

// Cartão Anterior
function prevCard() {
    if (currentCards.length === 0) return;
    currentIndex = (currentIndex - 1 + currentCards.length) % currentCards.length;
    updateCard();
}

// Embaralhar
function shuffleCards() {
    for (let i = currentCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [currentCards[i], currentCards[j]] = [currentCards[j], currentCards[i]];
    }
    currentIndex = 0;
    updateCard();
}

// Filtrar por Categoria
function setCategory(cat) {
    currentCategory = cat;
    
    // Atualiza botões do filtro
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.classList.remove('bg-indigo-600', 'text-white', 'shadow-lg');
        btn.classList.add('bg-slate-800', 'text-slate-300');
    });
    
    const activeBtn = document.getElementById(`cat-${cat}`);
    if (activeBtn) {
        activeBtn.classList.remove('bg-slate-800', 'text-slate-300');
        activeBtn.classList.add('bg-indigo-600', 'text-white', 'shadow-lg');
    }

    // Filtra os dados
    if (cat === 'all') {
        currentCards = [...allCards];
    } else {
        currentCards = allCards.filter(c => c.category === cat);
    }

    currentIndex = 0;
    updateCard();
}

// Teclas de Atalho
function setupKeyboard() {
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            flipCard();
        } else if (e.code === 'ArrowRight') {
            nextCard();
        } else if (e.code === 'ArrowLeft') {
            prevCard();
        } else if (e.code === 'KeyR') {
            shuffleCards();
        }
    });
}
