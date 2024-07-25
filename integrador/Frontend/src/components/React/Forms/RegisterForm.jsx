//para los div (imputs-label) bg-neutral-300
// para los label: text-neutral-600
// para los imputs : text-neutral-400
// cuando esta en focus text-neutral-600

export function RegisterForm() {
  return (
    <div>
      <div className="w-full flex flex-col max-w-md md:max-w-xl  md:h-auto p-7 md:p-9 space-y-4 md:space-y-6 bg-white rounded-lg shadow-md justify-center">
        <h2 className="text-4xl font-bold text-start">Registrate</h2>
        <form className="space-y-1.5 md:space-y-2 ">
          <div className="grid grid-cols-1 gap-1.5 md:grid-cols-2 md:gap-2">
            <div className="bg-neutral-300 rounded p-1.5 md:p-2 relative text-sm md:text-base">
              <label htmlFor="nombre" className="text-sm md:text.base">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                placeholder="Ingresa su nombre"
                className="w-full bg-inherit text-sm md:text-base focus:outline-none focus:text-neutral-600 text-neutral-400"
              />
            </div>
            <div className="bg-neutral-300 rounded p-1.5 md:p-2 relative text-sm md:text-base">
              <label htmlFor="apellido">Apellido</label>
              <input
                id="apellido"
                placeholder="Ingrese su apellido"
                className="w-full bg-inherit text-sm md:text-base focus:outline-none focus:text-neutral-600 text-neutral-400"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1.5 md:text-base md:gap-2">
            <div className="bg-neutral-300 rounded p-1.5 md:p-2 relative text-sm md:text-base">
              <label htmlFor="username" className="text-sm md:text-base">
                Nombre de usuario
              </label>
              <input
                id="username"
                placeholder="Ingrese su nombre de usuario"
                className="w-full focus:outline-none focus:text-neutral-600 text-neutral-400 md:text-base text-sm bg-inherit"
              />
            </div>
            <div className="flex flex-col bg-neutral-300 rounded p-1.5 md:p-2 relative text-sm md:text-base">
              <label htmlFor="genero">Género</label>
              <select
                name="Género"
                id="genero"
                className="bg-inherit text-neutral-400 focus:outline-none focus:text-neutral-600 text-sm md:text-base -ml-1"
              >
                <option value="">Género que mejor te defina</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>
          </div>
          <div className="bg-neutral-300 rounded p-1.5 md:p-2 relative text-sm md:text-base">
            <label htmlFor="email" className="">
              Email
            </label>
            <input
              id="email"
              placeholder="example.email@gmail.com"
              type="email"
              className="w-full text-sm md:text-base focus:text-neutral-600 text-neutral-400 focus:outline-none bg-inherit"
            />
          </div>
          <div className="bg-neutral-300 rounded p-1.5 md:p-2 relative text-sm md:text-base">
            <label htmlFor="password">Contraseña</label>
            <div className="relative">
              <input
                id="password"
                placeholder="Introduce al menos 8+ caracteres"
                type="password"
                className="bg-inherit w-full text-sm md:text-base focus:text-neutral-600 text-neutral-400 focus:outline-none"
              />
            </div>
          </div>
          <div className="bg-neutral-300 rounded p-1.5 md:p-2 relative text-sm md:text-base">
            <label htmlFor="confirm-password">Contraseña</label>
            <div className="relative">
              <input
                id="confirm-password"
                placeholder="Introduce al menos 8+ caracteres"
                type="password"
                className="w-full text-sm md:text-base bg-inherit focus:outline-none focus:text-neutral-600 text-neutral-400"
              />
            </div>
          </div>
          <button
            className="w-full bg-purple-600 hover:bg-purple-700 py-2 px-3 rounded text-white"
            type="submit"
          >
            Registrarse
          </button>
        </form>
        <p className="text-center  flex flex-col md:flex-row justify-center gap-1">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Inicia sesion
          </a>
        </p>
      </div>
    </div>
  );
}
