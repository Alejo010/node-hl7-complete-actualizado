const NodeHL7Complete = require('./index');
const hl7Converter = new NodeHL7Complete();

//Funcion para formato de fecha y hora para la cadena hl7v2
function formatHL7DateLocal(date) {
    return date.getFullYear() +
           ('0' + (date.getMonth() + 1)).slice(-2) +
           ('0' + date.getDate()).slice(-2) +
           ('0' + date.getHours()).slice(-2) +
           ('0' + date.getMinutes()).slice(-2) +
           ('0' + date.getSeconds()).slice(-2);
  }

  
// Utilizar la función para asignar la información del ACK y MSH respectivamente
// Objeto JSON de ejemplo con la estructura de un mensaje ACK HL7
  var Datos = {
    nombreSisEmisor: 'Webind',
    nombreSisReceptor: 'Webind',
    nombreConsultaEmisora: 'Neonatología y Discapacidad Infantil',
    nombreConsultaReceptora: 'Neonatología y Discapacidad Infantil',
    id: '123456',
};

function Asignar(Datos) {
const jsData = {
  ACK: {
    MSH: {
      'MSH.1': '|',
      'MSH.2': '^~\\&',
      'MSH.3': {
        'HD.1': Datos.nombreSisEmisor   //Nombre del sistema emisor
      },
      'MSH.4': {
        'HD.1': Datos.nombreConsultaEmisora
      },
      'MSH.5': {
        'HD.1': Datos.nombreSisReceptor
      },
      'MSH.6': {
        'HD.1': Datos.nombreConsultaReceptora
      },
      'MSH.7': {
        'TS.1': formatHL7DateLocal(new Date())
      },
      'MSH.9': {
        'MSG.1': 'ACK',
      },
      'MSH.10': Datos.id, // Este debería ser el ID de control de mensaje original (MSH.10 del mensaje recibido)
      'MSH.11': 'P',
      'MSH.12': '2.5',
    },
    MSA: {
      'MSA.1': 'AA', // Indica que el mensaje fue aceptado
      'MSA.2': Datos.id, // Este debería ser el mismo ID de control de mensaje original (MSH.10 del mensaje recibido)
    }
  }
   
};
return jsData;   
}
var jsData = Asignar(Datos);

// Convertir el objeto JavaScript a un mensaje HL7
hl7Converter.jsToHl7('ACK', jsData, (error, hl7Message) => {
  if (error) {
    console.error('Error al convertir objeto JavaScript a mensaje HL7:', error);
  } else {
    console.log('Objeto JavaScript convertido a mensaje HL7:');
    console.log(hl7Message.split('\r').join('\n'));
  }
  
 });

