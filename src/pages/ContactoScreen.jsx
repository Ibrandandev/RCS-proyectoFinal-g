import React, { useState } from "react";
import "../css/contacto.css";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const ContactoScreen = () => {
  const [formValues, setFormValues] = useState({
    nombre: "",
    destinatario: "",
    consulta: "",
  });
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };
  const templateParams = {
    nombre: formValues.nombre,
    destinatario: formValues.destinatario,
    consulta: formValues.consulta,
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .send(
        "service_s77z5hs",
        "template_3cnfsca",
        templateParams,
        "kPRDVZfVG6hM9voQ-"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          Swal.fire({
            title: "¡Listo!",
            text: "Tu consulta ha sido enviada!",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
        },
        (err) => {
          console.log("FAILED...", err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo salió mal!",
            confirmButtonText: "Aceptar",
          });
        }
      );
  };
  return (
    <div className="background min-vh-100">
      <div className="container pt-5">
        <div className="row  justify-content-center">
          <div className="col-8 text-white ">
            <h1 className="formulario fs-2">Tenes alguna duda? Contáctanos!</h1>
          </div>
        </div>
        <div className="row justify-content-center text-white ">
          <form className="col-8" onSubmit={sendEmail}>
            <div className="my-3">
              <label htmlFor="validationDefault01" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                placeholder="Introduzca su nombre"
                onChange={handleChange}
                value={formValues.nombre}
                required
                pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ]{2,254}"
                title="Ingrese solo letras"
                minLength="3"
                maxLength="15"
              />
            </div>
            <div className="my-3 ">
              <label htmlFor="destinatario" className="form-label">
                Correo
              </label>
              <input
                type="email"
                className="form-control"
                id="destinatario"
                placeholder="name@example.com"
                onChange={handleChange}
                value={formValues.destinatario}
                required
                minLength="10"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">
                Motivo de consulta
              </label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Ingrese el motivo de su consulta"
                required
                pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ]{2,254}"
                title="Ingrese solo letras"
                minLength="5"
                maxLength="15"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="consulta" className="form-label">
                Dejanos tu duda!
              </label>
              <textarea
                className="form-control"
                id="consulta"
                rows="3"
                onChange={handleChange}
                value={formValues.consulta}
                required
                minLength="10"
                maxLength="250"
              ></textarea>
            </div>
            <div className="d-flex col-12 justify-content-end">
              <button className="btn btn-primary " type="submit">
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ContactoScreen;
