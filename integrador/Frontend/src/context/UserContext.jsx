import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Recuperar los datos del usuario desde localStorage si existen
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      // Almacenar los datos del usuario en localStorage cuando cambian
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      // Si no hay usuario, limpiar localStorage
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default UserProvider;
