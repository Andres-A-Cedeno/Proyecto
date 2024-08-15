import { useState, useEffect } from "react";

function RegisterForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    nickname: "",
    email: "",
    password: "",
    perfil_id: 2, // siempre va a ser usuario normal
    genero_id: "",
  });

  const [generos, setGeneros] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    async function fetchGeneros() {
      try {
        const response = await fetch(
          "http://localhost:4322/api/genres/getAllgenres"
        );
        if (!response.ok) {
          throw new Error("Error al obtener la lista de géneros");
        }
        const data = await response.json();
        setGeneros(data);
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
      ...formData,
      [name]: convertedValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.genero_id) {
      formData.genero_id = 1;
    }

    try {
      const response = await fetch("http://localhost:4322/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al crear el usuario");
      }

      const data = await response.json();
      setShowSuccessModal(true);
    } catch (error) {
      setErrorMessage(error.message);
      setShowErrorModal(true);
    }
  };

  const handleModalAccept = () => {
    setShowSuccessModal(false);
    window.location.href = "/login";
  };

  const handleErrorModalClose = () => {
    setShowErrorModal(false);
  };

  return (
    <div className="w-full flex flex-col max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto p-6 md:p-8 lg:p-10 space-y-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl lg:text-4xl font-bold text-start">Regístrate</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-neutral-300 rounded p-2 relative">
            <label
              htmlFor="nombre"
              className="text-sm lg:text-base text-neutral-600"
            >
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              placeholder="Ingresa tu nombre"
              className="w-full bg-inherit focus:outline-none focus:text-neutral-600 text-neutral-400"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="bg-neutral-300 rounded p-2 relative">
            <label
              htmlFor="apellido"
              className="text-sm lg:text-base text-neutral-600"
            >
              Apellido
            </label>
            <input
              name="apellido"
              placeholder="Ingresa tu apellido"
              className="w-full bg-inherit focus:outline-none focus:text-neutral-600 text-neutral-400"
              value={formData.apellido}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-neutral-300 rounded p-2 relative">
            <label
              htmlFor="nickname"
              className="text-sm lg:text-base text-neutral-600"
            >
              Nombre de usuario
            </label>
            <input
              name="nickname"
              placeholder="Ingresa tu nombre de usuario"
              className="w-full bg-inherit focus:outline-none focus:text-neutral-600 text-neutral-400"
              value={formData.nickname}
              onChange={handleChange}
            />
          </div>
          <div className="bg-neutral-300 rounded p-2 relative">
            <label
              htmlFor="genero_id"
              className="text-sm lg:text-base text-neutral-600"
            >
              Género
            </label>
            <select
              name="genero_id"
              className="w-full bg-inherit focus:outline-none focus:text-neutral-600 text-neutral-400"
              value={formData.genero_id}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Escoge tu género
              </option>
              {generos.map((genero) => (
                <option key={genero.genero_id} value={genero.genero_id}>
                  {genero.descripcion_genero}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="bg-neutral-300 rounded p-2 relative">
          <label
            htmlFor="email"
            className="text-sm lg:text-base text-neutral-600"
          >
            Email
          </label>
          <input
            name="email"
            placeholder="example.email@gmail.com"
            type="email"
            className="w-full bg-inherit focus:outline-none focus:text-neutral-600 text-neutral-400"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="bg-neutral-300 rounded p-2 relative">
          <label
            htmlFor="password"
            className="text-sm lg:text-base text-neutral-600"
          >
            Password
          </label>
          <input
            name="password"
            placeholder="Introduce al menos 8+ caracteres"
            type="password"
            autoComplete="off"
            className="w-full bg-inherit focus:outline-none focus:text-neutral-600 text-neutral-400"
            value={formData.password}
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

      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-11/12 max-w-sm md:max-w-md lg:max-w-lg">
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

      {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-11/12 max-w-sm md:max-w-md lg:max-w-lg">
            <h3 className="text-2xl mb-4 text-red-600">Error</h3>
            <p className="mb-4">{errorMessage}</p>
            <button
              onClick={handleErrorModalClose}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
            >
              Cerrar
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

export default RegisterForm;
