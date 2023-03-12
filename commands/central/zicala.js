module.exports = {
  name: 'zicala',
  aliases: ['zicala'],
  utilisation: '{prefix}zicala',

  execute(message) {
    const zicale = [
    "Nu dai putere oricui prost", 
    "Important e sa si dai cand furi", 
    "Sanatate ca noroc aveau si aia pe titanic", 
    "Asculta totul dar sa nu crezi totul", 
    "Cine se acuza se scuza", 
    "Cine nu spune nimic, nu gandeste mai putin", 
    "Esti ceea ce mananci", 
    "Prostul rade de trei ori: o data cand rad ceilalti, o data cand intelege gluma si inca o data cand isi da seama ca a ras fara sa inteleaga", 
    "Ciupercile otravitoare cresc cel mai repede", 
    "Woher comzdu?", 
    "Fii fericit cat traiesti, pentru ca mort o sa fii mult timp.", 
    "Ai bani mananci, n-ai bani nu ti-e foame!", 
    "O carte citita e un gratar pierdut.", 
    "Cine nu munceste nu greseste.", 
    "Era bine cand nu era rau.", 
    "De aia am murit eu la revolutie?", 
    "Dai un ban dar stai in spate.", 
    "Mai bine prost si destept decat frumos si urat.", 
    "Mai bine sa-ti fie rau decat sa-ti para rau.", 
    "Mergem inainte ca inainte era mai bine.", 
    "Mult a fost destul mai e.", 
    "Fie painea cat de rea tot mai bun e cozonacul.", 
    "Degeaba de vorbiti de bine, ca noua tot rau ne merge.", 
    "Fie ca cel mai bun sa castige, sa piarda sau sa faca egal.", 
    "Dai un ban, dar stii ca l-ai dat."
  ];

    var date = new Date();
    var day = date.getDate(); 
    // const rndInt = Math.floor(Math.random() * 12) + 1;
    message.channel.send(zicale[day % zicale.length]);
    return;
  },
}