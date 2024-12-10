const express = require('express');
const path = require('path');
require('dotenv').config();

//Express App
const app = express();
// Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

require('./sockets/socket');




//Path pulic
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));


server.listen(process.env.PORT, (err) => {
    if (err) throw Error(err);

    console.log('Servidor corriendo en puerto!!!',process.env.PORT);
});