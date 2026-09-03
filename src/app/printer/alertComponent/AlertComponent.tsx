import React, { FC } from 'react';

interface AlertComponentProps {
    typedContent:any;
    printerLang:any;
    confirmDelete:any;
    cancelDelete:any;
}

const AlertComponent: FC<AlertComponentProps> = ({ typedContent, printerLang, confirmDelete, cancelDelete}) => {
 
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-500 bg-opacity-75">
                    <div className="bg-white p-5 rounded shadow">
                        <p className="text-xl mb-5">{typedContent.estasseguro[printerLang]}
                        </p>
                        <div className="flex justify-end">
                            <button
                                className="rounded bg-red-500 text-white px-4 py-2 mr-2"
                                onClick={confirmDelete}
                            >
                                {typedContent.eliminar[printerLang]}
                            </button>
                            <button
                                className="rounded bg-gray-200 px-4 py-2"
                                onClick={cancelDelete}
                            >
                                {typedContent.cancelar[printerLang]}
                            </button>
                        </div>
                    </div>
                </div>
  );
};

export default AlertComponent;