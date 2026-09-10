import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Content from "../../../contenido/contenidoTotem.json";
import { EnviarProps } from "../../../contenido/interfaces";
import ResultCard from "../ResultCard";

const Enviar: React.FC<EnviarProps> = ({ setComponenteActual, nombre, midios, lang }) => {
  const router = useRouter();
  const [botonPulsado, setBotonPulsado] = useState(false);

  const [saveError, setSaveError] = useState(false);
  const documentRef = useRef<ReturnType<typeof doc> | null>(null);
  const saving = useRef(false);

  const handleSeguirClick = async () => {
    if (saving.current) return;
    saving.current = true;
    setSaveError(false);
    setBotonPulsado(true);
    try {
      documentRef.current ??= doc(collection(db, "documents"));
      await setDoc(documentRef.current, {
        nombre, midios, lang, updatedAt: new Date().toISOString(), id: documentRef.current.id,
      });
      setComponenteActual("yapuedes");
    } catch (error) {
      console.error("Error saving result:", error);
      setSaveError(true);
      setBotonPulsado(false);
      saving.current = false;
    }
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
      {saveError && <p role="alert">{lang === "es" ? "No se ha podido guardar. Comprueba la conexión y vuelve a intentarlo." : lang === "de" ? "Speichern fehlgeschlagen. Prüfe die Verbindung und versuche es erneut." : "Could not save. Check your connection and try again."}</p>}
      <div className="mt-7 flex gap-12">
        <button className="result-action" onClick={handleSeguirClick} disabled={botonPulsado}>{Content.cuestionario.enviar.confirmaryrecoger[lang]}</button>
        <button className="result-action" onClick={() => router.push("/landing")}>{Content.cuestionario.enviar.comenzardenuevo[lang]}</button>
      </div>
    </div>
  );
};

export default Enviar;
