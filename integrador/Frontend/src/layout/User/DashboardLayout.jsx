//import Header from "../components/Header";
import { useEffect } from "react";
import PropTypes from "prop-types";

const DashboardLayout = ({ children, title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  //tener en cuenta que se implementará auna side menu, para el usuario

  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default DashboardLayout;
