const nodemailer = require('nodemailer');

module.exports = (contact: {
  name: string;
  phone: string;
  email: string;
  message: string;
}) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fireshopsoftware',
      pass: 'thousands1000@' // Cambialo por tu password
    }
  });
  const mailOptions = {
    from: `"Web de Guillermotti" <contact@guillermotti.com>`,
    to: 'contact@guillermotti.com', // Cambia esta parte por el destinatario
    subject:
      'Nombre: ' +
      contact.name +
      '. Email: ' +
      contact.email +
      '. Teléfono: ' +
      contact.phone,
    // bcc: contact.bcc,
    html: contact.message
  };
  transporter.sendMail(mailOptions, function(err: any, info: any) {
    if (err) console.log(err);
    else console.log(info);
  });
};
