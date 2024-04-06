class Jugador {
    constructor(nombre) {
        this.nombre = nombre
        this.puntos = 0
        this.habilitadoAJugar = false
        this.esMano = false
        this.deboMostrarMisCartasAlfinal = false
        this.tantos = 0
    }

    mostrarDatos() {
        console.log('Nombre jugador: ' + this.nombre + ' Puntos: ' + this.puntos)
        console.log('Cartas: ' + this.cartasMano[0].mostrar() + ' ' + this.cartasMano[1].mostrar() + ' ' + this.cartasMano[2].mostrar())
    }

    nuevaMano(c1, c2, c3) {
        this.cartasMano = [c1, c2, c3]
        this.tantos = this.cantarTantos()
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

        if (this.cartasMano[0].palo == this.cartasMano[1].palo) {
            opcion1 = puntosBase
            if (this.cartasMano[0].valorNumero < 10) {
                opcion1 += this.cartasMano[0].valorNumero
            }

            if (this.cartasMano[1].valorNumero < 10) {
                opcion1 += this.cartasMano[1].valorNumero
            }
        }

        if (this.cartasMano[0].palo == this.cartasMano[2].palo) {
            opcion2 = puntosBase
            if (this.cartasMano[0].valorNumero < 10) {
                opcion2 += this.cartasMano[0].valorNumero
            }

            if (this.cartasMano[2].valorNumero < 10) {
                opcion2 += this.cartasMano[2].valorNumero
            }

        }

        if (this.cartasMano[2].palo == this.cartasMano[1].palo) {
            opcion3 = puntosBase
            if (this.cartasMano[2].valorNumero < 10) {
                opcion3 += this.cartasMano[2].valorNumero
            }

            if (this.cartasMano[1].valorNumero < 10) {
                opcion3 += this.cartasMano[1].valorNumero
            }
        }

        return Math.max(opcion1, opcion2, opcion3)
    }


    tengoFlor() {
        const palo = this.cartasMano[0].palo

        function checkPalo(p) {
            return p.palo == palo;
        }

        return this.cartasMano.every(checkPalo);
    }

}