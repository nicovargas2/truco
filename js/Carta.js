class Carta {
    constructor(id, valorNumero, palo, jerarquia) {
        this.id = id
        this.valorNumero = valorNumero
        this.palo = palo
        this.jerarquia = jerarquia
    }

    mostrar() {
        return this.valorNumero + '-' + this.palo
    }
}