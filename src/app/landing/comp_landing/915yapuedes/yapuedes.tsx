import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Content from "../../../contenido/contenidoTotem.json";
import {YapuedesProps } from "../../../contenido/interfaces";

const Yapuedes: React.FC<YapuedesProps> = ({ setComponenteActual, lang }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const router = useRouter();
 
  const handleRestart = () =>{
    router.push("/landing");
  }
  return (
    <div className="flex flex-col text-center align-center justify-center text-6xl mb-24  ">
      <h1 className=" ">{Content.cuestionario.yapuedes.yapuedes[lang]}</h1>
      <div className="mx-auto my-10">

      <Image src="/tick.png" alt="tick" width={330} height={330} />
      </div>

      <div className="mx-20 text-4xl">
        <button className="mt-2 px-8 py-2 shadow-lg text-md text-black bg-cyan-700 rounded bg-opacity-40" onClick={handleRestart}>{Content.cuestionario.yapuedes.vuelveajugar[lang]}</button>
      </div> 
    </div>
  );
};

export default Yapuedes;
