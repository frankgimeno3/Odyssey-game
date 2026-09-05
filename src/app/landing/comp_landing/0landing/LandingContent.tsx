import React, { FC } from 'react';
import Image from "next/image";
import Content from "../../../contenido/contenidoTotem.json"

interface LandingContentProps {
    lang: 'es' | 'en' | 'de';  
    setLang: (lang: 'es' | 'en' | 'de') => void;  
    onStart: () => void;
    starting?: boolean;
  }

const LandingContent: FC<LandingContentProps> = ({ lang, setLang, onStart, starting = false }) => {

    const changeLang = (langChosen: 'es' | 'en' | 'de') => {
        if (!starting) setLang(langChosen);
      }
 

  return (
    <div>
            <p className="pt-24 mt-24 text-3xl text-black ">{Content.dashboard.tegustariasaber[lang]}</p>
            <h1 className="pt-6 text-5xl mx-20">{Content.dashboard.quediosdelolimpo[lang]}</h1>
      <h1 className="pt-4 text-5xl mb-5 mx-20">{Content.dashboard.terepresenta[lang]}</h1>
      <p className="text-3xl text-black">{Content.dashboard.unaaventuraquenosensena[lang]}</p>
      <button className={`mt-11 px-8 py-4 text-4xl text-black rounded bg-opacity-40 shadow-3xl mx-auto transition-colors duration-200 ${starting ? "bg-green-700" : "bg-cyan-700"}`} disabled={starting} onClick={onStart} >
      {Content.dashboard.botonjugar[lang]}
      </button>
      <div className="flex justify-center items-center mt-10 mb-10">
        <div className="flex flex-col text-black mx-5 justify-center text-center ">
          <div className="rounded-full overflow-hidden" onClick={()=> changeLang("en")}>
            <Image src="/icon/FLOR.png" alt="flor" width={50} height={50} />
          </div>
          <button className="text-3xl text-center " onClick={()=> changeLang("en")}>EN</button>
        </div>
        <div className="flex flex-col text-black  mx-5 justify-center text-center ">
          <div className="rounded-full overflow-hidden" onClick={()=> changeLang("es")}>
            <Image src="/icon/FLOR.png" alt="flor" width={50} height={50} />
          </div>
          <button className="text-3xl text-center " onClick={()=> changeLang("es")}>ES</button>
        </div>
        <div className="flex flex-col text-black  mx-5 justify-center text-center ">
          <div className="rounded-full overflow-hidden" onClick={()=> changeLang("de")}>
            <Image src="/icon/FLOR.png" alt="flor" width={50} height={50} />
          </div>
          <button className="text-3xl text-center " onClick={()=> changeLang("de")}>DE</button>
        </div>
      </div>
    </div>
  );
};

export default LandingContent;
