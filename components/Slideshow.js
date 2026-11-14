"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

// Background Beranda: foto berganti otomatis dengan efek fading (CSS transition opacity).
export default function Slideshow({ foto, interval = 5000 }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (foto.length < 2) return;
    const t = setInterval(() => setI((n) => (n + 1) % foto.length), interval);
    return () => clearInterval(t);
  }, [foto.length, interval]);
  return foto.map((src, n) => (
    <div key={src} className={`slide ${n === i ? "aktif" : ""}`} aria-hidden="true">
      <Image src={src} alt="" fill priority={n === 0} sizes="100vw" />
    </div>
  ));
}
