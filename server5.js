const express = require('express');
const NodeHL7Complete = require('./index'); // Ruta al archivo NodeHL7Complete
const app = express();
const nodeHL7 = new NodeHL7Complete();

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
        var ackMessage = generateAckMessage(jsObject);
        console.log('ACK generado:');
        console.log(ackMessage);
        // Convertir el ACK a mensaje HL7
        nodeHL7.jsToHl7('ACK', ackMessage, (ackError, ackHl7String) => {
          if (ackError) {
            console.error('Error al generar ACK:', ackError);
            res.status(500).send(ackError);
          } else {
            console.log('ACK convertido a mensaje HL7:');
            console.log(ackHl7String);
            // Enviar el ACK como respuesta al mensaje recibido
            res.send(ackHl7String);
          }
        });
      }
    });
  });
});

// Función para generar un ACK basado en el mensaje recibido
function generateAckMessage(_receivedMessage) {
    // Generar un ACK válido en formato HL7
    var ackMessage = {
    /*  MSH: {
        'MSH.1': '|',
        'MSH.2': '^~\\&',
        'MSH.9': {
          'CM_MSG.1': 'ACK',
          'CM_MSG.2': 'A01'
        },
        'MSH.10': '123456789', // Número de control del mensaje
        // Agregar otros campos MSH según sea necesario
      }*/
    };
  
    return ackMessage;
  }
// Configurar puerto de escucha
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});