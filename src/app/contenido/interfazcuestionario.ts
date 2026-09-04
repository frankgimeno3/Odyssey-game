import type { Dioses } from "./interfaces";

type GodDescriptions = Record<Exclude<Dioses, "">, string>;

export interface Cuestionario {
    nombre: {
        escribetunombre: {
            es: string;
            en: string;
            de: string;
        };
        caracteres10: {
            es: string;
            en: string;
            de: string;
        };
        seguir: {
            es: string;
            en: string;
            de: string;
        };
    };
    dashboard: {
        tegustariasaber: {
            es: string;
            en: string;
            de: string;
        };
        quediosdelolimpo: {
            es: string;
            en: string;
            de: string;
        };
        terepresenta: {
            es: string;
            en: string;
            de: string;
        };
        unaaventuraquenosensena: {
            es: string;
            en: string;
            de: string;
        };
        botonjugar: {
            es: string;
            en: string;
            de: string;
        };
    };
    nombrehola: {
        saludos: {
            es: string;
            en: string;
            de: string;
        };
        bienvenidosalolimpo: {
            es: string;
            en: string;
            de: string;
        };
        cualdeellos: {
            es: string;
            en: string;
            de: string;
        };
        atreveteasaber: {
            es: string;
            en: string;
            de: string;
        };
        empezar: {
            es: string;
            en: string;
            de: string;
        };
    };
    conflicto: {
        pacifico: {
            es: string;
            en: string;
            de: string;
        };
        guerrero: {
            es: string;
            en: string;
            de: string;
        };
    };
    relaciones: {
        enamoradizo: {
            es: string;
            en: string;
            de: string;
        };
        comprometido: {
            es: string;
            en: string;
            de: string;
        };
    };
    estrategia: {
        estratega: {
            es: string;
            en: string;
            de: string;
        };
        impulsivo: {
            es: string;
            en: string;
            de: string;
        };
    };
    resolutividad: {
        confrontacion: {
            es: string;
            en: string;
            de: string;
        };
        negociacion: {
            es: string;
            en: string;
            de: string;
        };
    };
    trabajo: {
        trabajador: {
            es: string;
            en: string;
            de: string;
        };
        holgazan: {
            es: string;
            en: string;
            de: string;
        };
    };
    lugar: {
        ciudad: {
            es: string;
            en: string;
            de: string;
        };
        campo: {
            es: string;
            en: string;
            de: string;
        };
    };
    humor: {
        buenhumor: {
            es: string;
            en: string;
            de: string;
        };
        malhumor: {
            es: string;
            en: string;
            de: string;
        };
    };
    creatividad: {
        creativo: {
            es: string;
            en: string;
            de: string;
        };
        racional: {
            es: string;
            en: string;
            de: string;
        };
    };
    juicio: {
        hechos: {
            es: string;
            en: string;
            de: string;
        };
        emociones: {
            es: string;
            en: string;
            de: string;
        };
    };
    horario: {
        diurno: {
            es: string;
            en: string;
            de: string;
        };
        nocturno: {
            es: string;
            en: string;
            de: string;
        };
    };
    alea: {
        aleaiactaest: {
            es: string;
            en: string;
            de: string;
        };
        lasuerteesta: {
            es: string;
            en: string;
            de: string;
        };
        resultados: {
            es: string;
            en: string;
            de: string;
        };
    };
    resultado: {
        titulo: {
            es: string;
            en: string;
            de: string;
        };
        tudioses: {
            es: string;
            en: string;
            de: string;
        };
        imprimir: {
            es: string;
            en: string;
            de: string;
        };
        sinimprimir: {
            es: string;
            en: string;
            de: string;
        };
        contenidoresultado: {
            es: GodDescriptions;
            en: GodDescriptions;
            de: GodDescriptions;
        };
    };
    enviar: {
        quieresllevarte: {
            es: string;
            en: string;
            de: string;
        };
        pidecopia: {
            es: string;
            en: string;
            de: string;
        };
        precioventa: {
            es: string;
            en: string;
            de: string;
        };
        confirmaryrecoger: {
            es: string;
            en: string;
            de: string;
        };
        comenzardenuevo: {
            es: string;
            en: string;
            de: string;
        };
    };
    yapuedes: {
        yapuedes: {
            es: string;
            en: string;
            de: string;
        };
        vuelveajugar: {
            es: string;
            en: string;
            de: string;
        };
    };
}
