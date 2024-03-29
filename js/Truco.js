//Creo los jugadores
const bot = new Bot()
const jugadorRival = new Jugador('')
const arbitro = new Arbitro()
const nombreJugador = localStorage.getItem('nombreJugador')
const puntos = localStorage.getItem('puntos')
const conFlor = localStorage.getItem('conFlor')
const tdAccionesJugador = document.getElementById('accionesJugador')


//Creo las partes del juego
const divInfoBot = document.getElementById('info-bot')
const divMesa = document.getElementById('mesa')
const divJugadorRivalCartas = document.getElementById('jugadorRivalCartas')


function envido() {

}

//Armo el tablero
function armarTablero() {
    const spanNombreJugadorRival = document.getElementById('spanNombreJugadorRival')
    jugadorRival.nombre = localStorage.getItem('nombreJugador')
    spanNombreJugadorRival.innerHTML = jugadorRival.nombre
    const spanNombreBot = document.getElementById('spanNombreBot')
    spanNombreBot.innerHTML = bot.nombre
    divJugadorRivalCartas.hidden = false
    divInfoBot.hidden = false
    divMesa.hidden = false

    const tdId = document.getElementById('tablaNombreJugadorRival')
    tdId.innerHTML = jugadorRival.nombre

}

function mostrarBotonesPrimerRonda() {
    const buttonEnvido = document.createElement('button')
    buttonEnvido.id = 'envido'
    buttonEnvido.innerHTML = 'Envido'
    buttonEnvido.classList.add('rounded-md', 'bg-indigo-600', 'm-1', 'px-3', 'py-2', 'text-sm', 'font-semibold', 'text-white', 'hover:bg-indigo-500', 'focus-visible:outline', 'focus-visible:outline-2', 'focus-visible:outline-offset-2', 'focus-visible:outline-indigo-600')


    buttonEnvido.addEventListener('click', () => {
        arbitro.envidoCantado = true
        arbitro.esconderBotonEnvidoJugadorRival()
        arbitro.esconderBotonFlorJugadorRival()
        bot.decidirEnvido()
    })

    tdAccionesJugador.appendChild(buttonEnvido)
    const br = document.createElement('br')
    tdAccionesJugador.appendChild(br)


    if (localStorage.getItem('conFlor')) {
        const buttonFlor = document.createElement('button')
        buttonFlor.id = 'flor'
        buttonFlor.classList.add('rounded-md', 'bg-indigo-600', 'm-1', 'px-3', 'py-2', 'text-sm', 'font-semibold', 'text-white', 'hover:bg-indigo-500', 'focus-visible:outline', 'focus-visible:outline-2', 'focus-visible:outline-offset-2', 'focus-visible:outline-indigo-600')
        buttonFlor.innerHTML = 'Flor!'
        buttonFlor.addEventListener('click', function cantarFlorJugadorRivalButton() {
            if (jugadorRival.cantarFlor() == 'Flor') {
                Swal.fire({
                    title: "Flor!",
                    icon: "info"
                });
                buttonFlor.removeEventListener('click', cantarFlorJugadorRivalButton)
            }
        })
        tdAccionesJugador.appendChild(buttonFlor)

    }
}


function mostrarCartas() {
    //Esto es para saber las cartas de ambos jugadores
    bot.mostrarDatos()
    jugadorRival.mostrarDatos()
    const divBotCarta1 = document.getElementById('botCarta1')
    const divBotCarta2 = document.getElementById('botCarta2')
    const divBotCarta3 = document.getElementById('botCarta3')

    const imgBotCarta1 = document.createElement('img')
    const imgBotCarta2 = document.createElement('img')
    const imgBotCarta3 = document.createElement('img')

    imgBotCarta1.src = bot.carta1.locacion
    imgBotCarta1.src = "../img/back.jpg"
    imgBotCarta1.alt = bot.carta1.mostrar()
    imgBotCarta1.id = bot.cartasMano[0].id
    imgBotCarta2.src = "../img/back.jpg"
    imgBotCarta2.alt = bot.carta2.mostrar()
    imgBotCarta2.id = bot.cartasMano[1].id
    imgBotCarta3.src = "../img/back.jpg"
    imgBotCarta3.alt = bot.carta3.mostrar()
    imgBotCarta3.id = bot.cartasMano[2].id

    imgBotCarta1.classList.add('w-24')
    //imgBotCarta1.classList.add('md:w-48')
    imgBotCarta2.classList.add('w-24')
    //imgBotCarta2.classList.add('md:w-48')
    imgBotCarta3.classList.add('w-24')
    //imgBotCarta3.classList.add('md:w-48')

    divBotCarta1.appendChild(imgBotCarta1)
    divBotCarta2.appendChild(imgBotCarta2)
    divBotCarta3.appendChild(imgBotCarta3)

    const divJugadorRivalCarta1 = document.getElementById('jugadorRivalCarta1')
    const divJugadorRivalCarta2 = document.getElementById('jugadorRivalCarta2')
    const divJugadorRivalCarta3 = document.getElementById('jugadorRivalCarta3')


    const imgJugadorRivalCarta1 = document.createElement('img')
    const imgJugadorRivalCarta2 = document.createElement('img')
    const imgJugadorRivalCarta3 = document.createElement('img')

    imgJugadorRivalCarta1.src = jugadorRival.carta1.locacion
    imgJugadorRivalCarta1.alt = jugadorRival.carta1.mostrar()
    imgJugadorRivalCarta1.id = jugadorRival.cartasMano[0].id
    imgJugadorRivalCarta2.src = jugadorRival.carta2.locacion
    imgJugadorRivalCarta2.alt = jugadorRival.carta2.mostrar()
    imgJugadorRivalCarta2.id = jugadorRival.cartasMano[1].id
    imgJugadorRivalCarta3.src = jugadorRival.carta3.locacion
    imgJugadorRivalCarta3.alt = jugadorRival.carta3.mostrar()
    imgJugadorRivalCarta3.id = jugadorRival.cartasMano[2].id

    imgJugadorRivalCarta1.classList.add('w-24')
    //imgJugadorRivalCarta1.classList.add('md:w-48')
    imgJugadorRivalCarta2.classList.add('w-24')
    //imgJugadorRivalCarta2.classList.add('md:w-48')
    imgJugadorRivalCarta3.classList.add('w-24')
    //imgJugadorRivalCarta3.classList.add('md:w-48')


    imgJugadorRivalCarta1.addEventListener('click', function clickCarta1() {
        if (jugadorRival.habilitadoAJugar) {
            const divCartaJugadaJugadorRival1 = document.getElementById('cartaJugadaJugadorRival1')
            divCartaJugadaJugadorRival1.appendChild(imgJugadorRivalCarta1)
            imgJugadorRivalCarta1.removeEventListener('click', clickCarta1)
            arbitro.agregarCartaJugadaJugadorRival(jugadorRival.carta1)
            jugadorRival.jugarCarta(imgJugadorRivalCarta1.id)
            arbitro.controladorDeTurno()
            arbitro.controladorDeRondas()
        }
    })

    imgJugadorRivalCarta2.addEventListener('click', function clickCarta2() {
        if (jugadorRival.habilitadoAJugar) {
            const divCartaJugadaJugadorRival1 = document.getElementById('cartaJugadaJugadorRival1')
            divCartaJugadaJugadorRival1.appendChild(imgJugadorRivalCarta2)
            imgJugadorRivalCarta2.removeEventListener('click', clickCarta2)
            arbitro.agregarCartaJugadaJugadorRival(jugadorRival.carta2)
            jugadorRival.jugarCarta(imgJugadorRivalCarta2.id)
            arbitro.controladorDeTurno()
            arbitro.controladorDeRondas()

        }
    })

    imgJugadorRivalCarta3.addEventListener('click', function clickCarta3() {
        if (jugadorRival.habilitadoAJugar) {
            const divCartaJugadaJugadorRival1 = document.getElementById('cartaJugadaJugadorRival1')
            divCartaJugadaJugadorRival1.appendChild(imgJugadorRivalCarta3)
            imgJugadorRivalCarta3.removeEventListener('click', clickCarta3)
            arbitro.agregarCartaJugadaJugadorRival(jugadorRival.carta3)
            jugadorRival.jugarCarta(imgJugadorRivalCarta3.id)
            arbitro.controladorDeTurno()
            arbitro.controladorDeRondas()

        }
    })

    divJugadorRivalCarta1.appendChild(imgJugadorRivalCarta1)
    divJugadorRivalCarta2.appendChild(imgJugadorRivalCarta2)
    divJugadorRivalCarta3.appendChild(imgJugadorRivalCarta3)

}


/* esto es para probar el while
bot.puntos = 10
jugadorRival.puntos = 35
*/


function comenzarElJuego() {
    armarTablero()
    arbitro.nuevaMano()
    mostrarCartas()
    mostrarBotonesPrimerRonda()
}


if (nombreJugador) {
    comenzarElJuego()
} else {
    window.location.assign("../index.html")
}
