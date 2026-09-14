"use client";

import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";

export type StageTransitionPhase = "idle" | "out" | "loading" | "in";

export default function useStageTransition(initialStage: string) {
  const [stage, setStage] = useState(initialStage);
  const [phase, setPhase] = useState<StageTransitionPhase>("idle");
  const phaseRef = useRef<StageTransitionPhase>("idle");
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

  const updatePhase = useCallback((nextPhase: StageTransitionPhase) => {
    phaseRef.current = nextPhase;
    setPhase(nextPhase);
  }, []);

  const setStageWithTransition: Dispatch<SetStateAction<string>> = useCallback(
    (value) => {
      const nextStage = typeof value === "function" ? value(stageRef.current) : value;

      // Incoming content is already interactive. Read the current phase even
      // when this callback was captured before an asynchronous save completed.
      if (nextStage === stageRef.current || phaseRef.current === "out" || phaseRef.current === "loading") return;

      clearTimers();
      updatePhase("out");
      timers.current.push(window.setTimeout(() => updatePhase("loading"), 450));
      timers.current.push(
        window.setTimeout(() => {
          stageRef.current = nextStage;
          setStage(nextStage);
          updatePhase("in");
        }, 1250),
      );
      timers.current.push(window.setTimeout(() => updatePhase("idle"), 2450));
    },
    [clearTimers, updatePhase],
  );

  return { stage, phase, setStageWithTransition };
}
