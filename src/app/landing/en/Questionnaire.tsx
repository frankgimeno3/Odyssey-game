"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Restartbutton from "../../components/RestartButton";
import RenderComponenteActual from "../renderComponenteActual"; // AsegÃƒÂºrate de que la ruta sea correcta
import { Dioses, Language } from "@/app/contenido/interfaces";
import InactivityRestart from "../comp_landing/InactivityRestart";
import QuestionPrompt from "../comp_landing/QuestionPrompt";
import useStageTransition from "../useStageTransition";
import { getRouteFromStage } from "../stageRoutes";

// Componente para manejar la transiciÃƒÂ³n de opacidad
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
      className={`transition-opacity ${visible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
      style={{
        zIndex: visible ? 50 : -1,
        transition: "opacity 450ms ease-in-out",
      }}
    >
      {children}
    </div>
  );
};

export const EnglishQuestionnaire = ({ initialStage = "nombre" }: { initialStage?: string }) => {
  const [lang, setLang] = useState<Language>("en");
  const { stage: componenteactual, phase, setStageWithTransition: setComponenteActual } = useStageTransition(initialStage);
  const [nombre, setNombre] = useState(initialStage === "nombre" ? "" : "X");
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
  const [midios, setmidios] = useState<Dioses>(initialStage === "enviar" ? "Apolo" : "");
  const [fondo, setFondo] = useState(`url("/fondo2.png")`);
  const [fadeVisible, setFadeVisible] = useState(initialStage === "nombre");
  const [entryContentVisible, setEntryContentVisible] = useState(false);

  useEffect(() => {
    const contentTimer = window.setTimeout(() => setEntryContentVisible(true), initialStage === "nombre" ? 50 : 650);
    return () => window.clearTimeout(contentTimer);
  }, []);

  useEffect(() => {
    const routeStage = getRouteFromStage(componenteactual);
    if (routeStage) window.history.replaceState(null, "", `/landing/en/${routeStage}`);
  }, [componenteactual]);

  useEffect(() => {
    if (fondo === 'url("/fondo2.png")') {
      setFadeVisible(true);
      return;
    }
    setFadeVisible(false);
    const fadeTimeout = setTimeout(() => {
      setFadeVisible(true);
    }, 100); // Temporizador para asegurar que la transiciÃƒÂ³n ocurra despuÃƒÂ©s del cambio de fondo

    return () => clearTimeout(fadeTimeout);
  }, [fondo]);

  useEffect(() => {
    if (["conflicto", "relaciones", "estrategia", "resolutividad", "trabajo", "lugar", "humor", "creatividad", "juicio", "horario", "alea", "resultado", "enviar"].includes(componenteactual)) {
      return;
    }

    switch (componenteactual) {
      case "conflicto":
        setFondo(`url("/Fondo oscurecido.png")`);
        setTimeout(() => {
          setFondo(`url("/Fondo oscurecido.png")`);
        }, 600);
        break;
      case "relaciones":
        setFondo(`url("/Fondo oscurecido.png")`);
        setTimeout(() => {
          setFondo(`url("/Fondo oscurecido.png")`);
        }, 600);
        break;
      case "estrategia":
        setFondo(`url("/Fondo oscurecido.png")`);
        setTimeout(() => {
          setFondo(`url("/Fondo oscurecido.png")`);
        }, 600);
        break;
      case "resolutividad":
        setFondo(`url("/Fondo oscurecido.png")`);
        setTimeout(() => {
          setFondo(`url("/Fondo oscurecido.png")`);
        }, 600);
        break;
      case "trabajo":
        setFondo(`url("/Fondo oscurecido.png")`);
        setTimeout(() => {
          setFondo(`url("/Fondo oscurecido.png")`);
        }, 600);
        break;
      case "lugar":
        setFondo(`url("/Fondo oscurecido.png")`);
        setTimeout(() => {
          setFondo(`url("/Fondo oscurecido.png")`);
        }, 600);
        break;
      case "humor":
        setFondo(`url("/Fondo oscurecido.png")`);
        setTimeout(() => {
          setFondo(`url("/Fondo oscurecido.png")`);
        }, 600);
        break;
      case "creatividad":
        setFondo(`url("/Fondo oscurecido.png")`);
        setTimeout(() => {
          setFondo(`url("/Fondo oscurecido.png")`);
        }, 600);
        break;
      case "juicio":
        setFondo(`url("/Fondo oscurecido.png")`);
        setTimeout(() => {
          setFondo(`url("/Fondo oscurecido.png")`);
        }, 600);
        break;
      case "horario":
        setFondo(`url("/Fondo oscurecido.png")`);
        setTimeout(() => {
          setFondo(`url("/Fondo oscurecido.png")`);
        }, 600);
        break;
      case "resultado":
        setFondo(`url("/fondo2.png")`);
        setTimeout(() => {
          setFondo(`url("/slides/PREPRINT-HD.png")`);
        }, 600);
        break;
      default:
        setFondo(`url("/fondo2.png")`);
        break;
    }
  }, [componenteactual]);

  return (
    <div
      className="flex flex-col h-screen mx-auto"
      style={{
        backgroundImage: componenteactual === "nombre"
          ? `url("/fondo2.png")`
          : componenteactual === "alea"
          ? `url("/fondo1.png")`
          : ["conflicto", "relaciones", "estrategia", "resolutividad", "trabajo", "lugar", "humor", "creatividad", "juicio", "horario"].includes(componenteactual)
          ? `url("/Fondo oscurecido.png")`
          : `url("/Fondo oscurecido.png")`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      }}
    >
      <InactivityRestart lang={lang} />
      <div
        className="relative h-screen flex flex-col justify-center text-center"
      >
        <FadeInOut2 visible={fadeVisible}>
          <div
            className="relative h-screen flex flex-col justify-center text-center transition-opacity duration-2000"
            style={{
              backgroundImage: ["conflicto", "relaciones", "estrategia", "resolutividad", "trabajo", "lugar", "humor", "creatividad", "juicio", "horario", "alea", "resultado", "enviar"].includes(componenteactual) ? "none" : fondo,
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
            }}
          >
            <FadeInOut2 visible={entryContentVisible && (phase === "idle" || phase === "in")}>
              <QuestionPrompt key={componenteactual} component={componenteactual} lang={lang} />
            </FadeInOut2>
            <FadeInOut2 visible={phase === "loading"}>
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
              <FadeInOut2 visible={entryContentVisible}>
                <Restartbutton />
              </FadeInOut2>
            </div>

            <FadeInOut2 visible={entryContentVisible && (phase === "idle" || phase === "in")}>
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

export default function EnglishQuestionnairePage() {
  return <EnglishQuestionnaire />;
}
