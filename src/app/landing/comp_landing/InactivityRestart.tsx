"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Language } from "../../contenido/interfaces";
import { startInactivityTimer } from "../inactivityTimer";

const messages = {
  es: { title: "¿Sigues ahí?", countdown: (seconds: number) => `El juego se reiniciará en ${seconds} segundos.`, action: "Continuar" },
  en: { title: "Are you still there?", countdown: (seconds: number) => `The game will restart in ${seconds} seconds.`, action: "Continue" },
  de: { title: "Bist du noch da?", countdown: (seconds: number) => `Das Spiel startet in ${seconds} Sekunden neu.`, action: "Weiter" },
};

export default function InactivityRestart({ lang }: { lang: Language }) {
  const router = useRouter();
  const [countdown, setCountdown] = useState<number | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const visible = countdown !== null;

  useEffect(() => startInactivityTimer(setCountdown, () => router.replace("/landing")), [router]);

  useEffect(() => {
    if (!visible) return;
    const previousFocus = document.activeElement;
    buttonRef.current?.focus();
    return () => {
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, [visible]);

  if (countdown === null) return null;
  const text = messages[lang];

  return (
    <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-black/60">
      <section role="alertdialog" aria-modal="true" aria-labelledby="inactivity-title" aria-describedby="inactivity-countdown" className="w-[850px] rounded-3xl bg-[#f3eee4] px-16 py-14 text-center text-[#303030] shadow-2xl">
        <h2 id="inactivity-title" className="text-[54px] text-[#194899]">{text.title}</h2>
        <p id="inactivity-countdown" className="my-8 text-[34px]" aria-live="polite">{text.countdown(countdown)}</p>
        <button ref={buttonRef} className="result-action">{text.action}</button>
      </section>
    </div>
  );
}
