const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = "."
var fs = require('fs')
var lineReader = require('line-reader');
var async = require('async');
const firstline = require('firstline')
const generated = new Set();
bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', message => {
  if (message.channel.id === '556607372840140802') {
  if(message.author.bot) return;
  var command = message.content.toLowerCase().slice(prefix.length).split(' ')[0];

  if (command === 'test') {
    message.channel.send("Test done, bot's working")
  }

if (command === 'gen'){
  if (generated.has(message.author.id)) {
    message.channel.send("Wait 5 minute before generating another account!. - " + message.author);
} else {
  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);
  if (!args[0]) return message.reply("Please, specify the service you want!")
  var fs = require('fs');
  const filePath = __dirname+'/'+ args[0] + '.txt'
  

fs.readFile(filePath, function(err, data) { 
    if (!err) {
        data = data.toString(); 
        var position = data.toString().indexOf('\n');
        var firstLine = data.split('\n')[0];
        message.author.send(firstLine) 
        if (position != -1) { 
             data = data.substr(position + 1);
            fs.writeFile(filePath, data, function(err) {
              const embed = {
                "title": "",
                "description": "Check your dm for the account's information!",
                "color": 8519796,
                "timestamp": "",
                "footer": {
                  "icon_url": "https://i.ytimg.com/vi/L7LgJkM9Hgc/hqdefault.jpg",
                  "text": "Discord Bot from smoke#2060"
                },
                "thumbnail": {
                  "url": "https://i.ytimg.com/vi/L7LgJkM9Hgc/hqdefault.jpg"
                },
                "author": {
                  "name": "Amboras Generator",
                  "url": "https://discordapp.com",
                  "icon_url": bot.displayAvatarURL
                },
                "fields": []
              };
              message.channel.send({ embed });
              generated.add(message.author.id);
              setTimeout(() => {
                // Removes the user from the set after a minute
                generated.delete(message.author.id);
              }, 5000);
                if (err) { 
                   console.log(err);
                }
            });
        } else {
            message.channel.send("Sorry, there isn't any account avaible for that service!");
        }
    } else {
        message.channel.send("Sorry, that service doesen't exists on our database");
    }
});
}

}

if (command === "help"){
  const embed = {
    "title": "",
    "description": "Commands \n .gen Spotify -> To generate a Spotify account. \n .gen Origin -> To generate a Origin account. \n .gen Uplay -> To generate a Uplay account. \n .gen Fortnite -> To generate a Fortnite account. \n .gen Netflix -> To generate a Netflix account. ( Out of Stock )",
    "color": 8519796,
    "timestamp": "",
    "footer": {
      "icon_url": "https://i.ytimg.com/vi/L7LgJkM9Hgc/hqdefault.jpg",
      "text": "Discord Bot from smoke#2060"
    },
    "thumbnail": {
      "url": ""
    },
    "author": {
      "name": "Amboras Account Generator",
      "url": "https://discordapp.com",
      "icon_url": bot.displayAvatarURL
    },
    "fields": [
      {
        "name": "Bot made by",
        "value": "smoke#2060",
      },
      
    ]
  };
  message.channel.send({ embed });
}
if (command === "restock"){
  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);
  if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply("Sorry, you can't do it, you are not an admin!");
  if (!args[0]) return message.reply("Please, specify the service you want to restock!")
  message.channel.send("@everyone " + "**"+args[0]+"**" +" has been restocked by "+ "<@" + message.author.id + ">")
}
  }
})

client.login(process.env.BOT_TOKEN);
