Bun.serve({
    port : 8000,
    fetch(req,server){
        if(server.upgrade(req)){
            console.log("server is running on port -> ", this.port)
            return;
        }
        return new Response("upgrade failed",{status : 500})
    },
    websocket :{
        open(ws) {
            ws.send("alright")
        },
        message(ws, msg){
            ws.send(msg)
        }
    }
})