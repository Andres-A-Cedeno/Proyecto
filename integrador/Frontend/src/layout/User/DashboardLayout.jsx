import PropTypes from "prop-types";
import { useEffect } from "react";
import SideBar from "../../components/SideBar/Sidebar";
import LogoutButton from "../../components/LogoutButton";

const DashboardLayout = ({ children, title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div className="flex h-screen">
      <SideBar />
      <main className="flex-1 p-4">
        <div className="flex justify-end">
          <LogoutButton />
        </div>
        {children}
      </main>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default DashboardLayout;