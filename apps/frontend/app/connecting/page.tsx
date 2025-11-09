"use client"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";

export default function (){
    const socketRef = useRef<WebSocket|null>(null)
    const [ text, setText  ] = useState<string>()
    const [ currentKey , setCurrentKey ] = useState<string>()

    useEffect(()=>{
        const ws = new WebSocket("ws://localhost:8080");
        ws.addEventListener("open",(e)=>{
            console.log(e)
            ws.send(e.toString())
        })
        
        
        socketRef.current = ws 
        return ()=> ws.close()
    },[])

    function sendToSocket(key:any){
        const socket = socketRef.current;
        if (!socket || socket.readyState !== WebSocket.OPEN) {
        console.warn("⚠️ Socket not ready yet");
        return;
        }
        console.log("📤 Sending:", key);
        console.log(key)
        socket.send(key);
    }
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setText(value);
        sendToSocket(value); // send as user types
    };

    const handleClick = () => {
        sendToSocket(text); // send current text when button clicked
    };
    return <div className="h-screen w-full flex flex-col justify-center items-center gap-2">
        <div>
            You content is {} pls type is
        </div>
        <Textarea className="w-5xl text-5xl font-bold h-44" onChange={handleChange}/>
        <Button onClick={handleClick}> Button </Button>
    </div>
}