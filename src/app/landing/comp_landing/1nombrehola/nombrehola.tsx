import React, { useState } from "react";
import Image from "next/image";
import Content from "../../../contenido/contenidoTotem.json";
import {NombreholaProps } from "../../../contenido/interfaces";



const Nombrehola: React.FC<NombreholaProps> = ({
  setComponenteActual,
  nombre,
  lang
}) => {
  const handleSeguirClick = () => {
    setComponenteActual("conflicto");
  };

  return (
    <div className="flex flex-col text-center justify-start align-center px-10 mb-24">
      <div className="flex flex-col text-center px-20  ">
        <div className="flex flex-row text-6xl   justify-center">
          <h1>{Content.cuestionario.nombrehola.saludos[lang]} {nombre}</h1>
        </div>
        <p className="text-black text-3xl pb-5 ">{Content.cuestionario.nombrehola.bienvenidosalolimpo[lang]}</p>
        <div className="flex flex-col justify-center items-center text-center  ">
          <Image src="/Stickers.png" alt="Gods" width={650} height={550} />
        </div>
      </div>
      <div>
        <p className="text-black text-3xl pt-5">
        {Content.cuestionario.nombrehola.cualdeellos[lang]}
        </p>
        <p className="text-black text-3xl">
        {Content.cuestionario.nombrehola.atreveteasaber[lang]}
        </p>
      </div>
      <div className="flex flex-row mt-5 justify-center text-center align-center">
          <button
            className="mt-1 px-8 py-4    text-4xl shadow-lg text-black bg-cyan-200 rounded bg-opacity-40"
            onClick={handleSeguirClick}
          >
        {Content.cuestionario.nombrehola.empezar[lang]}
        </button>

      </div>
    </div>
  );
};

export default Nombrehola;
