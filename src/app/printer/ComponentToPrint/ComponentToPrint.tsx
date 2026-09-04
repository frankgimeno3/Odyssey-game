"use client";

import React from "react";
import { Dioses, Language } from "../../contenido/interfaces";

type PrintableGod = Exclude<Dioses, "">;

const godNames: Record<Language, Record<PrintableGod, string>> = {
  en: { Demeter: "DEMETER", Artemisa: "ARTEMIS", Apolo: "APOLLO", Zeus: "ZEUS", Hera: "HERA", Ares: "ARES", Hermes: "HERMES", Atena: "ATHENA", Poseidon: "POSEIDON", Afrodita: "APHRODITE", Hestia: "HESTIA", Hefesto: "HEPHAESTUS" },
  es: { Demeter: "DEMÉTER", Artemisa: "ARTEMISA", Apolo: "APOLO", Zeus: "ZEUS", Hera: "HERA", Ares: "ARES", Hermes: "HERMES", Atena: "ATENEA", Poseidon: "POSEIDÓN", Afrodita: "AFRODITA", Hestia: "HESTIA", Hefesto: "HEFESTO" },
  de: { Demeter: "DEMETER", Artemisa: "ARTEMIS", Apolo: "APOLLON", Zeus: "ZEUS", Hera: "HERA", Ares: "ARES", Hermes: "HERMES", Atena: "ATHENE", Poseidon: "POSEIDON", Afrodita: "APHRODITE", Hestia: "HESTIA", Hefesto: "HEPHAISTOS" },
};

const guideText: Record<Language, string> = {
  es: "TU DIVINIDAD REGENTE ES",
  en: "YOUR GUIDING DEITY IS",
  de: "DEINE FÜHRENDE GOTTHEIT IST",
};

interface ComponentToPrintProps {
  nombre: string;
  tuDios: Dioses;
  tulang: Language;
  contenidoprint: string;
}

const ComponentToPrint = React.forwardRef<HTMLDivElement, ComponentToPrintProps>(
  function ComponentToPrint({ nombre, tuDios, tulang, contenidoprint }, ref) {
    if (!tuDios) return null;

    return (
      <div ref={ref} className="print-sheet font-cinzel">
        <img className="print-sheet-background" src="/PLANTILLA IMPRESION GOD.png" alt="" />
        <section className="print-heading">
          <h1>{nombre}</h1>
          <p>ΑΝΕΡΡΙΦΘΩ ΚΥΒΟΣ!</p>
          <p>{guideText[tulang]}</p>
        </section>
        <section className="print-god-copy">
          <h2>{godNames[tulang][tuDios]}</h2>
          <p>{contenidoprint}</p>
        </section>
        <img className="print-god-image" src={`/slides/DEUS/${tuDios}.png`} alt={godNames[tulang][tuDios]} />
      </div>
    );
  },
);

ComponentToPrint.displayName = "ComponentToPrint";

export default ComponentToPrint;
