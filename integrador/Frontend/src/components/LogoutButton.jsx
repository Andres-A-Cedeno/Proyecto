import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:4322/api/auth/logout", {
        method: "POST",
        credentials: "include", // Asegura que las cookies se envíen
      });

      // Eliminar cookies después de una respuesta exitosa
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      Cookies.remove("rol");

      // Redirigir al login
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-violet-700 text-white font-semibold py-2 px-4 rounded"
    >
      Cerrar Sesión
    </button>
  );
}
