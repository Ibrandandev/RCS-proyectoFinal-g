import { useEffect, useState } from "react";
import "../css/service-details.css";
import { useParams } from "react-router-dom";
import { getServiceById } from "../helpers/servicesApi";

const ServiceDetailsPage = () => {
  const { id } = useParams();

  const [service, setService] = useState([]);
  useEffect(() => {
    traerServicios();
  }, []);

  const traerServicios = async () => {
    const { service } = await getServiceById(id);
    setService(service);
  };

  return (
    <div>
      <img
        className=" d-block img-spinning"
        src={service.img}
        alt={service.nombre}
      />

      <div className="container text-white">
        <div className="mt-4 d-flex justify-content-between align-items-center">
          <h1 className="fontTitulos display-3">
            <strong>{service.nombre}</strong>
          </h1>
          <button className="btn btn-cursos w-50 mx-2" type="button">
            Reservar
          </button>
        </div>
        <hr />
        <div className="row datos my-3">
          <div className="col-12 col-lg-3 col-md-6">
            <h5>
              <i
                className="fa fa-caret-square-o-right fs-3 me-2"
                aria-hidden="true"
              ></i>
              {/* {service.categoria} */}
              Cardio
            </h5>
          </div>
          <div className="col-12 col-lg-3 col-md-6">
            <h5>
              <i
                className="fa fa-user-circle-o fs-3 me-2"
                aria-hidden="true"
              ></i>
              {/* Profe: {service.profesor} */}
              Profe: Alex
            </h5>
          </div>
          <div className="col-12 col-lg-3 col-md-6">
            <h5>
              <i className="fa fa-clock-o fs-3 me-2" aria-hidden="true"></i>
              {service.horario}
            </h5>
          </div>
          <div className="col-12 col-lg-3 col-md-6">
            <h5>
              <i className="fa fa-calendar fs-3 me-2" aria-hidden="true"></i>
              {service.fecha}
            </h5>
          </div>
        </div>
        <hr />
        <p className="fs-5">{service.descripcion}</p>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
