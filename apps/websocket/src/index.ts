import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({port : 8080},()=>{
    console.log("wesbsocket server is running on port 8080")
})

const content = "i am good"

interface Data{
    success : boolean,
    content? : string,
    user : WebSocket,
    rooms : string[]
}

const User : Data[] = []

wss.on("connection",(ws)=>{
    ws.on("message",(data)=>{
        
        
    })
    
})