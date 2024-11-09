import Swal from 'sweetalert2';

export const alerta = (props)=>{
    if (props.error) {
        Swal.fire({
            title: props.titulo,
            text: props.message,
            icon: props.icon,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar',
        });
    }
}