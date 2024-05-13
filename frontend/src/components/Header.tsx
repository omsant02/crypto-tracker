import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsHovered(false);
  };

  return (
    <header className="bg-white mb-10">
      <div className="grid grid-cols-4 gap-x-32 p-4">
        <h1 className="text-center text-2xl font-bold">Crypto Tracker</h1>
        <div></div>
        <div></div>
        <div className="w-auto ml-10 ">
          <button
            type="button"
            onClick={() =>
              handleNavigation(
                window.location.pathname === "/" ? "/converter" : "/"
              )
            }
            className={`bg-blue-900 p-2 pl-9 rounded-xl text-white transition-all duration-300 ease-in-out flex items-center ${
              isHovered ? "pr-5" : ""
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {window.location.pathname === "/" ? "Converter" : "Dashboard"}
            <span className={` ${isHovered ? "visible" : "invisible"} pl-2 `}>
              <img src="./right-arrow.png" alt="" />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
