import React, { useState , useEffect} from "react";
const useMountEffect = (fun) => useEffect(fun, [])





const VistaHabilitaciones = () => {
  const [inputValue, setInputValue] = useState([]);
  const [habilitacionesArray, sethabilitacionesArray] = useState([]);
  const [HabilitacionSetLegajo,setEH] = useState();
  const [HabilitacionSetExpediente,setEX] = useState();
  const [legajoInput,setLegajoInput] = useState();
  const [expedienteInput,setExpedienteInput] = useState();

  const TablaHabilitaciones = ({ habilitacion }) => {
    let tabla_items = [];
    habilitacion.forEach((hab, index) => {
      tabla_items.push(
        <tr>
  
              <td>{hab.idHabilitacion}</td>
              <td>{hab.NroLegajo}</td>
              <td>{hab.num_expediente}</td>
              <td>{hab.estado}</td>
              <td>{hab.vencimiento}</td>
              <td> <button onClick={()=>{setEH(hab)}} className="btn btn-primary">Modificar número de legajo</button> </td>
              <td> <button onClick={()=>{setEX(hab)}} className="btn btn-secondary">Modificar número de expediente</button> </td>
        </tr>
      );
    });
  
    return (
      <>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Legajo</th>
              <th scope="col">Expediente</th>
              <th scope="col">Estado</th>
              <th scope="col">Vence</th>
            </tr>
          </thead>
          <tbody>
            {tabla_items}
          </tbody>
        </table>
      </>
    );
  };



  useEffect(() => {
      traerHabilitaciones(); 
  }, []);

  async function traerHabilitaciones() {

    const habilitaciones = await fetch(
      `${import.meta.env.VITE_API_URL}/api/habilitaciones/${inputValue}`
    );

    const hab_fetch = await habilitaciones.json();
    sethabilitacionesArray(hab_fetch);
  }

  async function actualizarLegajo(hab){
    const parametrosLegajo = {
      headers : {'Content-Type': 'application/json'},
      method : 'POST',
      body : JSON.stringify({
        	newLegajo : parseInt(legajoInput),
	        id: String(hab._id)
      })
    };

    await fetch(`${import.meta.env.VITE_API_URL}/api/habilitaciones/setlegajo`,parametrosLegajo).then(response => response.json())
    .then(data => {
      alert(data['status'])
      traerHabilitaciones();  
    })
    .catch(error => {
      console.log(error)
    });;
  }


  async function actualizarExpediente(hab){
    const parametrosExpediente = {
      headers : {'Content-Type': 'application/json'},
      method : 'POST',
      body : JSON.stringify({
        	newExpediente : expedienteInput,
	        id: String(hab._id)
      })
    };

    await fetch(`${import.meta.env.VITE_API_URL}/api/habilitaciones/setexpediente`,parametrosExpediente).then(response => response.json())
    .then(data => {
      alert(data['status'])
      traerHabilitaciones();  
    })
    .catch(error => {
      console.log(error)
    });;
  }
  // MANEJA EL CAMBIO DE INPUT EN EL BUSCADOR

  const handleChange = (e) => {
    //alert('HANDLE CHANGE')
    setInputValue(e.target.value);
    return
  };

  const handleLegajoNumberChange = (e) => {
    //alert('HANDLE LEGAJO CHANGE')
    setLegajoInput(e.target.value);
    return
  };

  const handleExpedienteNumberChange = (e) => {
    //alert('HANDLE LEGAJO CHANGE')
    setExpedienteInput(e.target.value);
    return
  };

  // HACE LA CONSULTA A LA API

  const handleSubmit = (e) => {
    //alert('HANDLE SUBMIT')
    e.preventDefault();
    traerHabilitaciones();
    return
  };

  const handleLegajoSubmit = (e) => {
    //alert('HANDLE LEGAJO SUBMIT')
    e.preventDefault();
    actualizarLegajo(HabilitacionSetLegajo);
    traerHabilitaciones();
    setEH(undefined);
    return
  };

  const handleExpedienteSubmit = (e) => {
    //alert('HANDLE LEGAJO SUBMIT')
    e.preventDefault();
    actualizarExpediente(HabilitacionSetExpediente);
    traerHabilitaciones();
    setEX(undefined);
    return
  };


    //SI NO SE ESTA MODIFINCANDO UN LEGAJO


    if (HabilitacionSetLegajo === undefined){

      //NI SE ESTA MODIFICANDO UN NUMERO DE EXPEDIENTE

      if(HabilitacionSetExpediente === undefined){


        //Y SE PIDIO UNA HABILITACION EN ESPECIAL

        if(habilitacionesArray.length===1){
          return(
            <>
            <TablaHabilitaciones
              habilitacion={habilitacionesArray}
            ></TablaHabilitaciones>
            </>
          );
        }else{
    
          //SI NO SE PIDIO UNA EN ESPECIAL, SE TRAEN TODAS LAS HABILITACIONES Y EL INPUT PARA FILTRAR POR LEGAJO
    
          return (
            <>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <br></br>
                  <h3>Búsqueda por legajo:</h3>
                  <small id="emailHelp" className="form-text text-muted">
                    Ingrese numero de legajo.
                  </small>
                  <input
                    type="number"
                    value={inputValue}
                    onChange={handleChange}
                    className="form-control"
                  ></input>
                </div>
                <br></br>
  
              </form>
  
              <h2>Todas las habilitaciones</h2>
                <TablaHabilitaciones
                    habilitacion={habilitacionesArray}
                ></TablaHabilitaciones>
  
            </>
          );
        }


      }else{

        let expediente_actual = ''
        if (HabilitacionSetExpediente.num_expediente === ''){
          expediente_actual = 'inexistente'
        }else{
          expediente_actual = HabilitacionSetExpediente.num_expediente;
        }
  
        return(
          <>
            <br></br>
            <h2>Asignar número de expediente a la habilitacion ID: {HabilitacionSetExpediente.idHabilitacion}, cuyo numero de expediente actual es {expediente_actual}</h2>
            <form onSubmit={handleExpedienteSubmit}>
            <input  
                type="hidden" 
                value={HabilitacionSetExpediente.idHabilitacion}>
            </input>
            <input  
                type="number" 
                value={expedienteInput} 
                className="form-control" 
                onChange={handleExpedienteNumberChange}>
            </input>
            </form>
          </>
        )
      }

      //SI SE CONSULTO UNA HABILITACION ESPECIFICA


    //SI SE ESTA EDITANDO UN NUMERO DE LEGAJO

    }else{
      let legajo_actual = ''
      if (HabilitacionSetLegajo.NroLegajo === ''){
        legajo_actual = 'inexistente'
      }else{
        legajo_actual = HabilitacionSetLegajo.NroLegajo;
      }

      return(
        <>
          <br></br>
          <h2>Asignar número de legajo a la habilitacion ID: {HabilitacionSetLegajo.idHabilitacion}, cuyo numero de legajo actual es {legajo_actual}</h2>
          <form onSubmit={handleLegajoSubmit}>
          <input  
              type="hidden" 
              value={HabilitacionSetLegajo.idHabilitacion}>
          </input>
          <input  
              type="number" 
              value={legajoInput} 
              className="form-control" 
              onChange={handleLegajoNumberChange}>
          </input>
          </form>
        </>
      )
    }
};

const MiFormulario = () => {
  // Define el estado para el input
  const [inputValue, setInputValue] = useState("");

  // Maneja los cambios en el input
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene la acción predeterminada del formulario
    console.log("Valor del input:", inputValue); // Aquí puedes hacer lo que necesites con el valor del input
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text" value={inputValue} onChange={handleChange} />
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default VistaHabilitaciones;
