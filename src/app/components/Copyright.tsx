"use client";

import React, { FC, useEffect, useState } from 'react';

interface CopyRightProps {
}

const CopyRight: FC<CopyRightProps> = ({ }) => {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    const updateYear = () => setYear(new Date().getFullYear());
    updateYear();
    // Also update kiosks that stay open across New Year's Eve.
    const timer = window.setInterval(updateYear, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div>
<p className='text-center text-xs text-gray-100 font-bold shadow-xl bg-[#b3896d] bg-opacity-50 px-2 py-1'>
  © Copyright {year} ItBringsArt / Info@Itbringsart.com
</p>
    </div>
  );
};

export default CopyRight;
