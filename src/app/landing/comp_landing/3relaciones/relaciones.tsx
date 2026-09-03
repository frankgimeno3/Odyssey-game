import React, { useState, useEffect } from "react";
import Content from "../../../contenido/contenidoTotem.json";
import {RelacionesProps } from "../../../contenido/interfaces";



const Relaciones: React.FC<RelacionesProps> = ({
  setComponenteActual,
  setRelaciones,
  lang
}) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 700);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleOptionClick = (option: string) => {
    setIsVisible(true);
    setSelectedOption(option);
    setRelaciones(option);
    setComponenteActual("estrategia");
  };

  return (
    <div
      className={`flex flex-col mt-14 pt-14 justify-right ml-24 pl-24 ${
        isVisible
          ? "transition-opacity duration-1000 opacity-100"
          : "  opacity-0"
      }`}
    >
      <div className="flex flex-col ml-24 pl-24 justify-end text-6xl">
        <div className="pl-24 flex flex-col mx-24  ">
          <div className=" ml-24 pl-24">
            <button
              className="w-600  h-200 px-24 py-10   ml-24 mt-24 mx-24 bg-cover bg-center rounded-3xl"
              style={{ backgroundImage: 'url("/buttonB.png")' }}
              onClick={() => handleOptionClick("ENAMORADIZO")}
            >
        {Content.cuestionario.relaciones.enamoradizo[lang]}
        </button>
          </div>

          <div className=" ml-24 pl-24">
            <button
              className="w-600  h-200 px-20 py-10   ml-24 mt-24 mx-24 bg-cover bg-center rounded-3xl"
              style={{ backgroundImage: 'url("/buttonB.png")' }}
              onClick={() => handleOptionClick("COMPROMETIDO")}
            >
        {Content.cuestionario.relaciones.comprometido[lang]}
        </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Relaciones;
