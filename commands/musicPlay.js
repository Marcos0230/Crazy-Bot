const Discord = require('discord.js')
const ytdl = require('ytdl-core')

var list = []

module.exports = {
    run: async (message, args) => {
        if(message.member.voice.channel){
            let args = message.content.split(" ")

            if(args[1] == undefined || !args[1].startsWith("https://www.youtube.com/watch?v=")){
                message.reply("Lien invalide ou mal fourni.")
            }
            else {
                if(list.length > 0){
                    list.push(args[1])
                    message.reply("Vidéo ajoutée à la liste d'attente !")
                }
                else {
                    list.push(args[1])
                    message.reply("Vidéo ajoutée à la liste d'attente !")

                    message.member.voice.channel.join().then(connection => {
                        playMusic(connection)

                        connection.on("disconnect", () => {
                            list = []
                        })

                    }).catch(err => {
                        message.reply("Erreur lors de la connexion : " + err)
                    })

                }
            }
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

function playMusic(connection){
    let dispatcher = connection.play(ytdl(list[0], { quality: "highestaudio"}))

    dispatcher.on("finish", () => {
        list.shift()
        dispatcher.destroy()

        if(list.length > 0){
            playMusic(connection)
        }
        else {
            connection.disconnect()
        }
    })

    dispatcher.on("error", err => {
        console.log("Erreur de dispatcher : " + err)
        dispatcher.destroy()
        connection.disconnect()
    })
}