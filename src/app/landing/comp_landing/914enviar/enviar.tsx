import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Content from "../../../contenido/contenidoTotem.json";
import { EnviarProps } from "../../../contenido/interfaces";
import ResultCard from "../ResultCard";

const Enviar: React.FC<EnviarProps> = ({ setComponenteActual, nombre, midios, lang }) => {
  const router = useRouter();
  const [botonPulsado, setBotonPulsado] = useState(false);

  const handleSeguirClick = () => {
    setBotonPulsado(true);
    const newFile = { nombre, midios, lang, updatedAt: new Date().toISOString(), id: crypto.randomUUID() };
    const storedFiles = window.localStorage.getItem("odyssey-documents");
    const files = storedFiles ? JSON.parse(storedFiles) : [];
    window.localStorage.setItem("odyssey-documents", JSON.stringify([...files, newFile]));
    setComponenteActual("yapuedes");
  };

  useEffect(() => setBotonPulsado(false), []);

  if (!midios) return null;

  return (
    <div
      className="absolute inset-0 z-10 flex flex-col items-center bg-cover bg-center text-center text-black"
      style={{ backgroundImage: 'url("/Fondo oscurecido.png")' }}
    >
      <h1 className="mt-[5%] text-[44px] uppercase">{Content.cuestionario.enviar.quieresllevarte[lang]}</h1>
      <div className="mt-8 h-[520px] w-[748px] shadow-xl">
        <ResultCard name={nombre} god={midios} lang={lang} variant="preview" />
      </div>
      <p className="mt-8 text-[34px] uppercase">{Content.cuestionario.enviar.pidecopia[lang]}</p>
      <p className="mt-2 text-[26px] uppercase">{Content.cuestionario.enviar.precioventa[lang]}</p>
      <div className="mt-7 flex gap-12">
        <button className="result-action" onClick={handleSeguirClick} disabled={botonPulsado}>{Content.cuestionario.enviar.confirmaryrecoger[lang]}</button>
        <button className="result-action" onClick={() => router.push("/landing")}>{Content.cuestionario.enviar.comenzardenuevo[lang]}</button>
      </div>
    </div>
  );
};

export default Enviar;
