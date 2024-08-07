import { useState } from "react";

export function RegisterForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    alias: "",
    genero: "",
    email: "",
    contraseña: "",
    perfil_id: 2,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4322/api/new_users", { // Cambia el puerto al correcto (4322 en tu backend)
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear el usuario");
      }

      const data = await response.json();
      console.log("Usuario creado:", data);
      window.location.href = "/login";
    } catch (error) {
      console.error("Error:", error);
      // Manejar el error en la creación del usuario
    }
  };

  return (
    <div className="w-full flex flex-col max-w-md md:max-w-xl md:h-auto p-7 md:p-9 space-y-4 md:space-y-6 bg-white rounded-lg shadow-md justify-center">
      <h2 className="text-4xl font-bold text-start">Regístrate</h2>
      <form className="space-y-1.5 md:space-y-2" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-1.5 md:grid-cols-2 md:gap-2">
          <div className="bg-neutral-300 rounded p-1.5 md:p-2 relative text-sm md:text-base">
            <label htmlFor="nombre" className="text-sm md:text.base text-neutral-600">Nombre</label>
            <input
              type="text"
              id="nombre"
              placeholder="Ingresa su nombre"
              className="w-full bg-inherit text-sm md:text-base focus:outline-none focus:text-neutral-600 text-neutral-400"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="bg-neutral-300 rounded p-1.5 md:p-2 relative text-sm md:text-base">
            <label htmlFor="apellido" className="text-neutral-600">Apellido</label>
            <input
              id="apellido"
              placeholder="Ingrese su apellido"
              className="w-full bg-inherit text-sm md:text-base focus:outline-none focus:text-neutral-600 text-neutral-400"
              value={formData.apellido}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-1.5 md:text-base md:gap-2">
          <div className="bg-neutral-300 rounded p-1.5 md:p-2 relative text-sm md:text-base">
            <label htmlFor="alias" className="text-neutral-600">Nombre de usuario</label>
            <input
              id="alias"
              placeholder="Ingrese su nombre de usuario"
              className="w-full focus:outline-none focus:text-neutral-600 text-neutral-400 md:text-base text-sm bg-inherit"
              value={formData.alias}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col bg-neutral-300 rounded p-1.5 md:p-2 relative text-sm md:text-base">
            <label htmlFor="genero" className="text-neutral-600">Género</label>
            <select
              name="genero"
              id="genero"
              className="bg-inherit text-neutral-400 focus:outline-none focus:text-neutral-600 text-sm md:text-base -ml-1"
              value={formData.genero}
              onChange={handleChange}
            >
              <option value="">Género que mejor te defina</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
          </div>
        </div>
        <div className="bg-neutral-300 rounded p-1.5 md:p-2 relative text-sm md:text-base">
          <label htmlFor="email" className="text-neutral-600">Email</label>
          <input
            id="email"
            placeholder="example.email@gmail.com"
            type="email"
            className="w-full text-sm md:text-base focus:text-neutral-600 text-neutral-400 focus:outline-none bg-inherit"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="bg-neutral-300 rounded p-1.5 md:p-2 relative text-sm md:text-base">
          <label htmlFor="contraseña" className="text-neutral-600">Contraseña</label>
          <input
            id="contraseña"
            placeholder="Introduce al menos 8+ caracteres"
            type="password"
            className="bg-inherit w-full text-sm md:text-base focus:text-neutral-600 text-neutral-400 focus:outline-none"
            value={formData.contraseña}
            onChange={handleChange}
          />
        </div>
        <button
          className="w-full bg-purple-600 hover:bg-purple-700 py-2 px-3 rounded text-white"
          type="submit"
        >
          Registrarse
        </button>
      </form>
      <p className="text-center flex flex-col md:flex-row justify-center gap-1">
        ¿Ya tienes una cuenta?{" "}
        <a href="/login" className="text-blue-600 hover:underline">Inicia sesión</a>
      </p>
    </div>
  );
}