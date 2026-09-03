import { Dioses } from "../../../contenido/interfaces";

type GreekGod = Exclude<Dioses, "">;

interface GodProfile {
  god: GreekGod;
  preferences: readonly string[];
  weights: readonly number[];
}

// Orden de rasgos: conflicto, relaciones, estrategia, resolución, trabajo,
// lugar, humor, creatividad/razón, hechos/intuición y horario.
const GOD_PROFILES: readonly GodProfile[] = [
  { god: "Zeus", preferences: ["GUERRERO", "ENAMORADIZO", "ESTRATEGA", "CONFRONTACIÓN", "TRABAJADOR", "CIUDAD", "MALHUMOR", "RACIONAL", "JUSTO", "DIURNO"], weights: [3, 1, 2, 2, 1, 1, 1, 1, 3, 1] },
  { god: "Hera", preferences: ["PACÍFICO", "COMPROMETIDO", "ESTRATEGA", "CONFRONTACIÓN", "TRABAJADOR", "CIUDAD", "MALHUMOR", "RACIONAL", "INJUSTO", "DIURNO"], weights: [1, 3, 1, 2, 2, 1, 2, 1, 1, 1] },
  { god: "Ares", preferences: ["GUERRERO", "ENAMORADIZO", "IMPULSIVO", "CONFRONTACIÓN", "TRABAJADOR", "CIUDAD", "MALHUMOR", "CREATIVO", "INJUSTO", "DIURNO"], weights: [3, 1, 3, 3, 1, 1, 2, 1, 1, 1] },
  { god: "Atena", preferences: ["GUERRERO", "COMPROMETIDO", "ESTRATEGA", "NEGOCIACIÓN", "TRABAJADOR", "CIUDAD", "BUENHUMOR", "RACIONAL", "JUSTO", "DIURNO"], weights: [2, 1, 3, 2, 2, 1, 1, 3, 3, 1] },
  { god: "Poseidon", preferences: ["GUERRERO", "ENAMORADIZO", "IMPULSIVO", "CONFRONTACIÓN", "TRABAJADOR", "CAMPO", "MALHUMOR", "RACIONAL", "INJUSTO", "NOCTURNO"], weights: [2, 1, 2, 2, 1, 2, 2, 1, 1, 2] },
  { god: "Afrodita", preferences: ["PACÍFICO", "ENAMORADIZO", "IMPULSIVO", "NEGOCIACIÓN", "HOLGAZÁN", "CIUDAD", "BUENHUMOR", "CREATIVO", "INJUSTO", "NOCTURNO"], weights: [1, 3, 2, 1, 1, 1, 1, 3, 2, 1] },
  { god: "Apolo", preferences: ["PACÍFICO", "ENAMORADIZO", "ESTRATEGA", "NEGOCIACIÓN", "TRABAJADOR", "CIUDAD", "BUENHUMOR", "CREATIVO", "JUSTO", "DIURNO"], weights: [1, 1, 1, 1, 1, 1, 2, 3, 1, 3] },
  { god: "Artemisa", preferences: ["GUERRERO", "COMPROMETIDO", "ESTRATEGA", "CONFRONTACIÓN", "TRABAJADOR", "CAMPO", "BUENHUMOR", "RACIONAL", "INJUSTO", "NOCTURNO"], weights: [2, 2, 1, 1, 2, 3, 1, 1, 1, 3] },
  { god: "Demeter", preferences: ["PACÍFICO", "COMPROMETIDO", "ESTRATEGA", "NEGOCIACIÓN", "TRABAJADOR", "CAMPO", "BUENHUMOR", "RACIONAL", "JUSTO", "DIURNO"], weights: [1, 2, 1, 2, 3, 3, 2, 1, 1, 1] },
  { god: "Hestia", preferences: ["PACÍFICO", "COMPROMETIDO", "ESTRATEGA", "NEGOCIACIÓN", "TRABAJADOR", "CIUDAD", "BUENHUMOR", "RACIONAL", "JUSTO", "DIURNO"], weights: [1, 3, 1, 3, 2, 2, 3, 1, 1, 1] },
  { god: "Hefesto", preferences: ["PACÍFICO", "COMPROMETIDO", "ESTRATEGA", "NEGOCIACIÓN", "TRABAJADOR", "CAMPO", "MALHUMOR", "CREATIVO", "JUSTO", "DIURNO"], weights: [1, 2, 2, 1, 3, 1, 1, 3, 1, 1] },
  { god: "Hermes", preferences: ["PACÍFICO", "ENAMORADIZO", "IMPULSIVO", "NEGOCIACIÓN", "HOLGAZÁN", "CIUDAD", "BUENHUMOR", "RACIONAL", "INJUSTO", "NOCTURNO"], weights: [1, 1, 2, 3, 1, 3, 2, 2, 2, 1] },
] as const;

const affinityScore = (answers: readonly string[], profile: GodProfile) => {
  const totalWeight = profile.weights.reduce((total, weight) => total + weight, 0);
  const matchedWeight = answers.reduce((score, answer, index) => score + (answer === profile.preferences[index] ? profile.weights[index] : 0), 0);
  return matchedWeight / totalWeight;
};

const stableAnswerHash = (answers: readonly string[]) => {
  let hash = 2166136261;
  for (const character of answers.join("|")) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

export const calculateGodAffinity = (answers: readonly string[]): GreekGod => {
  let bestScore = -1;
  let candidates: GreekGod[] = [];

  for (const profile of GOD_PROFILES) {
    const score = affinityScore(answers, profile);
    if (score > bestScore + Number.EPSILON) {
      bestScore = score;
      candidates = [profile.god];
    } else if (Math.abs(score - bestScore) <= Number.EPSILON) {
      candidates.push(profile.god);
    }
  }

  // Reparte empates de forma estable entre perfiles igual de coherentes.
  return candidates[stableAnswerHash(answers) % candidates.length];
};
