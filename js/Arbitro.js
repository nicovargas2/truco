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
        this.AlTotalDePuntos = localStorage.getItem('puntos')
    }

    agregarCartaJugadaBot(carta) {
        this.cartasJugadasBot.push(carta)
    }

    agregarCartaJugadaJugadorRival(idCarta) {
        let resultado = ''
        jugadorRival.cartasMano.forEach((element) => {
            if (element.id == idCarta) {
                resultado = element
            }
        });
        this.cartasJugadasJugadorRival.push(resultado)
    }

    esconderBotonFlorJugadorRival() {
        const buttonFlor = document.getElementById('flor')
        if (buttonFlor) {
            buttonFlor.hidden = true
        }
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
            buttonTruco.addEventListener('click', () => {
                arbitro.cantaleTrucoAlBot()
                this.ocultarBotonTrucoJugadorRival()
            })
            buttonTruco.classList.add('rounded-md', 'bg-indigo-600', 'm-1', 'px-3', 'py-2', 'text-sm', 'font-semibold', 'text-white', 'hover:bg-indigo-500', 'focus-visible:outline', 'focus-visible:outline-2', 'focus-visible:outline-offset-2', 'focus-visible:outline-indigo-600')
            AccionesJugador.appendChild(buttonTruco)
        }

    }

    nuevaMano() {
        const juegoEnCurso = localStorage.getItem('juegoEnCurso')
        if (juegoEnCurso) {
            const botLS = JSON.parse(localStorage.getItem('bot'))
            const jugadorRivalLS = JSON.parse(localStorage.getItem('jugadorRival'))
            bot.puntos = botLS.puntos
            jugadorRival.puntos = jugadorRivalLS.puntos
            this.reflejarTantos()
        }

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
        jugadorRival.nuevaMano(mazo.repartirUnaCarta(), mazo.repartirUnaCarta(), mazo.repartirUnaCarta())
        this.persistirEnLocalStorage()
    }

    controladorDeRondas() {
        if (bot.cartasMano.length == 2 && jugadorRival.cartasMano.length == 2) {
            this.ronda1Terminada = true

            if (this.cartasJugadasBot[0].jerarquia < this.cartasJugadasJugadorRival[0].jerarquia) {
                this.ganadorRonda1 = 'host'
                this.turnoDelBot = true
                bot.habilitadoAJugar = true
                jugadorRival.habilitadoAJugar = false
            } else if (this.cartasJugadasBot[0].jerarquia > this.cartasJugadasJugadorRival[0].jerarquia) {
                this.ganadorRonda1 = 'rival'
                this.turnoDelBot = false
                bot.habilitadoAJugar = false
                jugadorRival.habilitadoAJugar = true
            } else {
                this.ganadorRonda1 = 'empate'
            }

            this.esconderBotonEnvidoJugadorRival()
            this.esconderBotonFlorJugadorRival()
            this.mostrarBotonTrucoJugadorRival()
        }

        if (bot.cartasMano.length == 1 && jugadorRival.cartasMano.length == 1) {
            this.ronda2Terminada = true
            if (this.cartasJugadasBot[1].jerarquia < this.cartasJugadasJugadorRival[1].jerarquia) {
                this.ganadorRonda2 = 'host'
                this.turnoDelBot = true
                bot.habilitadoAJugar = true
                jugadorRival.habilitadoAJugar = false
            } else if (this.cartasJugadasBot[1].jerarquia > this.cartasJugadasJugadorRival[1].jerarquia) {
                this.ganadorRonda2 = 'rival'
                this.turnoDelBot = false
                bot.habilitadoAJugar = false
                jugadorRival.habilitadoAJugar = true
            } else {
                this.ganadorRonda2 = 'empate'
            }
        }

        if (bot.cartasMano.length == 0 && jugadorRival.cartasMano.length == 0) {
            this.ronda3Terminada = true
            if (this.cartasJugadasBot[2].jerarquia < this.cartasJugadasJugadorRival[2].jerarquia) {
                this.ganadorRonda3 = 'host'
            } else if (this.cartasJugadasBot[2].jerarquia > this.cartasJugadasJugadorRival[2].jerarquia) {
                this.ganadorRonda3 = 'rival'
            } else {
                this.ganadorRonda3 = 'empate'
            }
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

        if (this.trucoCantado == false) {
            this.calculoTantosPartida()
        }
    }

    calculoTantosPartida() {
        let contadorRondaGanadaRival = 0
        let contadorRondaGanadaHost = 0

        if (this.ganadorRonda1 == 'rival') {
            contadorRondaGanadaRival += 1
        }
        if (this.ganadorRonda2 == 'rival') {
            contadorRondaGanadaRival += 1
        }
        if (this.ganadorRonda3 == 'rival') {
            contadorRondaGanadaRival += 1
        }

        if (this.ganadorRonda1 == 'host') {
            contadorRondaGanadaHost += 1
        }
        if (this.ganadorRonda2 == 'host') {
            contadorRondaGanadaHost += 1
        }
        if (this.ganadorRonda3 == 'host') {
            contadorRondaGanadaHost += 1
        }

        if (contadorRondaGanadaRival > contadorRondaGanadaHost) {
            //1 punto para el Rival
            Toastify({
                text: "Ganaste 1 tanto",
                duration: 2000,
                style: {
                    background: "linear-gradient(to right, #ed1f11, #c7308f)",
                },
            }).showToast();
            jugadorRival.sumarPuntos(1)
            this.reflejarTantos()
            this.persistirEnLocalStorage()

        } else {
            //1 punto para el host

            Toastify({
                text: "1 tanto para " + bot.nombre,
                duration: 2000,
                style: {
                    background: "linear-gradient(to right, #ed1f11, #c7308f)",
                },
            }).showToast();
            bot.sumarPuntos(1)
            this.reflejarTantos()
            this.persistirEnLocalStorage()
        }
    }

    cantaleEnvidoAlBot() {
        bot.decidirEnvido()
    }

    envidoNoQuerido() {
        jugadorRival.sumarPuntos(1)
        this.reflejarTantos()
        this.persistirEnLocalStorage()
    }

    cantaleTrucoAlBot() {
        this.trucoCantado = true
        bot.decidirTruco()
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

    hostDiceEnvido() {
        this.envidoCantado = true

        if (conFlor) {
            Swal.fire({
                title: "El host cantó envido",
                allowOutsideClick: false,
                showDenyButton: true,
                confirmButtonText: "Quiero!",
                denyButtonText: `No quiero.`,
                showCancelButton: true,
                cancelButtonText: `Tengo Flor!`,
                icon: "question"
            }).then((result) => {
                if (result.isConfirmed) {
                    let mensaje = bot.nombre + ' tiene: ' + bot.tantos.toString() + ', jugador ' + jugadorRival.nombre + ' tiene: ' + jugadorRival.tantos
                    Swal.fire("Ok!", mensaje, "success");
                    this.resolverTantos(bot.tantos, jugadorRival.tantos)
                } else if (result.isDenied) {
                    Swal.fire("No querido", "1 punto para el Host", "info");
                    bot.sumarPuntos(1)
                    this.reflejarTantos()
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    if (jugadorRival.tengoFlor()) {
                        Swal.fire({
                            title: "Flor!",
                            icon: "info"
                        });
                        jugadorRival.sumarPuntos(3)
                        this.reflejarTantos()
                        this.esconderBotonFlorJugadorRival()
                    } else {
                        Swal.fire("Usted no tiene Flor!!", "Pierde 3 puntos", "info");
                        this.esconderBotonFlorJugadorRival()
                        bot.sumarPuntos(3)
                        this.reflejarTantos()
                    }
                }
            }).finally(() => {
                this.esconderBotonEnvidoJugadorRival()
                this.esconderBotonFlorJugadorRival()
                this.reflejarTantos()
                this.persistirEnLocalStorage()
            });
        } else {

            Swal.fire({
                title: "El host cantó envido",
                showDenyButton: true,
                confirmButtonText: "Quiero!",
                denyButtonText: `No quiero.`,
                icon: "question"
            }).then((result) => {
                if (result.isConfirmed) {
                    let mensaje = bot.nombre + ' tiene: ' + bot.tantos.toString() + ', jugador ' + jugadorRival.nombre + ' tiene: ' + jugadorRival.tantos
                    Swal.fire("Ok!", mensaje, "success");
                    this.resolverTantos(bot.tantos, jugadorRival.tantos)
                } else {
                    Swal.fire("No querido", "1 punto para el Host", "info");
                    bot.sumarPuntos(1)
                    this.reflejarTantos()
                }
            }).finally(() => {
                this.esconderBotonEnvidoJugadorRival()
                this.esconderBotonFlorJugadorRival()
                this.reflejarTantos()
                this.persistirEnLocalStorage()
            });
        }

    }

    hostDiceFlor() {
        this.esconderBotonEnvidoJugadorRival()
        this.florCantadaPorElBot = true
        Swal.fire({
            title: "El host cantó Flor!",
            icon: "info"
        });
        bot.sumarPuntos(3)
        this.reflejarTantos()
        this.persistirEnLocalStorage()
    }

    resolverTantos(tantosBot, tantosJugadorRival) {
        if (this.esManoElBot) {
            if (tantosBot >= tantosJugadorRival) {
                bot.deboMostrarMisCartasAlfinal = true
                bot.sumarPuntos(2)
            } else {
                jugadorRival.sumarPuntos(2)
            }
        } else {
            if (tantosJugadorRival >= tantosBot) {
                jugadorRival.sumarPuntos(2)
            } else {
                bot.deboMostrarMisCartasAlfinal = true
                bot.sumarPuntos(2)
            }
        }
        this.reflejarTantos()
        this.persistirEnLocalStorage()
    }

    reflejarTantos() {
        const puntosHost = document.getElementById('puntosHost')
        const puntosJugadorRival = document.getElementById('puntosJugadorRival')
        puntosHost.innerHTML = bot.puntos
        puntosJugadorRival.innerHTML = jugadorRival.puntos

        if (bot.puntos >= this.AlTotalDePuntos) {
            Swal.fire({
                icon: "error",
                title: "El host ha ganado el partido!",
                text: "El host ha conseguido todos los puntos!"
            });
        }

        if (jugadorRival.puntos >= this.AlTotalDePuntos) {
            Swal.fire({
                icon: "success",
                title: "ganaste!",
                text: "Has ganado el juego!"
            });
        }
    }
}
