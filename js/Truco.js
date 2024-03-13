bot = new Bot()

let jugadorRival = new Jugador('')

const divPrincipalJuego = document.getElementById('principalJuego')
const divInfoBot = document.getElementById('info-bot')
const divInfoJugador = document.getElementById('info-jugador')
const divMesa = document.getElementById('mesa')
const divJugadorRivalCartas = document.getElementById('jugadorRivalCartas')


divPrincipalJuego.hidden = true
divInfoBot.hidden = true
divMesa.hidden = true
divJugadorRivalCartas.hidden = true


//console.log('Ronda1')
mazo = new Mazo()
mazo.mezclar()
bot.nuevaRonda(mazo.repartirUnaCarta(), mazo.repartirUnaCarta(), mazo.repartirUnaCarta())
jugadorRival.nuevaRonda(mazo.repartirUnaCarta(), mazo.repartirUnaCarta(), mazo.repartirUnaCarta())

//Muestro los datos si los necesito, antes de iniciar el juego
//bot.mostrarDatos()
//jugadorRival.mostrarDatos()

/*
console.log('Pruebo acciones')

console.log(bot.jugarCartaDelMedio())
console.log(bot.jugarCartaDelMedio())
console.log(bot.jugarCartaDelMedio())
console.log(bot.jugarPrimeraCarta())
console.log(bot.jugarUltimaCarta())
*/


/*
console.log('Ronda2')
mazo = new Mazo()
mazo.mezclar()
bot.nuevaRonda(mazo.repartirUnaCarta(), mazo.repartirUnaCarta(), mazo.repartirUnaCarta())
jugadorRival.nuevaRonda(mazo.repartirUnaCarta(), mazo.repartirUnaCarta(), mazo.repartirUnaCarta())

bot.mostrarDatos()
jugadorRival.mostrarDatos()
*/

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
        console.log(jugadorRival.nombre)
        alert("Ingresar un nombre de al menos 2 letras")
    }
})

function ComenzarElJuego(params) {

    bot.mostrarDatos()
    jugadorRival.mostrarDatos()
    const spanNombreJugadorRival = document.getElementById('spanNombreJugadorRival')
    spanNombreJugadorRival.innerHTML = jugadorRival.nombre
    const spanNombreBot = document.getElementById('spanNombreBot')
    spanNombreBot.innerHTML = bot.nombre
    divInfoJugador.hidden = true

    divPrincipalJuego.hidden = false
    divJugadorRivalCartas.hidden = false
    divInfoBot.hidden = false
    divMesa.hidden = false

    const tdBotCarta1 = document.getElementById('botCarta1')
    const tdBotCarta2 = document.getElementById('botCarta2')
    const tdBotCarta3 = document.getElementById('botCarta3')
    //const spanBotCarta1 = document.createElement('span')
    //const spanBotCarta2 = document.createElement('span')
    //const spanBotCarta3 = document.createElement('span')

    const imgBotCarta1 = document.createElement('img')
    const imgBotCarta2 = document.createElement('img')
    const imgBotCarta3 = document.createElement('img')

    //spanBotCarta1.innerHTML = bot.carta1.mostrar()
    //spanBotCarta2.innerHTML = bot.carta2.mostrar()
    //spanBotCarta3.innerHTML = bot.carta3.mostrar()
    imgBotCarta1.src = bot.carta1.locacion
    imgBotCarta1.alt = bot.carta1.mostrar()
    imgBotCarta1.id = bot.cartasMano[0].id
    imgBotCarta2.src = bot.carta2.locacion
    imgBotCarta2.alt = bot.carta2.mostrar()
    imgBotCarta2.id = bot.cartasMano[1].id
    imgBotCarta3.src = bot.carta3.locacion
    imgBotCarta3.alt = bot.carta3.mostrar()
    imgBotCarta3.id = bot.cartasMano[2].id

    //spanBotCarta1.id = bot.cartasMano[0].id
    //spanBotCarta2.id = bot.cartasMano[1].id
    //spanBotCarta3.id = bot.cartasMano[2].id

    tdBotCarta1.appendChild(imgBotCarta1)
    tdBotCarta2.appendChild(imgBotCarta2)
    tdBotCarta3.appendChild(imgBotCarta3)
    //tdBotCarta1.appendChild(spanBotCarta1)
    //tdBotCarta2.appendChild(spanBotCarta2)
    //tdBotCarta3.appendChild(spanBotCarta3)

    const tdJugadorRivalCarta1 = document.getElementById('jugadorRivalCarta1')
    const tdJugadorRivalCarta2 = document.getElementById('jugadorRivalCarta2')
    const tdJugadorRivalCarta3 = document.getElementById('jugadorRivalCarta3')

    const spanJugadorRivalCarta1 = document.createElement('span')
    const spanJugadorRivalCarta2 = document.createElement('span')
    const spanJugadorRivalCarta3 = document.createElement('span')

    spanJugadorRivalCarta1.innerHTML = jugadorRival.carta1.mostrar()
    spanJugadorRivalCarta2.innerHTML = jugadorRival.carta2.mostrar()
    spanJugadorRivalCarta3.innerHTML = jugadorRival.carta3.mostrar()

    spanJugadorRivalCarta1.id = jugadorRival.cartasMano[0].id
    spanJugadorRivalCarta2.id = jugadorRival.cartasMano[1].id
    spanJugadorRivalCarta3.id = jugadorRival.cartasMano[2].id
    tdJugadorRivalCarta1.appendChild(spanJugadorRivalCarta1)
    tdJugadorRivalCarta2.appendChild(spanJugadorRivalCarta2)
    tdJugadorRivalCarta3.appendChild(spanJugadorRivalCarta3)


}