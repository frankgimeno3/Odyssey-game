import Content from "../../../contenido/contenidoTotem.json"
import React, { useState } from "react";
import {ContentType, NombreProps } from "../../../contenido/interfaces";




const Nombre: React.FC<NombreProps> = ({ setComponenteActual, setNombre, lang }) => {
  const [inputValue, setInputValue] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const handleButtonClick = (character: string) => {
      if (characterCount < 10) {
          setInputValue(inputValue + character);
          setCharacterCount(characterCount + 1);
      }
  };

  const handleDeleteCharacter = () => {
      if (inputValue.length > 0) {
          setInputValue(inputValue.slice(0, -1));
          setCharacterCount(characterCount - 1);
      }
  };

  const handleSeguirClick = () => {
      if (inputValue) {
          setComponenteActual("nombrehola");
          setNombre(inputValue);
      }
  };

  return (
      <div className="px-10 pb-20">
          <div className="border-b border-gray-400 mb-2 mx-10">
              <input
                  type="text"
                  value={inputValue}
                  readOnly
                  className="px-3 mt-5 text-center bg-transparent text-black text-5xl"
              />
          </div>
          <h2 className="text-black text-4xl">
              {Content.cuestionario.nombre.escribetunombre[lang]}
          </h2>
          {characterCount < 10 && (
              <p className="text-black text-xl font-light">
                  {Content.cuestionario.nombre.caracteres10[lang]}
              </p>
          )}
          {characterCount === 10 && (
              <p className="text-red-500 text-xl font-bold">
                  {Content.cuestionario.nombre.caracteres10[lang]}
              </p>
          )}
      <div className="mx-15 my-7 text-9xl ">
        <div>
          <button
            onClick={() => handleButtonClick("Q")}
            className="bg-transparent px-3  my-1 hover:bg-gray-500 hover:bg-opacity-5 hover:shadow  hover:rounded-full hover:text-orange"
          >
            Q
          </button>
          <button
            onClick={() => handleButtonClick("W")}
            className="bg-transparent px-3  my-1 hover:bg-gray-500 hover:bg-opacity-5 hover:shadow  hover:rounded-full hover:text-orange"
          >
            W
          </button>
          <button
            onClick={() => handleButtonClick("E")}
            className="bg-transparent px-3  my-1 hover:bg-gray-500 hover:bg-opacity-5 hover:shadow  hover:rounded-full hover:text-orange"
          >
            E
          </button>
          <button
            onClick={() => handleButtonClick("R")}
            className="bg-transparent px-3  my-1 hover:bg-gray-500 hover:bg-opacity-5 hover:shadow  hover:rounded-full hover:text-orange"
          >
            R
          </button>
          <button
            onClick={() => handleButtonClick("T")}
            className="bg-transparent px-3  my-1 hover:bg-gray-500 hover:bg-opacity-5 hover:shadow  hover:rounded-full hover:text-orange"
          >
            T
          </button>
          <button
            onClick={() => handleButtonClick("Y")}
            className="bg-transparent px-3  my-1 hover:bg-gray-500 hover:bg-opacity-5 hover:shadow  hover:rounded-full hover:text-orange"
          >
            Y
          </button>
          <button
            onClick={() => handleButtonClick("U")}
            className="bg-transparent px-3  my-1 hover:bg-gray-500 hover:bg-opacity-5 hover:shadow  hover:rounded-full hover:text-orange"
          >
            U
          </button>
          <button
            onClick={() => handleButtonClick("I")}
            className="bg-transparent px-3  my-1 hover:bg-gray-500 hover:bg-opacity-5 hover:shadow  hover:rounded-full hover:text-orange"
          >
            I
          </button>
          <button
            onClick={() => handleButtonClick("O")}
            className="bg-transparent px-3  my-1 hover:bg-gray-500 hover:bg-opacity-5 hover:shadow  hover:rounded-full hover:text-orange"
          >
            O
          </button>
          <button
            onClick={() => handleButtonClick("P")}
            className="bg-transparent px-3  my-1 hover:bg-gray-500 hover:bg-opacity-5 hover:shadow  hover:rounded-full hover:text-orange"
          >
            P
          </button>
        </div>
        <div>
          <button
            onClick={() => handleButtonClick("A")}
            className="bg-transparent px-3  my-1 hover:bg-gray-500 hover:bg-opacity-5 hover:shadow  hover:rounded-full hover:text-orange"
          >
            A
          </button>
          <button
            onClick={() => handleButtonClick("S")}
            className="bg-transparent px-3  my-1 hover:bg-gray-500 hover:bg-opacity-5 hover:shadow  hover:rounded-full hover:text-orange"
          >
            S
          </button>
          <button
            onClick={() => handleButtonClick("D")}
            className="bg-transparent px-3  my-1 hover:bg-gray-500 hover:bg-opacity-5 hover:shadow  hover:rounded-full hover:text-orange"
          >
            D
          </button>
          <button
            onClick={() => handleButtonClick("F")}
            className="bg-transparent px-3  my-1 hover:bg-gray-500 hover:bg-opacity-5 hover:shadow  hover:rounded-full hover:text-orange"
          >
            F
          </button>
          <button
            onClick={() => handleButtonClick("G")}
            className="bg-transparent px-3  my-1 hover:bg-gray-500 hover:bg-opacity-5 hover:shadow  hover:rounded-full hover:text-orange"
          >
            G
          </button>
          <button
            onClick={() => handleButtonClick("H")}
            className="bg-transparent px-3  my-1 hover:bg-gray-500 hover:bg-opacity-5 hover:shadow  hover:rounded-full hover:text-orange"
          >
            H
          </button>
          <button
            onClick={() => handleButtonClick("J")}
            className="bg-transparent px-3  my-1 hover:bg-gray-500 hover:bg-opacity-5 hover:shadow  hover:rounded-full hover:text-orange"
          >
            J
          </button>
          <button
            onClick={() => handleButtonClick("K")}
            className="bg-transparent px-3  my-1 hover:bg-gray-500 hover:bg-opacity-5 hover:shadow  hover:rounded-full hover:text-orange"
          >
            K
          </button>
          <button
            onClick={() => handleButtonClick("L")}
            className="bg-transparent px-3  my-1 hover:bg-gray-500 hover:bg-opacity-5 hover:shadow  hover:rounded-full hover:text-orange"
          >
            L
          </button>
        </div>
        <div>
          <button
            onClick={() => handleButtonClick(" ")}
            className="bg-transparent px-3  my-1 hover:bg-gray-500 hover:bg-opacity-5 hover:shadow  hover:rounded-full hover:text-orange"
          >
            ___
          </button>
          <button
            onClick={() => handleButtonClick("Z")}
            className="bg-transparent px-3  my-1 hover:bg-gray-500 hover:bg-opacity-5 hover:shadow  hover:rounded-full hover:text-orange"
          >
            Z
          </button>
          <button
            onClick={() => handleButtonClick("X")}
            className="bg-transparent px-3  my-1 hover:bg-gray-500 hover:bg-opacity-5 hover:shadow  hover:rounded-full hover:text-orange"
          >
            X
          </button>
          <button
            onClick={() => handleButtonClick("C")}
            className="bg-transparent px-3  my-1 hover:bg-gray-500 hover:bg-opacity-5 hover:shadow  hover:rounded-full hover:text-orange"
          >
            C
          </button>
          <button
            onClick={() => handleButtonClick("V")}
            className="bg-transparent px-3  my-1 hover:bg-gray-500 hover:bg-opacity-5 hover:shadow  hover:rounded-full hover:text-orange"
          >
            V
          </button>
          <button
            onClick={() => handleButtonClick("B")}
            className="bg-transparent px-3  my-1 hover:bg-gray-500 hover:bg-opacity-5 hover:shadow  hover:rounded-full hover:text-orange"
          >
            B
          </button>
          <button
            onClick={() => handleButtonClick("N")}
            className="bg-transparent px-3  my-1 hover:bg-gray-500 hover:bg-opacity-5 hover:shadow  hover:rounded-full hover:text-orange"
          >
            N
          </button>
          <button
            onClick={() => handleButtonClick("M")}
            className="bg-transparent px-3  my-1 hover:bg-gray-500 hover:bg-opacity-5 hover:shadow  hover:rounded-full hover:text-orange"
          >
            M
          </button>
          <button
            className="bg-transparent    mt-2 mx-1"
            onClick={handleDeleteCharacter}
          >
            &#8592;
          </button>
        </div>
      </div>
      <div className="flex flex-row mt-5 justify-center text-center align-center">
          <button
            className="mt-2 px-8 py-4    text-4xl shadow-lg text-black bg-cyan-200 rounded bg-opacity-40"
            onClick={handleSeguirClick}
          >
                  {Content.cuestionario.nombre.seguir[lang]}
                  </button>
 
      </div>
    </div>
  );
};

export default Nombre;
