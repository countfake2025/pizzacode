# 🍕 PizzaCode Studio

> Sistema de pedidos online para restaurante de pizzas — desarrollado como proyecto académico de Ingeniería de Software

![Tests](https://img.shields.io/badge/tests-17%20passing-brightgreen)
![Node](https://img.shields.io/badge/node-v20-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📌 Descripción

**PizzaCode Studio** es una aplicación web de gestión de pedidos para un restaurante de pizzas. Permite a los clientes explorar el menú, hacer pedidos y rastrearlos en tiempo real, mientras el equipo de cocina gestiona el flujo de trabajo desde un panel dedicado.

Desarrollado con metodología **Ágil (Scrum)** en 3 sprints de 4 semanas.

---

## 🖥️ Demo

Abre `frontend/index.html` en tu navegador. La app funciona en modo mock sin necesidad del backend.

**Cuentas de prueba:**

| Rol | Correo | Contraseña |
|-----|--------|------------|
| 🧑‍💼 Admin | admin@pizzacode.com | admin123 |
| 🧑‍🍳 Chef | chef@pizzacode.com | chef123 |
| 👤 Cliente | cliente@test.com | pass123 |

---

## 🗂️ Estructura del Repositorio

```
pizzacode-studio/
├── .github/
│   └── workflows/
│       └── ci.yml              ← Pipeline de CI (Jest automático)
├── frontend/
│   └── index.html              ← App web completa (HTML/CSS/JS)
├── backend/
│   ├── server.js               ← API REST con Express.js
│   ├── package.json
│   └── __tests__/
│       └── api.test.js         ← 17 pruebas con Jest + Supertest
├── docs/
│   ├── plan-pruebas.md         ← Casos de prueba detallados
│   ├── manual-usuario.md       ← Manual de usuario por rol
│   └── arquitectura.md         ← Diagrama de arquitectura
└── README.md
```

---

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js v18 o superior
- npm v9 o superior

### Clonar el repositorio
```bash
git clone https://github.com/TU_USUARIO/pizzacode-studio.git
cd pizzacode-studio
```

### Instalar dependencias del backend
```bash
cd backend
npm install
```

### Ejecutar el servidor
```bash
npm start
# API disponible en http://localhost:3001
```

### Abrir el frontend
Abre `frontend/index.html` directamente en tu navegador, o usa Live Server en VS Code.

---

## 🧪 Correr Pruebas

```bash
cd backend
npm test
```

**Resultado esperado:**
```
Test Suites: 1 passed, 1 total
Tests:       17 passed, 17 total
Time:        ~0.7s
```

---

## 🔌 Endpoints de la API

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/health` | Estado del servidor |
| POST | `/api/auth/login` | Autenticación de usuarios |
| GET | `/api/menu` | Obtener menú completo |
| GET | `/api/menu?category=pizza` | Filtrar por categoría |
| GET | `/api/pedidos` | Listar pedidos |
| POST | `/api/pedidos` | Crear nuevo pedido |
| PATCH | `/api/pedidos/:id/status` | Actualizar estado del pedido |
| GET | `/api/inventario` | Ver stock de ingredientes |
| GET | `/api/dashboard` | Métricas del día |

---

## 🏗️ Arquitectura

```
[Frontend HTML/CSS/JS]
        ↕ HTTP / Fetch API
[Backend Node.js + Express]  ← API REST
        ↕ Mock Data (en memoria)
[Datos simulados en arrays JS]
```

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Uso |
|------------|---------|-----|
| HTML5/CSS3/JS | ES2022 | Frontend SPA |
| Node.js | v20 LTS | Backend runtime |
| Express.js | v4.18 | Framework API REST |
| Jest | v29 | Testing framework |
| Supertest | v6 | Testing HTTP |
| GitHub Actions | CI/CD | Pipeline automático |

---

## 📋 Metodología

- **Metodología:** Ágil (Scrum)
- **Sprints:** 3 sprints × 4 semanas
- **Sprint 1:** UI del menú, autenticación, estructura del proyecto
- **Sprint 2:** Carrito, pedidos, panel de cocina
- **Sprint 3:** Dashboard, inventario, pruebas y documentación

---

## 👥 Equipo

Proyecto académico — Ingeniería de Software

---

## 📄 Licencia

MIT License — Uso académico
