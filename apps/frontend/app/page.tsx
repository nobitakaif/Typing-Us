"use client"
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";


export default function Home() {

  const [socket,setSocket] = useState<WebSocket>()
  
  useEffect(()=>{

    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws)
    ws.addEventListener("open",(event)=>{
      document.addEventListener("keydown",(e)=>{
        ws.send(e.key)
      })
    })
    ws.addEventListener("message",(event)=>{
      setSocket(event.data)
    })
    
  },[])
  function sendKey(event:any){
    const key = event.target.value
    
  }
  return (
    <>
      <div className="h-screen w-full flex flex-col justify-center items-center gap-2">
        <p> your content {JSON.stringify(socket)}</p>
        <Textarea className="w-5xl text-5xl font-bold h-44" onChange={sendKey} />
      </div>
    </>

  );
}
