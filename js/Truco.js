//Creo los jugadores
const bot = new Bot()
const jugadorRival = new Jugador('')
const arbitro = new Arbitro()


//Armo el tablero
function armarTablero() {
    const spanNombreJugadorRival = document.getElementById('spanNombreJugadorRival')
    spanNombreJugadorRival.innerHTML = jugadorRival.nombre
    const spanNombreBot = document.getElementById('spanNombreBot')
    spanNombreBot.innerHTML = bot.nombre

    divInfoJugador.hidden = true
    divPrincipalJuego.hidden = false
    divJugadorRivalCartas.hidden = false
    divInfoBot.hidden = false
    divMesa.hidden = false

}

function mostrarCartas() {
    //Esto es para saber las cartas de ambos jugadores
    console.log(bot.mostrarDatos())
    console.log(jugadorRival.mostrarDatos())
    const divBotCarta1 = document.getElementById('botCarta1')
    const divBotCarta2 = document.getElementById('botCarta2')
    const divBotCarta3 = document.getElementById('botCarta3')

    const imgBotCarta1 = document.createElement('img')
    const imgBotCarta2 = document.createElement('img')
    const imgBotCarta3 = document.createElement('img')

    imgBotCarta1.src = bot.carta1.locacion
    imgBotCarta1.alt = bot.carta1.mostrar()
    imgBotCarta1.id = bot.cartasMano[0].id
    imgBotCarta2.src = bot.carta2.locacion
    imgBotCarta2.alt = bot.carta2.mostrar()
    imgBotCarta2.id = bot.cartasMano[1].id
    imgBotCarta3.src = bot.carta3.locacion
    imgBotCarta3.alt = bot.carta3.mostrar()
    imgBotCarta3.id = bot.cartasMano[2].id

    imgBotCarta1.classList.add('w-32')
    imgBotCarta1.classList.add('md:w-48')
    imgBotCarta2.classList.add('w-32')
    imgBotCarta2.classList.add('md:w-48')
    imgBotCarta3.classList.add('w-32')
    imgBotCarta3.classList.add('md:w-48')

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

    imgJugadorRivalCarta1.classList.add('w-32')
    imgJugadorRivalCarta1.classList.add('md:w-48')
    imgJugadorRivalCarta2.classList.add('w-32')
    imgJugadorRivalCarta2.classList.add('md:w-48')
    imgJugadorRivalCarta3.classList.add('w-32')
    imgJugadorRivalCarta3.classList.add('md:w-48')

    imgJugadorRivalCarta2.src = jugadorRival.carta2.locacion
    imgJugadorRivalCarta2.alt = jugadorRival.carta2.mostrar()
    imgJugadorRivalCarta2.id = jugadorRival.cartasMano[1].id
    imgJugadorRivalCarta3.src = jugadorRival.carta3.locacion
    imgJugadorRivalCarta3.alt = jugadorRival.carta3.mostrar()
    imgJugadorRivalCarta3.id = jugadorRival.cartasMano[2].id

    imgJugadorRivalCarta1.addEventListener('click', function clickCarta1() {
        const divCartaJugadaJugadorRival1 = document.getElementById('cartaJugadaJugadorRival1')
        divCartaJugadaJugadorRival1.appendChild(imgJugadorRivalCarta1)
        jugadorRival.jugarCarta(imgJugadorRivalCarta1.id)
        imgJugadorRivalCarta1.removeEventListener('click', clickCarta1)
    })

    imgJugadorRivalCarta2.addEventListener('click', function clickCarta2() {
        const divCartaJugadaJugadorRival1 = document.getElementById('cartaJugadaJugadorRival1')
        divCartaJugadaJugadorRival1.appendChild(imgJugadorRivalCarta2)
        jugadorRival.jugarCarta(imgJugadorRivalCarta2.id)
        imgJugadorRivalCarta2.removeEventListener('click', clickCarta2)

    })

    imgJugadorRivalCarta3.addEventListener('click', function clickCarta3() {
        const divCartaJugadaJugadorRival1 = document.getElementById('cartaJugadaJugadorRival1')
        divCartaJugadaJugadorRival1.appendChild(imgJugadorRivalCarta3)
        jugadorRival.jugarCarta(imgJugadorRivalCarta3.id)
        imgJugadorRivalCarta3.removeEventListener('click', clickCarta3)
    })

    divJugadorRivalCarta1.appendChild(imgJugadorRivalCarta1)
    divJugadorRivalCarta2.appendChild(imgJugadorRivalCarta2)
    divJugadorRivalCarta3.appendChild(imgJugadorRivalCarta3)

}


/* esto es para probar el while
bot.puntos = 10
jugadorRival.puntos = 35
*/


function ComenzarElJuego() {
    //Esto es para el while
    /*
    const partidoTerminado = (bot.puntos >= 30 || jugadorRival.puntos >= 30)
    console.log('partidoTerminado?')
    console.log(partidoTerminado)
    */


    armarTablero()
    arbitro.nuevaMano()
    mostrarCartas()
    if (bot.cantarTantos() > 20) {
        arbitro.hostDiceEnvido(bot.cantarTantos())
    }
    /*
    while (bot.puntos < 30 || jugadorRival < 30) {
        arbitro.nuevaMano()
        mostrarCartas()
    }
    */
}

