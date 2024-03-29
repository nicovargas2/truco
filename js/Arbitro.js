class Arbitro {
    constructor() {
        this.esManoElBot = false
        this.turnoDelBot = false
        this.envidoCantado = false
        this.florCantadaPorElBot = false
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

    esconderBotonFlorJugadorRival() {
        const buttonFlor = document.getElementById('flor')
        buttonFlor.hidden = true
    }

    esconderBotonEnvidoJugadorRival() {
        const buttonEnvido = document.getElementById('envido')
        buttonEnvido.hidden = true
    }

    ocultarBotonTrucoJugadorRival() {
        const botonTruco = document.getElementById('truco')
        if (botonTruco) {
            botonTruco.hidden = true
        }
    }

    mostrarBotonContinuar() {
        const AccionesJugador = document.getElementById('accionesJugador')
        const buttonContinuar = document.createElement('button')
        buttonContinuar.id = 'continuar'
        buttonContinuar.innerHTML = 'continuar!'
        buttonContinuar.classList.add('rounded-md', 'bg-indigo-600', 'm-1', 'px-3', 'py-2', 'text-sm', 'font-semibold', 'text-white', 'hover:bg-indigo-500', 'focus-visible:outline', 'focus-visible:outline-2', 'focus-visible:outline-offset-2', 'focus-visible:outline-indigo-600')
        buttonContinuar.addEventListener('click', () => {
            window.location.assign("./truco.html")
        })
        AccionesJugador.appendChild(buttonContinuar)
    }

    mostrarBotonTrucoJugadorRival() {
        const botonTruco = document.getElementById('truco')
        if (botonTruco) {

        } else {
            const AccionesJugador = document.getElementById('accionesJugador')
            const buttonTruco = document.createElement('button')
            buttonTruco.id = 'truco'
            buttonTruco.innerHTML = 'Truco!'
            buttonTruco.classList.add('rounded-md', 'bg-indigo-600', 'm-1', 'px-3', 'py-2', 'text-sm', 'font-semibold', 'text-white', 'hover:bg-indigo-500', 'focus-visible:outline', 'focus-visible:outline-2', 'focus-visible:outline-offset-2', 'focus-visible:outline-indigo-600')
            AccionesJugador.appendChild(buttonTruco)
        }

    }

    nuevaMano() {
        bot.deboMostrarMisCartasAlfinal = false
        jugadorRival.deboMostrarMisCartasAlfinal = false
        this.envidoCantado = false
        this.florCantadaPorElBot = false
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

    controladorDeRondas() {
        if (bot.cartasMano.length == 2 && jugadorRival.cartasMano.length == 2) {
            this.ronda1Terminada = true
            this.esconderBotonEnvidoJugadorRival()
            this.esconderBotonFlorJugadorRival()
            this.mostrarBotonTrucoJugadorRival()
        }
        if (bot.cartasMano.length == 1 && jugadorRival.cartasMano.length == 1) {
            this.ronda2Terminada = true
        }
        if (bot.cartasMano.length == 0 && jugadorRival.cartasMano.length == 0) {
            this.ronda3Terminada = true
        }

        if (this.ronda1Terminada && this.ronda2Terminada && this.ronda3Terminada) {
            const buttonContinuar = document.getElementById('continuar')
            if (!buttonContinuar) {
                this.terminarRondas()
            }
        }

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

            bot.juegue()
        }
        this.persistirEnLocalStorage()
    }

    terminarRondas() {
        this.ocultarBotonTrucoJugadorRival()
        this.mostrarBotonContinuar()
        setTimeout(() => {
            Toastify({
                text: "Rondas finalizadas, haga clic en continuar",
                duration: 2000,
                style: {
                    background: "linear-gradient(to right, #ed1f11, #c7308f)",
                },
            }).showToast();
        }, 1000);
    }

    recalculoTantos() {
        window.location.assign("./index.html")
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
        this.envidoCantado = true
        Swal.fire({
            title: "El host cantó envido",
            showDenyButton: true,
            confirmButtonText: "Quiero!",
            denyButtonText: `No quiero.`,
            showCancelButton: true,
            cancelButtonText: `Tengo Flor!`,
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
                //this.persistirEnLocalStorage()
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                if (jugadorRival.cantarFlor() == 'Flor') {
                    Swal.fire({
                        title: "Flor!",
                        icon: "info"
                    });
                    this.esconderBotonFlorJugadorRival()
                } else {
                    Swal.fire("Usted no tiene Flor!!", "Pierde 3 puntos", "info");
                    this.esconderBotonFlorJugadorRival()
                    bot.sumarPuntos(3)
                }
            }
        }).finally(() => {
            this.esconderBotonEnvidoJugadorRival()
            this.esconderBotonFlorJugadorRival()
            this.persistirEnLocalStorage()
            //this.controladorDeTurno()
        });
    }

    hostDiceFlor() {
        this.esconderBotonEnvidoJugadorRival()
        this.florCantadaPorElBot = true
        Swal.fire({
            title: "El host cantó Flor!",
            icon: "info"
        });
        this.persistirEnLocalStorage()
    }

    resolverTantos(tantosBot, tantosJugadorRival) {
        if (this.esManoElBot) {
            if (tantosBot >= tantosJugadorRival) {
                this.deboMostrarMisCartasAlfinal = true
                bot.sumarPuntos(2)
            } else {
                jugadorRival.sumarPuntos(2)
            }
        } else {
            if (tantosJugadorRival >= tantosBot) {
                jugadorRival.sumarPuntos(2)
            } else {
                this.deboMostrarMisCartasAlfinal = true
                bot.sumarPuntos(2)
            }
        }

        this.persistirEnLocalStorage()
    }
}
