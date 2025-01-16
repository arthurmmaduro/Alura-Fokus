const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBT = document.querySelector('.app__card-button--longo');
const imagem = document.querySelector('.app__image');
const frase = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('/sons/play.wav');
const audioPause = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('/sons/beep.mp3'); 

const startPauseBt = document.querySelector('#start-pause');
const startPauseBtIcone = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');
const duracaoFoco = 1500;
const duracaoDescacoCurto = 300;
const ducaracoDescacoLongo = 900;

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
});

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco');
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});

longoBT.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo');
    longoBT.classList.add('active');
});

function alterarContexto (contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    imagem.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case 'foco':
            frase.innerHTML = 
            `Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;

        case 'descanso-curto':
            frase.innerHTML =
            `Que tal uma respirada? <br><strong class="app__title-strong">Faça um pausa curta.</strong>`
            break;
        
        case 'descanso-longo':
            frase.innerHTML =
            `Hora de voltar à superfície<br><strong class="app__title-strong">Faça um pausa longa.</strong>`
        default:
            break;
    }
};

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        audioTempoFinalizado.play();
        alert('Tempo finalizado!');
            zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
};

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        audioPause.play();
        zerar();
        return
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    startPauseBt.textContent = 'Pausar'
    startPauseBtIcone.setAttribute('src', '/imagens/pause.png')
};

function zerar() {
    clearInterval(intervaloId);
    startPauseBt.textContent = 'Começar';
    startPauseBtIcone.setAttribute('src', '/imagens/play_arrow.png');
    intervaloId = null;
};

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos*1000);
    const tempoFormatado = tempo.toLocaleTimeString('pr-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()