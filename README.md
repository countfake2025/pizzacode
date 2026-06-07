# 🍕 PizzaCode

> Sistema de pedidos online para restaurante de pizzas — Ingeniería de Software
---

## 📌 Descripción

**PizzaCode Studio** es una aplicación web de gestión de pedidos para un restaurante de pizzas. Permite a los clientes explorar el menú, hacer pedidos y rastrearlos en tiempo real, mientras el equipo de cocina gestiona el flujo de trabajo desde un panel dedicado.
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

## 👥 Equipo

Proyecto académico — Ingeniería de Software

---

## 📄 Licencia

MIT License — Uso académico
