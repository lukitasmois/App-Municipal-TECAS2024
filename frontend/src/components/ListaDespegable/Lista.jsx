import { useState } from "react";
import { MdExpandMore } from "react-icons/md";

function ListaDespegable(Props) {
  const [ItemActual, setItemActual] = useState(null);

  const MostrarDescripcion = (index) => {
    setItemActual(ItemActual === index ? null : index);
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="accordion">
          {Props.Items.map((Item, index) => (
            <div key={index} className="accordion-item">
              <h2 className="accordion-header" id={`heading-${index}`}>
                <button
                  className={`accordion-button ${ItemActual === index ? "" : "collapsed"}`}
                  type="button"
                  onClick={() => MostrarDescripcion(index)}
                  aria-expanded={ItemActual === index}
                  aria-controls={`collapse-${index}`}
                >
                  {Item.titulo}
                  
                </button>
              </h2>
              <div
                id={`collapse-${index}`}
                className={`accordion-collapse collapse ${ItemActual === index ? "show" : ""}`}
                aria-labelledby={`heading-${index}`}
              >
                <div className="accordion-body custom-bg-light">{Item.descripcion}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .custom-bg-light {
          background-color: #e9ecef; /* Fondo blanco menos saturado */
          color: #333; /* Color de texto oscuro para contraste */
        }
      `}</style>
    </>
  );
}

export default ListaDespegable;
