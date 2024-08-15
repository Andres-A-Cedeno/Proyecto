import Buttons from "./Buttons.jsx";

function Info() {
  return (
    <div className="flex flex-col bg-white justify-center items-center p-6 sm:p-10 md:p-20 gap-4 w-full sm:w-3/4 md:w-1/2 rounded-lg text-black mx-4 mx-auto">
      <img src="/logo.png" alt="logo" className="w-16 sm:w-24 md:w-28 mb-4" />
      <div className="text-center">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">
          Relájate jugando,
        </h1>
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl mb-4">
          Organízate ganando
        </h1>
        <p className="mb-6 text-sm sm:text-base md:text-lg">
          ¡Bienvenido a nuestra página web! Sumérgete en nuestro juego diseñado
          para relajarte y divertirte, ideal para liberar el estrés. Además, te
          ofrecemos herramientas para organizar tus tareas pendientes,
          garantizando que puedas gestionar tu tiempo de manera eficaz. Explora
          y disfruta de la combinación perfecta entre entretenimiento y
          productividad en un solo lugar.
        </p>
        <Buttons />
      </div>
    </div>
  );
}

export default Info;
