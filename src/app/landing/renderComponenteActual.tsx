import React, { ReactNode, useState, useEffect, FC } from "react";
import Nombre from "./comp_landing/1nombre/nombre";
import Nombrehola from "./comp_landing/1nombrehola/nombrehola";
import Conflicto from "./comp_landing/2conflicto/conflicto";
import Relaciones from "./comp_landing/3relaciones/relaciones";
import Resolutividad from "./comp_landing/5resolutividad/resolutividad";
import Estrategia from "./comp_landing/4estrategia/estrategia";
import Trabajo from "./comp_landing/6trabajo/trabajo";
import Lugar from "./comp_landing/7lugar/lugar";
import Humor from "./comp_landing/8humor/humor";
import Creatividad from "./comp_landing/9creatividad/creatividad";
import Juicio from "./comp_landing/910juicio/juicio";
import Horario from "./comp_landing/911horario/horario";
import Alea from "./comp_landing/912alea/alea";
import Resultado from "./comp_landing/913resultado/resultado";
import Enviar from "./comp_landing/914enviar/enviar";
import Yapuedes from "./comp_landing/915yapuedes/yapuedes";
import { Dioses } from "../contenido/interfaces";

interface RenderComponenteActualProps {
  lang: "es" | "en" | "de";
  componenteactual: string;
  setComponenteActual: React.Dispatch<React.SetStateAction<string>>;
  setNombre: React.Dispatch<React.SetStateAction<string>>;
  nombre: string;
  setConflicto: React.Dispatch<React.SetStateAction<string>>;
  setRelaciones: React.Dispatch<React.SetStateAction<string>>;
  setEstrategia: React.Dispatch<React.SetStateAction<string>>;
  setResolutividad: React.Dispatch<React.SetStateAction<string>>;
  setTrabajo: React.Dispatch<React.SetStateAction<string>>;
  setLugar: React.Dispatch<React.SetStateAction<string>>;
  setHumor: React.Dispatch<React.SetStateAction<string>>;
  setCreatividad: React.Dispatch<React.SetStateAction<string>>;
  setJuicio: React.Dispatch<React.SetStateAction<string>>;
  setHorario: React.Dispatch<React.SetStateAction<string>>;
  setmidios: React.Dispatch<React.SetStateAction<Dioses>>;
  conflicto: string;
  relaciones: string;
  estrategia: string;
  resolutividad: string;
  trabajo: string;
  lugar: string;
  humor: string;
  creatividad: string;
  juicio: string;
  horario: string;
  midios: Dioses;
}

const RenderComponenteActual: FC<RenderComponenteActualProps> = ({
  lang,
  componenteactual,
  setComponenteActual,
  setNombre,
  nombre,
  setConflicto,
  setRelaciones,
  setEstrategia,
  setResolutividad,
  setTrabajo,
  setLugar,
  setHumor,
  setCreatividad,
  setJuicio,
  setHorario,
  setmidios,
  conflicto,
  relaciones,
  estrategia,
  resolutividad,
  trabajo,
  lugar,
  humor,
  creatividad,
  juicio,
  horario,
  midios,
}) => {
  const [component, setComponent] = useState<ReactNode>(null);

  useEffect(() => {
    let newComponent: ReactNode = null;

    switch (componenteactual) {
      case "nombre":
        newComponent = (
          <Nombre
            setComponenteActual={setComponenteActual}
            setNombre={setNombre}
            lang={lang}
          />
        );
        break;
      case "nombrehola":
        newComponent = (
          <Nombrehola
            setComponenteActual={setComponenteActual}
            nombre={nombre}
            lang={lang}
          />
        );
        break;
      case "conflicto":
        newComponent = (
          <Conflicto
            setComponenteActual={setComponenteActual}
            setConflicto={setConflicto}
            lang={lang}
          />
        );
        break;
      case "relaciones":
        newComponent = (
          <Relaciones
            setComponenteActual={setComponenteActual}
            setRelaciones={setRelaciones}
            lang={lang}
          />
        );
        break;
      case "estrategia":
        newComponent = (
          <Estrategia
            setComponenteActual={setComponenteActual}
            setEstrategia={setEstrategia}
            lang={lang}
          />
        );
        break;
      case "resolutividad":
        newComponent = (
          <Resolutividad
            setComponenteActual={setComponenteActual}
            setResolutividad={setResolutividad}
            lang={lang}
          />
        );
        break;
      case "trabajo":
        newComponent = (
          <Trabajo
            setComponenteActual={setComponenteActual}
            setTrabajo={setTrabajo}
            lang={lang}
          />
        );
        break;
      case "lugar":
        newComponent = (
          <Lugar
            setComponenteActual={setComponenteActual}
            setLugar={setLugar}
            lang={lang}
          />
        );
        break;
      case "humor":
        newComponent = (
          <Humor
            setComponenteActual={setComponenteActual}
            setHumor={setHumor}
            lang={lang}
          />
        );
        break;
      case "creatividad":
        newComponent = (
          <Creatividad
            setComponenteActual={setComponenteActual}
            setCreatividad={setCreatividad}
            lang={lang}
          />
        );
        break;
      case "juicio":
        newComponent = (
          <Juicio
            setComponenteActual={setComponenteActual}
            setJuicio={setJuicio}
            lang={lang}
          />
        );
        break;
      case "horario":
        newComponent = (
          <Horario
            setComponenteActual={setComponenteActual}
            setHorario={setHorario}
            lang={lang}
          />
        );
        break;
      case "alea":
        newComponent = (
          <Alea
            setComponenteActual={setComponenteActual}
            lang={lang}
          />
        );
        break;
      case "resultado":
        newComponent = (
          <Resultado
            setComponenteActual={setComponenteActual}
            setmidios={(value) => {
              if (typeof value === 'string' && isValidDios(value)) {
                setmidios(value); // Asignar solo si es válido
              } else if (typeof value === 'function') {
                setmidios((prevState) => {
                  const newValue = value(prevState);
                  if (isValidDios(newValue)) {
                    return newValue;
                  } else {
                    console.error("Valor de 'midios' no válido");
                    return prevState; // O algún valor por defecto si prefieres
                  }
                });
              } else {
                console.error("Valor de 'midios' no válido");
              }
            }}
            nombre={nombre}
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
            lang={lang}
          />
        );
        break;
      case "enviar":
        newComponent = (
          <Enviar
            setComponenteActual={setComponenteActual}
            nombre={nombre}
            midios={midios}
            lang={lang}
          />
        );
        break;
      case "yapuedes":
        newComponent = (
          <Yapuedes
            setComponenteActual={setComponenteActual}
            lang={lang}
          />
        );
        break;
      default:
        newComponent = null;
    }

    setComponent(newComponent);
  }, [componenteactual, lang, nombre, setComponenteActual, setNombre, setConflicto, setRelaciones, setEstrategia, setResolutividad, setTrabajo, setLugar, setHumor, setCreatividad, setJuicio, setHorario, setmidios, conflicto, relaciones, estrategia, resolutividad, trabajo, lugar, humor, creatividad, juicio, horario, midios]);

  const isValidDios = (value: string): value is Dioses => {
    return [
      "Afrodita", "Apolo", "Ares", "Artemisa", "Atena", "Demeter",
      "Hefesto", "Hera", "Hermes", "Hestia", "Poseidon", "Zeus"
    ].includes(value);
  };

  const FadeInOut = ({ children }: { children: ReactNode }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      setVisible(true);
    }, [children]);

    return (
      <div className={`transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        {children}
      </div>
    );
  };

  return <FadeInOut>{component}</FadeInOut>;
};

export default RenderComponenteActual;
