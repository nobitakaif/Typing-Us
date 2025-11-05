"use client"
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import Result from "./result/page";


export default function Home() {

  const [socket,setSocket] = useState<string>()
  const [ stats, setStats ] = useState(false)
  
  useEffect(()=>{

    const ws = new WebSocket("ws://localhost:8080");
    
    
    
    
    ws.addEventListener("open",(event)=>{
      document.addEventListener("keydown",(e)=>{
        ws.send(e.key)
      })
    })
    ws.addEventListener("message",async (event)=>{
      const res = await JSON.parse(event.data)
      setStats(res.success)
      setSocket(res.content)
    })
    
  },[])
  function sendKey(event:any){
    const key = event.target.value
    
  }
  if(stats){
    return <Result/>
  }
  return (
    <>
      <div className="h-screen w-full flex flex-col justify-center items-center gap-2">
        <p> your content "{socket}" pls type this.</p>
        <Textarea className="w-5xl text-5xl font-bold h-44" onChange={sendKey} />
      </div>
    </>

  );
}
