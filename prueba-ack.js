const generarAck = require('./ack5');

let mensajeHL7Recibido = '';
mensajeHL7Recibido += 'MSH|^~\\&|Webind|Neonatologia|WEBIND2|Oftalmologia|202310011230||ADT^A01|123456|P|2.3\r';
mensajeHL7Recibido += 'PID|||221345671^^^^SS||KENNEDY^JOHN^FITZGERALD^JR|BOUVIER^^^^^^M|19900607|M|||^^^^MA^^^BLD\r';


generarAck(mensajeHL7Recibido)
    .then((ackMessage) => {
        console.log('ACK generado:');
        console.log(ackMessage.split('\r').join('\n'));
    })
    .catch((error) => {
        console.error('Error al generar el ACK:', error);
    });
