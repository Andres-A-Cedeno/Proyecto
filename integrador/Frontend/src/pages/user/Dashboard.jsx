import DashboardLayout from "../../layout/User/DashboardLayout";
import SideBar from "../../components/Sidebar";

const Dashboard = () => {
  return (
    <DashboardLayout title="Dashboard">
      <h1>Hola Bienvenido Usuario</h1>
      <SideBar />
    </DashboardLayout>
  );
};

export default Dashboard;
