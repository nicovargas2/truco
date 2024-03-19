
//Creo los jugadores
const bot = new Bot()
const jugadorRival = new Jugador('')

const divPrincipalJuego = document.getElementById('principalJuego')
const divInfoBot = document.getElementById('info-bot')
const divInfoJugador = document.getElementById('info-jugador')
const divMesa = document.getElementById('mesa')
const divJugadorRivalCartas = document.getElementById('jugadorRivalCartas')

divPrincipalJuego.hidden = true
divInfoBot.hidden = true
divMesa.hidden = true
divJugadorRivalCartas.hidden = true


const buttonJugar = document.getElementById('jugar')

const nombreJugador = document.querySelector("#nombre-jugador")
nombreJugador.addEventListener('input', (e) => {
    jugadorRival.nombre = e.target.value
})


const validarNombre = () => {
    if (jugadorRival.nombre != '' && jugadorRival.nombre != null) {
        return true
    }
    return false
}

buttonJugar.addEventListener('click', () => {
    if (validarNombre()) {
        ComenzarElJuego()
    }
    else {
        Toastify({
            text: "Ingresar un nombre de al menos 2 letras",
            duration: 2000,
            style: {
                background: "linear-gradient(to right, #ed1f11, #c7308f)",
            },
        }).showToast();
    }
})

function iniciarRonda() {
    console.log('Nueva ronda')
    mazo = new Mazo()
    mazo.mezclar()
    bot.nuevaRonda(mazo.repartirUnaCarta(), mazo.repartirUnaCarta(), mazo.repartirUnaCarta())
    bot.cartasMano[0].locacion = "../Truco/img/back.jpg"
    bot.cartasMano[1].locacion = "../Truco/img/back.jpg"
    bot.cartasMano[2].locacion = "../Truco/img/back.jpg"
    jugadorRival.nuevaRonda(mazo.repartirUnaCarta(), mazo.repartirUnaCarta(), mazo.repartirUnaCarta())
    bot.mostrarDatos()
    jugadorRival.mostrarDatos()
    bot.cantarFlor()
}

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

    divJugadorRivalCarta1.appendChild(imgJugadorRivalCarta1)
    divJugadorRivalCarta2.appendChild(imgJugadorRivalCarta2)
    divJugadorRivalCarta3.appendChild(imgJugadorRivalCarta3)

}
function ComenzarElJuego() {
    armarTablero()
    iniciarRonda()
    mostrarCartas()
}