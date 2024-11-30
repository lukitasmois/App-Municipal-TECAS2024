import { act, useEffect, useState } from "react";
import { Table } from "../../components/tabla/Table";
import axios from "axios";
import { changeStatePlane } from "./planeService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function VerPlanos(params) {
  const [negocios, setNegocios] = useState([]);
  const [cambios, setCambios] = useState(false);

  useEffect(() => {
    fetchNegocios();
  }, [cambios]);

  const fetchNegocios = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/negocios/");
      const negociosConUsuarios = await Promise.all(
        response.data.map(async (negocio) => {
          const usuarioResponse = await axios.get(
            `http://localhost:3000/api/usuarios/${negocio.idUsuario}`
          );
          return { ...negocio, usuario: usuarioResponse.data };
        })
      );
      setNegocios(negociosConUsuarios);
    } catch (error) {
      console.error("Error al obtener los negocios:", error);
    }
  };

  const handleViewPlane = async (negocio) => {
    console.log(negocio);

    window.open(
      `http://localhost:3000/api/negocios/plano/${negocio.idUsuario}/${negocio._id}`
    );
  };

  const handleChangeState = async (negocio, newState) => {
    console.log("cambio");
    try {
      await changeStatePlane(negocio, newState);
      setCambios((prev) => !prev);
      if (newState) {
        toast.success("Plano aprobado!");
      } else {
        toast.success("Plano Rechazado");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const actions = (negocio) => {
    return getActionsByState(negocio, handleViewPlane);
  };

  const getActionsByState = (negocio, handleViewPlane) => {
    const viewPlane = {
      name: "Ver Plano",
      funcion: handleViewPlane,
    };
    let actions = [viewPlane];

    switch (negocio.planosAprobado) {
      case false:
        actions = [
          ...actions,
          {
            name: "Aceptar Plano",
            funcion: () => handleChangeState(negocio, true),
          },
        ];
        break;
      case true:
        actions = [
          ...actions,
          {
            name: "Rechazar Plano",
            funcion: () => handleChangeState(negocio, false),
          },
        ];
        break;
      default:
        break;
    }

    return actions;
  };

  // const acciones = [
  //     { name: "Ver Plano", funcion: (negocio) => handleViewPlane(negocio) },
  //     {name: "Aprobar", funcion: (negocio) => handle}
  //   ];

  return (
    <>
      <h1 className="text-center">Planos</h1>
      <div className="m-auto" style={{ width: "80%" }}>
        <Table
          headers={["Calle", "Altura", "Nombre", "Apellido", "Email"]}
          data={negocios}
          keys={[
            "calle",
            "altura",
            "usuario.nombre",
            "usuario.apellido",
            "usuario.email",
          ]}
          actions={actions}
        />
      </div>
    </>
  );
}
