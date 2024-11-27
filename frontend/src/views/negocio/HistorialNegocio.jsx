import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TablaHabilitaciones from '../habilitacion/TablaHabilitacion';
import { FaHistory } from "react-icons/fa";
const HistorialNegocio = (props) => {
  const [habilitaciones, setHabilitaciones] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/api/habilitaciones/negocio/${props.idNegocio}`,
        { credentials: 'include' }
      )
      .then((res) => {
        setHabilitaciones(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [props.idNegocio]);

  return (
    <div className="container mt-4">
      {/* Botón para abrir el modal */}
      <div className="d-flex justify-content-end mb-3">
        <button
          type="button"
          className="btn btn-outline-secondary"
          data-bs-toggle="modal"
          data-bs-target="#Historial"
        >
          <FaHistory />
        </button>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="Historial"
        tabIndex="-1"
        aria-labelledby="HistorialLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title" id="HistorialLabel">
                Historial de Habilitaciones
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Cerrar"
              ></button>
            </div>
            <div className="modal-body">
              {habilitaciones.length > 0 ? (
                <TablaHabilitaciones habilitaciones={habilitaciones} />
              ) : (
                <div className="alert alert-info text-center">
                  No hay habilitaciones registradas para este negocio.
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistorialNegocio;
