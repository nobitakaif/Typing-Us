"use client";
import { useEffect, useRef } from "react";

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    const mediaSource = new MediaSource();
    audio.src = URL.createObjectURL(mediaSource);

    const ws = new WebSocket("ws://localhost:8000");
    ws.binaryType = "arraybuffer";

    mediaSource.addEventListener("sourceopen", () => {
      const sourceBuffer = mediaSource.addSourceBuffer("audio/mpeg");

      const incomingQueue: ArrayBuffer[] = [];
      let streamEnded = false;

      // append ONE chunk per second
      const interval = setInterval(() => {
        if (sourceBuffer.updating) return;

        const chunk = incomingQueue.shift();
        if (chunk) {
          sourceBuffer.appendBuffer(chunk);
          return;
        }

        if (streamEnded) {
          mediaSource.endOfStream();
          clearInterval(interval);
        }
      }, 1000);

      ws.onmessage = (event) => {
        if (typeof event.data === "string" && event.data === "end") {
          streamEnded = true;
          return;
        }

        if (event.data instanceof ArrayBuffer) {
          incomingQueue.push(event.data);
        }
      };
    });

    return () => {
      ws.close();
      URL.revokeObjectURL(audio.src);
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Streaming Audio (1s growth)</h2>
      <audio ref={audioRef} controls autoPlay />
    </div>
  );
}
