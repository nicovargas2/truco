class Mazo {
    constructor() {
        this.mazo = [
            new Carta(1, 1, "Espada", 1, "../Truco/img/espada_1.jpg"), new Carta(2, 2, "Espada", 6, "../Truco/img/espada_2.jpg"), new Carta(3, 3, "Espada", 5, "../Truco/img/espada_3.jpg"), new Carta(4, 4, "Espada", 14, "../Truco/img/espada_4.jpg"), new Carta(5, 5, "Espada", 13, "../Truco/img/espada_5.jpg"), new Carta(6, 6, "Espada", 12, "../Truco/img/espada_6.jpg"), new Carta(7, 7, "Espada", 3, "../Truco/img/espada_7.jpg"), new Carta(8, 10, "Espada", 10, "../Truco/img/espada_10.jpg"), new Carta(9, 11, "Espada", 9, "../Truco/img/espada_11.jpg"), new Carta(10, 12, "Espada", 8, "../Truco/img/espada_12.jpg"),
            new Carta(11, 1, "Oro", 7, "../Truco/img/oro_1.jpg"), new Carta(12, 2, "Oro", 6, "../Truco/img/oro_2.jpg"), new Carta(13, 3, "Oro", 5, "../Truco/img/oro_3.jpg"), new Carta(14, 4, "Oro", 14, "../Truco/img/oro_4.jpg"), new Carta(15, 5, "Oro", 13, "../Truco/img/oro_5.jpg"), new Carta(16, 6, "Oro", 12, "../Truco/img/oro_6.jpg"), new Carta(17, 7, "Oro", 4, "../Truco/img/oro_7.jpg"), new Carta(18, 10, "Oro", 10, "../Truco/img/oro_10.jpg"), new Carta(19, 11, "Oro", 9, "../Truco/img/oro_11.jpg"), new Carta(20, 12, "Oro", 8, "../Truco/img/oro_12.jpg"),
            new Carta(21, 1, "Basto", 2, "../Truco/img/basto_1.jpg"), new Carta(22, 2, "Basto", 6, "../Truco/img/basto_2.jpg"), new Carta(23, 3, "Basto", 5, "../Truco/img/basto_3.jpg"), new Carta(24, 4, "Basto", 14, "../Truco/img/basto_4.jpg"), new Carta(25, 5, "Basto", 13, "../Truco/img/basto_5.jpg"), new Carta(26, 6, "Basto", 12, "../Truco/img/basto_6.jpg"), new Carta(27, 7, "Basto", 11, "../Truco/img/basto_7.jpg"), new Carta(28, 10, "Basto", 10, "../Truco/img/basto_10.jpg"), new Carta(29, 11, "Basto", 9, "../Truco/img/basto_11.jpg"), new Carta(30, 12, "Basto", 8, "../Truco/img/basto_12.jpg"),
            new Carta(31, 1, "Copa", 7, "../Truco/img/copa_1.jpg"), new Carta(32, 2, "Copa", 6, "../Truco/img/copa_2.jpg"), new Carta(33, 3, "Copa", 5, "../Truco/img/copa_3.jpg"), new Carta(34, 4, "Copa", 14, "../Truco/img/copa_4.jpg"), new Carta(35, 5, "Copa", 13, "../Truco/img/copa_5.jpg"), new Carta(36, 6, "Copa", 12, "../Truco/img/copa_6.jpg"), new Carta(37, 7, "Copa", 11, "../Truco/img/copa_7.jpg"), new Carta(38, 10, "Copa", 10, "../Truco/img/copa_10.jpg"), new Carta(39, 11, "Copa", 9, "../Truco/img/copa_11.jpg"), new Carta(40, 12, "Copa", 8, "../Truco/img/copa_12.jpg")]
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