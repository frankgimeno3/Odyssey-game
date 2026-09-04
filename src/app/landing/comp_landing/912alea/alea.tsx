import React from "react";
import Content from "../../../contenido/contenidoTotem.json";
import {AleaProps } from "../../../contenido/interfaces";


const Alea: React.FC<AleaProps> = ({ setComponenteActual, lang }) => {
  const handleSeguirClick = () => {
    setComponenteActual("resultado");
  };

  return (
    <div className="flex flex-col text-center justify-center">
       <h2 className="text-[110px]"> {Content.cuestionario.alea.aleaiactaest[lang]}
       </h2>
      <h2 className="mb-20 text-[110px]"> {Content.cuestionario.alea.lasuerteesta[lang]}
      </h2>

      <div className="mx-20">
        <button
        className="mt-2 px-8 py-4 shadow-lg text-4xl text-black bg-cyan-700 rounded bg-opacity-40"
          onClick={handleSeguirClick}
        >
        {Content.cuestionario.alea.resultados[lang]}
        </button>
        </div> 
     </div>
  );
};

export default Alea;
