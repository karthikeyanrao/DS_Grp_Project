const express = require("express")
const net = require("net")
const app = express()
app.use(express.json())

function sendToSharedMemory(msg, callback) {
    const client = new net.Socket()
    client.connect(8085, "127.0.0.1", () => {
        client.write(msg)
    })
    client.on("data", data => {
        callback(data.toString())
        client.destroy()
    })
}

app.post("/vote", (req,res)=>{
    sendToSharedMemory(req.body.type, result=>{
        res.send(result)
    })
})

app.get("/status", (req,res)=>{
    sendToSharedMemory("status", result=>{
        res.send(result)
    })
})

app.listen(3000)
