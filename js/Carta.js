class Carta {
    constructor(id, valorNumero, palo, jerarquia, locacion) {
        this.id = id
        this.valorNumero = valorNumero
        this.palo = palo
        this.jerarquia = jerarquia
        this.locacion = locacion
    }

    mostrar() {
        return this.valorNumero + '-' + this.palo
    }

}