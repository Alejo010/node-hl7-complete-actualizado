const express = require('express');
const NodeHL7Complete = require('./index'); // Ruta al archivo NodeHL7Complete
const app = express();
const nodeHL7 = new NodeHL7Complete();
const generarAck = require('./ack5'); // Asegúrate de que la ruta sea correcta

// Endpoint para recibir mensajes HL7
app.post('/receive-hl7', (req, res) => {
  let data = '';
  req.on('data', chunk => {
    data += chunk;
  });
  req.on('end', () => {
    console.log('Mensaje HL7 recibido:');
    console.log(data);
    
    // Transformar el mensaje HL7 a JSON
    nodeHL7.hl7ToJs(data, (error, jsObject) => {
      if (error) {
        console.error('Error al convertir mensaje HL7 a objeto JavaScript:', error);
        res.status(500).send(error);
      } else {
        console.log('Mensaje HL7 convertido a objeto JavaScript:');
        console.log(jsObject);
        // Agregar este console.log para ver el objeto JSON devuelto
      //console.log('Objeto JSON devuelto:', JSON.stringify(jsObject, null, 2));
      
        // Generar un ACK basado en el mensaje recibido
        generarAck(data)
          .then(ackMessage => {
            console.log('ACK generado:');
            console.log(ackMessage.split('\r').join('\n'));
            
            // Send the ACK back to the sender
            res.set('Content-Type', 'application/hl7-v2');
            res.send(ackMessage);
          })
          .catch(error => {
            console.error('Error al generar el ACK:', error);
            res.status(500).send('Error generating ACK');
          });
        };
    });
    
  })
});

// Configurar puerto de escucha
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
