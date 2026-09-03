import React, { FC } from 'react';

interface CopyRightProps {
}

const CopyRight: FC<CopyRightProps> = ({ }) => {
  return (
    <div>
<p className='text-center text-xs text-gray-100 font-bold shadow-xl bg-[#b3896d] bg-opacity-50 px-2 py-1'>
  © Copyright 2024 ItBringsArt / Info@Itbringsart.com
</p>
    </div>
  );
};

export default CopyRight;