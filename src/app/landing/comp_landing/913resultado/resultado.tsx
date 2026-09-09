import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { animated, useSpring } from "react-spring";
import Content from "../../../contenido/contenidoTotem.json";
import { ResultadoProps } from "../../../contenido/interfaces";
import ResultCard from "../ResultCard";
import { calculateGodAffinity } from "./godAffinity";

const Resultado: React.FC<ResultadoProps> = ({
  setComponenteActual, setmidios, nombre, conflicto, relaciones, estrategia,
  resolutividad, trabajo, lugar, humor, creatividad, juicio, horario, lang,
}) => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const springAnimation = useSpring({ opacity: isVisible ? 1 : 0, config: { duration: 500 } });
  const respuestas = useMemo(() => [
    conflicto, relaciones, estrategia, resolutividad, trabajo,
    lugar, humor, creatividad, juicio, horario,
  ], [conflicto, relaciones, estrategia, resolutividad, trabajo, lugar, humor, creatividad, juicio, horario]);
  const tuDios = useMemo(() => calculateGodAffinity(respuestas), [respuestas]);

  useEffect(() => setIsVisible(true), []);

  const handlePrint = () => {
    setmidios(tuDios);
    setComponenteActual("enviar");
  };

  return (
    <animated.div className="absolute inset-0 z-10" style={springAnimation}>
      <ResultCard name={nombre} god={tuDios} lang={lang} />
      <div className="result-actions absolute bottom-[8.5%] left-0 z-30 w-full">
        <button
          className="result-action"
          style={{ left: "26.5%" }}
          onClick={handlePrint}
        >
          {Content.cuestionario.resultado.imprimir[lang]}
        </button>
        <button
          className="result-action mr-12"
          style={{minWidth: 440 }}
          onClick={() => router.push("/landing")}
        >
          {Content.cuestionario.resultado.sinimprimir[lang]}
        </button>
      </div>
    </animated.div>
  );
};

export default Resultado;
