import Header from "./components/Header";
import Info from "./components/Info";

function App() {
  return (
    <div className=" h-screen w-full bg-violet-900">
      <Header />
      <main className="flex flex-col md:flex-row h-screen justify-center w-full">
        <Info />
        <div className="flex bg-purple-900 w-full md:w-1/2 justify-center items-center h-lvh p-14">
          <div className="flex h-[50%] w-full"></div>
        </div>
      </main>
    </div>
  );
}

export default App;
