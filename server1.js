var express = require('express');
var bodyParser = require('body-parser');
var NodeHL7Complete = require('node-hl7-complete'); // Asegúrate de tener la librería correctamente importada

var nodeHL7 = new NodeHL7Complete();
var app = express();

// Incorrecto causa conflicto con java > app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text({ type: 'application/hl7-v2' }));

app.post('/receive-hl7', (req, res) => {
  var hl7Message = req.body;
  console.log('Mensaje HL7 recibido:');
  console.log(hl7Message);

    var hl7Parser = new NodeHL7Complete();
  hl7Parser.hl7ToJs(hl7Message,(error, jsObject) => {
    if (error) {
      console.error('Error al procesar el mensaje HL7:', error);
    } else {
      console.log('Mensaje HL7 procesado:', jsObject);
      // Aquí puedes continuar con la lógica para generar el ACK
      // Agregar este console.log para ver el objeto JSON devuelto
    console.log('Objeto JSON devuelto:', JSON.stringify(jsObject, null, 2));
      
       // Construir el ACK
       
   var ack = {
    MSH: {
      SendingApplication: jsObject.ADT_A01.MSH[0]['MSH.7'][0], // Usar el campo SendingApplication del objeto jsObject
      SendingFacility: jsObject.ADT_A01.MSH[0]['MSH.9'][0], // Usar el campo SendingFacility del objeto jsObject
      ReceivingApplication: jsObject.ADT_A01.MSH[0]['MSH.10'][0], // Usar el campo ReceivingApplication del objeto jsObject
      ReceivingFacility: jsObject.ADT_A01.MSH[0]['MSH.11'][0], // Usar el campo ReceivingFacility del objeto jsObject
      DateTime: new Date().toISOString(),
      MessageControlID: jsObject.ADT_A01.MSH[0]['MSH.12'][0], // Usar el campo MessageControlID del objeto jsObject
      MessageType: {
        MessageType: 'ACK',
        TriggerEvent: 'ACK',
        MessageStructure: 'ACK',
      },
      ProcessingID: jsObject.ADT_A01.MSH[0]['MSH.11'][0], // Usar el campo ProcessingID del objeto jsObject
      VersionID: jsObject.ADT_A01.MSH[0]['MSH.12'][0], // Usar el campo VersionID del objeto jsObject
    },
    MSA: {
      AcknowledgmentCode: 'AA', // Puedes ajustar el código de ACK según sea necesario
      MessageControlID: jsObject.ADT_A01.MSH[0]['MSH.10'][0], // Usar el campo MessageControlID del objeto jsObject
    },
  };

      // Convertir el objeto ACK a formato HL7
      hl7Parser.jsToHl7('ACK', ack,(ackError, hl7Ack) => {
        if (ackError) {
          console.error('Error al construir el ACK:', ackError);
          res.status(500).send('Error al construir el ACK');
        } else {
          console.log('ACK construido:', hl7Ack);
      // Aquí puedes enviar el ACK de vuelta al emisor del mensaje HL7
      // Enviar el ACK al sistema emisor del mensaje HL7
       request.post({
       url: 'http://localhost:3000/receive-hl7', // Reemplazar con la URL correcta del sistema emisor
       body: hl7Ack,
       headers: {
      'Content-Type': 'application/hl7-v2', // Asegúrate de establecer el tipo de contenido correcto
         },
            }, (sendError, _response, _body) => {
       if (sendError) {

       console.error('Error al enviar el ACK:', sendError);
       res.status(500).send('Error al enviar el ACK al sistema emisor');
           } else {
       console.log('ACK enviado al sistema emisor con éxito');
       res.send('ACK enviado al sistema emisor con éxito');
           }
        });
      }
    });
   }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
