"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Restartbutton from "../../components/RestartButton";
import RenderComponenteActual from "../renderComponenteActual"; // Asegúrate de que la ruta sea correcta
import { Dioses, Language } from "@/app/contenido/interfaces";
import QuestionPrompt from "../comp_landing/QuestionPrompt";

// Componente para manejar la transición de opacidad
const FadeInOut = ({ children, visible }: { children: React.ReactNode, visible: boolean }) => {
  return (
    <div
      className={`transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'} pointer-events-${visible ? 'auto' : 'none'}`}
      style={{ zIndex: visible ? 50 : -1 }}
    >
      {children}
    </div>
  );
};

const FadeInOut2 = ({ children, visible }: { children: React.ReactNode, visible: boolean }) => {
  return (
    <div
      className={`transition-opacity duration-9000 ${visible ? 'opacity-100' : 'opacity-0'} pointer-events-${visible ? 'auto' : 'none'}`}
      style={{ zIndex: visible ? 50 : -1 }}
    >
      {children}
    </div>
  );
};

const Cuestionario = () => {
  const [lang, setLang] = useState<Language>("en");
  const [componenteactual, setComponenteActual] = useState("nombre");
  const [nombre, setNombre] = useState("");
  const [conflicto, setConflicto] = useState("");
  const [relaciones, setRelaciones] = useState("");
  const [estrategia, setEstrategia] = useState("");
  const [resolutividad, setResolutividad] = useState("");
  const [trabajo, setTrabajo] = useState("");
  const [lugar, setLugar] = useState("");
  const [humor, setHumor] = useState("");
  const [creatividad, setCreatividad] = useState("");
  const [juicio, setJuicio] = useState("");
  const [horario, setHorario] = useState("");
  const [midios, setmidios] = useState<Dioses>("");
  const [loadingvisible, setloadingvisible] = useState(false);
  const [fondo, setFondo] = useState(`url("/fondo2.png")`);
  const [fadeVisible, setFadeVisible] = useState(true);

  useEffect(() => {
    setFadeVisible(false);
    const fadeTimeout = setTimeout(() => {
      setFadeVisible(true);
    }, 100); // Temporizador para asegurar que la transición ocurra después del cambio de fondo

    return () => clearTimeout(fadeTimeout);
  }, [fondo]);

  useEffect(() => {
    switch (componenteactual) {
      case "conflicto":
        setFondo(`url("/f2.png")`);
        setTimeout(() => {
          setFondo(`url("/preguntas/1.png")`);
        }, 600);
        break;
      case "relaciones":
        setFondo(`url("/f2.png")`);
        setTimeout(() => {
          setFondo(`url("/preguntas/2.png")`);
        }, 600);
        break;
      case "estrategia":
        setFondo(`url("/f2.png")`);
        setTimeout(() => {
          setFondo(`url("/preguntas/3.png")`);
        }, 600);
        break;
      case "resolutividad":
        setFondo(`url("/f2.png")`);
        setTimeout(() => {
          setFondo(`url("/preguntas/4.png")`);
        }, 600);
        break;
      case "trabajo":
        setFondo(`url("/f2.png")`);
        setTimeout(() => {
          setFondo(`url("/preguntas/5.png")`);
        }, 600);
        break;
      case "lugar":
        setFondo(`url("/f2.png")`);
        setTimeout(() => {
          setFondo(`url("/preguntas/6.png")`);
        }, 600);
        break;
      case "humor":
        setFondo(`url("/f2.png")`);
        setTimeout(() => {
          setFondo(`url("/preguntas/7.png")`);
        }, 600);
        break;
      case "creatividad":
        setFondo(`url("/f2.png")`);
        setTimeout(() => {
          setFondo(`url("/preguntas/8.png")`);
        }, 600);
        break;
      case "juicio":
        setFondo(`url("/f2.png")`);
        setTimeout(() => {
          setFondo(`url("/preguntas/9.png")`);
        }, 600);
        break;
      case "horario":
        setFondo(`url("/f2.png")`);
        setTimeout(() => {
          setFondo(`url("/preguntas/10.png")`);
        }, 600);
        break;
      case "resultado":
        setFondo(`url("/fondo2.png")`);
        setTimeout(() => {
          setFondo(`url("/PortfolioEnvio.png")`);
        }, 600);
        break;
      default:
        setFondo(`url("/fondo2.png")`);
        break;
    }
  }, [componenteactual]);

  useEffect(() => {
    setloadingvisible(true);
    setTimeout(() => {
      setloadingvisible(false);
    }, 600);
  }, [componenteactual]);

  return (
    <div
      className="flex flex-col h-screen mx-auto"
      style={{
        backgroundImage: `url("/f2.png")`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      }}
    >
      <div
        className="relative h-screen flex flex-col justify-center text-center"
      >
        <FadeInOut2 visible={fadeVisible}>
          <div
            className="relative h-screen flex flex-col justify-center text-center transition-opacity duration-2000"
            style={{
              backgroundImage: fondo,
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
            }}
          >
            <QuestionPrompt component={componenteactual} lang={lang} />
            <FadeInOut2 visible={loadingvisible}>
              <div className="absolute z-50 inset-0 flex items-center justify-center">
                <div className="p-4 rounded opacity-90">
                  <Image
                    src="/gif/GIF1.gif"
                    alt="loading"
                    width={200}
                    height={50}
                    className="w-auto h-auto"
                  />
                </div>
              </div>
            </FadeInOut2>

            <div className="absolute top-10 right-10 m-4">
              <Restartbutton />
            </div>

            <FadeInOut2 visible={!loadingvisible}>
              <RenderComponenteActual
                lang={lang}
                componenteactual={componenteactual}
                setComponenteActual={setComponenteActual}
                setNombre={setNombre}
                nombre={nombre}
                setConflicto={setConflicto}
                setRelaciones={setRelaciones}
                setEstrategia={setEstrategia}
                setResolutividad={setResolutividad}
                setTrabajo={setTrabajo}
                setLugar={setLugar}
                setHumor={setHumor}
                setCreatividad={setCreatividad}
                setJuicio={setJuicio}
                setHorario={setHorario}
                setmidios={setmidios}
                conflicto={conflicto}
                relaciones={relaciones}
                estrategia={estrategia}
                resolutividad={resolutividad}
                trabajo={trabajo}
                lugar={lugar}
                humor={humor}
                creatividad={creatividad}
                juicio={juicio}
                horario={horario}
                midios={midios}
              />
            </FadeInOut2>
          </div>
        </FadeInOut2>
      </div>
    </div>
  );
};

export default Cuestionario;
