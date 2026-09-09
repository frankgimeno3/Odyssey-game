"use client";

import { getGodContent } from '../contenido/godContent';
import React, { FC, useEffect, useRef, useState } from 'react';
import Whitenav from './Navbar/Whitenav';
import Navbar from './Navbar/navbar';
import PrinterFilters from './PrinterFilters';
import { emptyFilters, matchesFilters } from './filters';
import { useReactToPrint } from 'react-to-print';  
// import slogans from "../contenido/slogans.json"
// import sloganseng from "../contenido/sloganseng.json"
// import slogansde from "../contenido/slogansde.json"
import ComponentToPrint from './ComponentToPrint/ComponentToPrint';
import Content from "../contenido/contenidoPrinter.json"
import { Dioses, Language, PrinterContent } from '../contenido/interfaces'; 
import AlertComponent from './alertComponent/AlertComponent';
 
interface PrinterProps { }

export interface File {
    id: any;
    lang: Language;
    midios: Dioses;
    nombre: string;
    updatedAt: string;
}

const Printer: FC<PrinterProps> = ({ }) => {
    
  const [printerLang, setPrinterLang] = useState<'en' | 'es' | 'de'>('en');
  const [files, setFiles] = useState<File[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState("");
  const componentRef = useRef<HTMLDivElement>(null);
  const [showMoreRows, setShowMoreRows] = useState(false);
  const maxRowsToShow = 10;
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [currentOrder, setCurrentOrder] = useState<{ column: 'updatedAt' | 'nombre' | 'midios' | 'lang'; down: boolean }>({ column: 'updatedAt', down: true });
  const [filters, setFilters] = useState(emptyFilters);
  const [selectedRowData, setSelectedRowData] = useState<File | null>(null);
  const [printRequested, setPrintRequested] = useState(false);

  const typedContent: PrinterContent = Content as PrinterContent;

  useEffect(() => {
      const storedFiles = window.localStorage.getItem('odyssey-documents');
      setFiles(storedFiles ? JSON.parse(storedFiles) as File[] : []);
  }, []);

  const showDeleteAlert = (id: string) => {
      setSelectedFileId(id);
      setShowAlert(true);
  };

  const cancelDelete = () => {
      setShowAlert(false);
  };

  const confirmDelete = () => {
      setShowAlert(false);
      handleDelete(selectedFileId);
      setFiles((prevFiles) => prevFiles.filter(file => file.id !== selectedFileId));
  };

  const handleDelete = async (id: string | null) => {
      if (id != undefined) {
          try {
              const remainingFiles = files.filter((file) => file.id !== id);
              window.localStorage.setItem('odyssey-documents', JSON.stringify(remainingFiles));
              setFiles(remainingFiles);
          } catch (error) {
              console.error("Error eliminando el documento: ", error);
          }
      }
  };

  const visibleFiles = files.filter(file => matchesFilters(file, filters)).sort((a, b) => {
      const column = currentOrder.column;
      const comparison = column === 'updatedAt'
          ? new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          : column === 'midios'
          ? (getGodContent(a.midios, a.lang)?.name ?? a.midios).localeCompare(getGodContent(b.midios, b.lang)?.name ?? b.midios)
          : a[column].localeCompare(b[column], undefined, { sensitivity: 'base' });
      return currentOrder.down ? comparison : -comparison;
  });

  const sortHeader = (column: typeof currentOrder.column, label: string) => {
      const active = currentOrder.column === column;
      const descending = column === 'updatedAt' ? currentOrder.down : !currentOrder.down;
      return <th key={column} className="border border-gray-300" aria-sort={active ? descending ? 'descending' : 'ascending' : 'none'}>
          <button type="button" className={`flex w-full items-center justify-between gap-3 py-1.5 pl-5 pr-3 text-left ${active ? 'font-bold' : 'font-medium'}`}
              onClick={() => setCurrentOrder({ column, down: active ? !currentOrder.down : true })}>
              {label}
              {active && <svg aria-hidden="true" viewBox="0 0 10 8" className={`h-2 w-2.5 shrink-0 text-gray-700 ${currentOrder.down ? '' : 'rotate-180'}`} fill="currentColor"><path d="M0 0h10L5 8z" /></svg>}
          </button>
      </th>;
  };

  const handleVisualizarCaller = (file: File) => {
      if (!getGodContent(file.midios, file.lang)) return;
      setSelectedRowData(file);
      setPrintRequested(true);
  };

  const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      pageStyle: "@page { size: A4 landscape; margin: 0; } body { margin: 0; }",
  });

  useEffect(() => {
      if (!printRequested || !selectedRowData || !componentRef.current) return;

      const frame = window.requestAnimationFrame(() => {
          handlePrint();
          setPrintRequested(false);
      });

      return () => window.cancelAnimationFrame(frame);
  }, [handlePrint, printRequested, selectedRowData]);

  return (
      <div className="flex min-h-screen w-full bg-gray-100">
          {navbarVisible && <Navbar printerLang={printerLang} setPrinterLang={setPrinterLang} />}
          <div className="flex min-w-0 flex-1 flex-col">
                  <Whitenav setNavbarVisible={setNavbarVisible} printerLang={printerLang}/>
              <div className="p-5">
                  <div className="mb-4 flex flex-row justify-between">
                      <h2 className="mb-4 ml-3 text-lg">{typedContent.subtitulo[printerLang]}</h2>
                  </div>
                  <PrinterFilters value={filters} onChange={setFilters} language={printerLang} />
                  <div className="overflow-x-auto bg-white p-5">
                      <table className="w-full min-w-[600px] border border-gray-300 bg-white text-left text-xs text-slate-800">
                          <thead>
                              <tr className="border border-gray-300">
                                  {sortHeader('updatedAt', typedContent.hora[printerLang])}
                                  {sortHeader('nombre', typedContent.nombre[printerLang])}
                                  {sortHeader('midios', typedContent.dios[printerLang])}
                                  {sortHeader('lang', typedContent.idioma[printerLang])}
                                  <th className="py-1.5 text-center font-medium border border-gray-300">
                                  {typedContent.archivo[printerLang]}
                                  </th>
                                  <th className="py-1.5 text-center font-medium border border-gray-300">
                                  {typedContent.opciones[printerLang]}
                                  </th>
                              </tr>
                          </thead>
                          <tbody>
                              {visibleFiles.length === 0 && <tr><td colSpan={6} className="p-5 text-center text-gray-500">No results</td></tr>}
                              {visibleFiles.map((singnlefile, index) => (
                                  <tr
                                      key={singnlefile.id || `file-${index}`}
                                      className="border border-gray-300 font-light "
                                  >
                                      <td className="border border-gray-300 text-[0.65rem] text-left pl-5">
                                          {new Date(singnlefile.updatedAt).toLocaleDateString()} -{" "}
                                          {new Date(singnlefile.updatedAt).toLocaleTimeString()}
                                      </td>
                                      <td className="border border-gray-300 text-[0.65rem] text-left pl-5">
                                          {singnlefile.nombre}
                                      </td>
                                      <td className="border border-gray-300 text-[0.65rem] text-left pl-5">
                                          {getGodContent(singnlefile.midios, singnlefile.lang)?.name ?? singnlefile.midios}
                                      </td>
                                      <td className="border border-gray-300 text-[0.65rem] text-left pl-5">
                                          {singnlefile.lang}
                                      </td>
                                      <td className="border border-gray-300 text-center">
                                          <button
                                              className="rounded bg-gray-100 shadow px-5 py-1 text-xs text-[0.60rem] hover:bg-gray-50 btn-visualizar"
                                              disabled={!getGodContent(singnlefile.midios, singnlefile.lang)}
                                              onClick={() => handleVisualizarCaller(singnlefile)}
                                          >
                                              {typedContent.visualizar[printerLang]}
                                          </button>
                                      </td>
                                      <td className="border border-gray-300 text-center">
                                          <button
                                              className="rounded bg-gray-100 shadow px-5 py-1 text-xs text-[0.60rem] my-2 hover:bg-gray-50 btn-eliminar"
                                              onClick={() => showDeleteAlert(singnlefile.id)}
                                          >
                                              {typedContent.eliminar[printerLang]}
                                          </button>
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                
                  </div>
              </div>
          </div>
          {showAlert && (
              <AlertComponent typedContent={typedContent} printerLang={printerLang} confirmDelete={confirmDelete} cancelDelete={cancelDelete}/>
          )}
          <div style={{ display: "none" }}>
              {selectedRowData && (
                  <ComponentToPrint
                      ref={componentRef}
                      nombre={selectedRowData.nombre}
                      tuDios={selectedRowData.midios}
                      tulang={selectedRowData.lang}
                  />
              )}
          </div>
      </div>
  );
};

export default Printer;
