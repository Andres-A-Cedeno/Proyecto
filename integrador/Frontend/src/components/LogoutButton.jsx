import { useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient"; // Asegúrate de que la ruta al cliente de Supabase es correcta

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Limpia cualquier dato almacenado en localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("rol");

      // Redirige al usuario a la página de inicio de sesión
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
    >
      Cerrar Sesión
    </button>
  );
};

export default LogoutButton;