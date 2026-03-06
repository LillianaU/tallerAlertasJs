const fs = require('fs');
const path = require('path');
const msgpack = require('msgpack5')();

// Importar parsers
const { CSVParser, YAMLParser } = require('./src/parsers');
const { 
  normalizarNombre, 
  formatearPrecio, 
  calcularValorInventario,
  esProductoValido 
} = require('./src/utils/formatters');

console.log('🏭 INICIANDO MOTOR DE DATOS - FASE DE CONSOLA\n');

// ==========================================
// 1. LECTURA DE ORIGEN (CSV y YAML)
// ==========================================

console.log('📖 Paso 1: Lectura de archivos de origen...');

// Leer CSV de productos
const csvParser = new CSVParser(path.join(__dirname, 'data', 'productos.csv'));
const productosRaw = csvParser.parseSync();
console.log(`✅ CSV cargado: ${productosRaw.length} registros encontrados`);

// Leer YAML de configuración
const yamlParser = new YAMLParser(path.join(__dirname, 'data', 'config.yaml'));
const config = yamlParser.parse();
console.log(`✅ YAML cargado: Configuración "${config.app.nombre}"`);

// ==========================================
// 2. PARSING Y LÓGICA AVANZADA (Iteradores)
// ==========================================

console.log('\n🔧 Paso 2: Procesamiento de datos...');

// FILTER: Limpiar datos corruptos o vacíos
const productosLimpios = productosRaw.filter(producto => {
  const esValido = esProductoValido(producto);
  if (!esValido) {
    console.log(`   ⚠️  Filtrado: ${producto.nombre || 'ID:' + producto.id} (datos incompletos)`);
  }
  return esValido;
});

console.log(`📊 Después de filter(): ${productosLimpios.length} registros válidos`);

// MAP: Normalizar datos (nombres a mayúsculas + aplicar descuento del 10%)
const descuento = config.descuentos.por_defecto / 100;
const productosNormalizados = productosLimpios.map(producto => {
  const precioOriginal = parseFloat(producto.precio);
  const precioConDescuento = precioOriginal * (1 - descuento);
  
  return {
    ...producto, // Spread operator preserva datos originales
    nombre: normalizarNombre(producto.nombre),
    precio_original: precioOriginal,
    precio_final: parseFloat(precioConDescuento.toFixed(2)),
    descuento_aplicado: `${config.descuentos.por_defecto}%`,
    categoria_formateada: `[${producto.categoria.toUpperCase()}]`
  };
});

console.log(`🔄 Después de map(): Datos normalizados con descuento del ${config.descuentos.por_defecto}%`);

// SORT: Ordenar alfabéticamente por nombre
const productosOrdenados = [...productosNormalizados].sort((a, b) => {
  return a.nombre.localeCompare(b.nombre);
});

console.log(`📋 Después de sort(): Ordenados alfabéticamente`);

// ==========================================
// 3. ANÁLISIS CON REDUCE (Estadísticas)
// ==========================================

console.log('\n📈 Paso 3: Generando estadísticas...');

const estadisticas = productosOrdenados.reduce((acc, producto) => {
  // Contar por categoría
  acc.porCategoria[producto.categoria] = (acc.porCategoria[producto.categoria] || 0) + 1;
  
  // Sumar valores
  acc.totalStock += parseInt(producto.stock);
  acc.valorInventario += (producto.precio_final * parseInt(producto.stock));
  
  // Producto más caro
  if (producto.precio_final > acc.productoMasCaro.precio) {
    acc.productoMasCaro = { nombre: producto.nombre, precio: producto.precio_final };
  }
  
  return acc;
}, {
  porCategoria: {},
  totalStock: 0,
  valorInventario: 0,
  productoMasCaro: { nombre: '', precio: 0 }
});

// ==========================================
// 4. SERIALIZACIÓN BINARIA (MessagePack)
// ==========================================

console.log('\n💾 Paso 4: Serialización binaria...');

// Preparar datos para exportación
const datosFinales = {
  metadata: {
    fecha_procesamiento: new Date().toISOString(),
    version: config.app.version,
    total_registros: productosOrdenados.length
  },
  configuracion: config,
  productos: productosOrdenados,
  estadisticas
};

// Serializar a MessagePack (formato binario optimizado)
const bufferBinario = msgpack.encode(datosFinales);
const rutaBackup = path.join(__dirname, 'data', 'backup.msgpack');

fs.writeFileSync(rutaBackup, bufferBinario);

console.log(`✅ Backup binario creado: ${rutaBackup}`);
console.log(`📦 Tamaño JSON: ${JSON.stringify(datosFinales).length} bytes`);
console.log(`📦 Tamaño MessagePack: ${bufferBinario.length} bytes`);
console.log(`💡 Optimización: ${((1 - bufferBinario.length / JSON.stringify(datosFinales).length) * 100).toFixed(1)}% más compacto`);

// ==========================================
// 5. VISUALIZACIÓN EN CONSOLA
// ==========================================

console.log('\n📊 Paso 5: Visualización de resultados...\n');

console.log('═'.repeat(80));
console.log('TABLA DE PRODUCTOS PROCESADOS');
console.log('═'.repeat(80));

// Mostrar tabla resumida
const tablaResumen = productosOrdenados.map(({ id, nombre, categoria, precio_final, stock }) => ({
  ID: id,
  Nombre: nombre.substring(0, 25),
  Categoría: categoria,
  'Precio Final': `$${precio_final}`,
  Stock: stock
}));

console.table(tablaResumen);

console.log('\n📉 ESTADÍSTICAS DEL INVENTARIO:');
console.table({
  'Total Productos': estadisticas.totalStock,
  'Valor Total Inventario': `$${estadisticas.valorInventario.toFixed(2)}`,
  'Producto Más Caro': `${estadisticas.productoMasCaro.nombre} ($${estadisticas.productoMasCaro.precio})`
});

console.log('\n📊 DISTRIBUCIÓN POR CATEGORÍA:');
console.table(estadisticas.porCategoria);

// Guardar JSON para la interfaz web
const rutaWebData = path.join(__dirname, 'web', 'data.json');
fs.writeFileSync(rutaWebData, JSON.stringify(datosFinales, null, 2));
console.log(`\n💾 Datos exportados para la web: ${rutaWebData}`);

console.log('\n✨ PROCESAMIENTO COMPLETADO ✨');
console.log('Ahora ejecuta: npm run web (o abre web/index.html en tu navegador)');