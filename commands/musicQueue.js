const Discord = require('discord.js')
const ytdl = require('ytdl-core')
var list = require('./musicPlay.js')

module.exports = {
    run: async (message) => {
        message.reply("Commande en développement !")
        
        /*let msg = "**LISTE D'ATTENTE :**\n"
        for(var i = 0;i < list.length;i++){
            let name
            await ytdl.getInfo(list[i], (err, info) => {
                if(err){
                    console.log("Erreur de lien" + err)
                    list.splice(i, 1)
                }
                else{
                    name = info.title
                }
            })
            msg += "> " + i + " - " + name + "\n"
        }
        message.channel.send(msg)*/
    },
    name: 'queue',
    guildOnly: true,
    help: {
        description: 'Permet de connaitre la liste d\'attente des musiques. Pas de permission(s) requise(s).',
        category: 'Musique',
        syntax: ''
    }
}