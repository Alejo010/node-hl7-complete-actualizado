//Puede eliminar estos ejemplos de uso ser necesario

const NodeHL7Complete = require('./index');
const hl7Converter = new NodeHL7Complete();

// Objeto JSON de ejemplo con la estructura de un mensaje HL7
const jsData = {
  ADT_A01: {
    MSH: {
      'MSH.1': '|',
      'MSH.2': '^~\\&',
      'MSH.3': {
        'HD.1': 'SENDING_APP'
      },
      'MSH.4': {
        'HD.1': 'SENDING_FACILITY'
      },
      'MSH.5': {
        'HD.1': 'RECEIVING_APP'
      },
      'MSH.6': {
        'HD.1': 'RECEIVING_FACILITY'
      },
      'MSH.7': {
        'TS.1': '20210622120000'
      },
      'MSH.9': {
        'CM_MSG.1': 'ADT',
        'CM_MSG.2': 'A01'
      },
      'MSH.10': '123456789',
      'MSH.11': {
        'PT.1': 'P'
      },
      'MSH.12': '2.3'
    }
  }
};

// Convertir objeto JavaScript a mensaje HL7
hl7Converter.jsToHl7('ADT_A01', jsData, (error, hl7Message) => {
  if (error) {
    console.error('Error al convertir objeto JavaScript a mensaje HL7:', error);
  } else {
    console.log('Objeto JavaScript convertido a mensaje HL7:');
    console.log(hl7Message.split('\r').join('\n'));
  }
});