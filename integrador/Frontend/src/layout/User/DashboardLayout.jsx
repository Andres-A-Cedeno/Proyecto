//import Header from "../components/Header";
import { useEffect } from "react";
import PropTypes from "prop-types";
import SideBar from "../../components/SideBar/Sidebar";

const DashboardLayout = ({ children, title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div className="flex h-screen">
      <SideBar />
      <main>{children}</main>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default DashboardLayout;
