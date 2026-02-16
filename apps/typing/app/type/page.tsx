"use client"

import { Letter } from "@/components/Letter"
import Word from "@/components/word"
import { generateWords } from "@/lib/words"
import { useEffect, useState } from "react"

export default function Type(){
    
    const [ data, setData] = useState<string[]>()
    const [letter, setLetter ] = useState<string[]>() 
    
    useEffect(()=>{
        const ws = new WebSocket('ws://localhost:8000')
        ws.addEventListener('open',()=>{
            console.log("socket is connect ")
        })
        ws.onmessage=(e)=>{
            console.log("received ws data -> ",e.data)
            const parsed = JSON.parse(e.data)
            if(parsed.success){
                console.log(parsed.data)
                const arr = parsed.data
                setData(generateWords(50))
                
            }
        }
    },[])
    
    useEffect(()=>{
        
    },[])

    function checkData(){
        console.log(data)
    }
    return  <div className="flex flex-col justify-between h-screen items-center">
        <div>
            hearder
        </div>
        <div className="w-4xl ">
            <div className="flex">
                {data?.map((w,idx) => (
                    <div className="flex ">
                        {w}
                    </div>
                ))}
            </div>
        </div>
        <div>
            footer
        </div>
    </div>
}