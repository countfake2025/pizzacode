# Guía paso a paso: Subir PizzaCode a GitHub

## PASO 1 — Crear tu cuenta en GitHub

1. Ve a https://github.com
2. Clic en "Sign up"
3. Ingresa: correo, contraseña, nombre de usuario
4. Verifica tu correo
5. Elige plan gratuito (Free)

---

## PASO 2 — Crear el repositorio

1. Una vez con sesión iniciada, clic en el "+" (arriba a la derecha)
2. Selecciona "New repository"
3. Configura:
   - **Repository name:** `pizzacode-studio`
   - **Description:** `Sistema de pedidos online para restaurante de pizzas`
   - **Visibility:** Public ✅
   - **NO** marques "Add README" (ya tenemos uno)
4. Clic en **"Create repository"**

---

## PASO 3 — Instalar Git en tu computador

### Windows:
- Descarga desde: https://git-scm.com/download/win
- Instala con opciones por defecto

### Mac:
- Ejecuta en Terminal: `xcode-select --install`

### Verificar instalación:
```bash
git --version
```

---

## PASO 4 — Subir el proyecto

Abre una terminal en la carpeta `pizzacode-studio` y ejecuta:

```bash
# 1. Inicializar Git
git init

# 2. Agregar todos los archivos
git add .

# 3. Primer commit
git commit -m "feat: PizzaCode Studio - entregable inicial"

# 4. Conectar con GitHub (reemplaza TU_USUARIO con tu usuario real)
git remote add origin https://github.com/TU_USUARIO/pizzacode-studio.git

# 5. Subir el código
git branch -M main
git push -u origin main
```

Cuando te pida contraseña, usa un **Personal Access Token**:
- Ve a GitHub → Settings → Developer settings → Personal access tokens → Generate new token
- Marca el permiso "repo"
- Copia el token y úsalo como contraseña

---

## PASO 5 — Verificar que el CI corra

1. Ve a tu repositorio en GitHub
2. Clic en la pestaña **"Actions"**
3. Deberías ver el workflow "CI — PizzaCode Studio" corriendo
4. Espera ~30 segundos → aparece ✅ verde si todos los tests pasan

---

## PASO 6 — Activar GitHub Pages (para el frontend)

1. Ve al repositorio → **Settings** → **Pages**
2. Source: selecciona **"main"** y carpeta **"/frontend"** (o root)
   - Si no aparece /frontend, pon root y mueve index.html a la raíz
3. Clic **Save**
4. En ~2 minutos tendrás una URL pública tipo:
   `https://TU_USUARIO.github.io/pizzacode-studio`

---

## ✅ Checklist final

- [ ] Cuenta GitHub creada
- [ ] Repositorio `pizzacode-studio` creado (público)
- [ ] Código subido con `git push`
- [ ] Actions muestra ✅ verde (17 tests pasando)
- [ ] GitHub Pages activo con la app visible
- [ ] README.md visible en la página principal del repo
