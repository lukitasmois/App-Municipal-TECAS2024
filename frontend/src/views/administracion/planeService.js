import axios from "axios";

axios.defaults.withCredentials = true;

export const changeStatePlane = async (business, newState) =>{
    const validStates = [true, false]

    if (!validStates.includes(newState)) {
        throw new Error("El estado proporcionado no es válido.");
      }

      const {_id} = business

      try {
        const response = await axios.put(`http://localhost:3000/api/negocios/editarEstado/${_id}`, {
            newState: newState
        })
        console.log(response.data);
        
      } catch (error) {
        console.log(error.message);
        
      }
} 