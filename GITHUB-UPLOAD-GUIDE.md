# 🚀 Guía Rápida: Subir Curriinsta a GitHub

## 📋 Archivos Necesarios (Ya listos para subir)

```
✅ index.html              - Página principal
✅ styles.css              - Estilos CSS
✅ app.js                  - Lógica de la aplicación
✅ styles-generators.js    - Generadores de estilos PDF
✅ README.md               - Documentación del proyecto
✅ ARCHITECTURE.md         - Diagrama de arquitectura
✅ CONTRIBUTING.md         - Guía para contribuidores
✅ LICENSE                 - Licencia MIT
✅ .gitignore              - Archivos a ignorar
```

---

## 🎯 Opción 1: Subir desde la Web de GitHub (Más Fácil)

### Paso 1: Crear el Repositorio

1. Ve a [GitHub](https://github.com)
2. Haz clic en el botón **"+"** (arriba a la derecha) → **"New repository"**
3. Configura:
   - **Repository name**: `curriinsta`
   - **Description**: `Generador de CV profesional - 100% gratis y privado`
   - **Visibilidad**: Public ✅ (para que otros puedan usarlo)
   - **Initialize**: NO marques nada (repositorio vacío)
4. Clic en **"Create repository"**

### Paso 2: Subir los Archivos

1. En la página del repo nuevo, clic en **"uploading an existing file"**
2. Arrastra TODOS los archivos de la carpeta `outputs`:
   - index.html
   - styles.css
   - app.js
   - styles-generators.js
   - README.md
   - ARCHITECTURE.md
   - CONTRIBUTING.md
   - LICENSE
   - .gitignore (importante: empieza con punto)

3. En "Commit message" escribe: `Add: Curriinsta v1.0 - Generador de CV`
4. Clic en **"Commit changes"**

### Paso 3: Activar GitHub Pages (Para Demo en Vivo)

1. Ve a **Settings** (en tu repo)
2. Navega a **Pages** (menú izquierdo)
3. En **Source**, selecciona:
   - Branch: `main`
   - Folder: `/root`
4. Clic en **"Save"**
5. Espera 1-2 minutos
6. ¡Tu app estará en vivo en `https://TU_USUARIO.github.io/curriinsta`!

---

## 💻 Opción 2: Subir desde la Terminal (Para Desarrolladores)

### Requisitos Previos
- Git instalado
- Cuenta de GitHub

### Paso 1: Inicializar el Repositorio Local

```bash
# Ve a la carpeta con los archivos
cd ruta/a/la/carpeta/outputs

# Inicializa Git
git init

# Añade todos los archivos
git add .

# Verifica que todo está añadido
git status

# Haz el primer commit
git commit -m "Add: Curriinsta v1.0 - Generador de CV"
```

### Paso 2: Conectar con GitHub

Primero, crea el repositorio en GitHub (igual que en Opción 1, Paso 1).

Luego ejecuta estos comandos (reemplaza TU_USUARIO):

```bash
# Conecta con el repo remoto
git remote add origin https://github.com/TU_USUARIO/curriinsta.git

# Renombra la rama a main
git branch -M main

# Sube los archivos
git push -u origin main
```

### Paso 3: Activar GitHub Pages

```bash
# Desde tu repo en GitHub, ve a Settings > Pages
# Configura como en Opción 1, Paso 3
```

O usa el CLI de GitHub:

```bash
# Instala GitHub CLI si no lo tienes
# https://cli.github.com/

gh repo create curriinsta --public --source=. --push
gh repo edit --enable-pages --pages-branch=main
```

---

## 🎨 Personalización del README

Antes de subir, personaliza el README.md:

1. **Línea 10**: Reemplaza `[Demo en Vivo](#)` con tu URL de GitHub Pages
2. **Línea 42**: Añade screenshots si quieres
3. **Sección Contacto**: Añade tu info de contacto si deseas

---

## ✅ Verificación Post-Upload

Después de subir, verifica que:

- ✅ Todos los archivos están en el repo
- ✅ El README se ve correctamente en la página principal
- ✅ Los badges se muestran correctamente
- ✅ GitHub Pages está activo (Settings > Pages)
- ✅ La app funciona en la URL de GitHub Pages

---

## 🔧 Comandos Git Útiles (Para el Futuro)

```bash
# Ver estado de los archivos
git status

# Añadir cambios
git add .

# Hacer commit
git commit -m "Fix: Corrección en estilo Minimal"

# Subir cambios
git push

# Ver historial
git log --oneline

# Crear una nueva rama
git checkout -b feature/nuevo-estilo

# Volver a main
git checkout main

# Fusionar rama
git merge feature/nuevo-estilo
```

---

## 📊 Después de Subir

### Mejora tu Repo

1. **Añade Topics** (en About):
   - cv-generator
   - resume
   - pdf
   - javascript
   - tailwindcss

2. **Añade una Descripción**:
   - "Generador gratuito de CV profesional con 9 estilos"

3. **Añade el sitio web**:
   - Tu URL de GitHub Pages

4. **Comparte**:
   - Twitter/X
   - LinkedIn
   - Reddit (r/webdev, r/javascript)
   - Product Hunt

### Mantén el Proyecto

```bash
# Actualizar después de hacer cambios
git add .
git commit -m "Update: Descripción del cambio"
git push
```

---

## 🎉 ¡Felicidades!

Tu proyecto está en GitHub y disponible para el mundo. Ahora puedes:

✅ Compartir el link con amigos
✅ Añadirlo a tu portafolio
✅ Aceptar contribuciones de otros desarrolladores
✅ Seguir mejorándolo

---

## ❓ Problemas Comunes

### "Permission denied (publickey)"
```bash
# Usa HTTPS en lugar de SSH
git remote set-url origin https://github.com/TU_USUARIO/curriinsta.git
```

### "Failed to push"
```bash
# Pull primero, luego push
git pull origin main --rebase
git push
```

### "Changes not staged"
```bash
# Añade los cambios
git add .
git commit -m "Tu mensaje"
```

---

## 📞 ¿Necesitas Ayuda?

- 📚 [Documentación Git](https://git-scm.com/doc)
- 📖 [GitHub Docs](https://docs.github.com)
- 💬 [GitHub Community](https://github.community)

---

**¡Listo para subir! 🚀**
