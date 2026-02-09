"use client"

import { useEffect, useState } from "react";

export default function Home() {

  const [data, setData] = useState()

  useEffect(()=>{
    const ws = new WebSocket('ws://localhost:8000')
    ws.addEventListener('open',(e)=>{
      console.log(e)
      console.log("inside open")
    })
    ws.addEventListener('message',(e)=>{
      const obj = JSON.parse(e.data)
      console.log(obj.success)
      if(obj.success == true){
        console.log(obj.data)
        console.log(obj.success)
        setData(obj.data)
      }
      
      console.log("inside message")      
    })
    ws.addEventListener('error',(e)=>{
      console.log(e)
      console.log("inside error")
    })
  },[])
  
  return (
    <div className="text-white">
      {data}
    </div>  
  );
}
