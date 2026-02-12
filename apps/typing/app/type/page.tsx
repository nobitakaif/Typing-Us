"use client"

import { Letter } from "@/components/Letter"
import { useEffect, useState } from "react"

export default function Type(){
    
    const [ data, setData] = useState<string[]>([])
    
    useEffect(()=>{
        const ws = new WebSocket('ws://localhost:8000')
        ws.addEventListener('open',()=>{
            alert("socket is connect ")
        })
        ws.onmessage=(e)=>{
            console.log("received ws data -> ",e.data)
            const parsed = JSON.parse(e.data)
            if(parsed.success){
                console.log(parsed.data.split(''))
                const arr = parsed.data.split('')
                setData(arr)
                console.log(data)
            }
        }
    },[])
    
    useEffect(()=>{

    },[])
    
    return <div>
        {data.map((c, idx) =>(
            <Letter >{c}</Letter>
        ))}
    </div>
}