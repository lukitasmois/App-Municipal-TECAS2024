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
}

module.exports = emailTemplates