import React, { useState, useEffect } from "react";
import Content from "../../../contenido/contenidoTotem.json";
import {LugarProps } from "../../../contenido/interfaces";


const Lugar: React.FC<LugarProps> = ({ setComponenteActual, setLugar, lang }) => {
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
    setLugar(option);
    setComponenteActual("humor");
  };

  return (
    <div
      className={`flex flex-col   justify-right mr-24 pr-24      ${
        isVisible
          ? "transition-opacity duration-1000 opacity-100"
          : "  opacity-0"
      }`}
    >
      <div className="flex flex-col mr-16 mt-24 pr-16 justify-end text-7xl">
        <div className="pr-24 flex flex-col mx-24  ">
          <div className=" ">
            <button
              className="w-600 text-5xl h-200 px-22 py-8   ml-24 mt-24 mx-24 bg-cover bg-center rounded-3xl"
              style={{ backgroundImage: 'url("/buttonB.png")', width: 700 }}
              onClick={() => handleOptionClick("CIUDAD")}
            >
                      {Content.cuestionario.lugar.ciudad[lang]}

            </button>
          </div>

          <div className=" ">
            <button
              className="w-600 text-5xl h-200 px-22 py-8   ml-24 mt-24 mx-24 bg-cover bg-center rounded-3xl"
              style={{ backgroundImage: 'url("/buttonB.png")', width: 700 }}
              onClick={() => handleOptionClick("CAMPO")}
            >
        {Content.cuestionario.lugar.campo[lang]}
        </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lugar;
