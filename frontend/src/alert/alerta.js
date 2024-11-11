import Swal from 'sweetalert2';
//recibe propiedades de titulo del error,mesnaje devuelto por la peticion y el icono a usar
export const alerta = (props)=>{

        Swal.fire({
            title: props.titulo,
            text: props.message,
            icon: props.icon,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar',
        });

}