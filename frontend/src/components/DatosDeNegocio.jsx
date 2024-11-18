import React, { useEffect, useState } from "react";  
import ListaNegocios from "./ListaNegocios";
import { useParams } from "react-router-dom";
import "./ListaNegocios.css";
const GetBusinessesData = () => {
  const [businesses, setBusinesses] = useState([]);  
  const { id } = useParams();

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        let response = await fetch(`http://localhost:3000/api/negocios/nuevaHabilitacion/${id}`);
        if (!response.ok) {
          throw new Error("Error al obtener negocios");
        }
        let json_response = await response.json();
        setBusinesses(json_response);
      } catch (err) {
        console.log(err);
        alert("No se han podido leer los datos");
      }
    };

    fetchBusinesses();
  }, [id]); 

  return (
    <div>
    <div className="custom-container"><h1>Tus Negocios</h1></div>
    <table className="datos-negocio">
      <thead>
        <tr>
          <th>id</th>
          <th>Calle</th>
          <th>Ciudad</th>
          <th>Altura</th>
          <th>Rubro</th>
        </tr>
      </thead>
      <tbody>
        {businesses.map((business) => (
          <ListaNegocios key={business.id} business={business} />
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default GetBusinessesData;
