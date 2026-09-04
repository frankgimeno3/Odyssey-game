"use client";

import { Dispatch, SetStateAction } from "react";
import slogans from "../contenido/slogans.json";
import sloganseng from "../contenido/sloganseng.json";
import slogansde from "../contenido/slogansde.json";
import { Dioses, Language } from "../contenido/interfaces";

interface StoredResult {
  lang: Language;
  midios: Dioses;
}

interface HandleVisualizarProps {
  file: StoredResult;
  setcontenidoprint: Dispatch<SetStateAction<string>>;
}

const slogansByLanguage = { es: slogans, en: sloganseng, de: slogansde };

export const handleVisualizar = ({ file, setcontenidoprint }: HandleVisualizarProps) => {
  if (!file.midios) return;

  setcontenidoprint(slogansByLanguage[file.lang][file.midios]);
};
