import emailjs from '@emailjs/browser';

export function enviarEmailRegistro(data) {
  return emailjs.send(
    "service_1no0csr",   
    "template_b1cvwyp",  
    {
      nombre: data.nombre,
      apellido: data.apellido,
      correo: data.correo,
      email: data.correo,
    },
    "WPpGGANAGqFjPZBiu" 
  );
}


export function enviarEmailInscripcion(data) {
  return emailjs.send(
    "service_1no0csr",
    "template_p6llwv9",
    {
        to_email: data.correo,
      nombre: data.nombre,
      apellido: data.apellido,
      correo: data.correo,
      materiasTexto: data.materiasTexto,   // ← ESTE ES EL IMPORTANTE
    },
    "WPpGGANAGqFjPZBiu"
  );
}
