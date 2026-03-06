/**
 * Utilidades de formateo y transformación de datos
 */

// Normalizar nombres a mayúsculas
const normalizarNombre = (nombre) => {
  if (!nombre || typeof nombre !== 'string') return 'SIN NOMBRE';
  return nombre.toUpperCase().trim();
};

// Formatear precio con moneda
const formatearPrecio = (precio) => {
  const num = parseFloat(precio);
  return isNaN(num) ? '$0.00' : `$${num.toFixed(2)}`;
};

// Calcular valor total del inventario
const calcularValorInventario = (productos) => {
  return productos.reduce((total, producto) => {
    const precio = parseFloat(producto.precio) || 0;
    const stock = parseInt(producto.stock) || 0;
    return total + (precio * stock);
  }, 0);
};

// Validar si un producto está activo y tiene stock
const esProductoValido = (producto) => {
  return producto.activo === true && 
         parseInt(producto.stock) > 0 && 
         producto.nombre !== null &&
         parseFloat(producto.precio) > 0;
};

module.exports = {
  normalizarNombre,
  formatearPrecio,
  calcularValorInventario,
  esProductoValido
};