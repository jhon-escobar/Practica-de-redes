console.log('Ejecutando pruebas de TaskNote...');
const fs = require('fs');
if (!fs.existsSync('./index.html')) {
 console.error('FALLO: index.html no encontrado');
 process.exit(1);
}
console.log('Todas las pruebas pasaron');

console.log('Ejecutando pruebas...');
process.exit(1); // Fuerza el fallo
