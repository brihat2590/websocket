
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
io.on('connection',socket=>{
    console.log(`User ${socket.id} connected`)
    socket.on('message',data=>{
        console.log(data)
        
        io.emit('message',`${socket.id.substring(0,6)} : ${data}`)

    })
})
