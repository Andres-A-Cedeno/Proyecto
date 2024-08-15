import MainLayout from "../layout/MainLayout";
import Info from "../components/Info";

const Home = () => {
  return (
    <MainLayout title="Inicio">
      <div className="flex justify-center items-center bg-violet-700/30 min-h-screen">
        <Info />
      </div>
    </MainLayout>
  );
};

export default Home;
