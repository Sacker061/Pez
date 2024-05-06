// Definir el ID del dispositivo Particle y el token de acceso
var deviceID = "380035000c47343438323536"; 
var token = "08bcf79d8849b0a915f3dc12f0ceaf6a0089e473";
var lastButtonState=false;

// Función para mover el servo a una posición específica
function moveServo(position) {
    // Construir el cuerpo de la solicitud POST para cambiar la posición del servo
    var data = { access_token: token, args: position };

    // Realizar la solicitud POST al dispositivo Particle para cambiar la posición del servo
    fetch('https://api.particle.io/v1/devices/380035000c47343438323536/servoPosition?access_token=08bcf79d8849b0a915f3dc12f0ceaf6a0089e473', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Servo position set:', data.result);
    })
    .catch(error => {
        console.error('Error setting servo position:', error);
    });
}

// Función para enviar el comando al servo cuando se presiona el botón "Alimentar"
function alimentarPatricio() {
    // Llamar a la función para mover el servo a 0 grados cuando se presiona el botón "Alimentar"
    moveServo(0);
}

// Llamar a la función checkButtonState cada segundo
function checkButtonState() {
    // Realizar una solicitud GET al dispositivo Particle para obtener el estado del botón
    fetch('https://api.particle.io/v1/devices/' + deviceID + '/buttonState?access_token=' + token)
    .then(response => response.json())
    .then(data => {
        console.log('Button state:', data.result);
        // Verificar si el estado del botón ha cambiado desde la última verificación
        if (data.result && !lastButtonState) {
            // Si el botón está presionado y no estaba presionado antes, mover el servo a 0 grados
            moveServo(0);
        }
        // Actualizar el estado del botón
        lastButtonState = data.result;
    })
    .catch(error => {
        console.error('Error getting button state:', error);
    });
}

// Verificar el estado del botón cada segundo
setInterval(checkButtonState, 1000);
