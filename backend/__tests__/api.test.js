const request = require('supertest');
const app = require('../server');

// ──────────────────────────────────────────
// CP-01 / CP-02 — AUTH
// ──────────────────────────────────────────
describe('POST /api/auth/login', () => {
  test('CP-01: Login con credenciales válidas retorna token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@pizzacode.com', password: 'admin123' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.role).toBe('admin');
    expect(res.body.user).not.toHaveProperty('password');
  });

  test('CP-02: Login con credenciales inválidas retorna 401', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'noexiste@test.com', password: 'wrong' });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });
});

// ──────────────────────────────────────────
// MENÚ
// ──────────────────────────────────────────
describe('GET /api/menu', () => {
  test('Retorna todos los productos del menú', async () => {
    const res = await request(app).get('/api/menu');
    expect(res.statusCode).toBe(200);
    expect(res.body.items).toBeInstanceOf(Array);
    expect(res.body.items.length).toBeGreaterThan(0);
    expect(res.body).toHaveProperty('total');
  });

  test('Filtra por categoría pizza', async () => {
    const res = await request(app).get('/api/menu?category=pizza');
    expect(res.statusCode).toBe(200);
    res.body.items.forEach(item => {
      expect(item.category).toBe('pizza');
    });
  });

  test('Filtra por categoría bebida', async () => {
    const res = await request(app).get('/api/menu?category=bebida');
    expect(res.statusCode).toBe(200);
    res.body.items.forEach(item => {
      expect(item.category).toBe('bebida');
    });
  });

  test('Retorna 404 para producto inexistente', async () => {
    const res = await request(app).get('/api/menu/9999');
    expect(res.statusCode).toBe(404);
  });
});

// ──────────────────────────────────────────
// CP-03 / CP-04 / CP-05 — PEDIDOS
// ──────────────────────────────────────────
describe('POST /api/pedidos', () => {
  test('CP-03: Crear pedido válido retorna 201 con datos completos', async () => {
    const res = await request(app)
      .post('/api/pedidos')
      .send({
        items: [{ menuItemId: 1, quantity: 2 }, { menuItemId: 7, quantity: 1 }],
        address: 'Calle 80 #45-10, Medellín',
        customerName: 'Juan García',
        paymentMethod: 'tarjeta',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.status).toBe('nuevo');
    expect(res.body.total).toBeGreaterThan(0);
    expect(res.body.items).toHaveLength(2);
  });

  test('CP-04: Pedido calcula total correctamente (2× Margarita $28.000 + Coca-Cola $5.000 = $61.000)', async () => {
    const res = await request(app)
      .post('/api/pedidos')
      .send({
        items: [{ menuItemId: 1, quantity: 2 }, { menuItemId: 7, quantity: 1 }],
        address: 'Carrera 50 #20-30',
        paymentMethod: 'efectivo',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.total).toBe(61000);  // 28000×2 + 5000×1
  });

  test('CP-05: Pedido sin items retorna 400', async () => {
    const res = await request(app)
      .post('/api/pedidos')
      .send({ items: [], address: 'Calle 10' });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('CP-05b: Pedido sin dirección retorna 400', async () => {
    const res = await request(app)
      .post('/api/pedidos')
      .send({ items: [{ menuItemId: 1, quantity: 1 }] });

    expect(res.statusCode).toBe(400);
  });
});

describe('PATCH /api/pedidos/:id/status', () => {
  let orderId;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/pedidos')
      .send({
        items: [{ menuItemId: 2, quantity: 1 }],
        address: 'Avenida El Poblado #1-50',
        customerName: 'Test User',
      });
    orderId = res.body.id;
  });

  test('Actualizar estado a en_cocina', async () => {
    const res = await request(app)
      .patch(`/api/pedidos/${orderId}/status`)
      .send({ status: 'en_cocina' });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('en_cocina');
  });

  test('Estado inválido retorna 400', async () => {
    const res = await request(app)
      .patch(`/api/pedidos/${orderId}/status`)
      .send({ status: 'cocinando_mucho' });

    expect(res.statusCode).toBe(400);
  });

  test('Pedido inexistente retorna 404', async () => {
    const res = await request(app)
      .patch('/api/pedidos/99999/status')
      .send({ status: 'listo' });

    expect(res.statusCode).toBe(404);
  });
});

// ──────────────────────────────────────────
// INVENTARIO Y DASHBOARD
// ──────────────────────────────────────────
describe('GET /api/inventario', () => {
  test('Retorna inventario con alertas', async () => {
    const res = await request(app).get('/api/inventario');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('inventory');
    expect(res.body).toHaveProperty('alerts');
    expect(res.body.totalAlerts).toBeGreaterThan(0); // mozzarella low, piña out
  });
});

describe('GET /api/dashboard', () => {
  test('Retorna métricas del dashboard', async () => {
    const res = await request(app).get('/api/dashboard');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('today');
    expect(res.body).toHaveProperty('statusCounts');
    expect(res.body.today).toHaveProperty('orders');
    expect(res.body.today).toHaveProperty('revenue');
  });
});

// ──────────────────────────────────────────
// HEALTH CHECK
// ──────────────────────────────────────────
describe('GET /api/health', () => {
  test('Retorna status ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body).toHaveProperty('timestamp');
  });
});

// ──────────────────────────────────────────
// 404
// ──────────────────────────────────────────
describe('Rutas inexistentes', () => {
  test('GET /api/noexiste retorna 404', async () => {
    const res = await request(app).get('/api/noexiste');
    expect(res.statusCode).toBe(404);
  });
});
