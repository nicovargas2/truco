class Arbitro {
    constructor() {
        this.esManoElBot = false
        this.esManoElJugadorRival = true
        this.ganadorRonda1 = ""
        this.ganadorRonda2 = ""
        this.ganadorRonda3 = ""
    }

    nuevaMano() {
        if (this.esManoElBot) {
            this.esManoElBot = false
            this.esManoElJugadorRival = true
        } else {
            this.esManoElBot = true
            this.esManoElJugadorRival = false
        }

        console.log('Nueva mano')
        const mazo = new Mazo()
        mazo.mezclar()
        bot.nuevaMano(mazo.repartirUnaCarta(), mazo.repartirUnaCarta(), mazo.repartirUnaCarta())
        bot.cartasMano[0].locacion = "../Truco/img/back.jpg"
        bot.cartasMano[1].locacion = "../Truco/img/back.jpg"
        bot.cartasMano[2].locacion = "../Truco/img/back.jpg"
        jugadorRival.nuevaMano(mazo.repartirUnaCarta(), mazo.repartirUnaCarta(), mazo.repartirUnaCarta())
        //bot.mostrarDatos()
        //jugadorRival.mostrarDatos()

    }

    //Debe haber una funcion aca que controle los turnos
    controladorDeTurno() {

    }

    //graba en LocalStorage los datos del bot y del jugador
    //y los puntos
    persistirEnLocalStorage() {
        localStorage.setItem('partidaEnCurso', 'partidaEnCurso')
        localStorage.setItem('bot', bot)
        localStorage.setItem('jugadorRival', jugadorRival)
    }
    //las cartas jugadas

    hostDiceEnvido(tantos) {

        Swal.fire({
            title: "El host cantó envido",
            showDenyButton: true,
            confirmButtonText: "Quiero!",
            denyButtonText: `No quiero.`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire("Ok!", (tantos).toString(), "success");
            } else if (result.isDenied) {
                Swal.fire("No querido", "", "info");
            }
        });
    }
}
