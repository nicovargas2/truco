class Jugador {
    constructor(nombre) {
        this.nombre = nombre
        this.puntos = 0
    }

    mostrarDatos() {
        console.log('Nombre jugador: ' + this.nombre + ' Puntos: ' + this.puntos)
        console.log('Cartas: ' + this.carta1.mostrar() + ' ' + this.carta2.mostrar() + ' ' + this.carta3.mostrar())
    }

    nuevaRonda(c1, c2, c3) {
        this.carta1 = new Carta(c1.id, c1.valorNumero, c1.palo, c1.jerarquia)
        this.carta2 = new Carta(c2.id, c2.valorNumero, c2.palo, c2.jerarquia)
        this.carta3 = new Carta(c3.id, c3.valorNumero, c3.palo, c3.jerarquia)
        this.cartasMano = [this.carta1, this.carta2, this.carta3]
    }

    sumarPuntos(puntos) {
        this.puntos += puntos
    }

    jugarPrimeraCarta() {
        return this.cartasMano.shift()
    }

    jugarCartaDelMedio() {
        let arrayCartaJugada = []
        if (this.cartasMano.length == 3) {
            arrayCartaJugada = this.cartasMano.splice(1, 1)
            let cartaDelMedio = new Carta(arrayCartaJugada[0].id, arrayCartaJugada[0].valorNumero, arrayCartaJugada[0].palo, arrayCartaJugada[0].jerarquia,)
            return cartaDelMedio
        }
        else {
            return arrayCartaJugada
        }
    }

    jugarUltimaCarta() {
        return this.cartasMano.pop()
    }

}