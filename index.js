const express = require('express')
const handlebars = require('express-handlebars')
const routerHome = require('./routes/home.router')
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const port = 8080 || process.env.port
let arrMessage = []

//server http

const server = http.createServer(app)

//public
app.use(express.static(__dirname + '/public'))

//engine
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')

app.set('views', __dirname + '/views')

//routes

app.use('/home', routerHome)

//socket server

const io = new Server(server)

io.on('connection', (socket) => {
    console.log('hola nuevo cliente');
    socket.emit('wellcome', 'Bienvenido cliente nuevo')

    socket.on('newMessage', (data) => {
        arrMessage.push(data)
        io.sockets.emit('allMessages', arrMessage)
    })
})


server.listen(8080, () => {
    console.log('escuchando server on port ' + port);
})