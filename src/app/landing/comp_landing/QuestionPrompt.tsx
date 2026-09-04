import Image from "next/image";
import questions from "../../../../public/slides/preguntas.json";
import { Language } from "../../contenido/interfaces";

const questionNumbers: Record<string, string> = {
  conflicto: "1",
  relaciones: "2",
  estrategia: "3",
  resolutividad: "4",
  trabajo: "5",
  lugar: "6",
  humor: "7",
  creatividad: "8",
  juicio: "9",
  horario: "10",
};

const questionGods: Record<string, string> = {
  conflicto: "Afrodita",
  relaciones: "Apolo",
  estrategia: "Ares",
  resolutividad: "Artemisa",
  trabajo: "Atena",
  lugar: "Demeter",
  humor: "Hefesto",
  creatividad: "Zeus",
  juicio: "Hera",
  horario: "Hermes",
};

interface QuestionPromptProps {
  component: string;
  lang: Language;
}

const QuestionPrompt = ({ component, lang }: QuestionPromptProps) => {
  const questionNumber = questionNumbers[component];
  const god = questionGods[component];

  if (!questionNumber || !god) {
    return null;
  }

  const languageQuestions = questions.find((entry) => lang in entry) as
    | Partial<Record<Language, Record<string, string>>>
    | undefined;
  const text = languageQuestions?.[lang]?.[questionNumber];

  if (!text) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="question-bubble-in absolute left-[10.5%] top-[5.5%] z-10 h-[38%] w-[81%]">
        <svg
          viewBox="0 0 1555 410"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <path
            d="M45 18C20 22 5 53 5 92v142c0 49 29 82 70 87l412 28-122 61 236-48 872-41c48-3 77-37 77-87V92c0-47-28-75-75-78C1005-7 511-4 45 18Z"
            fill="#fffdf8"
            fillOpacity="0.82"
          />
        </svg>
        <div className="absolute left-[7%] right-[7%] top-[9%] flex h-[59%] items-center justify-center">
          <h1 className="question-prompt-text text-center font-cinzel font-normal uppercase leading-[1.08] text-[#292929]">
            {text}
          </h1>
        </div>
      </div>

      <div className="question-god-in absolute bottom-0 left-[9%] z-20 h-[76%] w-[39%]">
        <Image
          src={`/slides/DEUS/${god}.png`}
          alt={god}
          fill
          priority
          sizes="750px"
          className="object-contain object-bottom"
        />
      </div>
    </div>
  );
};

export default QuestionPrompt;
