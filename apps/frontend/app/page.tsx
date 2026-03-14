"use client"
import TypingInput from "@/components/typingInput";
import WordDisplay from "@/components/wordsList";
import { generateWordList, WORD_LISTS } from "@/lib/words";
import { motion, useTransform } from "motion/react"
import { useCallback, useEffect, useRef, useState } from "react";


export default function Home() {
  const [word, setWord] = useState('')
  const [input, setInput ] = useState("")
  const [testStarted, setTestStarted] = useState(false)
  const startTimeRef = useRef<number>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [testFinished, setTestFinished] = useState(false);



  useEffect(()=>{
    const generetedWords = generateWordList(WORD_LISTS.common,150)
    console.log( "generaeted Words =>",generetedWords)
    setWord(generetedWords)
  },[])
  
  const handleStart = useCallback(() => {
      setTestStarted(true);
      setInput('');
      startTimeRef.current = Date.now();
      inputRef.current?.focus();
    }, []);
  
    const handleInputChange = (value: string) => {
      if (testFinished) return;
      if (!testStarted && value) {
        handleStart();
      }
      setInput(value);
    };
  
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <motion.div  className="bg-red-300">
        <WordDisplay input={input} words={word}/>
        <TypingInput
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              disabled={testFinished}
              placeholder={testStarted ? '' : 'Click here or start typing to begin...'}
            />
      </motion.div>     
    </div>
  );
}
