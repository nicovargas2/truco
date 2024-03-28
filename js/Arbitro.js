class Arbitro {
    constructor() {
        this.esManoElBot = false
        this.turnoDelBot = false
        this.envidoCantado = false
        this.florCantada = false
        this.trucoCantado = false
        this.ronda1Terminada = false
        this.ronda2Terminada = false
        this.ronda3Terminada = false
        this.ganadorRonda1 = ""
        this.ganadorRonda2 = ""
        this.ganadorRonda3 = ""
        this.cartasJugadasBot = []
        this.cartasJugadasJugadorRival = []
    }

    agregarCartaJugadaBot(carta) {
        this.cartasJugadasBot.push(carta)
    }

    agregarCartaJugadaJugadorRival(carta) {
        this.cartasJugadasJugadorRival.push(carta)
    }

    evaluarRondas() {
        if (!this.ronda1Terminada) {
            if (this.ronda2Terminada) {
                if (this.ronda3Terminada) {
                    console.log('Rondas terminadas')
                } else {
                    this.evaluarRonda3()
                }//fin if ronda3Terminada
            } else {
                this.evaluarRonda2()
            }//fin if ronda2Terminada
        } else {
            this.evaluarRonda1()
        }//fin if ronda1Terminada
    }//fin rutina


    evaluarRonda1() {
        if (bot.cartasMano.length == 2 & jugadorRival.cartasMano.length == 2) {
            this.ronda1Terminada = true
            //falta evaluar ganador
        }
    }

    evaluarRonda2() {
        if (bot.cartasMano.length == 1 & jugadorRival.cartasMano.length == 1) {
            this.ronda1Terminada = true
            //falta evaluar ganador
        }
    }
    evaluarRonda3() {
        if (bot.cartasMano.length == 0 & jugadorRival.cartasMano.length == 0) {
            this.ronda1Terminada = true
            //falta evaluar ganador
        }
    }

    nuevaMano() {
        this.envidoCantado = false
        this.florCantada = false
        this.trucoCantado = false
        this.ronda1Terminada = false
        this.ronda2Terminada = false
        this.ronda3Terminada = false
        this.ganadorRonda1 = ""
        this.ganadorRonda2 = ""
        this.ganadorRonda3 = ""
        this.cartasJugadasBot = []
        this.cartasJugadasJugadorRival = []

        let botDelLocalStorage = ''
        let botParseado = ''
        let quienInicia = true
        try {
            botDelLocalStorage = localStorage.getItem('bot')
            botParseado = JSON.parse(botDelLocalStorage)
            quienInicia = botParseado.esMano
        } catch (error) {

        } finally {
            if (quienInicia) {
                this.esManoElBot = false
                this.turnoDelBot = false
                bot.esMano = false
                bot.habilitadoAJugar = false

                jugadorRival.esMano = true
                jugadorRival.habilitadoAJugar = true

            } else {
                this.esManoElBot = true
                this.turnoDelBot = true
                bot.esMano = true
                bot.habilitadoAJugar = true

                jugadorRival.esMano = false
                jugadorRival.habilitadoAJugar = false
            }
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

        this.persistirEnLocalStorage()
    }

    controladorDeTurno() {
        if (this.turnoDelBot) {
            this.turnoDelBot = false
            bot.habilitadoAJugar = false
            jugadorRival.habilitadoAJugar = true
        } else {
            this.turnoDelBot = true
            bot.habilitadoAJugar = true
            jugadorRival.habilitadoAJugar = false
        }

        this.persistirEnLocalStorage()
    }

    persistirEnLocalStorage() {
        const jsonBot = JSON.stringify(bot)
        const jsonJugadorRival = JSON.stringify(jugadorRival)

        localStorage.setItem('juegoEnCurso', true)
        localStorage.setItem('bot', jsonBot)
        localStorage.setItem('jugadorRival', jsonJugadorRival)

        const jsonArbitro = JSON.stringify(arbitro)
        localStorage.setItem('arbitro', jsonArbitro)
    }

    hostDiceEnvido(tantosBot) {

        Swal.fire({
            title: "El host cantó envido",
            showDenyButton: true,
            confirmButtonText: "Quiero!",
            denyButtonText: `No quiero.`,
            showCancelButton: true,
            cancelButtonText: `tengo Flor!`,
            icon: "question"
        }).then((result) => {
            if (result.isConfirmed) {
                let tantosJugadorRival = jugadorRival.cantarTantos()
                let mensaje = bot.nombre + ' tiene: ' + (tantosBot).toString() + ', jugador ' + jugadorRival.nombre + ' tiene: ' + tantosJugadorRival
                Swal.fire("Ok!", mensaje, "success");
                this.resolverTantos(tantosBot, tantosJugadorRival)
            } else if (result.isDenied) {
                Swal.fire("No querido", "1 punto para el Host", "info");
                bot.sumarPuntos(1)
                this.persistirEnLocalStorage()
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire("Flor!!", "Recuerde mostrar las cartas al final", "info");
                this.florCantada = true
                this.persistirEnLocalStorage()
            }
        });
        this.controladorDeTurno()
    }

    hostDiceFlor() {
        Swal.fire({
            title: "El host cantó Flor!",
            icon: "info"
        });
        this.persistirEnLocalStorage()
    }

    resolverTantos(tantosBot, tantosJugadorRival) {
        if (this.esManoElBot) {
            if (tantosBot >= tantosJugadorRival) {
                bot.sumarPuntos(2)
            } else {
                jugadorRival.sumarPuntos(2)
            }
        } else {
            if (tantosJugadorRival >= tantosBot) {
                jugadorRival.sumarPuntos(2)
            } else {
                bot.sumarPuntos(2)
            }
        }

        this.persistirEnLocalStorage()
    }
}
