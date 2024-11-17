import { useState } from "react";

export function Actions(props){
    
    const { actions, dato } = props;
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsOpen((prev) => !prev);
    };
  
    const closeDropdown = () => {
      setIsOpen(false);
    };

    return(
        <div>
            <button
            onClick={toggleDropdown}
            >
            Acciones
            </button>

            {isOpen && (
                <div>
                <ul>
                    {actions.map((accion, index) => (
                    <li key={index}>
                        <a
                        href="#"
                        onClick={() => {
                            accion.funcion(dato);
                            closeDropdown();
                        }}
                        >
                        {accion.name}
                        </a>
                    </li>
                    ))}
                </ul>
                </div>
            )}
        </div>
    )
}