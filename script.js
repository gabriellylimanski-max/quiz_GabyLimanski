// Array principal com as 15 perguntas do jogo
const perguntas = [
    {
        pergunta: "Qual linguagem é usada para estruturar páginas web?",
        alternativas: ["CSS", "HTML", "Python", "JavaScript"],
        correta: 1
    },
    {
        pergunta: "Qual é o maior país do mundo em extensão territorial?",
        alternativas: ["Canadá", "China", "Rússia", "Estados Unidos"],
        correta: 2
    },
    {
        pergunta: "Qual tag HTML é usada para criar um link?",
        alternativas: ["<link>", "<a>", "<href>", "<url>"],
        correta: 1
    },
    {
        pergunta: "Em qual ano ocorreu o descobrimento do Brasil?",
        alternativas: ["1500", "1492", "1822", "1988"],
        correta: 0
    },
    {
        pergunta: "Qual propriedade CSS altera a cor do texto?",
        alternativas: ["background-color", "text-style", "color", "font-color"],
        correta: 2
    },
    {
        pergunta: "Qual é o planeta mais próximo do Sol?",
        alternativas: ["Marte", "Vênus", "Terra", "Mercúrio"],
        correta: 3
    },
    {
        pergunta: "Como declaramos uma variável constante no JavaScript?",
        alternativas: ["const", "let", "var", "constant"],
        correta: 0
    },
    {
        pergunta: "Quantos ossos tem o corpo humano adulto em média?",
        alternativas: ["106", "206", "306", "406"],
        correta: 1
    },
    {
        pergunta: "Qual símbolo é usado para id no CSS?",
        alternativas: [".", "#", "$", "*"],
        correta: 1
    },
    {
        pergunta: "Qual é a capital atual do Brasil?",
        alternativas: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
        correta: 2
    },
    {
        pergunta: "Qual elemento químico tem o símbolo 'O' na tabela periódica?",
        alternativas: ["Oxigênio", "Ouro", "Ósmio", "Ozônio"],
        correta: 0
    },
    {
        pergunta: "Quem é o autor do famoso livro brasileiro 'Dom Casmurro'?",
        alternativas: ["Monteiro Lobato", "Clarice Lispector", "Machado de Assis", "Jorge Amado"],
        correta: 2
    },
    {
        pergunta: "Qual é o rio mais longo do mundo?",
        alternativas: ["Rio Nilo", "Rio Amazonas", "Rio Mississippi", "Rio Yangtze"],
        correta: 1
    },
    {
        pergunta: "Quem foi o primeiro presidente do Brasil?",
        alternativas: ["Getúlio Vargas", "Dom Pedro I", "Juscelino Kubitschek", "Marechal Deodoro da Fonseca"],
        correta: 3
    },
    {
        pergunta: "Aproximadamente, qual é a velocidade da luz no vácuo?",
        alternativas: ["300.000 km/s", "150.000 km/s", "1.000 km/s", "1.000.000 km/s"],
        correta: 0
    }
];

// Valores dos prêmios escalados para as 15 perguntas
const premio = [1000, 5000, 10000, 20000, 30000, 40000, 50000, 100000, 200000, 300000, 400000, 500000, 600000, 800000, 1000000];

let perguntaAtual = 0;
let premioAtual = 0;
let respondeu = false;

let usouCartas = false;
let usouPlacas = false;
let usouUniversitarios = false;

// Seleção de Elementos DOM
const perguntaE = document.getElementById("pergunta");
const alternativasE = document.getElementById("alternativas");
const mensagemE = document.getElementById("mensagem");
const numeroPerguntaE = document.getElementById("numero-pergunta");
const premioE = document.getElementById("premio");
const proximaE = document.getElementById("proxima");

const btnCartas = document.getElementById("btn-cartas");
const btnPlacas = document.getElementById("btn-placas");
const btnUniversitarios = document.getElementById("btn-universitarios");

function carregarPergunta() {
    respondeu = false;
    proximaE.disabled = true;
    mensagemE.textContent = "";
    alternativasE.innerHTML = "";

    btnCartas.disabled = usouCartas;
    btnPlacas.disabled = usouPlacas;
    btnUniversitarios.disabled = usouUniversitarios;

    const item = perguntas[perguntaAtual];
    perguntaE.textContent = item.pergunta;
    
    numeroPerguntaE.textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
    premioE.textContent = `Prêmio: R$ ${premioAtual.toLocaleString("pt-BR")}`;
    
    item.alternativas.forEach((texto, indice) => {
        const botao = document.createElement("button");
        botao.classList.add("alternativa");
        botao.setAttribute("data-indice", indice);
        botao.textContent = `${String.fromCharCode(65 + indice)}) ${texto}`;
       
        botao.addEventListener("click", () => verificarResposta(indice, botao));
        alternativasE.appendChild(botao);
    });
}

function verificarResposta(indiceEscolhido, botaoEscolhido) {
    if (respondeu) return;
    respondeu = true;

    btnCartas.disabled = true;
    btnPlacas.disabled = true;
    btnUniversitarios.disabled = true;

    const item = perguntas[perguntaAtual];
    const botoes = document.querySelectorAll(".alternativa");
    
    botoes.forEach(botao => botao.disabled = true);
    
    if (indiceEscolhido === item.correta) {
        botaoEscolhido.classList.add("correta");
        premioAtual = premio[perguntaAtual];
        mensagemE.textContent = "✨ Resposta correta! Você avançou!";
        mensagemE.style.color = "#059669";
        
        premioE.textContent = `Prêmio: R$ ${premioAtual.toLocaleString("pt-BR")}`;
        proximaE.disabled = false;
    } else {
        botaoEscolhido.classList.add("errada");
        botoes[item.correta].classList.add("correta");
        
        mensagemE.textContent = "💥 Resposta errada! Você foi eliminado.";
        mensagemE.style.color = "#ef4444";
        
        premioAtual = 0;
        premioE.textContent = `Prêmio: R$ 0`;
        
        setTimeout(() => {
            finalizarJogo(false);
        }, 1500);
    }
}

// Lógica das Ajudas
btnCartas.addEventListener("click", () => {
    if (usouCartas || respondeu) return;
    usouCartas = true;
    btnCartas.disabled = true;

    const item = perguntas[perguntaAtual];
    const botoes = Array.from(document.querySelectorAll(".alternativa"));
    const incorretas = botoes.filter(b => parseInt(b.getAttribute("data-indice")) !== item.correta);
    const cartasEliminar = Math.floor(Math.random() * 4);
    
    if (cartasEliminar === 0) {
        mensagemE.textContent = "🃏 Rei! Nenhuma alternativa foi eliminada!";
        mensagemE.style.color = "#64748b";
    } else {
        mensagemE.textContent = `🃏 Você eliminou ${cartasEliminar} alternativa(s) errada(s)!`;
        mensagemE.style.color = "#0284c7";
        for (let i = 0; i < cartasEliminar; i++) {
            if (incorretas[i]) {
                incorretas[i].disabled = true;
                incorretas[i].style.opacity = "0.3";
                incorretas[i].style.textDecoration = "line-through";
            }
        }
    }
});

btnPlacas.addEventListener("click", () => {
    if (usouPlacas || respondeu) return;
    usouPlacas = true;
    btnPlacas.disabled = true;

    const item = perguntas[perguntaAtual];
    let votos = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    votos[item.correta] += Math.floor(Math.random() * 40) + 30; 
    votos = votos.map(v => v + Math.floor(Math.random() * 15));
    const total = votos.reduce((a, b) => a + b, 0);
    const porcentagens = votos.map(v => Math.round((v / total) * 100));

    mensagemE.style.color = "#0284c7";
    mensagemE.textContent = `📊 Placas: A: ${porcentagens[0]}% | B: ${porcentagens[1]}% | C: ${porcentagens[2]}% | D: ${porcentagens[3]}%`;
});

// Botão de desistir do jogo voluntariamente
btnUniversitarios.addEventListener("click", () => {
    if (usouUniversitarios || respondeu) return;
    respondeu = true;
    usouUniversitarios = true;
    
    mensagemE.textContent = "🏳️ Você escolheu desistir e salvou seu dinheiro!";
    mensagemE.style.color = "#475569";
    
    setTimeout(() => {
        finalizarJogo(true);
    }, 1000);
});

proximaE.addEventListener("click", () => {
    perguntaAtual++;
    if (perguntaAtual < perguntas.length) {
        carregarPergunta();
    } else {
        finalizarJogo(true);
    }  
});

function finalizarJogo(ganhou = true) {
    alternativasE.innerHTML = "";
    numeroPerguntaE.textContent = "Fim da Partida";
    
    if (ganhou && premioAtual > 0) {
        perguntaE.textContent = `🏆 FIM DE JOGO!`;
        mensagemE.textContent = `Parabéns! Você encerrou sua jornada com R$ ${premioAtual.toLocaleString("pt-BR")}!`;
        mensagemE.style.color = "#059669";
    } else {
        perguntaE.textContent = "❌ Fim de Jogo!";
        mensagemE.textContent = "Você perdeu tudo! Que tal tentar de novo?";
        mensagemE.style.color = "#ef4444";
    }

    proximaE.textContent = "🔄 Jogar Novamente";
    proximaE.disabled = false;
    proximaE.style.backgroundColor = "#3b82f6";

    proximaE.onclick = () => {
        perguntaAtual = 0;
        premioAtual = 0;
        usouCartas = false;
        usouPlacas = false;
        usouUniversitarios = false;
        proximaE.textContent = "Próxima Pergunta";
        proximaE.style.backgroundColor = "#10b981";
        proximaE.onclick = null;
        carregarPergunta();
    };
}

// Inicia o jogo automaticamente
carregarPergunta();
