import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("usuarioActual");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (userData) => {
    const formattedUser = {
      nombre: userData.nombre,
      apellido: userData.apellido,
      correo: userData.correo,
      rol: (userData.rol || "").toLowerCase(),
    };
    setUser(formattedUser);
    localStorage.setItem("usuarioActual", JSON.stringify(formattedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("usuarioActual");
  };

  useEffect(() => {
    const saved = localStorage.getItem("usuarioActual");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
