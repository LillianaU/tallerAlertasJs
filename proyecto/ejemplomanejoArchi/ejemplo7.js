// ============================================
// EJEMPLO 7: fs & Buffer - Node.js
// ============================================
// Para ejecutar: node ejemplo7.js
// ============================================

const fs = require('fs');
const path = require('path');

console.log('='.repeat(50));
console.log('EJEMPLO 7: fs & Buffer en Node.js');
console.log('='.repeat(50));

// ============================================
// EJERCICIO 1: Buffer - Crear y Manipular
// ============================================
console.log('\n--- EJERCICIO 1: Buffer Básico ---');
console.log('¿Qué hace? Crea un buffer y convierte texto a bytes\n');

// Crear buffer desde texto
const buffer = Buffer.from('Hola Mundo', 'utf8');
console.log('Buffer.from("Hola Mundo", "utf8"):');
console.log('  - Bytes:', buffer);
console.log('  - ToString:', buffer.toString());
console.log('  - Longitud:', buffer.length, 'bytes');

// Buffer vacío
const bufferVacio = Buffer.alloc(10);
console.log('\nBuffer.alloc(10):');
console.log('  - Bytes:', bufferVacio);
console.log('  - Valor inicial:', bufferVacio[0]);

// ============================================
// EJERCICIO 2: Escribir en Buffer
// ============================================
console.log('\n--- EJERCICIO 2: Escribir en Buffer ---');
console.log('¿Qué hace? Escribe texto en posiciones específicas del buffer\n');

const buf = Buffer.alloc(16);
buf.write('Hello', 0, 'utf8');
buf.write(' World', 5, 'utf8');

console.log('Buffer.alloc(16) con write():');
console.log('  - Escrito "Hello" en posición 0');
console.log('  - Escrito " World" en posición 5');
console.log('  - Resultado:', buf.toString());
console.log('  - Slice [0-5]:', buf.slice(0, 5).toString());

// ============================================
// EJERCICIO 3: fs - Crear y Escribir Archivo
// ============================================
console.log('\n--- EJERCICIO 3: fs - Crear Archivo ---');
console.log('¿Qué hace? Crea un archivo en el sistema de archivos\n');

const nombreArchivo = 'archivo_ejemplo.txt';
const contenido = 'Hola, esto es un archivo creado con fs\nFecha: ' + new Date().toISOString();

try {
    fs.writeFileSync(nombreArchivo, contenido);
    console.log(`Archivo "${nombreArchivo}" creado exitosamente`);
    
    const stats = fs.statSync(nombreArchivo);
    console.log(`Tamaño: ${stats.size} bytes`);
    console.log(`Tipo: ${stats.isFile() ? 'Archivo' : 'Directorio'}`);
} catch (err) {
    console.error('Error:', err.message);
}

// ============================================
// EJERCICIO 4: fs - Leer Archivo
// ============================================
console.log('\n--- EJERCICIO 4: fs - Leer Archivo ---');
console.log('¿Qué hace? Lee el contenido de un archivo\n');

try {
    // Leer síncrono
    const contenidoLeido = fs.readFileSync(nombreArchivo, 'utf8');
    console.log('fs.readFileSync():');
    console.log('  - Contenido:', contenidoLeido);
    
    // Leer como buffer
    const bufferLeido = fs.readFileSync(nombreArchivo);
    console.log('  - Como Buffer:', bufferLeido);
    console.log('  - Buffer length:', bufferLeido.length, 'bytes');
} catch (err) {
    console.error('Error:', err.message);
}

// ============================================
// EJERCICIO 5: fs - Streams con Chunks
// ============================================
console.log('\n--- EJERCICIO 5: fs - Streams ---');
console.log('¿Qué hace? Procesa archivos grandes en chunks (trozos)\n');

const archivoGrande = 'datos_ejemplo.txt';
const datosGrandes = 'A'.repeat(10000);
fs.writeFileSync(archivoGrande, datosGrandes);

console.log('Archivo grande creado con', datosGrandes.length, 'caracteres');

let chunksRecibidos = 0;
let datosAcumulados = '';

const streamLectura = fs.createReadStream(archivoGrande, { encoding: 'utf8', highWaterMark: 1000 });

streamLectura.on('data', (chunk) => {
    chunksRecibidos++;
    datosAcumulados += chunk;
});

streamLectura.on('end', () => {
    console.log('fs.createReadStream():');
    console.log('  - Chunks recibidos:', chunksRecibidos);
    console.log('  - Datos acumulados:', datosAcumulados.length, 'caracteres');
    console.log('  - Primeros 50 chars:', datosAcumulados.substring(0, 50) + '...');
});

// ============================================
// EJERCICIO 6: fs - Append (Agregar)
// ============================================
console.log('\n--- EJERCICIO 6: fs - Agregar Contenido ---');
console.log('¿Qué hace? Agrega contenido a un archivo existente\n');

const archivoAppend = 'append_ejemplo.txt';

// Crear archivo inicial
fs.writeFileSync(archivoAppend, 'Línea 1\n');

// Agregar más contenido
fs.appendFileSync(archivoAppend, 'Línea 2\n');
fs.appendFileSync(archivoAppend, 'Línea 3\n');

const contenidoAppend = fs.readFileSync(archivoAppend, 'utf8');
console.log('fs.appendFileSync():');
console.log('  - Contenido después de agregar:');
console.log(contenidoAppend);

// ============================================
// EJERCICIO 7: fs - CRUD Completo
// ============================================
console.log('\n--- EJERCICIO 7: fs - CRUD Completo ---');
console.log('¿Qué hace? Create, Read, Update, Delete con archivos\n');

// Datos de usuarios
let usuarios = [
    { id: 1, nombre: 'Juan Pérez', email: 'juan@email.com' },
    { id: 2, nombre: 'María García', email: 'maria@email.com' },
    { id: 3, nombre: 'Pedro López', email: 'pedro@email.com' }
];

const archivoUsuarios = 'usuarios.json';

// CREATE - Crear archivo
fs.writeFileSync(archivoUsuarios, JSON.stringify(usuarios, null, 2));
console.log('CREATE: Archivo usuarios.json creado');

// READ - Leer archivo
const usuariosLeidos = JSON.parse(fs.readFileSync(archivoUsuarios, 'utf8'));
console.log('READ:', usuariosLeidos.length, 'usuarios leídos');

// UPDATE - Actualizar usuario
usuariosLeidos[0].nombre = 'Juan Pérez Actualizado';
fs.writeFileSync(archivoUsuarios, JSON.stringify(usuariosLeidos, null, 2));
console.log('UPDATE: Primer usuario actualizado');

// DELETE - Eliminar archivo
// fs.unlinkSync(archivoUsuarios);
// console.log('DELETE: Archivo eliminado');

// ============================================
// EJERCICIO 8: fs - Directorios
// ============================================
console.log('\n--- EJERCICIO 8: fs - Gestión de Directorios ---');
console.log('¿Qué hace? Crea, lista y elimina directorios\n');

const dirPrueba = 'directorio_prueba';

// Crear directorio
if (!fs.existsSync(dirPrueba)) {
    fs.mkdirSync(dirPrueba);
    console.log('CREATE DIR: Directorio creado');
}

// Crear archivo dentro del directorio
fs.writeFileSync(path.join(dirPrueba, 'archivo.txt'), 'Contenido');

// Listar directorio
const archivos = fs.readdirSync(dirPrueba);
console.log('READ DIR: Archivos en', dirPrueba + ':', archivos);

// Eliminar directorio (primero el contenido)
// fs.unlinkSync(path.join(dirPrueba, 'archivo.txt'));
// fs.rmdirSync(dirPrueba);
// console.log('DELETE DIR: Directorio eliminado');

// ============================================
// EJERCICIO 9: Buffer - Operaciones con Bytes
// ============================================
console.log('\n--- EJERCICIO 9: Buffer - Bytes ---');
console.log('¿Qué hace? Convierte texto a bytes y hexadecimal\n');

const texto = 'Hola Mundo';
const bufBytes = Buffer.from(texto);

console.log('Buffer.from("Hola Mundo"):');
console.log('  - Bytes:', bufBytes);
console.log('  - Hex:', bufBytes.toString('hex'));
console.log('  - Base64:', bufBytes.toString('base64'));

// Convertir hex a buffer
const hex = '486f6c61204d756e646f';
const bufFromHex = Buffer.from(hex, 'hex');
console.log('\nBuffer.from(hex, "hex"):');
console.log('  - Hex:', hex);
console.log('  - Texto:', bufFromHex.toString());

// ============================================
// EJERCICIO 10: Buffer - Comparación String vs Bytes
// ============================================
console.log('\n--- EJERCICIO 10: String vs Bytes ---');
console.log('¿Qué hace? Compara longitud de strings con bytes\n');

const textoLargo = 'A'.repeat(10000);
const bufLargo = Buffer.from(textoLargo);

console.log('Texto de 10000 "A":');
console.log('  - Longitud string:', textoLargo.length);
console.log('  - Longitud buffer:', bufLargo.length);
console.log('  - Son iguales en ASCII:', textoLargo.length === bufLargo.length);

// ============================================
// RESUMEN
// ============================================
console.log('\n' + '='.repeat(50));
console.log('RESUMEN: Comandos fs y Buffer utilizados');
console.log('='.repeat(50));

console.log(`
BUFFER:
  - Buffer.from(str, encoding)  → Crear desde string
  - Buffer.alloc(size)           → Crear buffer vacío
  - buffer.write(str, offset)    → Escribir en buffer
  - buffer.toString()             → Convertir a string
  - buffer.toString('hex')       → Convertir a hex
  - buffer.slice(start, end)     → Extraer porción

FS (File System):
  - fs.readFileSync(path, enc)   → Leer archivo
  - fs.writeFileSync(path, data) → Escribir archivo
  - fs.appendFileSync(path, data)→ Agregar contenido
  - fs.unlinkSync(path)          → Eliminar archivo
  - fs.existsSync(path)          → Verificar existencia
  - fs.mkdirSync(path)           → Crear directorio
  - fs.readdirSync(path)         → Listar directorio
  - fs.statSync(path)            → Obtener info
  - fs.createReadStream()         → Leer en streams
  - fs.createWriteStream()       → Escribir en streams
`);

console.log('='.repeat(50));
console.log('EJEMPLO COMPLETADO');
console.log('='.repeat(50));
