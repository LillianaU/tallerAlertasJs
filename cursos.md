# 📚 Recursos de Aprendizaje: SweetAlert2 & Web Dinámica

Esta sección contiene los materiales esenciales para dominar las alertas en entornos Web, aplicando los conceptos de **Async/Await**, **Bootstrap** y **Diseño Adaptativo** vistos en el taller.

---

## 🎥 Video-Tutoriales Seleccionados

### 1. [SweetAlert2 + Bootstrap + JS (Guía 2026)](https://www.youtube.com/watch?v=e0-dEhpHRhg)
* **Lo que aprenderás:** Integración estética de Bootstrap con la funcionalidad de SweetAlert2.
* **Relación con el Taller:** Ideal para el **Ejercicio 3 (Login)**.

### 2. [Dominando Async/Await en SweetAlert2](https://www.youtube.com/watch?v=NDASIexWyhU)
* **Lo que aprenderás:** Cómo eliminar "callbacks" y usar `await` para pausar el código hasta la respuesta del usuario.
* **Relación con el Taller:** Refuerza la lógica de la **Frutería Asíncrona**.

### 3. [Alertas con Formularios e Inputs](https://www.youtube.com/watch?v=etqIAnVhkKg)
* **Lo que aprenderás:** Captura de datos complejos (nombres, fechas, selectores) dentro de un popup.
* **Relación con el Taller:** Clave para el **Ejercicio 4 (Encuestador)**.

---

## 🌐 Documentación y Páginas de Ejemplo

### 🧪 [SweetAlert2: Recipe Gallery](https://sweetalert2.github.io/recipe-gallery/)
La galería oficial con "recetas" de código listas para copiar:
* **PWA Integración:** Alertas de instalación para Progressive Web Apps.
* **Bootstrap Themes:** Cómo igualar los colores de la alerta con tu tema de Bootstrap.

### 📖 [MDN Web Docs: Promesas y Async](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/async_function)
La base teórica definitiva para entender por qué usamos `async` y `await` en lugar de código bloqueante.

### 🎨 [SweetAlert2 Themes (GitHub)](https://github.com/sweetalert2/themes)
Personaliza tus alertas para que se vean como:
* **Dark Mode** (Estilo iOS).
* **Material Design** (Estilo Android).
* **Bootstrap 5** (Estilo Web estándar).

---

## 🛠️ Laboratorio de Práctica: El Equivalente Web

Para demostrar la similitud con **SwiftyAlert**, prueba este código en la consola de tu navegador:

```javascript
// Ejemplo: La Frutería Web (Lógica idéntica a SwiftyAlert)
async function seleccionarFruta() {
  const { value: fruta } = await Swal.fire({
    title: '🍓 Selección de Frutas',
    input: 'select',
    inputOptions: {
      manzana: 'Manzana Roja',
      banana: 'Banana Canariona',
      uva: 'Uva Dulce'
    },
    inputPlaceholder: '¿Qué fruta prefieres?',
    showCancelButton: true
  });

  if (fruta) {
    Swal.fire(`Has elegido: ${fruta}`);
  }
}