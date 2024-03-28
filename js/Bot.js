class Bot extends Jugador {
    constructor() {
        super('Host')

        const preguntarSiEsElTurnoDelBot = () => {
            return new Promise((resolve, reject) => {
                setInterval(() => {
                    console.log('ya es mi turno?')
                    console.log(arbitro.turnoDelBot)
                    if (arbitro.turnoDelBot) {
                        resolve()
                    }
                }, 2000);
            })
        }

        const preguntar = preguntarSiEsElTurnoDelBot()
        preguntar
            .then(() => {
                this.juegue()
            })
            .catch((error) => { console.log(error) })
    }


    juegue() {
        if (arbitro.ronda1Terminada) {
            if (arbitro.ronda2Terminada) {
                if (arbitro.ronda1Terminada) {
                    //jugar la ronda 3

                } else {
                    //jugar la ronda 2
                }
            }
        } else {
            //jugar la ronda 1
            if (arbitro.envidoCantado || arbitro.florCantada) {
                this.jugarUnaCarta()
            } else {
                if (this.cantarFlor() == 'Flor') {
                    this.deboMostrarMisCartasAlfinal = true
                    this.flor()
                } else {
                    this.jugarEnvido()
                }
            }
        }
    }

    jugarUnaCarta() {

    }

    jugarEnvido() {
        const limiteMinEnvido = 20
        if (this.cantarTantos() >= limiteMinEnvido) {
            arbitro.hostDiceEnvido(bot.cantarTantos())
        }
    }

    flor() {
        arbitro.hostDiceFlor()
    }
}