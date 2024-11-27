import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VerPDF from "../../components/VerPDF";
import Contenedor from "../../components/Contenedor";
import HistorialNegocio from "./HistorialNegocio";
import { FaDownload } from "react-icons/fa";
import "./VerNegocio.css";

function VerNegocio() {
  const { idNegocio } = useParams();

  const [negocio, setNegocio] = useState(null);

  async function getNegocio() {
    const negocio = await fetch(
      `${import.meta.env.VITE_API_URL}/api/negocios/${idNegocio}`,
      {
        credentials: "include",
      }
    );
    const negocioFetch = await negocio.json();
    setNegocio(negocioFetch);
    console.log(negocioFetch);
  }

  useEffect(() => {
    getNegocio();
  }, []);

  function mostrarNegocio() {
    if (negocio !== null) {
      console.log(negocio);

      let splitTitulo = negocio.titulo.split(".");
      let splitPlano = negocio.plano.split(".");
      let extensionTitulo = splitTitulo[splitTitulo.length - 1];
      let extensionPlano = splitPlano[splitPlano.length - 1];
      return (
        <div style={{ margin: "0 auto" }} className="mt-5 ancho-contenedor-PDF">
          <div>
          <HistorialNegocio idNegocio={idNegocio}/>
            <Contenedor>
              <h2>
                Datos de{" "}
                <span style={{ color: "rgb(100, 100, 180)" }}>
                  Nombre del negocio 
                </span>
              </h2>
              <ul style={{ fontSize: "18px" }}>
                <li>
                  Calle: <b>{negocio.calle}</b>
                </li>
                <li>
                  Ciudad: <b>{negocio.ciudad}</b>
                </li>
                <li>
                  Altura: <b>{negocio.altura}</b>
                </li>
                <li>
                  Rubro: <b>{negocio.rubro}</b>
                </li>
              </ul>
            </Contenedor>
          </div>

          <div className="row mt-5">
            <div className="col-12 col-md-6 text-center">
              <h3>
                Plano{" "}
                <a href={`${negocio.plano}`} target="_blank">
                  <button className="btn btn-success ms-4">
                    <FaDownload /> Descargar
                  </button>
                </a>
              </h3>

              {extensionPlano === "pdf" ? (
                <div>
                  <VerPDF file={negocio.plano} />
                </div>
              ) : (
                <div
                  style={{
                    display: "inline-block",
                    width: "80%",
                    marginRight: "30px",
                  }}
                >
                  <img
                    className="rounded"
                    src={`${negocio.plano}`}
                    style={{ width: "100%" }}
                    alt="Plano"
                  />
                </div>
              )}
            </div>
            <div className="col-12 col-md-6 text-center">
              <h3>
                Titulo{" "}
                <a href={`${negocio.titulo}`} target="_blank">
                  <button className="btn btn-success ms-4">
                    <FaDownload /> Descargar
                  </button>
                </a>
              </h3>
              {extensionTitulo === "pdf" ? (
                <div>
                  <VerPDF file={negocio.titulo} />
                </div>
              ) : (
                <div style={{ display: "inline-block", width: "80%" }}>
                  <img
                    className="rounded"
                    src={`${negocio.titulo}`}
                    style={{ width: "100%" }}
                    alt="Titulo"
                  />
                </div>
              )}
            </div>
            
          </div>
        </div>
      );
    }
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }} className="mt-4">
        Mi Negocio
      </h1>
      {mostrarNegocio()}
    </>
  );
}

export default VerNegocio;
