class Bot extends Jugador {
    constructor(nombre) {
        super(nombre)

        this.limiteTantosEnvido = 20

        const preguntarSiEsElTurnoDelBot = () => {
            return new Promise((resolve) => {
                setInterval(() => {
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
        if (this.cartasMano.length == 3) {
            if (this.tengoFlor() && arbitro.florCantadaPorElBot == false && conFlor) {
                this.flor()
                this.deboMostrarMisCartasAlfinal = true
                this.jugarUnaCarta()
            } else if (this.tantos >= this.limiteTantosEnvido && arbitro.envidoCantado == false && arbitro.florCantadaPorElBot == false) {
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
        if (arbitro.ronda1Terminada && arbitro.ronda2Terminada == false) {
            //estamos en ronda 2
            if (arbitro.ganadorRonda1 == 'host') {
                if (this.cartasMano[0].jerarquia <= 5 && this.cartasMano[1].jerarquia <= 5) {
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
        } else if (arbitro.ronda1Terminada && arbitro.ronda2Terminada && arbitro.ronda3Terminada == false) {
            //estamos en la ultima ronda
            if (this.cartasMano.length == 0) {
                Toastify({
                    text: "No quiero",
                    duration: 2000,
                    style: {
                        background: "linear-gradient(to right, #ed1f11, #c7308f)",
                    },
                }).showToast();
            } else {
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
        }
    }

    decidirEnvido() {
        if (this.tengoFlor() && conFlor) {
            this.flor()
            this.deboMostrarMisCartasAlfinal = true
        } else {
            if (this.tantos >= this.limiteTantosEnvido) {
                let mensaje = bot.nombre + ' tiene: ' + this.tantos + ', jugador ' + jugadorRival.nombre + ' tiene: ' + jugadorRival.tantos
                Swal.fire("Quiero!", mensaje, "success");
                arbitro.resolverTantos(this.tantos, jugadorRival.tantos)
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
            let posicionCarta = this.elegirUnaCarta()

            this.ponerLaCartaEnLaMesa(bot.cartasMano[posicionCarta - 1])
            arbitro.agregarCartaJugadaBot(bot.cartasMano[posicionCarta - 1])

            bot.jugarCarta(bot.cartasMano[posicionCarta - 1].id)
            arbitro.controladorDeTurno()
        }

        if (this.juegaRonda2()) {
            let posicionCarta = this.elegirUnaCarta()

            this.ponerLaCartaEnLaMesa(bot.cartasMano[posicionCarta - 1])
            arbitro.agregarCartaJugadaBot(bot.cartasMano[posicionCarta - 1])

            bot.jugarCarta(bot.cartasMano[posicionCarta - 1].id)
            arbitro.controladorDeTurno()
        }

        if (this.juegaRonda3()) {
            let posicionCarta = this.elegirUnaCarta()

            this.ponerLaCartaEnLaMesa(bot.cartasMano[posicionCarta - 1])
            arbitro.agregarCartaJugadaBot(bot.cartasMano[posicionCarta - 1])

            bot.jugarCarta(bot.cartasMano[posicionCarta - 1].id)
            arbitro.controladorDeTurno()
        }

        arbitro.controladorDeRondas()
    }

    elegirUnaCarta() {
        let posicionCarta = 1
        if (this.cartasMano.length == 3) {
            if (this.cartasMano[1].jerarquia > this.cartasMano[0].jerarquia) {
                posicionCarta = 2
                if (this.cartasMano[2].jerarquia > this.cartasMano[1].jerarquia) {
                    posicionCarta = 3
                }
            } else {
                if (this.cartasMano[2].jerarquia > this.cartasMano[0].jerarquia) {
                    posicionCarta = 3
                }
            }
        }

        if (this.cartasMano.length == 2) {
            if (arbitro.ganadorRonda1 == 'host') {
                if (this.cartasMano[1].jerarquia > this.cartasMano[0].jerarquia) {
                    posicionCarta = 2
                }
            } else {
                if (this.cartasMano[1].jerarquia < this.cartasMano[0].jerarquia) {
                    posicionCarta = 2
                }
            }
        }

        return posicionCarta
    }

    ponerLaCartaEnLaMesa(carta) {
        const divCartaJugadaBot = document.getElementById('cartaJugadaBot1')
        const imgBotCarta = document.createElement('img')

        imgBotCarta.src = carta.locacion
        imgBotCarta.alt = carta.mostrar()
        imgBotCarta.id = carta.id
        imgBotCarta.classList.add('w-24')

        divCartaJugadaBot.appendChild(imgBotCarta)

        const cantidadCartas = bot.cartasMano.length
        const idDeCartaBot = 'botCarta' + cantidadCartas.toString()
        const divCartaBot = document.getElementById(idDeCartaBot)
        divCartaBot.hidden = true

    }

    jugarEnvido() {
        arbitro.hostDiceEnvido()
    }

    flor() {
        arbitro.hostDiceFlor()
    }

    juegaRonda1 = () => { return (this.cartasMano.length == 3 && arbitro.ronda1Terminada == false && this.habilitadoAJugar) ? true : false }
    juegaRonda2 = () => { return (this.cartasMano.length == 2 && arbitro.ronda2Terminada == false && this.habilitadoAJugar) ? true : false }
    juegaRonda3 = () => { return (this.cartasMano.length == 1 && arbitro.ronda3Terminada == false && this.habilitadoAJugar) ? true : false }
}