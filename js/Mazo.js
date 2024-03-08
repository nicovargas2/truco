class Mazo {
    constructor() {
        this.mazo = [
            new Carta(1, 1, "Espada", 1), new Carta(2, 2, "Espada", 6), new Carta(3, 3, "Espada", 5), new Carta(4, 4, "Espada", 14), new Carta(5, 5, "Espada", 13), new Carta(6, 6, "Espada", 12), new Carta(7, 7, "Espada", 3), new Carta(8, 10, "Espada", 10), new Carta(9, 11, "Espada", 9), new Carta(10, 12, "Espada", 8),
            new Carta(11, 1, "Oro", 7), new Carta(12, 2, "Oro", 6), new Carta(13, 3, "Oro", 5), new Carta(14, 4, "Oro", 14), new Carta(15, 5, "Oro", 13), new Carta(16, 6, "Oro", 12), new Carta(17, 7, "Oro", 4), new Carta(18, 10, "Oro", 10), new Carta(19, 11, "Oro", 9), new Carta(20, 12, "Oro", 8),
            new Carta(21, 1, "Basto", 2), new Carta(22, 2, "Basto", 6), new Carta(23, 3, "Basto", 5), new Carta(24, 4, "Basto", 14), new Carta(25, 5, "Basto", 13), new Carta(26, 6, "Basto", 12), new Carta(27, 7, "Basto", 11), new Carta(28, 10, "Basto", 10), new Carta(29, 11, "Basto", 9), new Carta(30, 12, "Basto", 8),
            new Carta(31, 1, "Copa", 7), new Carta(32, 2, "Copa", 6), new Carta(33, 3, "Copa", 5), new Carta(34, 4, "Copa", 14), new Carta(35, 5, "Copa", 13), new Carta(36, 6, "Copa", 12), new Carta(37, 7, "Copa", 11), new Carta(38, 10, "Copa", 10), new Carta(39, 11, "Copa", 9), new Carta(40, 12, "Copa", 8)]
    }

    mezclar() {
        for (let i = 0; i < this.mazo.length; i++) {
            let j = Math.floor(Math.random() * (i + 1));
            let k = this.mazo[i];
            this.mazo[i] = this.mazo[j];
            this.mazo[j] = k;
        }
    }

    ordenar() {
        this.mazo.sort(function (a, b) { return a.id - b.id })
    }

    mostrarMazo() {
        for (let i = 0; i < this.mazo.length; i++) {
            console.log(this.mazo[i])
        }
    }

    repartirUnaCarta() {
        return this.mazo.pop()
    }
}