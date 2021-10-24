const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const yts = require("yt-search");
const client = new Discord.Client();
const youtube = require('youtube-sr').default;
const { getData, getPreview, getTracks } = require('spotify-url-info');

const {
	prefix,
	token,
} = require('./config.json');

const queue = new Map();
var loop_ind = 0;
var loop_queue_ind = 0;
let stream;

client.once('ready', () => {
 console.log('Ready!');
});
client.once('reconnecting', () => {
 console.log('Reconnecting!');
});
client.once('disconnect', () => {
 console.log('Disconnect!');
});

client.on('message', async message => {
	if (message.author.bot || !message.guild) return;
    if (!message.content.startsWith(prefix)) {
        // Daca nu incepe cu prefix
        //message.channel.send("Nu incepe cu prefix.");
        return;
    }
	 if (message.content.startsWith(prefix)) {
        // Daca incepe cu prefix
        //message.channel.send("Incepe cu prefix.");
        const serverQueue = queue.get(message.guild.id);
        if (message.content.startsWith(`${prefix}play`) || message.content.startsWith(`${prefix}canta`) || message.content.match(`${prefix}p `)) {
            //message.channel.send("play");
            muzica(message, serverQueue);
            return;
        } else if (message.content.startsWith(`${prefix}skip`) || message.content.startsWith(`${prefix}sari`)) {
            //message.channel.send("Skip");
            skip(message, serverQueue);
            return;
        } else if (message.content.startsWith(`${prefix}loop queue`) || message.content.startsWith(`${prefix}repeta coada`)) {
            //message.channel.send("Loop queue");
            loop_queue(message, serverQueue);
            return;
        } else if (message.content.startsWith(`${prefix}loop`) || message.content.startsWith(`${prefix}repeta`)) {
            //message.channel.send("Loop");
            loop(message, serverQueue);
            return;
        } else if (message.content.startsWith(`${prefix}pause`) || message.content.startsWith(`${prefix}pauza`)) {
            //message.channel.send("Pause");
            pause(message, serverQueue);
            return;
        } else if (message.content.startsWith(`${prefix}resume`) || message.content.startsWith(`${prefix}reia`)) {
            //message.channel.send("Resume");
            resume(message, serverQueue);
            return;
        } else if (message.content.startsWith(`${prefix}search`) || message.content.startsWith(`${prefix}cauta`)) {
            //message.channel.send("search");
            ytsearch(message, serverQueue);
            return;
        } else if (message.content.startsWith(`${prefix}help`) || message.content.startsWith(`${prefix}ajutor`)) {
            //message.channel.send("Nimeni nu te poate ajuta");
            help(message);
            return;
        } else if (message.content.startsWith(`${prefix}seek`)) {
            //message.channel.send("Nimeni nu te poate ajuta");
            //seek(message,serverQueue);
            return;
	   } else if (message.content.startsWith(`${prefix}queue`) || message.content.startsWith(`${prefix}coada`)) {
            print_queue(message, serverQueue);
            return;
        } else if (message.content.startsWith(`${prefix}sef`)) {
            sef(message);
            return;
        } else if (message.content.startsWith(`${prefix}av`)) {
            av(message);
            return;
        } else if (message.content.startsWith(`${prefix}userinfo`)) {
            userinfo(message);
            return;
        } else if (message.content.startsWith(`${prefix}serverinfo`)) {
            serverinfo(message);
            return;
	} else if (message.content.startsWith(`${prefix}sterge`) || message.content.startsWith(`${prefix}d`)) {
            stergere(message);
            return;
	} else if (message.content.startsWith(`${prefix}zicala`)) {
            const zicale = [" da", "Nu dai putere oricui prost", "Important e sa si dai cand furi", "Sanatate ca noroc aveau si aia pe titanic","Asculta totul dar sa nu crezi totul","Cine se acuza se scuza","Cine nu spune nimic, nu gandeste mai putin","Esti ceea ce mananci","Prostul rade de trei ori: o data cand rad ceilalti, o data cand intelege gluma si inca o data cand isi da seama ca a ras fara sa inteleaga","Ciupercile otravitoare cresc cel mai repede","Woher comzdu?","Fii fericit cat traiesti, pentru ca mort o sa fii mult timp"];

            const rndInt = Math.floor(Math.random() * 12) + 1;
            let mesaj = zicale[rndInt];
	    if (!mesaj){
	      message.channel.send(zicale[1]);
	    }
            else {
              message.channel.send(mesaj);
	    }
            return;
        } else if (message.content.startsWith(`${prefix}stop`) || message.content.startsWith(`${prefix}opreste`) || message.content.startsWith(`${prefix}clear`)) {
            //message.channel.send("Stop");
            stop(message, serverQueue);
            return;
        }
	message.channel.send("Comanda nu este implementata!");
        return;
    }
})

client.on('voiceStateUpdate', (oldState, newState) => {
    // check if someone connects or disconnects
    if (oldState.channelID === null || typeof oldState.channelID == 'undefined') return;
    // check if the bot is disconnecting
    if (newState.id !== client.user.id) return;
    // clear the queue
    return queue.delete(oldState.guild.id);
    
});

async function muzica (message, serverQueue){
    const args = message.content.split(" ");
    if (args[1].includes("spotify")){
        let data = await getData(args[1]);
        message.content = data.name + ' ' + data.artists[0].name;// + ' ' + data.album.name;
        //console.log (message.content);
        if (data){
            execute (message,serverQueue);   
        }
        else {
            message.channel.send("Nu s-au gasit piese!");
        }
        return;   
    }
    if (args[1].includes("list")) {
       playlist(message,serverQueue);
       return;
    }
    else {
        execute(message,serverQueue);
        return;
    }
}

function executa (message, serverQueue, playlist, videosObj){
    let lenght_videos = videosObj.length;
    if (lenght_videos > 15){
        lenght_videos = 15;
    }
    let song;
    for (let i = 1; i < lenght_videos; i++) { 
        message.content = videosObj[i].title;
        song = {
                title: videosObj[i].title,
                url: videosObj[i].url,
            };
        const serverQueue = queue.get(message.guild.id);
        serverQueue.songs.push(song);
    }
}

async function playlist (message,serverQueue){
    const args = message.content.split(" ");
    try {
        const playlist = await youtube.getPlaylist(args[1]); // get playlist data 
        let videosObj = await playlist.fetch(); // songs data object
        videosObj = videosObj.videos;
        message.content = videosObj[0].title;
        execute(message,serverQueue);
        message.channel.send("Playlist-ul a fost adaugat in coada.");
        setTimeout(executa, 2000, message, serverQueue, playlist, videosObj);
        } catch (err) {
            console.error(err);
            return message.channel.send('Playlist-ul nu a putut fi gasit.');
        }
}

async function execute(message, serverQueue) {
    const args = message.content.split(" ");
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.channel.send("Trebuie sa fii conectat pe un channel de voice.");
    if (client.voice.connections.size>0) {
        const inSameChannel = client.voice.connections.some((connection) => connection.channel.id === message.member.voice.channelID)
        if (!inSameChannel) return message.channel.send('Botul este utilizat pe alt canal de voice.')
        
    }
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return message.channel.send("Nu am permisiune sa intru pe canalul de voice.");
    }
    
    //const songInfo = await ytdl.getInfo(args[1]);
    //const songInfo = await ytdl.getInfo(args[1]+' ' + args[2]+' ' + args[3]);
    let song;
    if (ytdl.validateURL(args[1])) {
        try {
            const songInfo = await ytdl.getInfo(args[1]);
            song = {
                title: songInfo.title,
                url: songInfo.video_url,
            };
	    let verif = song.url;
	    if (!verif){
                //ytsearch(message, serverQueue);
                const {videos} = await yts(args.slice(1).join(" "));
                if (!videos[0]) return message.channel.send("Nu s-au gasit piese!");
                song = {
                    title: videos[0].title,
                    url: videos[0].url,
                };
            }
        } catch (error) {
            console.error (error);
            return message.reply(error.message).catch(console.error);
        }
    }
    else {
        try {
            const {videos} = await yts(args.slice(1).join(" "));
            if (!videos[0]) return message.channel.send("Nu s-au gasit piese!");
            song = {
                title: videos[0].title,
                url: videos[0].url,
            };
        } catch (error){
            console.error(error);
            return message.reply(error.message).catch(console.error);
        }
    }
    if (!serverQueue) {
        // Creating the contract for our queue
        const queueContruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true,
        };
        // Setting the queue using our contract
        queue.set(message.guild.id, queueContruct);
        // Pushing the song to our songs array
        queueContruct.songs.push(song);
        try {
            // Here we try to join the voicechat and save our connection into our object.
            var connection = await voiceChannel.join();
            queueContruct.connection = connection;
            // Calling the play function to start a song
            play(message.guild, queueContruct.songs[0]);
            } catch (err) {
            // Printing the error message if the bot fails to join the voicechat
            console.log(err);
            queue.delete(message.guild.id);
            return message.channel.send(err);
            }        
        
    } else {
        serverQueue.songs.push(song);
        console.log(serverQueue.songs);
        return message.channel.send(`${song.title} a fost adaugat in coada.`);
        }
}
function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
            serverQueue.voiceChannel.leave();
            queue.delete(guild.id);
            return;
    }
    stream = ytdl(song.url);
    const dispatcher = serverQueue.connection
    .play(ytdl(song.url, {filter: "audioonly"}))
    .on("finish", () => {
        if (loop_ind === 0){
            serverQueue.songs.shift();
        }
        if (loop_queue_ind === 1){
            serverQueue.songs.push(song);
        }
        play(guild, serverQueue.songs[0]);
        serverQueue.playing=true;
    })
    .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Piesa curenta: **${song.title}**`);
}

function skip(message, serverQueue) {
    if (!message.member.voice.channel)
        return message.channel.send("Trebuie sa fii conectat pe voice channel.");
    if (!serverQueue)
        return message.channel.send("Nu e nimic de dat skip.");
    if (loop_ind === 1){
            serverQueue.songs.shift();
        }
    serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
    if (!message.member.voice.channel)
        return message.channel.send("Trebuie sa fii conectat pe voice channel.");
    if (!serverQueue)
        return message.channel.send("Nu e nimic de stopat.");    
    serverQueue.songs = [];
    serverQueue.playing=false;
    serverQueue.connection.dispatcher.end();
}

function loop(message, serverQueue) {
    if (!message.member.voice.channel)
        return message.channel.send("Trebuie sa fii conectat pe voice channel.");
    if (!serverQueue)
        return message.channel.send("Nu cant nimic in momentul acesta.");
    if (message[1] === 'queue'){
        message.channel.send("Coada de piese va fi reluata.");
        return;
    }
    if (loop_ind === 0){
        message.channel.send("Piesa actuala va fi repetata la nesfarsit.");
        loop_ind =1;
    } else {
        message.channel.send("Piesa actuala nu va mai fi repetata.");
        loop_ind =0;
    }
}

function loop_queue(message, serverQueue) {
    if (!message.member.voice.channel)
        return message.channel.send("Trebuie sa fii conectat pe voice channel.");
    if (!serverQueue)
        return message.channel.send("Nu cant nimic in momentul acesta.");
    if (loop_queue_ind === 0){
        message.channel.send("Coada de piese va fi reluata.");
        loop_queue_ind = 1;
        return;
    } else {
        loop_queue_ind = 0;
        message.channel.send("Coada de piese nu va mai fi reluata.");
    }
    return;
}

function pause(message, serverQueue) {
    if (!message.member.voice.channel)
        return message.channel.send("Trebuie sa fii conectat pe voice channel.");
    if (!serverQueue)
        return message.channel.send("Nu cant nimic in momentul acesta.");
    if (serverQueue.playing === true){
        serverQueue.connection.dispatcher.pause();
        serverQueue.connection.dispatcher.resume();
        serverQueue.connection.dispatcher.pause();
        serverQueue.playing = false;
        message.channel.send("Am oprit piesa.");
        return;
    } else {
        message.channel.send("Piesa este deja oprita. O voi reporni. Pe viitor, foloseste /resume");
        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();
        return;
    }

}

function resume(message, serverQueue) {
    if (!message.member.voice.channel)
        return message.channel.send("Trebuie sa fii conectat pe voice channel.");
    if (!serverQueue)
        return message.channel.send("Nu cant nimic in momentul acesta.");
    if (serverQueue.playing === false){
        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();
        message.channel.send("Am inceput iar sa cant.");
    } else {
        message.channel.send("Piesa nu este oprita.");
    }
}

function seek(message, serverQueue) {
    const args = message.content.split(" ");
    if (!message.member.voice.channel)
        return message.channel.send("Trebuie sa fii conectat pe voice channel.");
    if (!serverQueue)
        return message.channel.send("Nu cant nimic in momentul acesta.");
    if (!args[1]){
        return message.channel.send("Introdu un numar valid de secunde unde vrei sa ajungem.");
    }
    //serverQueue.connection.play(stream, {seek: args[1]*1})
    const streaming = ytdl(stream, {
        opusEncoded: true,
        seek: args[1]
    });
    serverQueue.connection.play(streaming, { type: "opus", bitrate: "auto" });

}

function print_queue(message, serverQueue) {
    if (!message.member.voice.channel)
        return message.channel.send("Trebuie sa fii conectat pe voice channel.");
    if (!serverQueue)
        return message.channel.send("Nu cant nimic in momentul acesta.");
    var i = 0;
    message.channel.send("Lista de melodii: \n");
    while (serverQueue.songs[i] != null) {
        message.channel.send(i+1 + '.' + ' ' + serverQueue.songs[i].title);
        i++;
   }

}

function sef (message) {
    const args = message.content.split(" ");
    if (!args[1]){
        return message.channel.send("Seful grupei 324CC (2021-2022) - GAFI");
    }
    else {
        if (args[1].include("serie")){
            return message.channel.send("Singurul sef care conteaza e cel de la 324CC - GAFI");
        }
        if (args[1].include("324CC")){
            return message.channel.send("Seful grupei 324CC (2021-2022) - GAFI");
        }
        else {
            return message.channel.send ("GAFI");
        }
    }
}

function stergere (message) {
    const args = message.content.split(" ");
    var nr_mesaje = 1;
    if (args[1]) {
	nr_mesaje = args[1];
    }
    if (nr_mesaje > 10) {
    	nr_mesaje = 10;
    }
    nr_mesaje++;
    message.channel.bulkDelete(nr_mesaje);
    nr_mesaje--;
    console.log("Am sters "+ nr_mesaje + " mesaje.");
    return;
}

function av (message) {
    if (!message.mentions.users.size) {
        const embed = new Discord.MessageEmbed()
            .setTitle(message.author.username)
            .setColor(0x00ffff)
            .setImage(message.author.displayAvatarURL({ format: 'png', size: 512 }));
            return message.channel.send(embed);
        }
        const mention = message.mentions.members.first();
        const Embed = new Discord.MessageEmbed()
            .setTitle(message.mentions.users.first().username)
            .setColor(0x00ffff)
            .setImage(mention.user.displayAvatarURL({ format: 'png', size: 512 }));
        return message.channel.send(Embed);
}

function serverinfo (message){
         const ServerLogo = message.guild.iconURL();
         const ServerInfoEmbed = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setTitle("Informatii server")
            .setThumbnail(ServerLogo)
            .setDescription(`Grupa este **${message.guild}**`)
            .setURL(ServerLogo)
            .addField("**Data fondarii**", `Serverul a fost creat pe **${message.guild.createdAt.toLocaleString()}**`)
            .addField("**Seful serverului**", `Detinatorul serverului este ${message.guild.owner}`)
            .addField("**Numarul de membri**", "Serverul are ` " + `${message.guild.memberCount}` + " ` **membri**")
            .addField("**Numarul de grade**", "Serverul are ` " + `${message.guild.roles.cache.size}` + " ` **grade**")
            .addField("**Numarul de canale**", "Serverul are ` " + `${message.guild.channels.cache.size}` + " ` **canale**")
            .addField("**Numarul de emoji-uri**", "Serverul are ` " + `${message.guild.emojis.cache.size}` + " ` **emoji-uri**")
         message.channel.send(ServerInfoEmbed)
      }


function userinfo (message) {
    const args = message.content.split(" ");
    if (!args[1]){
        var user = message.author;
    } else var user=message.mentions.users.first();
    const member = message.guild.member(user);
    const activities = [];
    for (const activity of user.presence.activities.values()) {
      switch (activity.type) {
        case 'PLAYING':
          activities.push(`Playing **${activity.name}**`);
          break;
        case 'LISTENING':
          if (user.bot) activities.push(`Listening to **${activity.name}**`);
          else activities.push(`Listening to **${activity.details}** by **${activity.state}**`);
          break;
        case 'WATCHING':
          activities.push(`Watching **${activity.name}**`);
          break;
        case 'STREAMING':
          activities.push(`Streaming **${activity.name}**`);
          break;
        case 'CUSTOM_STATUS':
          customStatus = activity.state;
          break;
      }}
    const infoEmbed = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setTitle(`Informatii despre ${user.username}`)
    .setDescription(`Serverul curent: ${message.guild.name}`)
    .setThumbnail(user.avatarURL({dynamic: true}))
    .setFooter('requested')
    .setTimestamp()
    .addFields(
      { 
          name: "Informatii",
          value: "```Nume de utilizator: "+user.username+"\nDiscriminator: #"+user.discriminator+"\nTag: "+user.tag+"\nServer Nickname: "+member.displayName+"\nEste bot?: "+user.bot+"\nID: "+user.id+" ```",
          inline: true
      },
      /*{
          name: `Status`,
          value: "```"+member.user.presence.status+"\n"+activities+"```",
          inline: false
      },*/
      {
          name: `Istoric`,
          value: "```Pe server din: "+new Date(user.joinedAt).toLocaleDateString()+"\nPe discord din: "+new Date(user.createdTimestamp).toLocaleDateString()+"```",
          inline: true
      },
      {
        name: `Grade`,
        value: ""+member.roles.cache.map(r => r).join(' | ')+"",
        inline: false
      },
    

  )

  return message.channel.send(infoEmbed)
}


function help (message){
    const args = message.content.split(" ");
    if (!args[1]){
        message.channel.send("HELP CENTRAL");
        message.channel.send("Pentru help pe categorii, incearca urmatoarele: \n!help muzica - informatii muzica\n!help comenzi - comenzi utilizator");
        return;
    } else {
        if (args[1].includes("muzica")){
            message.channel.send("HELP PE MUZICA");
            message.channel.send(
                "!play sau !p sau !canta + link video / link playlist / cuvinte cheie - poti pune muzica folosind link-ul la video, la playlist sau cuvinte cheie\n!stop - opreste muzica si curata coada\n!skip sau !sari - sare peste piesa curenta\n!loop sau !repeta - pune piesa curenta in loop / sau scoate din loop\n!loop queue sau !repeta coada - pune coada de piese pe repeat\n!pause sau !pauza - pune muzica pe pauza\n!resume sau !reia - porneste iar muzica\n!search sau !cauta - cauta piese folosind cuvinte cheie\n!queue sau !coada - afiseaza lista de melodii\n");
            return;
        }
        if (args[1].includes("comenzi")){
            message.channel.send("HELP COMENZI");
            message.channel.send(
                "!serverinfo - afiseaza informatii despre server\n!userinfo - afiseaza informatii despre tine\n!userinfo + mention_user - afiseaza informatii despre mention_user\n!av - afiseaza avatarul tau\n!av + mention_user - afiseaza avatarul celui mentionat\n!d sau !sterge + nr_mesaje - sterge numarul de mesaje indicat din channel (intre 1 si 10, de baza fiind 1)\n!zicala - spune o vorba celebra la intamplare\n");

            return;
        }
    }
    return;
}

function ytsearch(message, serverQueue){
    var count  = 0;
    var args = message.content.trim().split(/ +/g);
    yts(args.join(' '), function(err, res) {
        if (err) return message.channel.send('Ceva nu a functionat corect.');
        let videos = res.videos.slice(0, 5);
        let resp = '';
        for (var i in videos) {
            resp += `**[${parseInt(i)+1}]:** \`${videos[i].title}\`\n`;
        }
        resp += `\n**Alege ce piesa vrei sa cante: (trimite mesaj doar cu numarul) \`1-${videos.length}\`**`;
        message.channel.send(resp);
        client.on('message', async message => {
            if (count == 2) return;
            count ++;
            if (message.author.bot || !message.guild) return;
            if (message.content < 6 && message.content >0) {
                message.content = "!play "+videos[message.content-1].title;
                execute (message, serverQueue);
                return;
            }
            else {
                message.channel.send("Nu ai introdus un numar valid. Cautare anulata.");
                ok = 1;
                return;
            }
        }); 
    });
}

client.login(process.env.BOT_TOKEN);
