# ℹ️ Item List Vanilla JS

Una lista de tareas simple, escrita en **JavaScript**, optimizada con una arquitectura **modular basada en clases**, ideal para proyectos escalables y mantenibles.

---

## 🚀 Características

- Arquitectura basada en clases (`class`)
- Total separación de lógica y DOM
- Eventos gestionados con `addEventListener` y `removeEventListener`
- Función `destroy()` para limpiar recursos
- Animaciones al eliminar ítems
- Historial de cambios (`Undo`)
- Modal añadir tareas

---

## 🧱 Escalabilidad

El uso de una clase (`ItemListApp`) permite:

### ✅ Modularidad

- Toda la lógica está encapsulada: puedes crear varias instancias en distintas partes del DOM o páginas, sin conflictos.

### ✅ Reusabilidad

- La clase puede exportarse como módulo JS (`export class ItemListApp`) y utilizarse en cualquier proyecto.

### ✅ Mantenibilidad

- Cada método tiene una única responsabilidad clara (principio SRP).
- Fácil de extender: puedes añadir persistencia, localStorage, etc., sin reescribir la base.

### ✅ Limpieza de eventos (`removeEventListener`)

- Todos los `eventListeners` se registran y se eliminan correctamente con `destroy()` para evitar **memory leaks** o errores si el DOM desaparece.

---

## 🧨 ¿Cuándo usar `destroy()`?

La función `destroy()` se utiliza para **limpiar completamente la instancia**, eliminando todos los eventos y reseteando el estado. Esto es útil en los siguientes casos:

| Escenario                        | ¿Por qué usar `destroy()`?                              |
| -------------------------------- | ------------------------------------------------------- |
| SPA o framework como Vue/React   | Al cambiar de vista para evitar fugas de memoria        |
| Modo "deshacer todo" o reinicio  | Para resetear la lista por completo                     |
| Desmontar un componente dinámico | Si montaste la app con JavaScript y quieres desmontarla |
| Testing automático               | Para aislar cada test sin mantener estado anterior      |

```js
// Ejemplo:
const app = new ItemListApp(document);
setTimeout(() => {
  app.destroy(); // Limpia eventos, lista, historial y DOM
}, 10000);
```

## 📦 Clase ItemListApp

```js
class ItemListApp {
  constructor(rootElement)
  init()                // Inicializa eventos y vista
  renderList()          // Redibuja la lista
  addItem(label)        // Añade un ítem
  deleteSelectedItems() // Elimina ítems seleccionados
  goToLastState()       // Deshacer
  destroy()             // Elimina eventos y estado
}
```
