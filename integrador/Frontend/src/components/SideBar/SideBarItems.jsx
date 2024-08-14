import { useContext } from "react";
import PropTypes from "prop-types";
import { SideBarContext } from "./Sidebar";
import { Link } from "react-router-dom";

export function SideBarItems({ icon, text, active, to, onClick }) {
  const { isOpen } = useContext(SideBarContext);

  const content = (
    <>
      <div className="flex items-center justify-center">{icon}</div>
      <span
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? "w-full ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
    </>
  );

  return (
    <li
      className={`
        group relative flex items-center py-2 px-3 my-2
        font-medium text-sm rounded-md cursor-pointer
        transition-colors
        ${
          active
            ? "bg-violet-700 text-white"
            : "hover:bg-violet-400/15 text-gray-700"
        }
      `}
      onClick={onClick} // Ejecutar la función onClick si está definida
    >
      {to ? (
        <Link to={to} className="flex items-center w-full">
          {content}
        </Link>
      ) : (
        <div className="flex items-center w-full">{content}</div>
      )}
      {!isOpen && (
        <div
          className={`absolute left-full rounded-sm px-2 py-1 ml-4
          bg-violet-700 text-white text-sm 
          opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300
          `}
        >
          {text}
        </div>
      )}
    </li>
  );
}

SideBarItems.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  active: PropTypes.bool,
  to: PropTypes.string, // Hacer que "to" sea opcional
  onClick: PropTypes.func, // Añadir la validación para la función onClick
};
