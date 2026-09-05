"use client";

import { Dispatch, SetStateAction } from "react";
import { getGodContent } from "../contenido/godContent";
import { Dioses, Language } from "../contenido/interfaces";

interface StoredResult {
  lang: Language;
  midios: Dioses;
}

interface HandleVisualizarProps {
  file: StoredResult;
  setcontenidoprint: Dispatch<SetStateAction<string>>;
}

export const handleVisualizar = ({ file, setcontenidoprint }: HandleVisualizarProps) => {
  setcontenidoprint(getGodContent(file.midios, file.lang)?.description ?? "");
};
