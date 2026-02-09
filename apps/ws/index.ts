
import axios from "axios"

let test:string;
Bun.serve({
    port : 8000,
    fetch(req,server){
        if(server.upgrade(req)){
            
            return
        }
        return new Response("upgrated Failed ", {status : 500})
    },
    websocket : {
        
        open(ws){ // socket is open when user is connected first time hit
            console.log("alright open msg")
            ws.send(JSON.stringify({success : false})
            )
            axios.get('http://localhost:8080/test').then(data =>{
                test = data.data.test
                console.log("test data received -> ", test)
                ws.send(JSON.stringify({data : test, success : true}))
            }).catch(e =>{
                console.log("something happened wrong here -> ", e.data.message)
            })
        },
        message (ws, message){ // for receiving every msg here from the client
            console.log("alright messgege received", message)
            
        }
    }
})