import React, { FC } from 'react';

interface NavbarProps {
  printerLang: any;
  setPrinterLang: any;
}

const Navbar: FC<NavbarProps> = ({ printerLang, setPrinterLang }) => {

  const changeLanguage = (selectedLanguage: any) => {
    setPrinterLang(selectedLanguage)
  }

  return (
    <nav className="flex flex-col bg-slate-800  items-start text-start py-2 md:text-xs xl:text-base">
      {printerLang == "en" && <h2
        className="flex flex-wrap bg-opacity-25 text-white pt-1 pr-8 pl-4 mr-5 text-md mt-3 font-semibold  "
      >
        Interactive Totem Game
      </h2>}
      {printerLang == "es" && <h2
        className="flex flex-wrap bg-opacity-25 text-white pt-1 pr-8 pl-4 mr-5 text-md mt-3 font-semibold  "
      >
        Juego Tótem Interactivo
      </h2>}
      {printerLang == "de" && <h2
        className="flex flex-wrap bg-opacity-25 text-white pt-1 pr-8 pl-4 mr-5 text-md mt-3 font-semibold  "
      >
        Interaktives Totemspiel      </h2>}

      {printerLang == "en" && <h2 className="text-gray-400 text-xs pl-6 mt-7">LANGUAGE SELECTION</h2>}
      {printerLang == "es" && <h2 className="text-gray-400 text-xs pl-6 mt-7">SELECCIÓN DE IDIOMA</h2>}
      {printerLang == "de" && <h2 className="text-gray-400 text-xs pl-6 mt-7">SPRACHAUSWAHL</h2>}

      {printerLang == "en" &&
        <div className="flex flex-row text-white text-xs  font-bold  mt-2 bg-gray-0 w-full justify-left bg-opacity-30"
          onClick={() => changeLanguage("en")}>
          <button className="bg-white pl-1"></button>
          <button style={{ backgroundColor: '#b3896d' }} className="flex text-white text-xs  pl-8 py-2   bg-gray-50 w-full justify-left bg-opacity-30">EN</button>
        </div>}
      {printerLang != "en" &&
        <div className="flex flex-row text-white text-xs    mt-2 bg-gray-50 w-full justify-left bg-opacity-30"
          onClick={() => changeLanguage("en")}>
          <button className="bg-white pl-1"></button>
          <button className="flex text-white text-xs  pl-8 py-2   bg-gray-50 w-full justify-left bg-opacity-30">EN</button>
        </div>}
      {printerLang == "de" &&
        <div className="flex flex-row text-white text-xs  font-bold  mt-2 bg-gray-0 w-full justify-left bg-opacity-30"
          onClick={() => changeLanguage("de")}>
          <button className="bg-white pl-1"></button>
          <button style={{ backgroundColor: '#b3896d' }} className="flex text-white text-xs  pl-8 py-2   bg-gray-50 w-full justify-left bg-opacity-30">DE</button>
        </div>}
      {printerLang != "de" &&
        <div className="flex flex-row text-white text-xs    mt-2 bg-gray-50 w-full justify-left bg-opacity-30"
          onClick={() => changeLanguage("de")}>
          <button className="bg-white pl-1"></button>
          <button className="flex text-white text-xs  pl-8 py-2   bg-gray-50 w-full justify-left bg-opacity-30">DE</button>
        </div>}
      {printerLang == "es" &&
        <div className="flex flex-row text-white text-xs  font-bold  mt-2 bg-gray-0 w-full justify-left bg-opacity-30"
          onClick={() => changeLanguage("es")}>
          <button className="bg-white pl-1"></button>
          <button style={{ backgroundColor: '#b3896d' }} className="flex text-white text-xs  pl-8 py-2   bg-gray-50 w-full justify-left bg-opacity-30">ES</button>
        </div>}
      {printerLang != "es" &&
        <div className="flex flex-row text-white text-xs    mt-2 bg-gray-50 w-full justify-left bg-opacity-30"
          onClick={() => changeLanguage("es")}>
          <button className="bg-white pl-1"></button>
          <button className="flex text-white text-xs  pl-8 py-2   bg-gray-50 w-full justify-left bg-opacity-30">ES</button>
        </div>}

    </nav>
  );
};

export default Navbar;

