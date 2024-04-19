//Puede eliminar estos ejemplos de uso ser necesario

const NodeHL7Complete = require('./index');
const hl7Converter = new NodeHL7Complete();

function formatHL7DateLocal(date) {
  return date.getFullYear() +
         ('0' + (date.getMonth() + 1)).slice(-2) +
         ('0' + date.getDate()).slice(-2) +
         ('0' + date.getHours()).slice(-2) +
         ('0' + date.getMinutes()).slice(-2) +
         ('0' + date.getSeconds()).slice(-2);
}

var Datos = {
  nombreSisEmisor: 'Webind',
  nombreSisReceptor: 'Webind',
  nombreConsultaEmisora: 'Neonatología y Discapacidad Infantil',
  nombreConsultaReceptora: 'Neonatología y Discapacidad Infantil',
  id: '123456',
};



// Objeto JSON de ejemplo con la estructura de un mensaje HL7
function Asignar(Datos) {
const jsData = {
  ADT_A01: {
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
        'MSG.1': 'ADT',
        'MSG.2': 'A01'
      },
      'MSH.10': Datos.id,
      'MSH.11': {
        'PT.1': 'P'
      },
      'MSH.12':{ 
        'VID.1': '2.5',
        }
      }
   }
  
  };
  return jsData;   
}
var jsData = Asignar(Datos);

// Convertir objeto JavaScript a mensaje HL7
hl7Converter.jsToHl7('ADT_A01', jsData, (error, hl7Message) => {
  if (error) {
    console.error('Error al convertir objeto JavaScript a mensaje HL7:', error);
  } else {
    console.log('Objeto JavaScript convertido a mensaje HL7:');
    console.log(hl7Message.split('\r').join('\n'));
  }
});
