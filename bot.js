const Discord = require('discord.js');//
const client = new Discord.Client();//
const ayarlar = require('./ayarlar.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const { Client, Util } = require('discord.js');//
const fs = require('fs');//
const db = require('quick.db');//
require('discord-buttons')(client); // bunu ekleyin eklemezseniz çalışmaz
const express = require('express');//
require('./util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//
const ms = require('ms');//
const tags = require('common-tags')
const tooken = process.env.token
const interactions = require('discord-slash-commands-client');
//
client.interactions = new interactions.Client(tooken,"848521843018432573");

var prefix = ayarlar.prefix;//
//
const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./komutlar/', (err, files) => {//
    if (err) console.error(err);//
    log(`‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
    ${files.length} komut yüklenecek.
‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒`);//

    files.forEach(f => {//
        let props = require(`./komutlar/${f}`);//
        log(`[KOMUT] | ${props.help.name} Eklendi.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.token);

//------------------------------------------------------------------------------------------------------------\\



//------------------------------------------------------------------------------------------------------------\\


//------------------------------------------------------------------------------------------------------------\\




//--------------------------------------------------------------------------------------\\

client.on('guildMemberAdd', async(member) => {
let rol = member.guild.roles.cache.find(r => r.name === "CEZALI ROLÜNÜN ADI NEYSE YAZ");
let cezalımı = db.fetch(`cezali_${member.guild.id + member.id}`)
let sürejail = db.fetch(`süreJail_${member.id + member.guild.id}`)
if (!cezalımı) return;
if (cezalımı === "cezali") {
member.roles.add(ayarlar.JailCezalıRol)
 
member.send("Cezalıyken Sunucudan Çıktığın için Yeniden Cezalı Rolü Verildi!")
 setTimeout(function(){
    // msg.channel.send(`<@${user.id}> Muten açıldı.`)
db.delete(`cezali_${member.guild.id + member.id}`)
    member.send(`<@${member.id}> Cezan açıldı.`)
    member.roles.remove('cezalı rol id');
  }, ms(sürejail));
}
})

//--------------------------------------------------------------------------------------\\

client.on('guildMemberAdd', async(member) => {
let mute = member.guild.roles.cache.find(r => r.name === "MUTELİ ROLÜNÜN ADI NEYSE YAZ");
let mutelimi = db.fetch(`muteli_${member.guild.id + member.id}`)
let süre = db.fetch(`süre_${member.id + member.guild.id}`)
if (!mutelimi) return;
if (mutelimi == "muteli") {
member.roles.add(ayarlar.MuteliRol)
 
member.send("Muteliyken Sunucudan Çıktığın için Yeniden Mutelendin!")
 setTimeout(function(){
    // msg.channel.send(`<@${user.id}> Muten açıldı.`)
db.delete(`muteli_${member.guild.id + member.id}`)
    member.send(`<@${member.id}> Muten açıldı.`)
    member.roles.remove('muteli rol id');
  }, ms(süre));
}
})

//--------------------------------------------------------------------------------------\\


client.on('guildMemberAdd', async member => {
const data = require('quick.db')
const asd = data.fetch(`${member.guild.id}.jail.${member.id}`)
if(asd) {
let data2 = await data.fetch(`jailrol_${member.guild.id}`)
let rol = member.guild.roles.cache.get(data2)
if(!rol) return;
let kişi = member.guild.members.cache.get(member.id)
kişi.roles.add(rol.id);
kişi.roles.cache.forEach(r => {
kişi.roles.remove(r.id)
data.set(`${member.guild.id}.jail.${kişi.id}.roles.${r.id}`, r.id )})
    data.set(`${member.guild.id}.jail.${kişi.id}`)
  const wasted = new Discord.MessageEmbed()
  .setAuthor(member.user.tag, member.user.avatarURL({ dynamic : true }))
  .setColor(`#0x800d0d`)
  .setDescription(`Dostum hadi ama !!! Jaildan Kaçamazsın ikimizde birbirimizi kandırmayalım...!`)
  .setTimestamp()
    member.send(wasted)
} 
  
  
})

//--------------------------------------------------------------------------------------\\

client.on("message", async msg => {
  
  
 const i = await db.fetch(`kufur_${msg.guild.id}`)
    if (i == "acik") {
        const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
        if (kufur.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                          
                      return msg.channel.send(new Discord.MessageEmbed().setDescription(`${msg.author} Bu sunucuda küfür filtresi etkin.`).setColor('0x800d0d').setAuthor(msg.member.displayName, msg.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    if (!i) return;
});

client.on("messageUpdate", (oldMessage, newMessage) => {
  
  
 const i = db.fetch(`${oldMessage.guild.id}.kufur`)
    if (i) {
        const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq","amguard","seksüel","sekssüel"];
        if (kufur.some(word => newMessage.content.includes(word))) {
          try {
            if (!oldMessage.member.hasPermission("BAN_MEMBERS")) {
                  oldMessage.delete();
                          
                      return oldMessage.channel.send(new Discord.MessageEmbed().setDescription(`${oldMessage.author} Bu sunucuda küfür filtresi etkin.`).setColor('0x800d0d').setAuthor(oldMessage.member.displayName, oldMessage.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    if (!i) return;
});


//--------------------------------------------------------------------------------------\\


//--------------------------------------------------------------------------------------\\


//--------------------------------------------------------------------------------------\\

client.on('messageDelete', message => {
const embed = new Discord.MessageEmbed()
.setTitle("Message has deleted!")
.addField("Deleted by:",`${message.member}`)
.addField(`Message: ${message}`,`By: ${message.author.username}`)
.setDescription(`Channel: ${message.channel}`)
.setTimestamp()
message.guild.channels.cache.get("731136253847928963").send(embed)
})

client.on("message", async msg => {

        const reklam = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "http", ".gl", ".org", ".com.tr", ".biz", ".rf.gd", ".az", ".party", "discord.gg",];
        if (reklam.some(word => msg.content.includes(word))) {
          try {
            msg.delete()
           if(msg.channel.id !== "676107507676217395") {
            const limitt = db.get(`limitt12332333.${msg.author.id}`) || 0
    await db.add(`limitt12332333.${msg.author.id}`,1)
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
              const nullll = null
             
                   
if(limitt > 1) { 
      msg.member.roles.add("603622642737741828")
              msg.channel.send(`${msg.member}, you got maximum warnings so I had to mute you!`)

          

} else {

                  return msg.reply(`I can't let you advertise here! If you continue I will have to mute you. ${limitt} / 2`)


     
           
                                 
 
            }}      }        
          } catch(err) {
            console.log(err);
          }
        }
    });
client.on('clickButton', async (button) => {
  if(button.id === "eheh") {
    if (button.guild.id !== "721046034851037354") {
      
      button.reply.send("This can't be used!",true)
    } else {
    await button.reply.send(`${button.clicker.member}, başarıyla <@&752616051606290503> rolünü aldınız!`, true)
    button.clicker.member.roles.add("752616051606290503")
  }
}})
client.on('clickButton', async (button) => {
  if (button.id === "eheheh") {
    const sebep = await db.fetch(`sebep.${button.clicker.member.id}`) || "Hapis sebebiniz bulunamadı."

await button.reply.send(`Burada olma sebebiniz: ${sebep}`, true);
  
  }

         
         
})

client.on('ready', () => {
client.guilds.cache.forEach(guild => {
guild.members.cache.forEach(async member => {
const fetch = await db.fetch(member.user.id);


if(!fetch) return;
if((Date.now() <= fetch.end) || fetch) {
  const number = fetch.number
let kalan = fetch.end - Date.now();
let logChannelID = '847046050749087785'; // sizin log kanalızın idsi
let logChannel = await guild.channels.cache.get(logChannelID);
setTimeout(() => {
const embed = new Discord.MessageEmbed()
.setAuthor(fetch.moderatorUsername, fetch.moderatorAvatarURL);
db.set(`${number}`, {
  isactive: "no"
});
return member.roles.remove('603622642737741828').then(() => db.delete(member.user.id) && logChannel.send(embed.setColor('GREEN').setTitle('Got unmuted.').setDescription(`**• Was By**: <@!${fetch.moderatorID}>
**• Person**: <@!${member.user.id}>
**• Reason**: ${fetch.reason}`)));
}, kalan);
};
});
});
});


client.on('clickButton', async (button) =>  {
  const fetch = await db.fetch(button.clicker.member.user.id);
  const by = fetch.moderatorUsername || 0
  const reason = fetch.reason || 0
  const number = fetch.number
  const until = fetch.e || 0
  if (button.id === "muteeee") {
    const embed = new Discord.MessageEmbed()
    .setTitle("Mute")
    
    .addField("By:",`${by}`)
    
    .addField("Until",`${until}`)
    
    .addField("Reason:",`${reason}`)
    
    .addField("Number:",`#${number}`)
    
    .setColor("YELLOW")
    button.reply.send(embed,true)
  }
})