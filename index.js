
import { Server } from "socket.io";
import express from "express"
import path from "path"
import { fileURLToPath } from "url";
const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)
const app=express()
app.use(express.static(path.join(__dirname,"public")))
const expressServer=app.listen(3000,()=>{
    console.log("listening on port 3000")
})
const io=new Server(expressServer,{
    cors:{ 
        origin:'*'
    }
})
io.on('connection',(socket)=>{
    console.log(`User ${socket.id} connected`)

    //upon connection -only to user
    socket.emit('message',"welcome to the chat app!")
    //upon connection to all others
    socket.broadcast.emit('message',`${socket.id.substring(0,5)} connected`)

    //listening for a message event
    socket.on('message',data=>{
        console.log(data)
        
        io.emit('message',`${socket.id.substring(0,6)} : ${data}`)

    })
    socket.on('disconnect',()=>{
        socket.broadcast.emit(`${socket.id.substring(0,5)} disconnected`)
    })

    //listen for activity
    socket.on('activity',(name)=>{
        socket.broadcast.emit(`activity event`,name)

    })
})
