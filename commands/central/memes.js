const { VoiceChannel } = require("discord.js");
const fs = require("fs");

// Import command files
const objects = require(`../objects.js`);
const client = objects.client;
var prefix = objects.prefix;
  

var numberPhotos = 15;

async function decebal(message) {
  const args = message.content.split(" ");
  if (!args[1]) {
    //return message.channel.send("Comenzi disponibile pentru Decebal: au / cevrea");
    args[1] = "JUNK"
  }
  if ((args[1].includes("aau"))||(args[1].includes("au"))||(args[0].includes("aau"))||(args[0].includes("au"))) {
    const voicechannel = message.member.voice.channel;
    if (!voicechannel) return message.channel.send("Nu esti pe un canal de voice.");
    if (client.voice.connections.size > 0) {
      return message.channel.send("Sunt ocupat acum sa cant!");
    }

    let fileName = "au"; // Numele fisierului urmat sa se deschida

    if (!fs.existsSync(`./src/decebal/${fileName}.pcm`)) return message.channel.send("Nu a fost gasita sursa.");

    const connection = await message.member.voice.channel.join();
    const stream = fs.createReadStream(`./src/decebal/${fileName}.pcm`);

    const dispatcher = connection.play(stream, {
      type: "converted"
    });
    dispatcher.setVolumeLogarithmic(10);
    dispatcher.on("finish", () => {
      message.member.voice.channel.leave();
      return;
    })
    return;
  }

  if ((args[1].includes("cevrea"))||(args[0].includes("cevrea"))) {
    const voicechannel = message.member.voice.channel;
    if (!voicechannel) return message.channel.send("Nu esti pe un canal de voice.");
    if (client.voice.connections.size > 0) {
      return message.channel.send("Sunt ocupat acum sa cant!");
    }

    let fileName = "cevrea"; // Numele fisierului urmat sa se deschida

    if (!fs.existsSync(`./src/decebal/${fileName}.pcm`)) return message.channel.send("Nu a fost gasita sursa.");

    const connection = await message.member.voice.channel.join();
    const stream = fs.createReadStream(`./src/decebal/${fileName}.pcm`);

    const dispatcher = connection.play(stream, {
      type: "converted"
    });
    dispatcher.setVolumeLogarithmic(10);
    dispatcher.on("finish", () => {
      message.member.voice.channel.leave();
      return;
    })
    return;
  }

  if ((args[1].includes("emare"))||(args[0].includes("mare"))) {
    const voicechannel = message.member.voice.channel;
    if (!voicechannel) return message.channel.send("Nu esti pe un canal de voice.");
    if (client.voice.connections.size > 0) {
      return message.channel.send("Sunt ocupat acum sa cant!");
    }

    let fileName = "emare"; // Numele fisierului urmat sa se deschida

    if (!fs.existsSync(`./src/decebal/${fileName}.pcm`)) return message.channel.send("Nu a fost gasita sursa.");

    const connection = await message.member.voice.channel.join();
    const stream = fs.createReadStream(`./src/decebal/${fileName}.pcm`);

    const dispatcher = connection.play(stream, {
      type: "converted"
    });
    dispatcher.setVolumeLogarithmic(10);
    dispatcher.on("finish", () => {
      message.member.voice.channel.leave();
      return;
    })
    return;
  }


  return message.channel.send("Comenzi disponibile pentru Decebal: cevrea / au / emare");
}

async function nan(message) {
  const args = message.content.split(" ");
  if (!args[1]) {
    //return message.channel.send("Comenzi disponibile pentru Nan: intrebari");
    args[1] = "intrebari"
  }
  if ((args[1].includes("intrebari"))||(args[1].includes("int")||(args[1].includes("")))) {
    const voicechannel = message.member.voice.channel;
    if (!voicechannel) return message.channel.send("Nu esti pe un canal de voice.");
    if (client.voice.connections.size > 0) {
      return message.channel.send("Sunt ocupat acum sa cant!");
    }

    let fileName = "intrebari"; // Numele fisierului urmat sa se deschida

    if (!fs.existsSync(`./src/nan/${fileName}.pcm`)) return message.channel.send("Nu a fost gasita sursa.");

    const connection = await message.member.voice.channel.join();
    const stream = fs.createReadStream(`./src/nan/${fileName}.pcm`);

    const dispatcher = connection.play(stream, {
      type: "converted"
    });
    dispatcher.setVolumeLogarithmic(10);
    dispatcher.on("finish", () => {
      message.member.voice.channel.leave();
      return;
    })
    return;
  }
  return message.channel.send("Comenzi disponibile pentru Nan: intrebari");
}

async function balan(message) {
  const args = message.content.split(" ");
  if (!args[1]) {
    //return message.channel.send("Comenzi disponibile pentru Balan: stam");
    args[1] = "stam"
  }
  if ((args[1].includes("stam"))||(args[1].includes("bine")||(args[1].includes("")))) {
    const voicechannel = message.member.voice.channel;
    if (!voicechannel) return message.channel.send("Nu esti pe un canal de voice.");
    if (client.voice.connections.size > 0) {
      return message.channel.send("Sunt ocupat acum sa cant!");
    }

    let fileName = "stambine"; // Numele fisierului urmat sa se deschida

    if (!fs.existsSync(`./src/balan/${fileName}.pcm`)) return message.channel.send("Nu a fost gasita sursa.");

    const connection = await message.member.voice.channel.join();
    const stream = fs.createReadStream(`./src/balan/${fileName}.pcm`);

    const dispatcher = connection.play(stream, {
      type: "converted"
    });
    dispatcher.setVolumeLogarithmic(10);
    dispatcher.on("finish", () => {
      message.member.voice.channel.leave();
      return;
    })
    return;
  }
  message.channel.send("Comenzi disponibile pentru Balan: stam");
  return;
}

function mogos(message) {
  const args = message.content.split(" ");

  if (args[1] <= numberPhotos) {
    // Poza specifica
    return message.channel.send({ files: [`./src/mogos/${parseInt(args[1])}.png`] })
  }

  if (!args[1] || args[1] > numberPhotos) {
    // Poza random
    const rndInt = Math.floor(Math.random() * numberPhotos) + 1;
    return message.channel.send({ files: [`./src/mogos/${parseInt(rndInt)}.png`] })
  }
  return;
}

async function olaru(message) {
  const args = message.content.split(" ");
  if (!args[1]) {
    return message.channel.send("Comenzi disponibile pentru Olaru: ciuruit");
  }
  if ((args[1].includes("ciuruit"))||(args[1].includes(""))) {
    const voicechannel = message.member.voice.channel;
    if (!voicechannel) return message.channel.send("Nu esti pe un canal de voice.");
    if (client.voice.connections.size > 0) {
      return message.channel.send("Sunt ocupat acum sa cant!");
    }

    let fileName = "ciuruit"; // Numele fisierului urmat sa se deschida

    if (!fs.existsSync(`./src/olaru/${fileName}.pcm`)) return message.channel.send("Nu a fost gasita sursa.");

    const connection = await message.member.voice.channel.join();
    const stream = fs.createReadStream(`./src/olaru/${fileName}.pcm`);

    const dispatcher = connection.play(stream, {
      type: "converted"
    });
    dispatcher.setVolumeLogarithmic(10);
    dispatcher.on("finish", () => {
      message.member.voice.channel.leave();
      return;
    })
    return;
  }
  message.channel.send("Comenzi disponibile pentru Olaru: ciuruit");
  return;
}

async function saracin(message) {
  const args = message.content.split(" ");
  if (!args[1]) {
    args[1]="random_text";
  }
  if ((args[1].includes("multumesc"))||(args[0].includes(`${prefix}multumesc`))||(args[0].includes(`${prefix}ms`))||(args[1].includes("ms"))) {
    const voicechannel = message.member.voice.channel;
    if (!voicechannel) return message.channel.send("Nu esti pe un canal de voice.");
    if (client.voice.connections.size > 0) {
      return message.channel.send("Sunt ocupat acum sa cant!");
    }

    let fileName = "multumesc"; // Numele fisierului urmat sa se deschida

    if (!fs.existsSync(`./src/saracin/${fileName}.pcm`)) return message.channel.send("Nu a fost gasita sursa.");

    const connection = await message.member.voice.channel.join();
    const stream = fs.createReadStream(`./src/saracin/${fileName}.pcm`);

    const dispatcher = connection.play(stream, {
      type: "converted"
    });
    dispatcher.setVolumeLogarithmic(10);
    dispatcher.on("finish", () => {
      message.member.voice.channel.leave();
      return;
    })
    return;
  }
  if ((args[1].includes("pace"))||(args[0].includes(`${prefix}pace`))||(args[0].includes(`${prefix}pace`))||(args[1].includes("pace"))) {
    const voicechannel = message.member.voice.channel;
    if (!voicechannel) return message.channel.send("Nu esti pe un canal de voice.");
    if (client.voice.connections.size > 0) {
      return message.channel.send("Sunt ocupat acum sa cant!");
    }

    let fileName = "pace"; // Numele fisierului urmat sa se deschida

    if (!fs.existsSync(`./src/saracin/${fileName}.pcm`)) return message.channel.send("Nu a fost gasita sursa.");

    const connection = await message.member.voice.channel.join();
    const stream = fs.createReadStream(`./src/saracin/${fileName}.pcm`);

    const dispatcher = connection.play(stream, {
      type: "converted"
    });
    dispatcher.setVolumeLogarithmic(10);
    dispatcher.on("finish", () => {
      message.member.voice.channel.leave();
      return;
    })
    return;
  }
  if ((args[1].includes("hello"))||(args[0].includes(`${prefix}hello`))||(args[0].includes(`${prefix}hello`))||(args[1].includes("hello"))) {
    const voicechannel = message.member.voice.channel;
    if (!voicechannel) return message.channel.send("Nu esti pe un canal de voice.");
    if (client.voice.connections.size > 0) {
      return message.channel.send("Sunt ocupat acum sa cant!");
    }

    let fileName = "hello"; // Numele fisierului urmat sa se deschida

    if (!fs.existsSync(`./src/saracin/${fileName}.pcm`)) return message.channel.send("Nu a fost gasita sursa.");

    const connection = await message.member.voice.channel.join();
    const stream = fs.createReadStream(`./src/saracin/${fileName}.pcm`);

    const dispatcher = connection.play(stream, {
      type: "converted"
    });
    dispatcher.setVolumeLogarithmic(10);
    dispatcher.on("finish", () => {
      message.member.voice.channel.leave();
      return;
    })
    return;
  }
  message.channel.send("Comenzi disponibile pentru Saracin: multumesc / ms / pace / hello");
  return;
}

async function dorinel(message) {
  const args = message.content.split(" ");
  if (!args[1]) {
    args[1]="random_text";
  }
  if ((args[1].includes("sens"))||(args[0].includes(`${prefix}sens`))) {
    const voicechannel = message.member.voice.channel;
    if (!voicechannel) return message.channel.send("Nu esti pe un canal de voice.");
    if (client.voice.connections.size > 0) {
      return message.channel.send("Sunt ocupat acum sa cant!");
    }

    let fileName = "sens"; // Numele fisierului urmat sa se deschida

    if (!fs.existsSync(`./src/dorinel/${fileName}.pcm`)) return message.channel.send("Nu a fost gasita sursa.");

    const connection = await message.member.voice.channel.join();
    const stream = fs.createReadStream(`./src/dorinel/${fileName}.pcm`);

    const dispatcher = connection.play(stream, {
      type: "converted"
    });
    dispatcher.setVolumeLogarithmic(10);
    dispatcher.on("finish", () => {
      message.member.voice.channel.leave();
      return;
    })
    return;
  }
  message.channel.send("Comenzi disponibile pentru Dorinel: sens");
  return;
}

async function bobaru(message) {
  const args = message.content.split(" ");
  if (!args[1]) {
    args[1]="random_text";
  }
  if ((args[1].includes("cringe"))||(args[0].includes(`${prefix}cringe`))) {
    const voicechannel = message.member.voice.channel;
    if (!voicechannel) return message.channel.send("Nu esti pe un canal de voice.");
    if (client.voice.connections.size > 0) {
      return message.channel.send("Sunt ocupat acum sa cant!");
    }

    let fileName = "cringe"; // Numele fisierului urmat sa se deschida

    if (!fs.existsSync(`./src/bobaru/${fileName}.pcm`)) return message.channel.send("Nu a fost gasita sursa.");

    const connection = await message.member.voice.channel.join();
    const stream = fs.createReadStream(`./src/bobaru/${fileName}.pcm`);

    const dispatcher = connection.play(stream, {
      type: "converted"
    });
    dispatcher.setVolumeLogarithmic(10);
    dispatcher.on("finish", () => {
      message.member.voice.channel.leave();
      return;
    })
    return;
  }
  message.channel.send("Comenzi disponibile pentru Bobaru: cringe");
  return;
}


async function rd(message) {
  const args = message.content.split(" ");
  if (!args[1]) {
    return message.channel.send("Comenzi disponibile pentru Diaconexu: laugh / ras.");
  }
  if ((args[1].includes("laugh"))||(args[1].includes("ras"))) {
    const voicechannel = message.member.voice.channel;
    if (!voicechannel) return message.channel.send("Nu esti pe un canal de voice.");
    if (client.voice.connections.size > 0) {
      return message.channel.send("Sunt ocupat acum sa cant!");
    }

    let fileName = "rdlaugh"; // Numele fisierului urmat sa se deschida

    if (!fs.existsSync(`./src/rd/${fileName}.pcm`)) return message.channel.send("Nu a fost gasita sursa.");

    const connection = await message.member.voice.channel.join();
    const stream = fs.createReadStream(`./src/rd/${fileName}.pcm`);

    const dispatcher = connection.play(stream, {
      type: "converted"
    });
    dispatcher.setVolumeLogarithmic(10);
    dispatcher.on("finish", () => {
      message.member.voice.channel.leave();
      return;
    })
    return;
  }
  message.channel.send("Comenzi disponibile pentru Diaconexu: laugh / ras.");
  return;
}

async function odo(message) {
  const args = message.content.split(" ");
  if (!args[1]) {
    return message.channel.send("Comenzi disponibile: check si nb.");
  }
  if (args[1].includes("check")) {
    const voicechannel = message.member.voice.channel;
    if (!voicechannel) return message.channel.send("Nu esti pe un canal de voice.");
    if (client.voice.connections.size > 0) {
      return message.channel.send("Sunt ocupat acum sa cant!");
    }

    // Variabile de lucru
    var numberVoice = voicechannel.members.size; // Numarul de persoane
    var numberCompareTo = 6; // Valoarea de comparat
    let fileName; // Numele fisierului urmat sa se deschida

    if (numberVoice < numberCompareTo) {
      fileName = "prez_mica";
    }
    else {
      fileName = "prez_mare";
    }
    if (!fs.existsSync(`./src/odo/${fileName}.pcm`)) return message.channel.send("Nu a fost gasita sursa.");

    const connection = await message.member.voice.channel.join();
    const stream = fs.createReadStream(`./src/odo/${fileName}.pcm`);

    const dispatcher = connection.play(stream, {
      type: "converted"
    });
    dispatcher.setVolumeLogarithmic(10);
    dispatcher.on("finish", () => {
      message.member.voice.channel.leave();
      return;
    })
    return;
  }

  if (args[1].includes("nb") || args[1].includes("noapte")) {
    const voicechannel = message.member.voice.channel;
    if (!voicechannel) return message.channel.send("Nu esti pe un canal de voice.");
    if (client.voice.connections.size > 0) {
      return message.channel.send("Sunt ocupat acum sa cant!");
    }
    if (!fs.existsSync(`./src/odo/nb.pcm`)) return message.channel.send("Nu a fost gasita sursa.");

    const connection = await message.member.voice.channel.join();
    const stream = fs.createReadStream(`./src/odo/nb.pcm`);

    const dispatcher = connection.play(stream, {
      type: "converted"
    });
    dispatcher.setVolumeLogarithmic(10);
    dispatcher.on("finish", () => {
      message.member.voice.channel.leave();
      return message.channel.send("Noapte buna!");
    })
    return;
  }
  message.channel.send("Comenzi disponibile: check si nb.");
  return;
}

module.exports = { balan, mogos, rd, saracin, bobaru, dorinel, odo, olaru, nan, decebal }
