
import Letter from "@/components/letter";

export default function Type(){
    const text: string= "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ex eligendi veniam praesentium temporibus natus quae"

    const letters = text.trim().split(" ").map(word => Array.from(word))

    console.log(letters)
    console.log(typeof letters)
    
    return  <div className="flex ">


        {/* {letters.map((word, indx)=>(
            <span className="mr-2" key={indx}>
                {word.map((char,idx)=>(
                    <Letter key={`${indx}-${idx}`} isClick={false}>
                        {char}
                    </Letter>
                ))}
            </span>
        ))} */}

        <div className="flex gap-2 h-screen w-full items-center justify-center text-xl">
            {letters.map((word,wordIdx)=>(
                <div key={wordIdx} className={`flex`}>
                    {word.map((char, charIdx)=>(
                        <Letter isClick={false} key={charIdx} >
                            {char}
                        </Letter>
                    ))}
                </div>
            ))}
        </div>
        {/* <Letter isClick={false} >
            p
        </Letter> */}
    </div>
}