import { Cuestionario } from "./interfazcuestionario";
import { PrinterInterface } from "./interfazprinter";

// Define el tipo de contenido para las claves del idioma
export interface LanguageContent {
    en: string;
    de: string;
    es: string;
}

export type Language = "es" | "en" | "de";

export type Dioses = "" | "Afrodita" | "Apolo" | "Ares" | "Artemisa" | "Atena" | "Demeter" | "Hefesto" | "Hera" | "Hermes" | "Hestia" | "Poseidon" | "Zeus";

// Define el tipo de contenido del cuestionario
export interface ContenidoResultado {
    [key: string]: {
        [key: string]: string;
    };
}

export interface ContentType {
    dashboard: {
        // Define las propiedades de dashboard si es necesario
    };
    cuestionario: Cuestionario;
    printer: PrinterInterface;
}

// Define las propiedades de los componentes para varios aspectos
export interface NombreProps {
    setComponenteActual: React.Dispatch<React.SetStateAction<string>>;
    setNombre: React.Dispatch<React.SetStateAction<string>>;
    lang: Language;
}

export interface NombreholaProps {
    setComponenteActual: React.Dispatch<React.SetStateAction<string>>;
    nombre: string;
    lang: Language;
}

export interface ConflictoProps {
    setComponenteActual: React.Dispatch<React.SetStateAction<string>>;
    setConflicto: React.Dispatch<React.SetStateAction<string>>;
    lang: Language;
}

export interface RelacionesProps {
    setComponenteActual: React.Dispatch<React.SetStateAction<string>>;
    setRelaciones: React.Dispatch<React.SetStateAction<string>>;
    lang: Language;
}

export interface EstrategiaProps {
    setComponenteActual: React.Dispatch<React.SetStateAction<string>>;
    setEstrategia: React.Dispatch<React.SetStateAction<string>>;
    lang: Language;
}

export interface ResolutividadProps {
    setComponenteActual: React.Dispatch<React.SetStateAction<string>>;
    setResolutividad: React.Dispatch<React.SetStateAction<string>>;
    lang: Language;
}

export interface TrabajoProps {
    setComponenteActual: React.Dispatch<React.SetStateAction<string>>;
    setTrabajo: React.Dispatch<React.SetStateAction<string>>;
    lang: Language;
}

export interface LugarProps {
    setComponenteActual: React.Dispatch<React.SetStateAction<string>>;
    setLugar: React.Dispatch<React.SetStateAction<string>>;
    lang: Language;
}

export interface HumorProps {
    setComponenteActual: React.Dispatch<React.SetStateAction<string>>;
    setHumor: React.Dispatch<React.SetStateAction<string>>;
    lang: Language;
}

export interface CreatividadProps {
    setComponenteActual: React.Dispatch<React.SetStateAction<string>>;
    setCreatividad: React.Dispatch<React.SetStateAction<string>>;
    lang: Language;
}

export interface JuicioProps {
    setComponenteActual: React.Dispatch<React.SetStateAction<string>>;
    setJuicio: React.Dispatch<React.SetStateAction<string>>;
    lang: Language;
}

export interface HorarioProps {
    setComponenteActual: React.Dispatch<React.SetStateAction<string>>;
    setHorario: React.Dispatch<React.SetStateAction<string>>;
    lang: Language;
}

export interface AleaProps {
    setComponenteActual: React.Dispatch<React.SetStateAction<string>>;
    lang: Language;
}

export interface ResultadoProps {
    setComponenteActual: React.Dispatch<React.SetStateAction<string>>;
    setmidios: React.Dispatch<React.SetStateAction<Dioses>>;
    nombre: string;
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
    lang: Language;
}

export interface EnviarProps {
    setComponenteActual: React.Dispatch<React.SetStateAction<string>>;
    midios: Dioses;
    nombre: string;
    lang: Language;
}

export interface YapuedesProps {
    setComponenteActual: React.Dispatch<React.SetStateAction<string>>;
    lang: Language;
}

export interface PrinterContent {
    title: LanguageContent;
    languageselection: LanguageContent;
    cerrarsesion: LanguageContent;
    subtitulo: LanguageContent;
    hora: LanguageContent;
    nombre: LanguageContent;
    dios: LanguageContent;
    idioma: LanguageContent;
    archivo: LanguageContent;
    opciones: LanguageContent;
    visualizar: LanguageContent;
    eliminar: LanguageContent;
    cancelar: LanguageContent;
    estasseguro: LanguageContent;
    vermas: LanguageContent;
}

export interface PrinterProps { }
