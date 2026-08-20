console.log('Ejecutando pruebas de TaskNote...');
const fs = require('fs');
const path = require('path');

if (!fs.existsSync('./index.html')) {
  console.error('FALLO: index.html no encontrado');
  process.exit(1);
}

const html = fs.readFileSync('./index.html', 'utf8');

// Verificar etiquetas de script locales
const scriptRegex = /<script\s+[^>]*src=["']([^"']+)["'][^>]*>/g;
let match;
while ((match = scriptRegex.exec(html)) !== null) {
  const src = match[1];
  if (!src.startsWith('http') && !src.startsWith('//') && !src.startsWith('https')) {
    if (!fs.existsSync(path.join('.', src))) {
      console.error(`FALLO: Script referenciado "${src}" no existe en el disco.`);
      process.exit(1);
    }
  }
}

// Verificar hojas de estilo locales
const linkRegex = /<link\s+[^>]*rel=["']stylesheet["']\s+[^>]*href=["']([^"']+)["'][^>]*>/g;
while ((match = linkRegex.exec(html)) !== null) {
  const href = match[1];
  if (!href.startsWith('http') && !href.startsWith('//') && !href.startsWith('https')) {
    if (!fs.existsSync(path.join('.', href))) {
      console.error(`FALLO: Estilo referenciado "${href}" no existe en el disco.`);
      process.exit(1);
    }
  }
}

console.log('Todas las pruebas pasaron');
