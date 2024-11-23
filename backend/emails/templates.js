const emailTemplates = {
    emailTest: (params) => `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 8px;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
        <h1 style="color: #009B77;">Email de Prueba</h1>
        <p style="color: #555;">Hola <strong>${params.name}</strong>,</p>
        <p style="color: #555;">Esto es un email de prueba.</p>
        <div style="background-color: #e9ecef; padding: 10px; border-radius: 4px; margin-top: 20px;">
          <strong style="color: #009B77;">Estado de del email:</strong> Ok!
        </div>
        <p style="color: #555;"><small>No respondas este email. Para más información, comunícate con habilitaciones.</small></p>
      </div>
    </div>
  `,
  expiredAuthorizationToEmployee : (params) => `
  <html>
    <body>
      <h1>Notificación de Habilitación Vencida</h1>
      <p>Estimado/a,</p>
      <p>Le informamos que la habilitación con los siguientes detalles ha vencido:</p>
      <ul>
        <li><strong>Número de Legajo:</strong> ${params.fileNumber}</li>
        <li><strong>ID de Habilitación:</strong> ${params.idAutorization}</li>
        <li><strong>Fecha de Vencimiento:</strong> ${params.expiredDate}</li>
      </ul>
      <h2>Dirección del Local Habilitado:</h2>
      <ul>
        <li><strong>Ciudad:</strong> ${params.city}</li>
        <li><strong>Calle:</strong> ${params.street}</li>
        <li><strong>Número:</strong> ${params.number}</li>
      </ul>
      <h2>Datos del Dueño del Local:</h2>
      <ul>
        <li><strong>Nombre:</strong> ${params.name}</li>
        <li><strong>Apellido:</strong> ${params.lastName}</li>
        <li><strong>Email:</strong> ${params.email}</li>
        <li><strong>Número de Teléfono:</strong> ${params.phone}</li>
        <li><strong>CUIT:</strong> ${params.cuit}</li>
      </ul>
      <p>No responda a este correo.</p>
    </body>
  </html>
`
}

module.exports = emailTemplates