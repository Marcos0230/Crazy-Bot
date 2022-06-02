const Discord = require('discord.js');
const got = require('got');

module.exports = {
    run: async (message) => {
        const embed = new Discord.MessageEmbed();
        got('https://www.reddit.com/r/rance/random/.json')
            .then(response => {
                const [list] = JSON.parse(response.body);
                const [post] = list.data.children;

                const permalink = post.data.permalink;
                const memeUrl = `https://reddit.com${permalink}`;
                const memeImage = post.data.url;
                const memeTitle = post.data.title;
                const memeUpvotes = post.data.ups;
                const memeNumComments = post.data.num_comments;

                embed.setTitle(`${memeTitle}`);
                embed.setURL(`${memeUrl}`);
                embed.setColor('RANDOM');
                embed.setImage(memeImage);
                embed.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`);

                message.channel.send(embed);
            })
            .catch(console.error);
    },
    name: 'meme',
    guildOnly: true,
    help: {
        description: 'Cette commande permet d\'envoyer un meme tout droit tirer de Reddit',
        category: "Fun",
        syntax: ''
    }
}