export function LoginForm() {
  return (
    <div className="bg-white w-full max-w-md p-8 rounded shadow-lg border border-purple-900">
      <h2 className="text-2xl font-semibold mb-4 text-purple-900">
        Iniciar Sesión
      </h2>
      <form action="/procesar-login" method="POST" className="w-full">
        <label htmlFor="correo" className="block mb-2">
          Correo electrónico:
        </label>
        <input
          type="email"
          id="correo"
          name="correo"
          placeholder="Correo electronico o nombre de usuario"
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-purple-500 bg-gray-100"
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
