import React, { useEffect, useState } from 'react'

import {getUsuarioById} from "../helpers/usuariosApi";
import {actualizarUsuario} from "../helpers/usuariosApi";

import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';

import Modal from 'react-bootstrap/Modal';


const ModalEdit = ({show, handleClose, cid}) => {
    const MySwal = withReactContent(Swal);
    const [usuario, setUsuario] =useState(null);

    useEffect(()=> {
        traerDatosUsuario();      
    }, []);
 
    const traerDatosUsuario = async () => {
        const resp = await getUsuarioById(cid);
        setUsuario(resp.usuario)
    };

    const handleChange = (e)=> 
    {
        let valueCheck = false;

        if (e.target.name === "UsuarioActivo") {
            if(e.target.checked){
                valueCheck = true;
            } else {
                valueCheck = false
            }
            setUsuario({
                ...usuario,
                [e.target.name]: valueCheck,
            });        
        } else{
            setUsuario({
                ...usuario,
                [e.target.name]:e.target.name,
           })}
        };
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        await actualizarUsuario(usuario._id, usuario);
        MySwal.fire("Usuario Actualizado", "", "success");
        handleClose();
    };

    return (
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Editar Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {usuario ? (
                <form onSubmit={handleSubmit}>
                  <label className="fw-bold">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    value={usuario.nombre}
                    name="nombre"
                    onChange={handleChange}
                  />
                  <label className="fw-bold">PlanContratado</label>
                  <textarea
                    className="form-control"
                    value={usuario.planContratado}
                    onChange={handleChange}
                    name="PlanContratado"
                  ></textarea>
             
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      checked={usuario.usuarioActivo}
                      onChange={handleChange}
                      name="estado"
                    />
                    <label className="form-check-label fw-bold">Activo</label>
                  </div>
                  <div className="d-grid mt-2">
                    <button className="btn btn-warning">Actualizar</button>
                  </div>
                </form>
              ) : (
                <h3>Cargando...</h3>
              )}
            </Modal.Body>
          </Modal>
        </>
      );    
};
 
export default ModalEdit;