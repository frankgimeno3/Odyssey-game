"use client";

import React from "react";
import { Dioses, Language } from "../../contenido/interfaces";
import { getGodContent } from "../../contenido/godContent";

const guideText: Record<Language, string> = {
  es: "TU DIVINIDAD REGENTE ES",
  en: "YOUR GUIDING DEITY IS",
  de: "DEINE FÜHRENDE GOTTHEIT IST",
};

interface ComponentToPrintProps {
  nombre: string;
  tuDios: Dioses;
  tulang: Language;
}

const ComponentToPrint = React.forwardRef<HTMLDivElement, ComponentToPrintProps>(
  function ComponentToPrint({ nombre, tuDios, tulang }, ref) {
    const god = getGodContent(tuDios, tulang);
    if (!god) return null;

    return (
      <div ref={ref} className="print-sheet font-cinzel">
        <img className="print-sheet-background" src="/PLANTILLA IMPRESION GOD.png" alt="" />
        <section className="print-heading">
          <h1>{nombre}</h1>
          <p>ΑΝΕΡΡΙΦΘΩ ΚΥΒΟΣ!</p>
          <p>{guideText[tulang]}</p>
        </section>
        <section className="print-god-copy">
          <h2>{god.name}</h2>
          <p>{god.description}</p>
        </section>
        <img className="print-god-image" src={god.image} alt={god.name} />
      </div>
    );
  },
);

ComponentToPrint.displayName = "ComponentToPrint";

export default ComponentToPrint;
