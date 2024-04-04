class Bot extends Jugador {
    constructor() {
        super('Host')

        this.limiteTantosEnvido = 20

        const preguntarSiEsElTurnoDelBot = () => {
            return new Promise((resolve) => {
                setInterval(() => {
                    /* con este pedacito de codigo se verifica 
                    cada vez que pregunta el bot si es su turno
                    console.log('ya es mi turno?')
                    console.log(arbitro.turnoDelBot)
                    */
                    if (arbitro.turnoDelBot) {
                        resolve()
                    }
                }, 1000);
            })
        }


        const preguntar = preguntarSiEsElTurnoDelBot()
        preguntar
            .then(
                () => {
                    this.juegue()
                })
            .catch(
                (error) => {
                    console.log(error)
                });
    }

    juegue() {
        if (arbitro.ronda1Terminada == false) {
            if (this.cantarFlor() == 'Flor' && arbitro.florCantadaPorElBot == false && conFlor) {
                this.flor()
                this.deboMostrarMisCartasAlfinal = true
                this.jugarUnaCarta()
            } else if (this.cantarTantos() >= this.limiteTantosEnvido && arbitro.envidoCantado == false && arbitro.florCantadaPorElBot == false) {
                this.jugarEnvido()
            } else {
                this.jugarUnaCarta()
            }
        }

        if (arbitro.ronda2Terminada == false) {
            this.jugarUnaCarta()
        }

        if (arbitro.ronda3Terminada == false) {
            this.jugarUnaCarta()
        }
    }

    decidirTruco() {
        if (arbitro.ronda1Terminada && arbitro.ronda2Terminada && arbitro.ronda3Terminada == false) {
            if (arbitro.ganadorRonda1 == 'host') {
                if (this.cartasMano[0].jerarquia <= 3) {
                    Toastify({
                        text: "Quiero!",
                        duration: 2000,
                        style: {
                            background: "linear-gradient(to right, #ed1f11, #c7308f)",
                        },
                    }).showToast();
                } else {
                    Toastify({
                        text: "No quiero",
                        duration: 2000,
                        style: {
                            background: "linear-gradient(to right, #ed1f11, #c7308f)",
                        },
                    }).showToast();
                    if (this.deboMostrarMisCartasAlfinal) {
                        this.jugarUnaCarta()
                    }
                }
            }
        } else {
            let aceptarTruco = true
            this.cartasMano.forEach(carta => {
                if (carta.jerarquia > 3) {
                    aceptarTruco = false
                }
            });
            if (aceptarTruco) {
                Toastify({
                    text: "Quiero!",
                    duration: 2000,
                    style: {
                        background: "linear-gradient(to right, #ed1f11, #c7308f)",
                    },
                }).showToast();
            } else {
                Toastify({
                    text: "No quiero",
                    duration: 2000,
                    style: {
                        background: "linear-gradient(to right, #ed1f11, #c7308f)",
                    },
                }).showToast();
                if (this.deboMostrarMisCartasAlfinal) {
                    this.jugarUnaCarta()
                }
            }
        }
    }

    decidirEnvido() {
        if (this.cantarFlor == 'Flor' && conFlor) {
            this.flor()
            this.deboMostrarMisCartasAlfinal = true
        } else {
            if (this.cantarTantos() >= this.limiteTantosEnvido) {
                const tantosJugadorRival = jugadorRival.cantarTantos()
                let mensaje = bot.nombre + ' tiene: ' + (this.cantarTantos()).toString() + ', jugador ' + jugadorRival.nombre + ' tiene: ' + tantosJugadorRival
                Swal.fire("Quiero!", mensaje, "success");
                arbitro.resolverTantos(this.cantarTantos(), tantosJugadorRival)
            } else {
                Swal.fire({
                    icon: "error",
                    title: "el Host dice: Envido no querido",
                    text: "1 punto para usted!"
                });
                arbitro.envidoNoQuerido()
            }
        }
    }

    jugarUnaCarta() {
        arbitro.controladorDeRondas()

        if (this.juegaRonda1()) {
            this.ponerLaCartaEnLaMesa(bot.carta1)
            arbitro.agregarCartaJugadaBot(bot.carta1)
            bot.jugarCarta(bot.cartasMano[0].id)
            arbitro.controladorDeTurno()
        }
        if (this.juegaRonda2()) {
            this.ponerLaCartaEnLaMesa(bot.carta2)
            arbitro.agregarCartaJugadaBot(bot.carta2)
            bot.jugarCarta(bot.cartasMano[0].id)
            arbitro.controladorDeTurno()
        }
        if (this.juegaRonda3()) {
            this.ponerLaCartaEnLaMesa(bot.carta3)
            arbitro.agregarCartaJugadaBot(bot.carta3)
            bot.jugarCarta(bot.cartasMano[0].id)
            arbitro.controladorDeTurno()
        }
    }

    ponerLaCartaEnLaMesa(carta) {
        const divCartaJugadaBot = document.getElementById('cartaJugadaBot1')
        const imgBotCarta = document.createElement('img')

        imgBotCarta.src = carta.locacion
        imgBotCarta.alt = carta.mostrar()
        imgBotCarta.id = carta.id
        imgBotCarta.classList.add('w-24')
        //imgBotCarta.classList.add('md:w-48')

        divCartaJugadaBot.appendChild(imgBotCarta)

        const cantidadCartas = bot.cartasMano.length
        const idDeCartaBot = 'botCarta' + cantidadCartas.toString()
        const divCartaBot = document.getElementById(idDeCartaBot)
        divCartaBot.hidden = true

    }

    jugarEnvido() {
        arbitro.hostDiceEnvido(this.cantarTantos())
    }

    flor() {
        arbitro.hostDiceFlor()
    }

    juegaRonda1 = () => { return (this.cartasMano.length == 3 && arbitro.ronda1Terminada == false && this.habilitadoAJugar) ? true : false }
    juegaRonda2 = () => { return (this.cartasMano.length == 2 && arbitro.ronda2Terminada == false && this.habilitadoAJugar) ? true : false }
    juegaRonda3 = () => { return (this.cartasMano.length == 1 && arbitro.ronda3Terminada == false && this.habilitadoAJugar) ? true : false }
}