const {io} = require('../index');

const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Héroes del Silencio'));
bands.addBand(new Band('Metálica'));



// Socket messages
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
     });

     client.on('message',(payload) => {
        console.log('Message!!',payload);
        io.emit('message', {admin: 'Nuevo mensaje'});
     });

   client.on('vote-band', (payload) => {
      bands.voteBand(payload.id);
      io.emit('active-bands', bands.getBands());
   });

   client.on('add-band', (payload) => {
      const newBand = new Band(payload.name);
       bands.addBand(newBand);
       io.emit('active-bands', bands.getBands());
   });
   
   client.on('delete-band', (payload) => {
      bands.deleteBand(payload.id);
      io.emit('active-bands', bands.getBands());
   });


   //   client.on('send-message', (payload) => {
   //    // console.log(payload);
   //    // io.emit('new-message', payload); // emite a todos los clientes conectados.
   //    client.broadcast.emit('new-message', payload); //emite a todos menos al que lo emitió.
   //   });

  });