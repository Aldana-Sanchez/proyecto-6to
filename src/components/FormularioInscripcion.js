import React from 'react';

// const function HandleSubmit(e){
//     e.preventDefault();
//     Navigate(/dashboard)
// }


function FormularioInscripcion() {
  return (
    <div className="formulario card">
      <h2>Inscripción a mesas de examen</h2>
      <form>
        <input type="text" placeholder="Nombre" />
        <input type="text" placeholder="Apellido" />
        <input type="text" placeholder="DNI" />
        <input type="email" placeholder="Correo electrónico" />

        <select name="materia" defaultValue="">
          <option value="" disabled>Seleccioná una materia</option>
          <option value="matematica">Matemática</option>
          <option value="programacion">Programación</option>
          <option value="fisica">Física</option>
          <option value="redes">Redes</option>
        </select>

        <button type="submit">Inscribirse</button>
        {/* <button type="submit" onClick={HandleSubmit}>Inscribirse</button> */}
      </form>
    </div>
  );
}

export default FormularioInscripcion;