import questions from "../../../../public/preguntas/preguntas.json";
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

interface QuestionPromptProps {
  component: string;
  lang: Language;
}

const QuestionPrompt = ({ component, lang }: QuestionPromptProps) => {
  const questionNumber = questionNumbers[component];

  if (!questionNumber) {
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
    <div className="pointer-events-none absolute left-[10.5%] top-[7%] z-10 flex h-[22%] w-[81%] items-center justify-center px-[4%]">
      <h1 className="max-w-full text-center font-cinzel text-[clamp(1.45rem,3.15vw,3.8rem)] font-normal uppercase leading-[1.08] text-[#292929]">
        {text}
      </h1>
    </div>
  );
};

export default QuestionPrompt;
