import { EventHandler,  useEffect, useState } from "react";


export default function Letter({
        children,
        onClick 
    } : {
        children : React.ReactNode,
        onClick : (e:any)=>void
    }){
    
    const [ isClick, setIsClick ] = useState(false)
    

    
    
    return <>
    <p className={isClick ? "text-gray-800" : "text-green-500"} onClick={onClick}>{children}</p>
    </>
}