import React, { useState,useEffect } from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import EstadoConEsfera from "../../components/Estado";
import Contenedor from "../../components/Contenedor";
import { Actions } from "../../components/Actions";
import { useNavigate } from "react-router-dom";
const TablaHabilitaciones = ({ habilitaciones }) => {
  const [NroLegajo, setNroLegajo] = useState([]);
  const [Busqueda,setBusqueda] = useState(habilitaciones);
  const [PaginaActual, setPaginaActual] = useState(1);//pagina actual de la paginacion
  const ElementosPorPagina = 5;//elementos por pagina

  const UltimoElemento = PaginaActual * ElementosPorPagina;//ultimo elemnento de una pagina
  const PrimerElemento = UltimoElemento - ElementosPorPagina;//primer elemento de una pagina
  const HabilitacionesPagina = Busqueda.slice(PrimerElemento, UltimoElemento);//trae el intervalo de todos los valores por pagina

  const PaginasTotales = Math.ceil(Busqueda.length / ElementosPorPagina);//calcular las paginas totales
  const navigate = useNavigate()
  useEffect(() => {
    setBusqueda(habilitaciones);
}, [habilitaciones]);
  const Estado = (estado) => {
    switch (estado.toLowerCase()) { 
      case "iniciado":
        return "blue";
      case "en proceso":
        return "yellow";
      case "aprobado":
        return "green";
      case "vencido":
        return "red";
      default:
        return "gray"; 
    }
  };
  const handleChange = (e) => {
    setNroLegajo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    buscar();
  };
//buscar lejago en caso estar vacio usa todo lo que le mandas,sino filtra
  const buscar= () => {
    if(NroLegajo === ""){
      setBusqueda(habilitaciones);
    
    }else{
      setBusqueda(habilitaciones.filter(habilitacion => habilitacion.NroLegajo === NroLegajo))
  }
  setPaginaActual(1);
  }

  const handleViewAutorization = async (habilitacion) =>{
    navigate(`/habilitaciones/${habilitacion._id}`)
  }

  const actions = [
    {
      name: "Ver Habilitacion",
      funcion: handleViewAutorization
    }
  ]

  return (
    <>
    
<Contenedor>
  <h2 className="text-center mb-4">Habilitaciones</h2>

  {/* Formulario para la búsqueda */}
  <form onSubmit={handleSubmit} className="mb-3">
    <div className="d-flex justify-content-between align-items-center">
      <div className="form-group mb-0">
        <input
          type="number"
          value={NroLegajo}
          onChange={handleChange}
          className="form-control"
          style={{ maxWidth: "300px" }}
          placeholder="NroLegajo" 
        />
      </div>
      <button type="submit" className="btn btn-primary ml-2">
        <IoSearchOutline />
      </button>
    </div>
  </form>

  {/* Tabla con separación */}
  <div className="table-responsive mt-3">
    <table className="table table-striped table-hover">
      <thead className="thead-dark ">
        <tr>
          <th scope="col">Legajo</th>
          <th scope="col">Expediente</th>
          <th scope="col">Estado</th>
          <th scope="col">Vence</th>
        </tr>
      </thead>
      <tbody>
        {HabilitacionesPagina.map((habilitacion) => (
          <tr key={habilitacion.id}>
            <td>{habilitacion.NroLegajo ? habilitacion.NroLegajo : "Sin Legajo"}</td>
            <td>{habilitacion.Expediente ? habilitacion.Expediente : "Sin Expediente"}</td>
            <td>
              <EstadoConEsfera texto={habilitacion.estado} color={Estado(habilitacion.estado)} />
            </td>
            <td>{habilitacion.Vencimiento ? "Vence: " + habilitacion.Vencimiento : "Sin Vencimiento"}</td>
            <td><Actions actions={actions} dato={habilitacion} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</Contenedor>

    
      

      <nav>
        {/*boton para ir al primer elemento*/}
        <ul className="pagination justify-content-center">
          <li className={`page-item ${PaginaActual === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setPaginaActual(1)}
              disabled={PaginaActual === 1}
            >
              Primero
            </button>
          </li>
          {/*boton para retroceder 1 pagina*/}
          <li className={`page-item ${PaginaActual === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setPaginaActual(PaginaActual - 1)}
              disabled={PaginaActual === 1}
            >
              <BsFillArrowLeftCircleFill />
            </button>
          </li>
          {/*iteracion sobre todas las paginas y creacion de botones de pagina*/}
          {Array.from({ length: PaginasTotales }, (_, i) => i + 1).map((page) => (
            <li
              key={page}
              className={`page-item ${PaginaActual === page ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setPaginaActual(page)}
              >
                {page}
              </button>
            </li>
          ))}
          {/*boton para avanzar 1 pagina*/}
          <li
            className={`page-item ${
              PaginaActual === PaginasTotales ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => setPaginaActual(PaginaActual + 1)}
              disabled={PaginaActual === PaginasTotales}
            >
              <BsFillArrowRightCircleFill />
            </button>
          </li>
          {/* boton para ir al ultimo elemento */}
          <li
            className={`page-item ${
              PaginaActual === PaginasTotales ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => setPaginaActual(PaginasTotales)}
              disabled={PaginaActual === PaginasTotales}
            >
              Último
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default TablaHabilitaciones;