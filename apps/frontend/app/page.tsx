"use client"
import { useEffect, useState } from "react";


export default function Home() {

  const [socket,setSocket] = useState<WebSocket>()
  
  useEffect(()=>{

    const ws = new WebSocket("ws://localhost:8080");
    ws.addEventListener("open",(event)=>{
      ws.send("alright")
    })
    ws.addEventListener("message",(event)=>{
      setSocket(event.data)
      alert(event.data)
    })
    setSocket(ws)
  },[])
  return (
    <>
      {JSON.stringify(socket)}
    </>

  );
}
