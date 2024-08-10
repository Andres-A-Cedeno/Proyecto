import React, { useState, useEffect } from "react";

export function RegisterForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    alias: "",
    email: "",
    contraseña: "",
    perfil_id: 2, // siempre va a ser usuario normal
    genero_id: "",
  });

  const [generos, setGeneros] = useState([]);
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal

  useEffect(() => {
    async function fetchGeneros() {
      try {
        const response = await fetch("http://localhost:4322/api/genres");
        if (!response.ok) {
          throw new Error("Error al obtener la lista de géneros");
        }
        const data = await response.json();
        setGeneros(data);
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchGeneros();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const convertedValue = name === "genero_id" ? parseInt(value, 10) : value;
    setFormData({
      ...formData, // Copia el objeto formData
      [name]: convertedValue, // Asigna el nuevo valor
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Asignar "Masculino" (genero_id = 1) si genero_id está vacío
    if (!formData.genero_id) {
      formData.genero_id = 1; // "Masculino" por defecto
    }
  
    console.log(formData);
  
    try {
      const response = await fetch("http://localhost:4322/api/new_users", {
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
      setShowModal(true); // Mostrar el modal al crear el usuario correctamente
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleModalAccept = () => {
    setShowModal(false); // Cerrar el modal
    window.location.href = "/login"; // Redirigir a la página de login
  };

  return (
    <div className="w-full flex flex-col max-w-md md:max-w-xl md:h-auto p-7 md:p-9 space-y-4 md:space-y-6 bg-white rounded-lg shadow-md justify-center">
      <h2 className="text-4xl font-bold text-start">Regístrate</h2>
      <form className="space-y-1.5 md:space-y-2" onSubmit={handleSubmit}>
        {/* El resto del formulario aquí */}
        <div className="grid grid-cols-1 gap-1.5 md:grid-cols-2 md:gap-2">
          <div className="bg-neutral-300 rounded p-1.5 md:p-2 relative text-sm md:text-base">
            <label htmlFor="nombre" className="text-sm md:text.base text-neutral-600">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              placeholder="Ingresa su nombre"
              className="w-full bg-inherit text-sm md:text-base focus:outline-none focus:text-neutral-600 text-neutral-400"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="bg-neutral-300 rounded p-1.5 md:p-2 relative text-sm md:text-base">
            <label htmlFor="apellido" className="text-neutral-600">
              Apellido
            </label>
            <input
              name="apellido"
              placeholder="Ingrese su apellido"
              className="w-full bg-inherit text-sm md:text-base focus:outline-none focus:text-neutral-600 text-neutral-400"
              value={formData.apellido}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-1.5 md:text-base md:gap-2">
          <div className="bg-neutral-300 rounded p-1.5 md:p-2 relative text-sm md:text-base">
            <label htmlFor="alias" className="text-neutral-600">
              Nombre de usuario
            </label>
            <input
              name="alias"
              placeholder="Ingrese su nombre de usuario"
              className="w-full focus:outline-none focus:text-neutral-600 text-neutral-400 md:text-base text-sm bg-inherit"
              value={formData.alias}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col bg-neutral-300 rounded p-1.5 md:p-2 relative text-sm md:text-base">
            <label htmlFor="genero" className="text-neutral-600">
              Género
            </label>
            <select
              name="genero_id"
              className="bg-inherit text-neutral-400 focus:outline-none focus:text-neutral-600 text-sm md:text-base -ml-1"
              value={formData.genero_id}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Escoge tu género</option>
              {generos.map((genero) => (
                <option key={genero.genero_id} value={genero.genero_id}>
                  {genero.descripcion_genero}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="bg-neutral-300 rounded p-1.5 md:p-2 relative text-sm md:text-base">
          <label htmlFor="email" className="text-neutral-600">
            Email
          </label>
          <input
            name="email"
            placeholder="example.email@gmail.com"
            type="email"
            className="w-full text-sm md:text-base focus:text-neutral-600 text-neutral-400 focus:outline-none bg-inherit"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="bg-neutral-300 rounded p-1.5 md:p-2 relative text-sm md:text-base">
          <label htmlFor="contraseña" className="text-neutral-600">
            Contraseña
          </label>
          <input
            name="contraseña"
            placeholder="Introduce al menos 8+ caracteres"
            type="password"
            autoComplete="off"
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
      
      {/* Modal de confirmación */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <h3 className="text-2xl mb-4">Usuario creado correctamente</h3>
            <button
              onClick={handleModalAccept}
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}

      <p className="text-center flex flex-col md:flex-row justify-center gap-1">
        ¿Ya tienes una cuenta?
        <a href="/login" className="text-blue-600 hover:underline">
          Inicia sesión
        </a>
      </p>
    </div>
  );
}