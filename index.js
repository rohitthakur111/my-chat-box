import express from "express"
import { createServer } from "node:http"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { Server } from "socket.io"

const PORT = 3002
const app = express()
const server = createServer(app)
const io = new Server(server)

const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static('public'))

// app.get('/',(req,res)=>{
//     res.sendFile('./index.html')
// })
// app.get('/user',(req,res)=>{
//     res.sendFile('./public/user.html')
// })
// app.get('/admin',(req,res)=>{
//     res.sendFile(join(__dirname,'admin.html'))
// })

// app.get('*',(req,res)=>{
//     res.sendFile(join(__dirname,'page.html'))
// })

io.on('connection',(socket)=>{
    // chat message
    socket.on("User Message", (msg)=>{
        io.emit("User Message", msg)
    })
    socket.on("Admin Message", msg=>{
        io.emit("Admin Message", msg)
    })
    socket.on('disconnect',()=>{
        console.log("Socket Disconnected")
    })
})
server.listen(PORT, ()=>{
    console.log("Socket server is running on PORT :",PORT)  
})
