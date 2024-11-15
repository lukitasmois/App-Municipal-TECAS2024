import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MostrarPDF from "../../components/MostrarPDF";
import Contenedor from "../../components/Contenedor";
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
        <div style={{ width: "60%", margin: "0 auto" }} className="mt-5">
          <div>
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
            <div className="col-12 col-sm-6 text-center">
              <h3>
                Plano{" "}
                <a href={`${negocio.plano}`}>
                  <button className="btn btn-success ms-4">Descargar</button>
                </a>
              </h3>
              <img
                className="rounded"
                src={`${negocio.plano}`}
                style={{ width: "100%" }}
                alt="Plano"
              />
              {extensionPlano === "pdf" ? (
                <MostrarPDF pdfUrl={`${negocio.plano}`} />
              ) : (
                <div
                  style={{
                    display: "inline-block",
                    width: "80%",
                    marginRight: "30px",
                  }}
                ></div>
              )}
            </div>
            <div className="col-12 col-sm-6 text-center">
              {extensionTitulo === "pdf" ? (
                <MostrarPDF pdfUrl={`${negocio.titulo}`} />
              ) : (
                <div style={{ display: "inline-block", width: "80%" }}>
                  <h3>
                    Titulo{" "}
                    <a href={`${negocio.titulo}`}>
                      <button className="btn btn-success ms-4">
                        Descargar
                      </button>
                    </a>
                  </h3>
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
