import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Content from "../../../contenido/contenidoTotem.json";
import {EnviarProps } from "../../../contenido/interfaces";


const Enviar: React.FC<EnviarProps> = ({
  setComponenteActual,
  nombre,
  midios,
  lang
}) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const router = useRouter();
  const [botonPulsado, setBotonPulsado] = useState(false);

  const handleSeguirClick = async () => {
    setBotonPulsado(true);
  
    try {
      const newFile = {
        nombre,
        midios,
        lang,
        updatedAt: new Date().toISOString(),  
        id: crypto.randomUUID(),
      };
      const storedFiles = window.localStorage.getItem("odyssey-documents");
      const files = storedFiles ? JSON.parse(storedFiles) : [];
      window.localStorage.setItem("odyssey-documents", JSON.stringify([...files, newFile]));
        setComponenteActual("yapuedes");
    } catch (error) {
      console.error("Ha ocurrido un error:", error);
    }
  };
  

  const handleRestart = () => {
    router.push("/landing");
  };

  useEffect(() => {
    setBotonPulsado(false);
  }, []);

  const imagendios = `/DEUSPOMPEIA/${midios}.png`;

  return (
    <div className="flex flex-col text-center items-center mb-24">
      <p className="mb-7 text-black text-4xl">
      {Content.cuestionario.enviar.quieresllevarte[lang]}      </p>
      <Image
        src="/PortfolioDiseño.png"
        alt="PortfolioDiseño"
        width={600}
        height={600}
        className="bg-white "
      />

      <p className="mt-6 text-black text-3xl">{Content.cuestionario.enviar.pidecopia[lang]}</p>
      <p className="mt-2 text-black text-2xl"> {Content.cuestionario.enviar.precioventa[lang]}
      </p>

      <div
        className="mx-24 ml-28 px-24 flex flex-row"
        style={{
          position: "fixed",
          top: "40%",
          left: "43%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          background: "transparent",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <div className="flex-1 flex flex-col ml-24  mx-24 px-10  pr-20  ">
        <div className=" text-left mx-24 px-24 ">
        <h1 className="text-md mt-10 ">{nombre}</h1>
            <p className="text-black text-xs mt-2   text-black" style={{ fontSize: '8px' }}>{Content.cuestionario.resultado.tudioses[lang]}</p>
            <h2 className="text-black  text-md  mb-5   ">{Content.cuestionario.resultado.nombresdioses[lang][midios]}</h2>
            <div className="text-black w-44">
              <div className="text-xs mb-10 pr-5" style={{ fontSize: '8px' }}>
                {Content.cuestionario.resultado.contenidoresultado[lang][midios]}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="mx-24 flex flex-row"
        style={{
          position: "fixed",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          background: "transparent",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <div className="flex-1 flex items-center justify-center mr-10 ml-12 mt-10 ">
          <Image
            src={imagendios}
            alt={midios}
            width={130}
            height={130}
            style={{ width: "auto", height: "auto" }}
            className="px-20"
          />
        </div>
      </div>
      <div className="flex flex-row text-center justify-center">
        <button
          className="mt-11 px-8 py-4 mr-10 text-3xl text-black bg-cyan-700 rounded bg-opacity-40 shadow-lg"
          onClick={handleSeguirClick}
          disabled={botonPulsado}
        >
          {Content.cuestionario.enviar.confirmaryrecoger[lang]}
          </button>
        <button
          className="mt-11 px-8 py-4 text-3xl text-black bg-green-700  rounded bg-opacity-30  shadow-lg"
          onClick={handleRestart}
        >
          {Content.cuestionario.enviar.comenzardenuevo[lang]}
        </button>
      </div>
    </div>
  );
};

export default Enviar;
