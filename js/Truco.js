bot = new Bot()
jugadorRival = new Jugador('Nico')

console.log('Ronda1')
mazo = new Mazo()
mazo.mezclar()
bot.nuevaRonda(mazo.repartirUnaCarta(), mazo.repartirUnaCarta(), mazo.repartirUnaCarta())
jugadorRival.nuevaRonda(mazo.repartirUnaCarta(), mazo.repartirUnaCarta(), mazo.repartirUnaCarta())

//bot.mostrarDatos()
//jugadorRival.mostrarDatos()

/*
console.log('Pruebo acciones')

console.log(bot.jugarCartaDelMedio())
console.log(bot.jugarCartaDelMedio())
console.log(bot.jugarCartaDelMedio())
console.log(bot.jugarPrimeraCarta())
console.log(bot.jugarUltimaCarta())
*/


/*
console.log('Ronda2')
mazo = new Mazo()
mazo.mezclar()
bot.nuevaRonda(mazo.repartirUnaCarta(), mazo.repartirUnaCarta(), mazo.repartirUnaCarta())
jugadorRival.nuevaRonda(mazo.repartirUnaCarta(), mazo.repartirUnaCarta(), mazo.repartirUnaCarta())

bot.mostrarDatos()
jugadorRival.mostrarDatos()
*/
