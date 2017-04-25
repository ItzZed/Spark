const Discord = require("discord.js");

const token = require('./settings.json').token;
var prefix = ".";
var welcomerole;
var welcomechannel;

var fortunes = [

  "It is certain",
  "It is decidedly so",
  "Without a doubt",
  "Yes definitely",
  "You may rely on it",
  "As I see it, yes",
  "Most likely",
  "Outlook good",
  "Yes",
  "Signs point to yes",
  "Reply hazy try again",
  "Ask again later",
  "Better not tell you now",
  "Cannot predict now",
  "Concentrate and ask again",
  "Don't count on it",
  "My reply is no",
  "My sources say no",
  "Outlook not so good",
  "Very doubtful"

];

function commandIs(str, msg){

  return msg.content.toLowerCase().startsWith("." + str);

}

function pluck(array) {

    return array.map(function(item) { return item["name"]; });

}

function hasRole(mem, role) {

  if(pluck(mem.roles).includes(role)) {

    return true;

  } else {

    return false;

  }

}

var client = new Discord.Client();

client.on("ready", function(){

  console.log("Ready");

});

client.on("guildMemberAdd", function(member) {

  client.sendMessage(message, "Welcome " + member.toString() + " to " + server.name + "!");

  member.addRole(member.guild.roles.find("name", welcomerole));

});

client.on("message", function(message) {

  if(message.author.equals(client.user)) return;

  if(message.content == "dank" || message.content == "DANK" || message.content == "DANK!" || message.content == "dank!") {

    message.channel.sendMessage("Memes!");

  }

  function pmhelpmessage() {

    var embed = new Discord.RichEmbed()
      .addField("Spark Help Panel", "Spark(0.02)", true)
      .addField("Made By ItzZed", "http://bit.ly/ItzZed", true)
      .addField("Commands", "Currently has 4 Commands!")
      .addField(".help", "Shows the Help Panel!")
      .addField(".8ball (Question)", "A Magical 8Ball")
      .addField(".setwelcomerole (Role)", "Sets the Role that will be set to a New Member that has Joined!")
      .addField(".setwelcomechannel (Channel)", "Sets the Channel that will Welcome a new Member!!")
      .setColor(0x52BE80)
      .setFooter("Go Support the Creator!")
      .setThumbnail(message.author.avatarURL)
    message.channel.sendEmbed(embed);

  }

  if(!message.content.startsWith(prefix)) return;

  var args = message.content.substring(prefix.length).split(" ");

  switch (args[0].toLowerCase()) {
    case "help":
      client.sendMessage(message.author, pmhelpmessage);
    break;
    case "8ball":
      if(args[1]) message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);
      else message.channel.sendMessage("Can't Read That!");
      break;
    case "setwelcomerole":
      if(hasRole(message.member, "Bot Commander")) {
        if(args[1]) {
          welcomerole = args[1];
          message.channel.sendMessage("Set the Welcome Role to " + welcomerole +"!");
        }
      } else {
        message.channel.sendMessage("Sorry you do not have the Role 'Bot Commander'!");
      }
      break;
    case "setwelcomechannel":
      if(hasRole(message.member, "Bot Commander")) {
        if(args[1]) {
          welcomechannel = args[1];
          message.channel.sendMessage("Set the Welcome Channel to " + welcomechannel +"!");
        }
      } else {
        message.channel.sendMessage("Sorry you do not have the Role 'Bot Commander'!");
      }
      break;
    case "purge":
      if(hasRole(message.member, "Bot Commander")) {
        if(args.length >= 3) {
          message.channel.sendMessage('You Defined too Many Arguments! Usage: .purge (Number of Messages to Delete)!')
        }
      } else {
        var msg;
        if(args.length === 1) {
          msg = 2;
        } else {
          msg = parseInt(args[1]);
        }
        message.channel
      }
      break;
    default:
    message.channel.sendMessage("Invalid Command!");
  }

});

client.login(token);
