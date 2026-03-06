const fs = require('fs');
const path = require('path');

console.log('='.repeat(60));
console.log('🍳 APP DE RECETAS - MOTOR DE PROCESAMIENTO DE DATOS');
console.log('='.repeat(60));

// ============================================
// 1. LECTURA DE ARCHIVOS (FS)
// ============================================

console.log('\n📁 FASE 1: Lectura de Datos\n');

// Leer archivo CSV
function leerCSV(ruta) {
    const contenido = fs.readFileSync(ruta, 'utf-8');
    const lineas = contenido.trim().split('\n');
    const headers = lineas[0].split(',');
    
    return lineas.slice(1).map(linea => {
        const valores = linea.split(',');
        const obj = {};
        headers.forEach((header, i) => {
            obj[header.trim()] = valores[i]?.trim();
        });
        return obj;
    });
}

// Leer archivo JSON
function leerJSON(ruta) {
    const contenido = fs.readFileSync(ruta, 'utf-8');
    return JSON.parse(contenido);
}

// Procesar CSV a objetos
const csvRuta = path.join(__dirname, 'data', 'recetas.csv');
const recetasCSV = leerCSV(csvRuta);
console.log('✓ CSV leído:', recetasCSV.length, 'registros');

// Procesar JSON a objetos
const jsonRuta = path.join(__dirname, 'data', 'recetas.json');
const data = leerJSON(jsonRuta);
const recetasJSON = data.recetas;
console.log('✓ JSON leído:', recetasJSON.length, 'recetas');

// ============================================
// 2. PARSING Y TRANSFORMACIÓN (Map, Filter)
// ============================================

console.log('\n🔧 FASE 2: Procesamiento con Métodos de Arreglos\n');

// MAP - Normalizar nombres a mayúsculas
const recetasNormalizadas = recetasJSON.map(({ nombre, tiempo, dificultad, categoria, ingredientes, pasos }) => ({
    nombre: nombre.toUpperCase(),
    tiempo: parseInt(tiempo),
    dificultad,
    categoria,
    ingredientes,
    pasos
}));
console.log('✓ MAP: Nombres normalizados a mayúsculas');

// FILTER - Limpiar datos corruptos o vacíos
const recetasFiltradas = recetasNormalizadas.filter(r => 
    r.nombre && r.tiempo > 0 && r.categoria
);
console.log('✓ FILTER: Datos vacíos eliminados');
console.log('  Registros válidos:', recetasFiltradas.length);

// FILTER - Recetas por dificultad
const recetasFaciles = recetasFiltradas.filter(r => r.dificultad === 'Baja');
const recetasMedias = recetasFiltradas.filter(r => r.dificultad === 'Media');
const recetasDificiles = recetasFiltradas.filter(r => r.dificultad === 'Alta');
console.log(`  - Fáciles: ${recetasFaciles.length} | Medias: ${recetasMedias.length} | Difíciles: ${recetasDificiles.length}`);

// SORT - Ordenar alfabéticamente
const recetasOrdenadas = [...recetasFiltradas].sort((a, b) => 
    a.nombre.localeCompare(b.nombre)
);
console.log('✓ SORT: Recetas ordenadas alfabéticamente');

// ============================================
// 3. REDUCE - Estadísticas
// ============================================

console.log('\n📊 FASE 3: Estadísticas con REDUCE\n');

// Total de tiempo de todas las recetas
const tiempoTotal = recetasFiltradas.reduce((acum, r) => acum + r.tiempo, 0);
console.log('✓ REDUCE: Tiempo total de preparación:', tiempoTotal, 'minutos');

// Tiempo promedio
const tiempoPromedio = tiempoTotal / recetasFiltradas.length;
console.log('✓ REDUCE: Tiempo promedio:', Math.round(tiempoPromedio), 'minutos');

// Conteo por categoría
const porCategoria = recetasFiltradas.reduce((acc, r) => {
    acc[r.categoria] = (acc[r.categoria] || 0) + 1;
    return acc;
}, {});
console.log('✓ REDUCE: Recetas por categoría:', porCategoria);

// Conteo por dificultad
const porDificultad = recetasFiltradas.reduce((acc, r) => {
    acc[r.dificultad] = (acc[r.dificultad] || 0) + 1;
    return acc;
}, {});
console.log('✓ REDUCE: Recetas por dificultad:', porDificultad);

// ============================================
// 4. DESTRUCTURING Y SPREAD OPERATOR
// ============================================

console.log('\n📦 FASE 4: Destructuring y Spread Operator\n');

// Destructuring
const [primeraReceta, segundaReceta, ...demasRecetas] = recetasOrdenadas;
console.log('✓ DESTRUCTURING: Primera receta:', primeraReceta.nombre);

// Spread Operator - Inmutabilidad
const recetaModificada = {
    ...primeraReceta,
    tiempo: primeraReceta.tiempo + 10,
    actualizada: true
};
console.log('✓ SPREAD: Nueva receta creada sin modificar la original');
console.log('  Original:', primeraReceta.tiempo, 'min');
console.log('  Nueva:', recetaModificada.tiempo, 'min');

// ============================================
// 5. CONSOLA TABLA
// ============================================

console.log('\n📋 FASE 5: Visualización con console.table\n');

// Tabla de recetas
const tablaRecetas = recetasOrdenadas.map(r => ({
    Nombre: r.nombre.substring(0, 20),
    Tiempo: r.tiempo + ' min',
    Dificultad: r.dificultad,
    Categoría: r.categoria,
    Ingredientes: r.ingredientes.length
}));
console.table(tablaRecetas);

// Tabla de estadísticas
console.table({
    'Total Recetas': recetasFiltradas.length,
    'Tiempo Total': tiempoTotal + ' min',
    'Tiempo Promedio': Math.round(tiempoPromedio) + ' min',
    'Categorías': Object.keys(porCategoria).length,
    'Recetas Fáciles': recetasFaciles.length,
    'Recetas Medias': recetasMedias.length,
    'Recetas Difíciles': recetasDificiles.length
});

// ============================================
// 6. SERIALIZACIÓN BINARIA (simulada con Buffer)
// ============================================

console.log('\n💾 FASE 6: Serialización Binaria\n');

// Simular serialización binaria con Buffer
const datosBinarios = JSON.stringify(recetasOrdenadas);
const buffer = Buffer.from(datosBinarios, 'utf-8');

// Guardar archivo binario simulado
const binarioRuta = path.join(__dirname, 'data', 'recetas.bin');
fs.writeFileSync(binarioRuta, buffer);

console.log('✓ SERIALIZACIÓN BINARIA:');
console.log('  - Original:', datosBinarios.length, 'bytes');
console.log('  - Binario:', buffer.length, 'bytes');
console.log('  - Compresión:', Math.round((1 - buffer.length / datosBinarios.length) * 100) + '%');

// Guardar datos procesados
const salidaRuta = path.join(__dirname, 'data', 'recetas_procesadas.json');
fs.writeFileSync(salidaRuta, JSON.stringify({
    recetas: recetasOrdenadas,
    estadisticas: {
        tiempoTotal,
        tiempoPromedio: Math.round(tiempoPromedio),
        porCategoria,
        porDificultad,
        totalRecetas: recetasFiltradas.length
    }
}, null, 2));

console.log('✓ DATOS GUARDADOS en:', salidaRuta);

// ============================================
// EXPORTAR PARA USO WEB
// ============================================

module.exports = {
    recetas: recetasOrdenadas,
    estadisticas: {
        tiempoTotal,
        tiempoPromedio: Math.round(tiempoPromedio),
        porCategoria,
        porDificultad,
        totalRecetas: recetasFiltradas.length
    }
};

console.log('\n' + '='.repeat(60));
console.log('✅ PROCESAMIENTO COMPLETADO');
console.log('='.repeat(60));