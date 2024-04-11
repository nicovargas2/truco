const API_BASE = 'https://randomuser.me/api/'

fetch(API_BASE, {
    method: 'GET'
})
    .then((respuesta) => {
        return respuesta.json()
    })
    .then((data) => {
        const nombreHost = data.results[0].name.first
        localStorage.setItem('nombreHost', nombreHost)
    })
    .catch((error) => {
        console.log(error)
    })

let jugadorRivalNombreIngresado = ''

const longitudMinimaDeNombre = 2
const divInfoJugador = document.getElementById('info-jugador')
const buttonJugar = document.getElementById('jugar')
const nombreJugadorInput = document.querySelector("#nombre-jugador")

const labelPuntos = document.getElementById('labelPuntos')
const puntosCheckBox = document.getElementById('puntosCheckBox')
labelPuntos.innerHTML = 'Puntos: a 30'

const labelFlor = document.getElementById('labelFlor')
const florCheckBox = document.getElementById('florCheckBox')
labelFlor.innerHTML = 'Con Flor'



const juegoEnCurso = localStorage.getItem('juegoEnCurso')

if (juegoEnCurso) {
    window.location.assign("./pages/truco.html")
}

puntosCheckBox.addEventListener('click', () => {
    if (puntosCheckBox.checked) {
        labelPuntos.innerHTML = 'Puntos: a 30'
    } else {
        labelPuntos.innerHTML = 'Puntos: a 15'
    }
})

florCheckBox.addEventListener('click', () => {
    if (florCheckBox.checked) {
        labelFlor.innerHTML = 'Con Flor'
    } else {
        labelFlor.innerHTML = 'Sin Flor'
    }
})

nombreJugadorInput.addEventListener('input', (e) => {
    jugadorRivalNombreIngresado = e.target.value
})

const validarNombre = () => {
    if (jugadorRivalNombreIngresado.trim() != '' && jugadorRivalNombreIngresado != null && jugadorRivalNombreIngresado.trim().length >= longitudMinimaDeNombre) {
        return true
    }
    return false
}

buttonJugar.addEventListener('click', () => {
    if (validarNombre()) {
        let puntos = 15
        if (puntosCheckBox.checked) {
            puntos = 30
        }

        let conFlor = false
        if (florCheckBox.checked) {
            conFlor = true
        }
        localStorage.setItem('puntos', puntos)
        localStorage.setItem('conFlor', conFlor)
        localStorage.setItem('nombreJugador', jugadorRivalNombreIngresado)
        window.location.assign("./pages/truco.html")
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
