"use client";

import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";

export type StageTransitionPhase = "idle" | "out" | "loading" | "in";

export default function useStageTransition(initialStage: string) {
  const [stage, setStage] = useState(initialStage);
  const [phase, setPhase] = useState<StageTransitionPhase>("idle");
  const stageRef = useRef(stage);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const setStageWithTransition: Dispatch<SetStateAction<string>> = useCallback(
    (value) => {
      const nextStage = typeof value === "function" ? value(stageRef.current) : value;

      if (nextStage === stageRef.current || phase !== "idle") return;

      clearTimers();
      setPhase("out");
      timers.current.push(window.setTimeout(() => setPhase("loading"), 450));
      timers.current.push(
        window.setTimeout(() => {
          stageRef.current = nextStage;
          setStage(nextStage);
          setPhase("in");
        }, 1250),
      );
      timers.current.push(window.setTimeout(() => setPhase("idle"), 2450));
    },
    [clearTimers, phase],
  );

  return { stage, phase, setStageWithTransition };
}
