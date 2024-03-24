class Ronda {
    constructor() {
        this.yaJugada = false
        this.enCurso = false
        //this.ganador = '' // host, rival, empate
        this.puntosEnJuego = 0
    }

    rondaJugada() {
        this.yaJugada = true
    }

    rondaEnCurso() {
        this.enCurso = true
    }

    rondaTerminada() {
        this.enCurso = false
    }

    puntosEnJuego(puntos) {
        this.puntosEnJuego = puntos
    }
}