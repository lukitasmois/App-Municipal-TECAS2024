import React, { useState } from "react";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

function MostrarPDF({ pdfUrl }) {
  return (
    <div>
      <h2>Ver PDF:</h2>
      <Viewer fileUrl={pdfUrl} />
    </div>
  );
}

export default MostrarPDF;
