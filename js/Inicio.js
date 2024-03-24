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
    if (jugadorRival.nombre.trim() != '' && jugadorRival.nombre != null && jugadorRival.nombre.trim().length >= 2) {
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
