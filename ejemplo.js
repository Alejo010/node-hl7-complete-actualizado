//Puede eliminar estos ejemplos de uso ser necesario

const NodeHL7Complete = require('./index');


// Crear una instancia del módulo
const hl7Converter = new NodeHL7Complete();

// Mensaje HL7 de ejemplo
//const hl7Message = 'MSH|^~\\&|SENDING_APP|SENDING_FACILITY|RECEIVING_APP|RECEIVING_FACILITY|20210622120000||ADT^A01|123456789|P|2.3|||';
let hl7Message = '';
hl7Message += 'MSH|^~\\&|||||||VXU^V04|19970522MA53|P|2.3.1|||AL\r';
hl7Message += 'PID|||221345671^^^^SS||KENNEDY^JOHN^FITZGERALD^JR|BOUVIER^^^^^^M|19900607|M|||^^^^MA^^^BLD\r';
hl7Message += 'NK1|1|KENNEDY^JACQUELINE^LEE|32^MOTHER^HL70063\r';
hl7Message += 'RXA|0|1|19900607|19900607|08^HEPB-PEDIATRIC/ADOLESCENT^CVX|.5|ML^^ISO+||||||||MRK12345||MSD^MERCK^MVX\r';

// Convertir mensaje HL7 a objeto JavaScript
hl7Converter.hl7ToJs(hl7Message, (error, jsObject) => {
  if (error) {
    console.error('Error al convertir mensaje HL7 a objeto JavaScript:', error);
  } else {
    console.log('Mensaje HL7 convertido a objeto JavaScript:', jsObject);

    // Agregar este console.log para ver el objeto JSON devuelto
    console.log('Objeto JSON devuelto:', JSON.stringify(jsObject, null, 2));
  }
});