import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import Register from "./Register";
import Login from "./Login";
import Home from "./pages/Home";
import Dashboard from "./pages/user/Dashboard";

function App() {
  return (
    <NextUIProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </NextUIProvider>
  );
}

export default App;
