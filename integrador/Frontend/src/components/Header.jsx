import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Icons for hamburger menu

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full bg-purple-700 fixed top-0 py-2 px-3 z-30 shadow-md">
      <div className="flex w-full bg-white py-2 px-3 rounded-sm items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Imagen del logo de la pagina"
              className="w-8"
            />
            <h3 className="font-semibold text-xl md:text-2xl ml-2 hidden sm:block">
              Game<span className="text-violet-900 font-bold">Mind</span>
            </h3>
          </Link>
        </div>

        {/* Botón del menú para pantallas pequeñas */}
        <div className="sm:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Menú de navegación */}
        <nav
          className={`sm:flex ${
            isMenuOpen ? "block" : "hidden"
          } absolute top-0 right-0 mt-12 mr-4 sm:static sm:mt-0 sm:mr-0 bg-white sm:bg-transparent rounded-lg shadow-lg sm:shadow-none p-4 sm:p-0`}
        >
          <button
            onClick={toggleMenu}
            aria-label="Close menu"
            className="sm:hidden text-right w-full"
          >
            <X size={28} />
          </button>
          <ul className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
            <li>
              <Link
                to="/register"
                className="bg-neutral-900 text-white py-1.5 px-4 my-1 sm:my-0 rounded hover:bg-neutral-700 w-auto sm:w-auto inline-block sm:inline-block"
              >
                Registrarse
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="bg-[#2B0975] text-white py-1.5 px-4 rounded hover:bg-violet-800 w-auto sm:w-auto inline-block sm:inline-block"
              >
                Iniciar sesión
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
