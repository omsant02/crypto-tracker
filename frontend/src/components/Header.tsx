import React from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <header className="bg-white mb-10 ">
      <div className="grid grid-cols-2 p-4">
        <h1 className="text-center text-2xl font-bold ">Crypto Tracker</h1>
        <div>
          {window.location.pathname === "/" ? (
            <button
              type="button"
              onClick={() => handleNavigation("/converter")}
              className="bg-blue-900 p-2 rounded-xl text-white"
            >
              Converter
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleNavigation("/")}
              className="bg-blue-900 p-2 rounded-xl text-white"
            >
              Dashboard
            </button>
          )}
        </div>
      </div>

      {/* <Carousel>Add carousel items here</Carousel> */}
    </header>
  );
};

export default Header;
