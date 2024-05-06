// Definir el ID del dispositivo Particle y el token de acceso
var deviceID = "380035000c47343438323536"; 
var token = "08bcf79d8849b0a915f3dc12f0ceaf6a0089e473";

// Función para enviar comandos al servo
function controlarServo(parametro) {
    // Construir el cuerpo de la solicitud POST
    var data = { args: parametro };

    // Realizar la solicitud POST al dispositivo Particle
    fetch('https://api.particle.io/v1/devices/' + deviceID + '/servoM', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + token
        },
        body: 'arg=' + encodeURIComponent(parametro)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Resultado del control del servo:', data.return_value);
    })
    .catch(error => {
        console.error('Error controlando el servo:', error);
    });
}

// Función para enviar el comando al servo cuando se presiona el botón "Alimentar"
function alimentarPatricio() {
    // Llamar a la función para controlar el servo con el parámetro adecuado
    controlarServo("on"); // Encender el servo

    // Esperar 2 segundos y luego apagar el servo
    setTimeout(function() {
        controlarServo("off"); // Apagar el servo
    }, 2000);
}
