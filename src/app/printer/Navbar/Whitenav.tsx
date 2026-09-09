import React, { useState } from "react";
import Image from "next/image";

interface WhitenavProps {
  setNavbarVisible: (visible: boolean) => void;
  printerLang: any;
}

const Whitenav: React.FC<WhitenavProps> = ({ setNavbarVisible }) => {
  const [navbarVisible, setNavbarVisibleState] = useState(true);

  const handleToggleNavbar = () => {
    setNavbarVisible(!navbarVisible);
    setNavbarVisibleState(!navbarVisible);
  };
  return (
    <nav className="flex flex-row bg-white justify-between px-2 py-1 shadow">
      <div className="px-2 py-1">
        <button className="pt-2" onClick={handleToggleNavbar}>
          <Image src="/menuicon.png" alt="menuicon" width={20} height={20} />
        </button>
      </div>
    </nav>
  );
};

export default Whitenav;
