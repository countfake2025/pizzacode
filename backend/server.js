const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// ─── MOCK DATABASE ────────────────────────────────────────────
let mockOrders = [];
let nextOrderId = 1001;

const mockMenu = [
  { id: 1, name: "Margarita Clásica",     category: "pizza",  price: 28000, description: "Salsa de tomate, mozzarella fresca, albahaca", available: true,  image: "🍕" },
  { id: 2, name: "Pepperoni Lovers",      category: "pizza",  price: 35000, description: "Doble pepperoni, mozzarella, salsa especial",  available: true,  image: "🍕" },
  { id: 3, name: "Hawaiana",              category: "pizza",  price: 32000, description: "Jamón, piña, mozzarella, salsa de tomate",    available: true,  image: "🍕" },
  { id: 4, name: "Cuatro Quesos",         category: "pizza",  price: 38000, description: "Mozzarella, cheddar, parmesano, gorgonzola",  available: true,  image: "🍕" },
  { id: 5, name: "BBQ Chicken",           category: "pizza",  price: 36000, description: "Pollo a la BBQ, cebolla, mozzarella",         available: true,  image: "🍕" },
  { id: 6, name: "Veggie Supreme",        category: "pizza",  price: 30000, description: "Pimentón, champiñones, aceitunas, cebolla",   available: true,  image: "🍕" },
  { id: 7, name: "Coca-Cola 500ml",       category: "bebida", price: 5000,  description: "Bebida gaseosa fría",                        available: true,  image: "🥤" },
  { id: 8, name: "Agua Mineral 500ml",    category: "bebida", price: 3000,  description: "Agua sin gas",                               available: true,  image: "💧" },
  { id: 9, name: "Brownie de Chocolate",  category: "postre", price: 12000, description: "Brownie caliente con helado de vainilla",    available: true,  image: "🍫" },
  { id:10, name: "Tiramisú",              category: "postre", price: 14000, description: "Clásico tiramisú italiano",                  available: false, image: "🍰" },
];

const mockInventory = [
  { ingredient: "Masa de pizza",    stock: 45, unit: "unidades", minStock: 10, status: "ok" },
  { ingredient: "Salsa de tomate",  stock: 8,  unit: "litros",   minStock: 5,  status: "ok" },
  { ingredient: "Mozzarella",       stock: 3,  unit: "kg",       minStock: 5,  status: "low" },
  { ingredient: "Pepperoni",        stock: 12, unit: "paquetes", minStock: 5,  status: "ok" },
  { ingredient: "Jamón",            stock: 6,  unit: "kg",       minStock: 3,  status: "ok" },
  { ingredient: "Piña en conserva", stock: 0,  unit: "latas",    minStock: 4,  status: "out" },
];

// ─── AUTH (simulado) ──────────────────────────────────────────
const mockUsers = [
  { id: 1, email: "admin@pizzacode.com",  password: "admin123",  role: "admin",  name: "Carlos Rodríguez" },
  { id: 2, email: "chef@pizzacode.com",   password: "chef123",   role: "chef",   name: "Ana Martínez" },
  { id: 3, email: "cliente@test.com",     password: "pass123",   role: "cliente",name: "Juan García" },
];

// POST /api/auth/login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = mockUsers.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }
  const { password: _, ...userSafe } = user;
  res.json({ token: `mock-jwt-${user.id}-${Date.now()}`, user: userSafe });
});

// ─── MENU ─────────────────────────────────────────────────────
// GET /api/menu
app.get('/api/menu', (req, res) => {
  const { category } = req.query;
  const items = category ? mockMenu.filter(i => i.category === category) : mockMenu;
  res.json({ items, total: items.length });
});

// GET /api/menu/:id
app.get('/api/menu/:id', (req, res) => {
  const item = mockMenu.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(item);
});

// ─── PEDIDOS ──────────────────────────────────────────────────
// GET /api/pedidos
app.get('/api/pedidos', (req, res) => {
  res.json({ pedidos: mockOrders, total: mockOrders.length });
});

// GET /api/pedidos/:id
app.get('/api/pedidos/:id', (req, res) => {
  const order = mockOrders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ error: 'Pedido no encontrado' });
  res.json(order);
});

// POST /api/pedidos
app.post('/api/pedidos', (req, res) => {
  const { items, address, customerName, paymentMethod } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'El pedido debe tener al menos un producto' });
  }
  if (!address) {
    return res.status(400).json({ error: 'La dirección es requerida' });
  }

  const total = items.reduce((sum, item) => {
    const menuItem = mockMenu.find(m => m.id === item.menuItemId);
    return sum + (menuItem ? menuItem.price * item.quantity : 0);
  }, 0);

  const newOrder = {
    id: nextOrderId++,
    items,
    address,
    customerName: customerName || 'Cliente',
    paymentMethod: paymentMethod || 'efectivo',
    total,
    status: 'nuevo',
    createdAt: new Date().toISOString(),
    estimatedTime: 30,
  };

  mockOrders.push(newOrder);
  res.status(201).json(newOrder);
});

// PATCH /api/pedidos/:id/status
app.patch('/api/pedidos/:id/status', (req, res) => {
  const order = mockOrders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ error: 'Pedido no encontrado' });

  const validStatuses = ['nuevo', 'en_cocina', 'listo', 'en_camino', 'entregado', 'cancelado'];
  const { status } = req.body;
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Estado inválido', validStatuses });
  }

  order.status = status;
  order.updatedAt = new Date().toISOString();
  res.json(order);
});

// ─── INVENTARIO ───────────────────────────────────────────────
// GET /api/inventario
app.get('/api/inventario', (req, res) => {
  const alerts = mockInventory.filter(i => i.status !== 'ok');
  res.json({ inventory: mockInventory, alerts, totalAlerts: alerts.length });
});

// ─── DASHBOARD / MÉTRICAS ─────────────────────────────────────
// GET /api/dashboard
app.get('/api/dashboard', (req, res) => {
  const today = mockOrders.filter(o => {
    const orderDate = new Date(o.createdAt).toDateString();
    return orderDate === new Date().toDateString();
  });

  const totalRevenue = today.reduce((sum, o) => sum + o.total, 0);
  const statusCounts = mockOrders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {});

  res.json({
    today: {
      orders: today.length,
      revenue: totalRevenue,
      avgTicket: today.length > 0 ? Math.round(totalRevenue / today.length) : 0,
    },
    statusCounts,
    inventoryAlerts: mockInventory.filter(i => i.status !== 'ok').length,
    totalOrders: mockOrders.length,
  });
});

// ─── HEALTH CHECK ─────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), version: '1.0.0' });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: `Ruta ${req.method} ${req.path} no encontrada` });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ PizzaCode API corriendo en http://localhost:${PORT}`);
  console.log(`   GET  /api/health`);
  console.log(`   POST /api/auth/login`);
  console.log(`   GET  /api/menu`);
  console.log(`   POST /api/pedidos`);
  console.log(`   GET  /api/dashboard`);
});

module.exports = app;
