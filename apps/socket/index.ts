
Bun.serve({
    port : 8000,
    fetch(req,serve){
        if(serve.upgrade(req)){
            console.log("your connection is upgraded")
            return;
        }
        return new Response("can't be upgarde", {status : 500});
    },
    websocket :{
        // for receiving messages from the client
        message(ws, message){
            console.log("inside messages")
            console.log(message)
            ws.send(message)
        },

        // socket is open (when the first connection established then it called)
        async open(ws) {
            console.log("inside open")
            ws.send("I've send you this msg")
            let audio = Bun.file("audio.mp3");
            const stream = audio.stream()
            const reader = stream.getReader()
            console.log(audio.type)
            while(true){
                const {value, done} = await reader.read()
                if(done){
                    break
                }
                ws.send(value)
            }
            ws.send("end")
        },

        close(ws, code, reason) {
            console.log("this is reason : ",reason)
            console.log("this is code : ",code)
            console.log("this is ws : ",ws)
            ws.send(`code ${code},  reason ${reason}`)
        },
    }
})