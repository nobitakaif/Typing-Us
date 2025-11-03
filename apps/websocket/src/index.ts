import { WebSocketServer } from "ws";

const wss = new WebSocketServer({port : 8080},()=>{
    console.log("wesbsocket server is running on port 8080")
})

const content = "nobitakaif"

wss.on("connection",(ws)=>{
    ws.on("error", console.error)
    let ctr = 0
    ws.on("message",(data: string)=>{
        ws.send(content)
        if (data == content[ctr] && ctr <= content.length){
            ctr++;
        }
        else{
            console.log("congrates")
        }
        
    })
    
})