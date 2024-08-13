//import { Link } from "react-router-dom";

function Buttons() {
  return (
    <div className="flex">
      <a
        href="/register"
        className="px-4 py-2 bg-purple-700 text-white font-semibold mr-3 rounded text-lg"
      >
        Registrate
      </a>
      <a
        href="/login"
        className="px-4 py-2 bg-neutral-500 text-white font-semibold rounded text-base"
      >
        Iniciar sesión
      </a>
    </div>
  );
}

export default Buttons;
