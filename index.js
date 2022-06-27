require('humanize-duration');
require('got');
const Discord = require('discord.js'),
    client = new Discord.Client({
        partials: ['MESSAGE', 'REACTION'],
        fetchAllMembers: true
    }),
    config = require('./config.json'),
    token = require('./token.json'),
    prefix = require('./prefix.json'),
    version = require('./version.json'),
    fs = require('fs')
const moment = require("moment")
const startTime = Date.now()
require("moment-duration-format")

client.login(token.token)
client.commands = new Discord.Collection()
client.db = require('./db.json')

client.once('ready', () => {
    console.log('Bot lancé ! Aucun problème détecté au démarrage du bot.');
});

fs.readdir('./commands', (err, files) => {
    if (err) throw err
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        const command = require(`./commands/${file}`)
        client.commands.set(command.name, command)
    })
})

client.on('message', message => {
    if (message.content.includes(token.token)) {
        message.delete()
        console.log('Le token a été envoyé sur Discord, la sécurité du bot est compromise : régénère le token du bot au plus vite !\nhttps://discord.com/developers/applications/684135354437075001/bot');
        client.users.fetch('588381876989853697').then(user => {
            user.send("Le token a été envoyé sur Discord, la sécurité du bot est compromise : régénère le token du bot au plus vite !\nhttps://discord.com/developers/applications/684135354437075001/bot").then(client => {
                client.destroy() //Not a function but still kills the client so use whatever you want.
            })
        })
    }

    if (message.type !== 'DEFAULT' || message.author.bot) return

    if (!message.member.hasPermission('MANAGE_CHANNELS') && client.db.lockedChannels.includes(message.channel.id)) return message.delete()

    const evalaccess = ["588381876989853697"]
    let clean = text => {
        if (typeof text === "string")
            return text
                .replace(/`/g, "`" + String.fromCharCode(8203))
                .replace(/@/g, "@" + String.fromCharCode(8203));
        else return text;
    };

    if (message.content.startsWith(">eval")) {
        if (!evalaccess.includes(message.author.id)) return client.users.fetch('588381876989853697').then(user => {
            user.send(`${message.author.tag} tente d'utiliser le eval, penser à prendre des mesures d'éloignement !`)
        });
        try {
            const code = message.content.substr(6);
            let evaled = eval(code);

            if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
            if (evaled.length > 2000)
                evaled =
                    "Je ne peux pas envoyer un message de plus de 2000 caractères.";
            message.channel.send(clean(evaled), {code: "xl"});
            message.react("✅");
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`\n${clean(err)}\n\`\`\``);
            message.react("❌");
        }
    }

    if (message.content.startsWith("<@684135354437075001>")) {
        message.channel.send(new Discord.MessageEmbed()
            .setDescription("Bonjour 👋 ! Je suis <@684135354437075001>, un bot multifonction crée et développé par " + config.ownerUsername + ".\n__**Prefix :**__ \`" + prefix.prefix + "\`")
            .setFooter('Faites c.help pour plus d\'infos'))
    }

    if (message.content.startsWith("<@!684135354437075001>")) {
        message.channel.send(new Discord.MessageEmbed()
            .setDescription("Bonjour 👋 ! Je suis <@684135354437075001>, un bot multifonction crée et développé par " + config.ownerUsername + ".\n__**Prefix :**__ \`" + prefix.prefix + "\`")
            .setFooter('Faites c.help pour plus d\'infos'))
    }

    const args = message.content.trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
    if (!commandName.startsWith(prefix.prefix)) return
    const command = client.commands.get(commandName.slice(prefix.prefix.length))
    if (!command) return
    if (command.guildOnly && !message.guild) return message.channel.send('Cette commande ne peut être utilisée que dans un serveur.')
    command.run(message, args, client)
})

client.on('guildMemberAdd', member => {
    member.guild.channels.cache.get(config.greeting.channel).send(`${member}`, new Discord.MessageEmbed()
        .setDescription(`${member} a rejoint le serveur. Nous sommes désormais ${member.guild.memberCount} ! 🎉`)
        .setThumbnail(member.user.displayAvatarURL())
        .setImage('https://media.discordapp.net/attachments/909767627059109908/990962659161677866/DU_fun_et_de_lamusement_a_letat_pur.png')
        .setTimestamp()
        .setColor('#00ff00'))
    member.roles.add(config.greeting.role)
})

client.on('guildMemberRemove', member => {
    member.guild.channels.cache.get(config.goodbye).send(new Discord.MessageEmbed()
        .setDescription(`${member.user.tag} a quitté le serveur... 😢`)
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()
        .setColor('#ff0000'))
})

client.on('ready', () => {
    const statuses = [
        'son développeur ' + config.ownerUsername,
        'son prefix : ' + prefix.prefix,
        'sa version : ' + version.version
    ]
    let i = 0
    setInterval(() => {
        client.user.setActivity(statuses[i], {type: 'WATCHING'})
        i = ++i % statuses.length
    }, 10000)
})

client.on('channelCreate', channel => {
    if (!channel.guild) return
    const muteRole = channel.guild.roles.cache.find(role => role.name === 'Muted')
    if (!muteRole) return
    channel.createOverwrite(muteRole, {
        SEND_MESSAGES: false,
        CONNECT: false,
        ADD_REACTIONS: false
    })
})