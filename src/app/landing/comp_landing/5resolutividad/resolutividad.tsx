import React, { useState, useEffect } from "react";
import Content from "../../../contenido/contenidoTotem.json";
import {ResolutividadProps } from "../../../contenido/interfaces";

const Resolutividad: React.FC<ResolutividadProps> = ({
  setComponenteActual,
  setResolutividad,
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
    setResolutividad(option);
    setComponenteActual("trabajo");
  };

  return (
    <div
      className={`flex flex-col pt-14 justify-right ml-24 pl-24      ${
        isVisible
          ? "transition-opacity duration-1000 opacity-100"
          : "  opacity-0"
      }`}
    >
      <div className="flex flex-col ml-24 pl-24 justify-end ">
        <div className="pl-24 flex flex-col mx-24 mt-24 ">
          <div className=" ml-24 pl-24">
            <button
              className="w-600 text-5xl h-200 px-22 py-8   ml-24 mt-24 mx-24 bg-cover bg-center rounded-3xl"
              style={{ backgroundImage: 'url("/buttonB.png")', width: 700 }}
              onClick={() => handleOptionClick("CONFRONTACIÓN")}
            >
        {Content.cuestionario.resolutividad.confrontacion[lang]}
        </button>
          </div>

          <div className=" ml-24 pl-24">
            <button
              className="w-600 text-5xl h-200 px-22 py-8   ml-24 mt-24 mx-24 bg-cover bg-center rounded-3xl"
              style={{ backgroundImage: 'url("/buttonB.png")', width: 700 }}
              onClick={() => handleOptionClick("NEGOCIACIÓN")}
            >
        {Content.cuestionario.resolutividad.negociacion[lang]}
        </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resolutividad;
