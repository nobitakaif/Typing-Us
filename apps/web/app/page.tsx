"use client"
import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { useEffect, useRef } from "react";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default function Home() {

 const audioRef = useRef<HTMLAudioElement | null>(null);
const queue = useRef<ArrayBuffer[]>([]);
useEffect(() => {
  if (!audioRef.current) return;

  const mediaSource = new MediaSource();
  const audio = audioRef.current;
  audio.src = URL.createObjectURL(mediaSource);

  const ws = new WebSocket("ws://localhost:8000");
  ws.binaryType = "arraybuffer";

  mediaSource.addEventListener("sourceopen", () => {
    const sourceBuffer = mediaSource.addSourceBuffer("audio/mpeg");
    const queue: Uint8Array[] = [];
    let streamEnded = false;

   const appendNext = () => {
  if (sourceBuffer.updating) return;

  const chunk = queue.shift();
  if (chunk) {
    sourceBuffer.appendBuffer(chunk);
    return;
  

  if (streamEnded) {
    mediaSource.endOfStream();
  }
};

    sourceBuffer.addEventListener("updateend", appendNext);

    ws.onmessage = (event) => {
      if (typeof event.data === "string" && event.data === "end") {
        streamEnded = true;
        appendNext();
        return;
      }

      queue.push(new Uint8Array(event.data));
      appendNext();
    };
  });

  return () => {
    ws.close();
    URL.revokeObjectURL(audio.src);
  };
}, []);



  return (
    <div className={styles.page}>
        <ThemeImage
          className={styles.logo}
          srcLight="turborepo-dark.svg"
          srcDark="turborepo-light.svg"
          alt="Turborepo logo"
          width={180}
          height={38}
          priority
        />
        <audio ref={audioRef} controls autoPlay></audio>
      
    </div>
  );
}
