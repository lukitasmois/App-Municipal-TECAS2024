import { useEffect, useState } from "react";
import { Table } from "../../components/tabla/Table";
import axios from "axios";



export function VerPlanos(params) {
    const [negocios, setNegocios] = useState([])

    useEffect(() => {
        fetchNegocios(); 
      }, []);

      const fetchNegocios = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/negocios/');
          const negociosConUsuarios = await Promise.all(response.data.map(async (negocio) => {
            const usuarioResponse = await axios.get(`http://localhost:3000/api/usuarios/${negocio.idUsuario}`);           
            return { ...negocio, usuario: usuarioResponse.data };
          }));          
          setNegocios(negociosConUsuarios);
        } catch (error) {
          console.error('Error al obtener los negocios:', error);
        }
      };

      const handleViewPlane = async (negocio) =>{
        console.log(negocio);
        
        window.open(`http://localhost:3000/api/negocios/plano/${negocio.idUsuario}/${negocio._id}`)
    }

    const acciones = [
        { nombre: "Ver Plano", funcion: (negocio) => handleViewPlane(negocio) }
      ];

    return(
        <>
        <h1>Planos</h1>
        <Table 
        headers={[
        "Calle",
        "Altura",
        "Nombre",
        "Apellido",
        "DNI",
        "Email"
        ]}
        data = {
            negocios
        }
        keys={[
            "calle",
            "altura",
            "usuario.nombre",
            "usuario.apellido",
            "usuario.cuil",
            "usuario.email"
        ]}
        actions = {acciones}
        />
        </>
    )
}