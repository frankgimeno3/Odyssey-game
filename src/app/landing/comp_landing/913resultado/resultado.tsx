import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { animated, useSpring } from "react-spring";
import Content from "../../../contenido/contenidoTotem.json";
import { ResultadoProps } from "../../../contenido/interfaces";
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

  // Mismas respuestas, mismo resultado: no interviene el azar.
  const tuDios = useMemo(() => calculateGodAffinity(respuestas), [respuestas]);

  useEffect(() => setIsVisible(true), []);

  const handleSeguirClick = () => {
    setmidios(tuDios);
    setComponenteActual("enviar");
  };

  return (
    <animated.div className="flex w-screen flex-col justify-center p-24 text-center" style={springAnimation}>
      <div className="mt-14 px-20 pt-8">
        <div className="mx-14 flex flex-row justify-center px-20 pr-24 text-left">
          <div className="ml-16 flex flex-1 flex-col pt-10">
            <div className="ml-14 pl-24">
              <h1 className="mt-10 text-7xl">{nombre}</h1>
              <p className="mb-16 mt-2 text-2xl text-black">{Content.cuestionario.resultado.tudioses[lang]}</p>
              <h2 className="mb-5 text-7xl text-black">{Content.cuestionario.resultado.nombresdioses[lang][tuDios]}</h2>
              <div className="pr-5 text-2xl text-black">{Content.cuestionario.resultado.contenidoresultado[lang][tuDios]}</div>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <Image src={`/DEUSPOMPEIA/${tuDios}.png`} alt={tuDios} width={400} height={400} style={{ width: "auto", height: "auto" }} className="px-20" />
          </div>
        </div>
        <div className="mx-16 flex flex-row justify-center px-24">
          <div className="mr-24 flex-1">
            <button className="mr-4 mt-2 rounded bg-cyan-700 bg-opacity-40 px-8 py-4 text-3xl text-black shadow-lg" onClick={handleSeguirClick}>
              {Content.cuestionario.resultado.imprimir[lang]}
            </button>
          </div>
          <div className="flex-1">
            <button className="ml-4 mt-2 rounded bg-cyan-700 bg-opacity-40 px-8 py-4 text-3xl text-black shadow-lg" onClick={() => router.push("/landing")}>
              {Content.cuestionario.resultado.sinimprimir[lang]}
            </button>
          </div>
        </div>
      </div>
    </animated.div>
  );
};

export default Resultado;
