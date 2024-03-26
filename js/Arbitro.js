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
        bot.cartasMano[0].locacion = "../img/back.jpg"
        bot.cartasMano[1].locacion = "../img/back.jpg"
        bot.cartasMano[2].locacion = "../img/back.jpg"
        jugadorRival.nuevaMano(mazo.repartirUnaCarta(), mazo.repartirUnaCarta(), mazo.repartirUnaCarta())
        //bot.mostrarDatos()
        //jugadorRival.mostrarDatos()

    }

    //Debe haber una funcion aca que controle los turnos
    controladorDeTurno() {
        if (this.esManoElBot) {
            this.esManoElBot = false
            this.esManoElJugadorRival = true
        } else {
            this.esManoElBot = true
            this.esManoElJugadorRival = false
        }
    }

    //graba en LocalStorage los datos del bot y del jugador
    //y los puntos
    //las cartas jugadas
    persistirEnLocalStorage() {
        localStorage.setItem('juegoEnCurso', true)
        localStorage.setItem('bot', bot)
        localStorage.setItem('jugadorRival', jugadorRival)
    }

    hostDiceEnvido(tantos) {
        Swal.fire({
            title: "El host cantó envido",
            showDenyButton: true,
            confirmButtonText: "Quiero!",
            denyButtonText: `No quiero.`,
            icon: "question"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Ok!", (tantos).toString(), "success");
            } else if (result.isDenied) {
                Swal.fire("No querido", "", "info");
            }
        });
    }

    hostDiceFlor() {
        Swal.fire({
            title: "El host cantó Flor!",
            icon: "info"
        });
    }
}
