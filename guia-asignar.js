const NodeHL7Complete = require('./index');

// Crear una instancia del módulo
const hl7Converter = new NodeHL7Complete();

// Mensaje HL7 de ejemplo
const hl7Message = 'MSH|^~\\&|Webind|Neonatologa y Discapacidad Infantil|Webind|Neonatologa y Discapacidad Infantil|20240419033727||ADT^A01|123456|P|2.5\r';

// Función para manejar los datos asignados
function handleDatosAsignados(jsObject) {
  let Datos = {
    nombreSisEmisor: jsObject.ADT_A01.MSH[0]['MSH.3'][0]['HD.1'][0],
    nombreSisReceptor: jsObject.ADT_A01.MSH[0]['MSH.5'][0]['HD.1'][0],
    nombreConsultaEmisora: jsObject.ADT_A01.MSH[0]['MSH.4'][0]['HD.1'][0],
    nombreConsultaReceptora: jsObject.ADT_A01.MSH[0]['MSH.6'][0]['HD.1'][0],
    id: jsObject.ADT_A01.MSH[0]['MSH.10'][0]
  };
  // Mostrar los datos asignados
  console.log('Datos asignados:', Datos);
  return Datos;
}

// Convertir mensaje HL7 a objeto JavaScript
hl7Converter.hl7ToJs(hl7Message, (error, jsObject) => {
  if (error) {
    console.error('Error al convertir mensaje HL7 a objeto JavaScript:', error);
  } else {
    console.log('Mensaje HL7 convertido a objeto JavaScript:', jsObject);
    // Agregar este console.log para ver el objeto JSON devuelto
    console.log('Objeto JSON devuelto:', JSON.stringify(jsObject, null, 2));
    // Obtener los datos asignados utilizando una promesa
    const datosPromesa = new Promise((resolve) => {
      resolve(handleDatosAsignados(jsObject));
    });
    datosPromesa.then((datos) => {
      console.log('Datos retornados:', datos);
    });
  }
});


module.exports = { handleDatosAsignados };

//Utilizar la función handleDatosAsignados en otros archivos 

//const { handleDatosAsignados } = require('./nombreDelArchivo.js');

// Luego puedes utilizar la función handleDatosAsignados en este archivo
