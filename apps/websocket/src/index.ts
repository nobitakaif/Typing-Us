import { WebSocketServer } from "ws";

const wss = new WebSocketServer({port : 8080},()=>{
    console.log("wesbsocket server is running on port 8080")
})

const content = "i am good"

wss.on("connection",(ws)=>{
    ws.on("error", console.error)
    ws.send(JSON.stringify({
        success : false,
        content : content
    }))
    let ctr = 0;
    ws.on("message",(data: string)=>{
        
        if (data == content[ctr] && ctr <content.length){
            ctr++;
            console.log(data.toString())
            console.log("yeah you're going right!")
        }
        
        else{
            if(ctr >= content.length){
                ws.send(JSON.stringify({
                    success : true
                }))
                console.log("you passed")
            }
            else{
                ws.send(JSON.stringify({
                    success : false
                }));
            }
        }
        
    })
    
})