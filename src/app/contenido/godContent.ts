import Content from "./contenidoTotem.json";
import { Dioses, Language } from "./interfaces";

export type God = Exclude<Dioses, "">;

const result = Content.cuestionario.resultado;
export const GOD_IDS = Object.keys(result.nombresdioses.es).filter(
  (id): id is God => id !== "",
);

// Accept both the stored ID and translated names from existing results.
const normalize = (value: string) => value.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export function getGodContent(value: unknown, language: unknown) {
  if (typeof value !== "string" || !["es", "en", "de"].includes(String(language))) return null;
  const lang = language as Language;
  const key = normalize(value);
  const id = GOD_IDS.find((god) => normalize(god) === key ||
    (["es", "en", "de"] as const).some((locale) => normalize(result.nombresdioses[locale][god]) === key));
  if (!id) return null;

  return {
    id,
    name: result.nombresdioses[lang][id],
    description: result.contenidoresultado[lang][id],
    image: `/slides/DEUS/${id}.png`,
  };
}
