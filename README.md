# tallerAlertasJs
SweetAlert2 es una popular biblioteca de JavaScript utilizada para reemplazar las ventanas emergentes (ventanas modales) estándar del navegador por versiones modernas, altamente personalizables y accesibles


# 🚀 Workshop: SwiftyAlert & Modern UI Development

Este repositorio es una guía práctica para dominar la creación de alertas modernas en iOS con **SwiftyAlert**, comparando conceptos con el desarrollo web (**Bootstrap, PWA y JS**).

---

## 📖 Conceptos Clave (Explicados Fácil)

### 1. ¿Qué es SwiftyAlert?
Es como una **"plantilla inteligente"** para los mensajes que aparecen en el iPhone.
* **Antes:** Escribir una alerta nativa era como redactar un contrato legal de 3 páginas.
* **Con SwiftyAlert:** Es como enviar un mensaje de WhatsApp; rápido, directo y limpio.
* **Ejemplo:** `SwiftyAlert().title("¡Logrado!").show()`

### 2. Patrón Builder (Encadenamiento de Métodos)
Imagina que estás pidiendo una **Pizza**. No dices todo de golpe, vas añadiendo ingredientes uno por uno:
> `Pizza().masaDelgada().conExtraQueso().conPepperoni().hornear()`

En el código, usamos puntos `.` para ir armando la alerta paso a paso hasta que esté lista para mostrarse.

### 3. Async/Await en Alertas ⏳
Es la forma en que el código "espera" al usuario sin trabarse.
* **Modo Antiguo (Lío de llaves):** Pides algo y dejas una nota diciendo "avísame cuando termines". El código se vuelve difícil de leer.
* **Modo Moderno (Async/Await):** El código se "pausa" mágicamente en una línea hasta que el usuario toca un botón, y luego sigue su camino. Es como esperar el turno en el médico con un vibrador en la mano; puedes relajarte hasta que te toque.

### 4. Enums para Resultados
Es como un **interruptor con opciones fijas**. En lugar de escribir texto a mano (donde te puedes equivocar), eliges de una lista cerrada: `.aceptar`, `.cancelar`, `.reintentar`. ¡Imposible cometer errores de ortografía!

---

## 🛠️ Tecnologías Web Complementarias

| Tecnología | Definición Fácil | Analogía |
| :--- | :--- | :--- |
| **PWA** | Webs que parecen Apps. | Un lobo con piel de cordero (Web con cara de App). |
| **Bootstrap** | Botones y menús ya diseñados. | Comprar muebles en IKEA (solo los armas). |
| **Media Queries** | Reglas para cambiar el diseño según el tamaño. | Ropa elástica que se ajusta si engordas o adelgazas. |

---

## 🧪 Laboratorios Prácticos

### 🍎 Ejercicio 1: El Almacén de Cadenas (30 min)
**Objetivo:** Aprender a "armar" objetos (Method Chaining).
* **Reto:** Crear una alerta que muestre los pasos para hacer pan.
* **Análisis:** ¿Importa si pongo primero el título o el mensaje? (Spoiler: No, gracias al patrón Builder).

### 🍓 Ejercicio 2: La Frutería Asíncrona (30 min)
**Objetivo:** Usar `await` para recibir una respuesta.
* **Reto:** Crear un menú de frutas y guardar la elección del usuario en una variable de forma lineal.
* **Comparación:** Ver cómo el código se ve mucho más limpio que el estilo antiguo.

### 🔑 Ejercicio 3: El Inicio de Sesión Reactivo (40 min)
**Objetivo:** Validar datos mientras el usuario escribe.
* **Reto:** Hacer un login donde el botón "Entrar" solo se ilumine si el usuario escribió un email válido.
* **Concepto:** Usar `textChanged` para reaccionar a cada tecla pulsada.

### 📊 Ejercicio 4: El Encuestador de Datos (30 min)
**Objetivo:** Pedir mucha información a la vez.
* **Reto:** Crear una encuesta (Nombre, Edad, Ciudad) y convertir todo en un "paquete" de datos (Diccionario).

### 📱 Ejercicio 5: El Artefacto Universal (30 min)
**Objetivo:** Que se vea bien en iPad y iPhone.
* **Reto:** Hacer que el menú de opciones flote en el iPad (Popover) en lugar de salir desde abajo.

---

## 🏁 Conclusiones
1. **Menos es más:** Menos líneas de código significan menos errores.
2. **Seguridad:** Usar Enums nos salva de errores tontos de escritura.
3. **Fluidez:** `Async/Await` hace que leer código sea como leer un libro, no un laberinto.

---

## 🏆 Reto Final (Opcional)
**¡Crea algo nuevo!** Intenta añadir un **Slider** (una barrita de volumen) dentro de una alerta de SwiftyAlert para que el usuario elija un número del 1 al 100.