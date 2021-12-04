const Discord = require('discord.js')
const ytdl = require('ytdl-core')

module.exports = {
    run: (message, args) => {
        if(message.member.voice.channel){
            message.member.voice.channel.join().then(connection => {
                let args = message.content.split(" ")

                if(!args[1]){
                    message.reply("Lien de la vidéo invalide ou non fourni.")
                    connection.disconnect()
                }
                else{
                    let dispatcher = connection.play(ytdl(args[1], { quality: "highestaudio" }))

                    dispatcher.on("finish", () => {
                    dispatcher.destroy()
                    connection.disconnect() 
                })

                    dispatcher.on("error", err => {
                    console.log("Erreur de dispatcher : " + err)
                    })
                }
            }).catch(err => {
                message.reply("Erreur lors de la connexion : " + err)
            })
        }
        else {
            message.reply("Vous n'êtes pas connecter à un salon vocal !")
        }
    },
    name: 'play',
    guildOnly: true,
    help: {
        description: 'Permet de jouer une musique dans un salon vocal. Pas de permission(s) requise(s).',
        category: 'Musique',
        syntax: '<lien YouTube vers la musique que vous souhaitez écouter>'
    }
}