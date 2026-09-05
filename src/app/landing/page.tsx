"use client";

import React, { FC, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import LandingContent from './comp_landing/0landing/LandingContent';
import Copyright from '../components/Copyright';

const preloadQuestionnaire = {
  en: () => import('./en/Questionnaire'),
  es: () => import('./es/Questionnaire'),
  de: () => import('./de/Questionnaire'),
};

interface LandingProps {}

const Landing: FC<LandingProps> = ({}) => {
  const [lang, setLang] = useState<'en' | 'es' | 'de'>('en');
  const [transitionPhase, setTransitionPhase] = useState<'idle' | 'background' | 'out'>('idle');
  const timers = useRef<number[]>([]);
  const router = useRouter();

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  useEffect(() => {
    const route = `/landing/${lang}`;
    router.prefetch(route);
    void preloadQuestionnaire[lang]().catch(() => {});
    // Next disables route prefetching in dev; warm the local route before PLAY.
    if (process.env.NODE_ENV === 'development') {
      const controller = new AbortController();
      void fetch(route, { signal: controller.signal }).catch(() => {});
      return () => controller.abort();
    }
  }, [lang, router]);

  const startGame = () => {
    if (transitionPhase !== 'idle') return;

    setTransitionPhase('background');
    timers.current.push(window.setTimeout(() => setTransitionPhase('out'), 350));
    timers.current.push(window.setTimeout(() => router.push(`/landing/${lang}`), 650));
  };

  return (
    <div
      className="relative flex flex-col h-screen mx-auto pt-24 text-center"
      style={{
        backgroundImage: `url("/fondo1.png")`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      }}
    >
      <div aria-hidden="true" className={`pointer-events-none absolute inset-0 bg-[length:100%_100%] bg-center transition-opacity duration-[300ms] ${transitionPhase === 'idle' ? 'opacity-0' : 'opacity-100'}`} style={{ backgroundImage: 'url("/fondo2.png")' }} />
      <div
        className={`relative flex-1 transition-opacity duration-[300ms] ${transitionPhase === 'out' ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
      >
        <LandingContent lang={lang} setLang={setLang} onStart={startGame} starting={transitionPhase !== "idle"} />
        <div className="absolute bottom-1 right-1">
          <Copyright />
        </div>
      </div>
    </div>
  );
};

export default Landing;
