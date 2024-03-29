class Jugador {
    constructor(nombre) {
        this.nombre = nombre
        this.puntos = 0
        this.habilitadoAJugar = false
        this.esMano = false
        this.deboMostrarMisCartasAlfinal = false
    }

    mostrarDatos() {
        console.log('Nombre jugador: ' + this.nombre + ' Puntos: ' + this.puntos)
        console.log('Cartas: ' + this.carta1.mostrar() + ' ' + this.carta2.mostrar() + ' ' + this.carta3.mostrar())
    }

    nuevaMano(c1, c2, c3) {
        this.carta1 = new Carta(c1.id, c1.valorNumero, c1.palo, c1.jerarquia, c1.locacion)
        this.carta2 = new Carta(c2.id, c2.valorNumero, c2.palo, c2.jerarquia, c2.locacion)
        this.carta3 = new Carta(c3.id, c3.valorNumero, c3.palo, c3.jerarquia, c3.locacion)
        this.cartasMano = [c1, c2, c3]
    }

    sumarPuntos(puntos) {
        this.puntos += puntos
    }

    jugarCarta(idDeCarta) {
        const cartasRestantes = this.cartasMano.filter(carta => carta.id != idDeCarta)
        this.cartasMano = cartasRestantes
    }

    envido() {
        return 'envido'
    }

    realEnvido() {
        return 'real envido'
    }

    truco() {
        return 'truco'
    }

    irseAlMazo() {
        this.cartasMano = []
    }

    quiero() {
        return true
    }

    noQuiero() {
        return false
    }

    cantarTantos() {
        const puntosBase = 20
        let opcion1 = 0
        let opcion2 = 0
        let opcion3 = 0

        if (this.carta1.palo == this.carta2.palo) {
            opcion1 = puntosBase
            if (this.carta1.valorNumero < 10) {
                opcion1 += this.carta1.valorNumero
            }

            if (this.carta2.valorNumero < 10) {
                opcion1 += this.carta2.valorNumero
            }
        }

        if (this.carta1.palo == this.carta3.palo) {
            opcion2 = puntosBase
            if (this.carta1.valorNumero < 10) {
                opcion2 += this.carta1.valorNumero
            }

            if (this.carta3.valorNumero < 10) {
                opcion2 += this.carta3.valorNumero
            }

        }

        if (this.carta3.palo == this.carta2.palo) {
            opcion3 = puntosBase
            if (this.carta3.valorNumero < 10) {
                opcion3 += this.carta3.valorNumero
            }

            if (this.carta2.valorNumero < 10) {
                opcion3 += this.carta2.valorNumero
            }
        }

        return Math.max(opcion1, opcion2, opcion3)
    }

    cantarFlor() {
        if (this.carta1.palo == this.carta2.palo & this.carta1.palo == this.carta3.palo) {
            return "Flor"
        }
        else {
            return "Las cartas no son todas del mismo palo"
        }
    }

}