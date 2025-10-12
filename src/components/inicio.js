import React, { useState } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../estilo.css";

function Inicio() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
    dni: "",
    rol: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "contrasena") {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.nombre ||
      !formData.apellido ||
      !formData.correo ||
      !formData.contrasena ||
      !formData.dni ||
      !formData.rol
    ) {
      alert("Completa todos los campos y selecciona tu rol.");
      return;
    }

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo);
    if (!correoValido) {
      alert("Por favor, ingresá un correo electrónico válido.");
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(formData.contrasena)) {
      setPasswordError(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial (!@#$%^&*)."
      );
      return;
    }

    try {
      // 🔍 Verificamos si el correo ya existe en Firestore
      const q = query(
        collection(db, "usuarios"),
        where("correo", "==", formData.correo)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert("Este correo ya está registrado. Usá otro correo.");
        return;
      }

      // ✅ Si no existe, se registra normalmente
      await addDoc(collection(db, "usuarios"), {
        ...formData,
        fechaRegistro: new Date(),
      });

      alert("Usuario registrado correctamente!");
      login(formData);

      // Redirige según rol
      if (formData.rol === "profesor") {
        navigate("/listado");
      } else {
        navigate("/inscripcion");
      }

      // Limpia el formulario
      setFormData({
        nombre: "",
        apellido: "",
        correo: "",
        contrasena: "",
        dni: "",
        rol: "",
      });
    } catch (error) {
      console.error("Error al guardar en Firestore:", error);
      alert("Hubo un error al guardar el usuario.");
    }
  };

  return (
    <div className="pagina">
      <div className="formulario-box">
        <h2>REGISTRO DE USUARIO</h2>
        <form onSubmit={handleSubmit}>
          <div className="campo">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="campo">
            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </div>

          <div className="campo">
            <input
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="campo">
            <input
              type="password"
              name="contrasena"
              placeholder="Contraseña"
              value={formData.contrasena}
              onChange={handleChange}
              required
            />
            {passwordError && (
              <p style={{ color: "red", fontSize: "0.9em" }}>
                {passwordError}
              </p>
            )}
          </div>

          <div className="campo">
            <input
              type="text"
              name="dni"
              placeholder="DNI"
              value={formData.dni}
              onChange={handleChange}
              required
            />
          </div>

          <div className="campo">
            <label>
              <input
                type="radio"
                name="rol"
                value="alumno"
                checked={formData.rol === "alumno"}
                onChange={handleChange}
              />
              Alumno
            </label>
            <label style={{ marginLeft: "10px" }}>
              <input
                type="radio"
                name="rol"
                value="profesor"
                checked={formData.rol === "profesor"}
                onChange={handleChange}
              />
              Profesor
            </label>
          </div>

          <button type="submit">Continuar</button>
        </form>
      </div>
    </div>
  );
}

export default Inicio;
