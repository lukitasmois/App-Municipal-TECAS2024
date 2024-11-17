import { pdfjs, Document, Page } from "react-pdf";
import { useState } from "react";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import Contenedor from "./Contenedor";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function VerPDF({ file }) {
  const [numPages, setNumPages] = useState(null);
  return (
    <div
      className="w-100 overflow-auto"
      style={{
        height: "700px",
        border: "4px solid gray",
        // borderRadius: "5px",
      }}
    >
      <Document
        file={file}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
    </div>
  );
}

export default VerPDF;
