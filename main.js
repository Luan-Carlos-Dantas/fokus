const html = document.querySelector('html');
const btnFoco = document.querySelector('.app__card-button--foco')
const btnCurto = document.querySelector('.app__card-button--curto')
const btnLongo = document.querySelector('.app__card-button--longo')
const btnStartPause = document.querySelector('#start-pause')
const btnIniciarOuPausar = document.querySelector('#start-pause span')
const btnIconIniciarOuPausar = document.querySelector('.app__card-primary-butto-icon')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const timer = document.querySelector('#timer')
const listaBtns = document.querySelectorAll('.app__card-button')
const toggleMusic = document.querySelector('#alternar-musica')
const music = new Audio('./sons/luna-rise-part-one.mp3')

const audioPlay = new Audio('./sons/play.wav')
const audioPause = new Audio('./sons/pause.mp3')
const audioZero = new Audio('./sons/beep.mp3')

audioPlay.volume = 0.5
audioPause.volume = 0.5
audioZero.volume = 0.5

music.loop = true
music.volume = 0.1

let tempoDecorridoEmSegundo = 10
let intervaloId = null



btnFoco.addEventListener('click', ()=>{
  tempoDecorridoEmSegundo = 1500
  alterarContexto('foco')
  btnFoco.classList.add('active')
})

btnCurto.addEventListener('click', ()=>{
  tempoDecorridoEmSegundo = 300
  alterarContexto('descanso-curto')
  btnCurto.classList.add('active')
})

btnLongo.addEventListener('click', ()=>{
  tempoDecorridoEmSegundo = 900
  alterarContexto('descanso-longo')
  btnLongo.classList.add('active')
})

toggleMusic.addEventListener('change', ()=>{
  music.paused ? music.play() : music.pause()
})

function alterarContexto(contexto){
  mostrarTempo()
  listaBtns.forEach(function(contexto){
    contexto.classList.remove('active')
  })
  html.setAttribute('data-contexto', contexto)
  banner.setAttribute('src', `./imagens/${contexto}.png`)
  switch(contexto){
    case 'foco':
      titulo.innerHTML = `Otimize sua produtividade,<br>
      <strong class="app__title-strong"> mergulhe no que importa</strong>`
      break;
    case 'descanso-curto':
      titulo.innerHTML = `Que tal dar uma respirada?<br><strong class="app__title-strong">Faça uma pausa curta!</strong>`
      break;
    case 'descanso-longo':
      titulo.innerHTML = `Hora de voltar à superfície.
      <strong class="app__title-strong"><br>Faça uma pausa longa.</strong>`
      break;
  }
}

const contagemRegressiva = () => {
  if(tempoDecorridoEmSegundo <= 0){
    audioZero.play()
    alert('Finalizado')
    const focusActive = html.getAttribute('data-contexto') === 'foco'
    if(focusActive){
      const ev = new CustomEvent('FocoFinalizado')
      document.dispatchEvent(ev)
    }
    zerar()
    return
  }

  tempoDecorridoEmSegundo--
  mostrarTempo()
}
btnStartPause.addEventListener('click', ()=>{
  iniciarOuPausar()
})

function iniciarOuPausar(){
  if(intervaloId){
    audioPause.play()
    zerar()
    return
  }
  audioPlay.play()
  intervaloId = setInterval(contagemRegressiva, 1000)
  btnIniciarOuPausar.textContent = 'Pausar'
  btnIconIniciarOuPausar.setAttribute('src','./imagens/pause.png')
}

function zerar(){
  clearInterval(intervaloId)
  intervaloId = null
  btnIconIniciarOuPausar.setAttribute('src','./imagens/play_arrow.png')
  btnIniciarOuPausar.textContent = 'Começar'
}

function mostrarTempo(){
  const time = new Date(tempoDecorridoEmSegundo * 1000)
  const tempoFormatado = time.toLocaleString('pt-Br', {minute: '2-digit', second: '2-digit'})
  timer.innerHTML = `${tempoFormatado}`
}

mostrarTempo()
