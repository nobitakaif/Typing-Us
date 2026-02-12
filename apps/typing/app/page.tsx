"use client"

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<string[]>([])
  const [index, setIndex] = useState(0)
  const [results, setResults] = useState<("correct" | "wrong")[]>([])

  // WebSocket
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000")

    ws.onmessage = (e) => {
      const obj = JSON.parse(e.data)

      if (obj.success) {
        const textArray = obj.data.split("")
        setData(textArray)
        setIndex(0)
        setResults([]) // reset results
      }
    }

    return () => ws.close()
  }, [])

  // Keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!data.length) return
      if (index >= data.length) return

      const expectedChar = data[index]

      setResults((prev) => {
        const newResults = [...prev]

        if (e.key === expectedChar) {
          newResults[index] = "correct"
        } else {
          newResults[index] = "wrong"
        }

        return newResults
      })

      setIndex((prev) => prev + 1) // move cursor always
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [data, index])

  return (
    <div className="text-white text-2xl">
      {data.map((char, idx) => {
        let color = ""

        if (results[idx] === "correct") {
          color = "text-green-400"
        }

        if (results[idx] === "wrong") {
          color = "text-red-400"
        }

        return (
          <span
            key={idx}
            className={`${color} ${idx === index ? "underline" : ""}`}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        )
      })}
    </div>
  )
}
