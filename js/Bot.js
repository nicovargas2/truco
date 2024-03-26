class Bot extends Jugador {
    constructor() {
        super('Host')

        const preguntarSiEsElTurnoDelBot = () => {
            return new Promise((resolve, reject) => {
                setInterval(() => {
                    console.log('ya es mi turno?')
                    if (arbitro.esManoElBot) {
                        resolve()
                    } else {
                        reject('Todavia no')
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
        if (arbitro.ganadorRonda1 == '') {
            if (this.cantarFlor() == 'Flor') {
                this.flor()
            } else {
                this.jugarEnvido()
            }

        }
    }


    jugarEnvido() {
        const limiteMinEnvido = 20
        if (this.cantarTantos() > limiteMinEnvido) {
            arbitro.hostDiceEnvido(bot.cantarTantos())
        }
    }

    flor() {
        arbitro.hostDiceFlor()
    }
}