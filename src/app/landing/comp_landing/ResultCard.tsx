import Image from "next/image";
import Content from "../../contenido/contenidoTotem.json";
import { Dioses, Language } from "../../contenido/interfaces";

import { getGodContent } from "../../contenido/godContent";

interface ResultCardProps {
  name: string;
  god: Exclude<Dioses, "">;
  lang: Language;
  variant?: "result" | "preview";
}

export default function ResultCard({ name, god, lang, variant = "result" }: ResultCardProps) {
  const content = getGodContent(god, lang);
  if (!content) return null;

  return (
    <div className={`result-card result-card--${variant} relative h-full w-full overflow-hidden`}>
      <Image src="/slides/PREPRINT-HD.png" alt="" fill priority sizes="1920px" className="object-fill" />
      <h2 className="result-card-title absolute z-10 uppercase">
        {Content.cuestionario.resultado.titulo[lang]}
      </h2>
      <div className="absolute left-[26.5%] top-[29%] z-10 w-[34%] text-left text-[#303030]">
        <h1 className="result-name truncate font-cinzel uppercase">{name}</h1>
        <p className="result-guide mt-[1%] font-cinzel uppercase">{Content.cuestionario.resultado.tudioses[lang]}</p>
      </div>
      <div className="result-god-copy absolute z-10 text-left">
        <h2 className="result-god-name font-cinzel uppercase text-[#194899]">{content.name}</h2>
        <p className="result-description mt-[1%] max-w-[92%] font-cinzel uppercase text-[#303030]">{content.description}</p>
      </div>
      <div className="result-god-figure absolute z-10">
        <Image src={content.image} alt={content.name} fill priority sizes="460px" className="object-contain object-bottom" />
      </div>
    </div>
  );
}
