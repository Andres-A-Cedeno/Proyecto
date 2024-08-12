import { useState } from "react";

export function LoginForm() {
  const [formData, setFormData] = useState({
    correo: "",
    contrasena: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:4322/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al iniciar sesión");
      }
  
      const data = await response.json();
      console.log("Inicio de sesión exitoso:", data);
      localStorage.setItem("token", data.token); // Almacena el token en localStorage
      window.location.href = "/tasks"; // Redirección del navegador
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="bg-white w-full max-w-md p-8 rounded shadow-lg border border-purple-900">
      <h2 className="text-2xl font-semibold mb-4 text-purple-900">
        Iniciar Sesión
      </h2>
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="w-full">
        <label htmlFor="correo" className="block mb-2">
          Correo electrónico:
        </label>
        <input
          type="email"
          id="correo"
          name="correo"
          placeholder="Correo electrónico o nombre de usuario"
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-purple-500 bg-gray-100"
          value={formData.correo}
          onChange={handleChange}
          autocomplete="username"
        />

        <label htmlFor="contrasena" className="block mt-4 mb-2">
          Contraseña:
        </label>
        <input
          type="password"
          id="contrasena"
          name="contrasena"
          placeholder="Ingrese su contraseña"
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-purple-500 bg-gray-100"
          value={formData.contrasena}
          onChange={handleChange}
          autocomplete="current-password"
        />

        <div className="flex items-center mt-4 mb-2">
          <input
            type="checkbox"
            id="recuerdame"
            name="recuerdame"
            className="mr-2"
          />
          <label htmlFor="recuerdame" className="text-sm">
            Recuérdame
          </label>
        </div>

        <a
          href="/recuperar-contrasena"
          className="text-sm text-purple-700 hover:underline"
        >
          ¿Olvidaste la contraseña?
        </a>

        <button
          type="submit"
          className="bg-purple-700 text-white font-semibold py-2 px-4 rounded mt-4 w-full"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}