import React, { useState, useEffect } from 'react';

interface RestartProps {
  timer: number;
  setReinicioTimer: React.Dispatch<React.SetStateAction<boolean>>;
}

const Restart: React.FC<RestartProps> = ({ timer, setReinicioTimer }) => {
    const [countdown, setCountdown] = useState(timer);
  
    useEffect(() => {
      if (countdown > 0) {
        const interval = setInterval(() => {
          setCountdown(prevCountdown => prevCountdown - 1);
        }, 1000);
  
        return () => {
          clearInterval(interval);
        };
      }
    }, [countdown]);
  
    const handleClick = () => {
       setReinicioTimer(true); 
    };

  return (
    <div className="flex flex-col justify-center items-center bg-white text-gray-900">
      <h2 className="font-bold text-4xl">¿Still there?</h2>
      <h2>
        The game will restart in{' '}
        <span className="font-bold">{countdown}</span> seconds
      </h2>
      <button className="p-2 text-lg bg-gray-900 text-white m-2" onClick={handleClick}>
        Continue
      </button>
    </div>
  );
};

export default Restart;