// Array principal com as 15 perguntas do jogo (Temas variados)
const perguntas = [
    {
        pergunta: "Qual linguagem é usada para estruturar páginas web?",
        alternativas: ["CSS", "HTML", "Python", "JavaScript"],
        correta: 1 // HTML
    },
    {
        pergunta: "Qual é o maior país do mundo em extensão territorial?",
        alternativas: ["Canadá", "China", "Rússia", "Estados Unidos"],
        correta: 2 // Rússia
    },
    {
        pergunta: "Qual tag HTML é usada para criar um link?",
        alternativas: ["<link>", "<a>", "<href>", "<url>"],
        correta: 1 // <a>
    },
    {
        pergunta: "Em qual ano ocorreu o descobrimento do Brasil?",
        alternativas: ["1500", "1492", "1822", "1988"],
        correta: 0 // 1500
    },
    {
        pergunta: "Qual propriedade CSS altera a cor do texto?",
        alternativas: ["background-color", "text-style", "color", "font-color"],
        correta: 2 // color
    },
    {
        pergunta: "Qual é o planeta mais próximo do Sol?",
        alternativas: ["Marte", "Vênus", "Terra", "Mercúrio"],
        correta: 3 // Mercúrio
    },
    {
        pergunta: "Como declaramos uma variável constante no JavaScript?",
        alternativas: ["const", "let", "var", "constant"],
        correta: 0 // const
    },
    {
        pergunta: "Quantos ossos tem o corpo humano adulto em média?",
        alternativas: ["106", "206", "306", "406"],
        correta: 1 // 206
    },
    {
        pergunta: "Qual símbolo é usado para id no CSS?",
        alternativas: [".", "#", "\$", "*"],
        correta: 1 // #
    },
    {
        pergunta: "Qual é a capital atual do Brasil?",
        alternativas: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
        correta: 2 // Brasília
    },
    {
        pergunta: "Qual elemento químico tem o símbolo 'O' na tabela periódica?",
        alternativas: ["Oxigênio", "Ouro", "Ósmio", "Ozônio"],
        correta: 0 // Oxigênio
    },
    {
        pergunta: "Quem é o autor do famoso livro brasileiro 'Dom Casmurro'?",
        alternativas: ["Monteiro Lobato", "Clarice Lispector", "Machado de Assis", "Jorge Amado"],
        correta: 2 // Machado de Assis
    },
    {
        pergunta: "Qual é o rio mais longo do mundo?",
        alternativas: ["Rio Nilo", "Rio Amazonas", "Rio Mississippi", "Rio Yangtze"],
        correta: 1 // Rio Amazonas
    },
    {
        pergunta: "Quem foi o primeiro presidente do Brasil?",
        alternativas: ["Getúlio Vargas", "Dom Pedro I", "Juscelino Kubitschek", "Marechal Deodoro da Fonseca"],
        correta: 3 // Marechal Deodoro da Fonseca
    },
    {
        pergunta: "Aproximadamente, qual é a velocidade da luz no vácuo?",
        alternativas: ["300.000 km/s", "150.000 km/s", "1.000 km/s", "1.000.000 km/s"],
        correta: 0 // 300.000 km/s
    }
];  

// Valores dos prêmios escalados para as 15 perguntas até o 1 Milhão
const premio = [];
premio.push(1000);
premio.push(5000);
premio.push(10000);
premio.push(20000);
premio.push(30000);
premio.push(40000);
premio.push(50000);
premio.push(100000);
premio.push(200000);
premio.push(300000);
premio.push(400000);
premio.push(500000);
premio.push(600000);
premio.push(800000);
premio.push(1000000);


let perguntaAtual = 0;
let premioAtual = 0;
let respondeu = false;

// Controle de uso das ajudas (só podem ser usadas uma vez por jogo)
let usouCartas = false;
let usouPlacas = false;
let usouUniversitarios = false;

const perguntaE = document.getElementById("pergunta");
const alternativasE = document.getElementById("alternativas");
const mensagemE = document.getElementById("mensagem");
const numeroPerguntaE = document.getElementById("numero-pergunta");
const premioE = document.getElementById("premio");
const proximaE = document.getElementById("proxima");

const btnCartas = document.getElementById("btn-cartas");
const btnPlacas = document.getElementById("btn-placas");
const btnUniversitarios = document.getElementById("btn-universitarios");

function carregarPergunta(){
    respondeu = false;
    proximaE.disabled = true;
    mensagemE.textContent = "";
    alternativasE.innerHTML = "";

    // Atualiza o estado visual dos botões de ajuda
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

function verificarResposta(indiceEscolhido, botaoEscolhido){
    if (respondeu) return;
    respondeu = true;

    // Desativa as ajudas ao responder
    btnCartas.disabled = true;
    btnPlacas.disabled = true;
    btnUniversitarios.disabled = true;

    const item = perguntas[perguntaAtual];
    const botoes = document.querySelectorAll(".alternativa");
    
    botoes.forEach(botao => botao.disabled = true);
    
    if (indiceEscolhido === item.correta){
        botaoEscolhido.classList.add("correta");
        premioAtual = premio[perguntaAtual];
        mensagemE.textContent = "Resposta correta! Você avançou!";
        mensagemE.style.color = "#065f46";
    } else {
        botaoEscolhido.classList.add("errada");
        botoes[item.correta].classList.add("correta");
        mensagemE.textContent = "Você errou! Fim da linha.";
        mensagemE.style.color = "#9f1239";
    }
    
    premioE.textContent = `Prêmio: R$ ${premioAtual.toLocaleString("pt-BR")}`;
    proximaE.disabled = false;
}

// LÓGICA DAS AJUDAS
btnCartas.addEventListener("click", () => {
    if (usouCartas || respondeu) return;
    usouCartas = true;
    btnCartas.disabled = true;

    const item = perguntas[perguntaAtual];
    const botoes = Array.from(document.querySelectorAll(".alternativa"));
    
    // Filtra apenas as alternativas incorretas
    const incorretas = botoes.filter(b => parseInt(b.getAttribute("data-indice")) !== item.correta);
    
    // Sorteia quantas cartas remover (elimina de 0 a 3 alternativas)
    const cartasEliminar = Math.floor(Math.random() * 4); // Gera de 0 a 3
    
    if (cartasEliminar === 0) {
        mensagemE.textContent = "Rei! Nenhuma alternativa foi eliminada!";
        mensagemE.style.color = "#4a4e69";
    } else {
        mensagemE.textContent = `Você eliminou ${cartasEliminar} alternativa(s) errada(s)!`;
        mensagemE.style.color = "#3b82f6";
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
    let votos = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]; // Base inicial de votos
    
    // Adiciona uma grande vantagem de votos para a resposta correta simulando o público
    votos[item.correta] += Math.floor(Math.random() * 40) + 30; 
    
    // Distribui o restante aleatoriamente
    votos = votos.map(v => v + Math.floor(Math.random() * 15));
    const total = votos.reduce((a, b) => a + b, 0);
    const porcentagens = votos.map(v => Math.round((v / total) * 100));

    mensagemE.style.color = "#3b82f6";
    mensagemE.textContent = `Placas: A: ${porcentagens[0]}% | B: ${porcentagens[1]}% | C: ${porcentagens[2]}% | D: ${porcentagens[3]}%`;
});

btnUniversitarios.addEventListener("click", () => {
    if (usouUniversitarios || respondeu) return;
    usouUniversitarios = true;
    btnUniversitarios.disabled = true;

    const item = perguntas[perguntaAtual];
    const letras = ["A", "B", "C", "D"];
    const palpites = [];

    // 3 Universitários votam (75% de chance de dar o palpite certo)
    for (let i = 0; i < 3; i++) {
        const acertou = Math.random() > 0.25; 
        if (acertou) {
            palpites.push(letras[item.correta]);
        } else {
            const erradas = [0, 1, 2, 3].filter(idx => idx !== item.correta);
            const erroSorteado = erradas[Math.floor(Math.random() * erradas.length)];
            palpites.push(letras[erroSorteado]);
        }
    }

    mensagemE.style.color = "#3b82f6";
    mensagemE.textContent = `Universitário 1: "${palpites[0]}" | U2: "${palpites[1]}" | U3: "${palpites[2]}"`;
});

proximaE.addEventListener("click", () => {
    perguntaAtual++;
    if (perguntaAtual < perguntas.length){
        carregarPergunta();
    } else {
        finalizarJogo();
    }  
});

function finalizarJogo(){
    perguntaE.textContent = "Fim de jogo!";
    alternativasE.innerHTML = "";
    numeroPerguntaE.textContent = "Quiz concluído";
    mensagemE.style.color = "#ff5c8a";
    mensagemE.textContent = `Parabéns! Você terminou com R$ ${premioAtual.toLocaleString("pt-BR")}!`;

    proximaE.textContent = "Jogar novamente";
    proximaE.disabled = false;

    proximaE.onclick = () => {
        perguntaAtual = 0;
        premioAtual = 0;
        usouCartas = false;
        usouPlacas = false;
        usouUniversitarios = false;
        proximaE.textContent = "Próxima pergunta";
        proximaE.onclick = null;
        carregarPergunta();
    };
}

// Inicia o jogo
carregarPergunta();
