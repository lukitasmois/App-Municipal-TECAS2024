function Contenedor({ children }) {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "1rem",
        marginBottom: "1rem",
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      {children}
    </div>
  );
}

export default Contenedor;
