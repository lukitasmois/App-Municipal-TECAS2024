import React, { useState, useEffect } from "react";
import TablaHabilitaciones from "./TablaHabilitacion";

import axios from "axios";

const VistaHabilitaciones = () => {
  const [habilitacionesArray, sethabilitacionesArray] = useState([]);
  
  // TRAE TODAS LAS HABILITACIONES
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/habilitaciones/`).then((res) => {
      sethabilitacionesArray(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  },[])

  return (
    <>
     
        {/* Renderizar según la condición */}
        {habilitacionesArray.length === 0 ? (
            <></>
        ) : (
            <div className="container">
                <TablaHabilitaciones
                    habilitaciones={habilitacionesArray}
                ></TablaHabilitaciones>
            </div>
        )}
        
    </>
);

};




export default VistaHabilitaciones;
