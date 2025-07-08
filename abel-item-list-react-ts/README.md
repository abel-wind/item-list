# ℹ️ React + TypeScript Item List App

Lista de items con React + TypeScript y Vite.

---

### ✅ Versión recomendada

- **Node.js**: `>= 20.19.0`
- **npm**: `>= 8`
- **Vite**: `>= 7.0.0`

---

## 🚀 Instalación y ejecución del proyecto

```bash
npm install

npm run dev
```

## ❌ Troubleshooting

### Crypto.hash

Error `crypto.hash is not a function` o errores similares, revisa tu versión de Node.js, ya que Vite 7+ no es compatible con versiones anteriores.

## 🧠 Notas adicionales

- Este proyecto incluye dos archivos de configuración de TypeScript:

#### `tsconfig.app.json`

Este archivo contiene la configuración principal para compilar el código del frontend (React). Se extiende desde `tsconfig.json` y está centrado en el código fuente (`src/`).

#### `tsconfig.node.json`

Este archivo **está reservado para futuras tareas relacionadas con Node.js**, como scripts de automatización, configuración de testing con Vitest o herramientas CLI. Actualmente no se usa directamente en el proyecto, pero se ha dejado por si en el futuro se requiere dividir la configuración de compilación de frontend y backend (Node).
