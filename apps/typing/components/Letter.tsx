
export function Letter({children, isPressed, isActive} : {children:React.ReactNode, isPressed? : boolean,isActive?: boolean;}){
    
    return <span className={`
            ${isPressed ?"text-green-400" : ""}
            ${isActive ? "underline" : ""}
        `}>

        {children}
    </span>
} 