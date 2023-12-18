import Swal from "sweetalert2";
const url = "https://proyectofinal-g2-backend.1.us-1.fl0.io/api/auth/login";

export const login = async (datos) => {
  try {
    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(datos),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const data = await resp.json();

    localStorage.setItem("token", JSON.stringify(data.token));

    return data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Algo salio mal!",
    });
    throw new Error(error);
  }
};
