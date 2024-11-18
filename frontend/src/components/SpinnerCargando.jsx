import { FaSpinner } from "react-icons/fa";

function SpinnerCargando() {
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center mt-5">
        <h1 className="text-center">
          Cargando... <FaSpinner className="animate-spin" />
        </h1>
      </div>
    </div>
  );
}

export default SpinnerCargando;
