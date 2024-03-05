
let html = document.querySelector('html');
let btnFoco = document.querySelector('.app__card-button--foco');
let btnDescansoCurto = document.querySelector('.app__card-button--curto');
let btnDescansoLongo = document.querySelector('.app__card-button--longo');
let banner = document.querySelector('.app__image');
let titulo = document.querySelector('.app__title');
let botao = document.querySelectorAll('.app__card-button');
let botoaComecar = document.getElementById('start-pause');
let musicaInput = document.getElementById('alternar-musica');
let musica = new Audio('/sons/luna-rise-part-one.mp3')
let tempoNaTela = document.getElementById('timer');

let audioPlay = new Audio('/sons/play.wav')
let audioPause = new Audio('/sons/pause.mp3')
let audioFinzalizar = new Audio('/sons/beep.mp3')

//o readFile pode ser utilizado no meio do projeto, mas n e o melhor
let tempoDecorridoEmSegundos = 1500;
let intervalo = null;

musica.loop = true;

btnFoco.addEventListener('click', () => {
    alterarContexto('foco');
    btnFoco.classList.add('active');
    tempoDecorridoEmSegundos = 1500;
    mostrarTempo();
})

btnDescansoCurto.addEventListener('click', () => {
    alterarContexto('descanso-curto');
    btnDescansoCurto.classList.add('active');
    tempoDecorridoEmSegundos = 300;
    mostrarTempo();
})

btnDescansoLongo.addEventListener('click', () => {
    alterarContexto('descanso-longo');
    btnDescansoLongo.classList.add('active');
    tempoDecorridoEmSegundos = 900;
    mostrarTempo();
})

musicaInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause()
    }
})

function alterarContexto(contexto) {
    zerar();
    botao.forEach(function (contexto) {
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;

        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br><strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;

        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.<br><strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;

        default:
            break;
    }
}

let timer = () => {
    if (tempoDecorridoEmSegundos == 0) {
        audioFinzalizar.play();
        alert('Tempo Acabou!!');
        zerar();
        location.reload();
        return
    }

    tempoDecorridoEmSegundos -= 1;
    mostrarTempo()
}

function iniciarPausar() {
    if (intervalo) {
        zerar()
        audioPause.play()
        botoaComecar.innerHTML = `<img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" alt=""><span>Começar</span>`
        return;
    }
    intervalo = setInterval(timer, 1000)
    audioPlay.play();
    botoaComecar.innerHTML = `<img class="app__card-primary-butto-icon" src="/imagens/pause.png" alt=""><span>Pausar</span>`
}

function zerar() {
    clearInterval(intervalo)
    intervalo = null;
    botoaComecar.innerHTML = `<img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" alt=""><span>Começar</span>`
} 

function mostrarTempo() {
    let tempo = new Date(tempoDecorridoEmSegundos * 1000);
    let formatacao = tempo.toLocaleString(`pt-br`, {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = formatacao;
}
botoaComecar.addEventListener('click', iniciarPausar);

mostrarTempo();
