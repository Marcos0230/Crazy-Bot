module.exports = {
    run: async (message, client) => {
        const startTime = Date.now()

        await message.channel.send(`Ping en cours...`).then(async msg => {
            const endTime = Date.now()

            await msg.edit(`Pong! 🏓\nLatence du bot : ${endTime - startTime}ms`)
        })
    },
    name: 'ping',
    help: {
        description: 'Cette commande permet de connaître le ping du bot en ms.',
        category: "Utilitaire",
        syntax: ''
    }
}