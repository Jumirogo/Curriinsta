# 📄 Curriinsta

**Consigue tu curri insta y comparte con tus amigos** ✨

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

[Demo en Vivo](#) • [Reporte de Bug](../../issues) • [Solicitar Feature](../../issues)

</div>

---

## 🌟 Características

- ✅ **100% Cliente-Side** - No requiere servidor, todo funciona en tu navegador
- ✅ **9 Estilos Profesionales** - Variedad de diseños para cada personalidad
- ✅ **Recorte Inteligente de Foto** - Crop automático (no compresión)
- ✅ **Totalmente Gratis** - Sin registro, sin costos ocultos
- ✅ **Privacidad Total** - Tus datos nunca salen de tu navegador
- ✅ **Código Modular** - Arquitectura limpia y mantenible
- ✅ **Responsive** - Funciona en móvil, tablet y escritorio

## 🎨 Estilos Disponibles

| Estilo | Descripción | Ideal Para |
|--------|-------------|------------|
| **Minimal** | Limpio y minimalista | Profesionales modernos |
| **Sidebar** | Sidebar lateral azul | Creativos y diseñadores |
| **Gradient** | Header con gradiente colorido | Jóvenes profesionales |
| **Tech** | Estilo programador/código | Desarrolladores |
| **Coral** | Colores cálidos | Sectores creativos |
| **Elegant** | Serif clásico con dorado | Ejecutivos y gerentes |
| **Timeline** | Línea de tiempo vertical | Carreras largas |
| **RightBar** | Sidebar a la derecha | Alternativa moderna |
| **Blocks** | Bloques de colores | Diseñadores gráficos |

## 🚀 Inicio Rápido

### Opción 1: Descargar y Usar
```bash
# Clona el repositorio
git clone https://github.com/TU_USUARIO/curriinsta.git

# Entra al directorio
cd curriinsta

# Abre index.html en tu navegador
open index.html  # macOS
start index.html  # Windows
xdg-open index.html  # Linux
```

### Opción 2: Servidor Local
```bash
# Con Python
python -m http.server 8000

# Con Node.js
npx http-server -p 8000

# Con PHP
php -S localhost:8000

# Abre http://localhost:8000 en tu navegador
```

### Opción 3: GitHub Pages
1. Haz fork de este repo
2. Ve a Settings > Pages
3. Selecciona la rama `main` y carpeta `/root`
4. ¡Tu CV estará en `https://TU_USUARIO.github.io/curriinsta`!

## 📁 Estructura del Proyecto

```
curriinsta/
├── index.html              # Página principal (HTML puro)
├── styles.css              # Estilos personalizados
├── app.js                  # Lógica de la aplicación
├── styles-generators.js    # Generadores de los 9 estilos PDF
├── README.md               # Esta documentación
├── ARCHITECTURE.md         # Diagrama de arquitectura
└── .gitignore              # Archivos ignorados por Git
```

## 💻 Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Animaciones y estilos custom
- **JavaScript ES6+** - Vanilla JS, sin frameworks
- **Tailwind CSS 3.x** - Framework de utilidades (CDN)
- **jsPDF 2.5.1** - Generación de PDFs en el cliente

## 🎯 Cómo Usar

1. **Abre la aplicación** en tu navegador
2. **Rellena tus datos** en las pestañas:
   - 👤 Personal (nombre, email, teléfono, foto)
   - 💼 Experiencia (trabajos anteriores)
   - 🎓 Educación (estudios y detalles)
   - 💡 Habilidades (skills técnicas)
   - 🌍 Idiomas (niveles de idiomas)
3. **Selecciona tu estilo** favorito
4. **Descarga tu PDF** - ¡Listo para enviar!

## 🛠️ Para Desarrolladores

### Añadir un Nuevo Estilo

1. Abre `styles-generators.js`
2. Crea tu función generadora:
```javascript
function genMiEstilo(doc, data) {
    const pw = doc.internal.pageSize.getWidth();
    const ph = doc.internal.pageSize.getHeight();
    const m = 20;
    
    // Añade foto
    if (data.photoRect) {
        addPhotoRect(doc, data.photoRect, x, y, w, h, borderColor);
    }
    
    // Imprime información personal
    doc.text(data.personalInfo.fullName, x, y);
    
    // Imprime experiencias
    data.experiences.forEach(exp => {
        // Tu código aquí
    });
    
    // Imprime educación CON DETALLES
    data.education.forEach(edu => {
        doc.text(edu.degree, x, y);
        if (edu.details) {
            doc.text(edu.details, x, y + 5);
        }
    });
}
```

3. Registra el estilo en `app.js`:
```javascript
const styles = {
    // ... otros estilos
    miestilo: () => genMiEstilo(doc, data)
};
```

4. Añade la tarjeta visual en `index.html`

### Arquitectura

Consulta [ARCHITECTURE.md](ARCHITECTURE.md) para ver el diagrama completo de la arquitectura del proyecto.

## 📝 Roadmap

- [x] 9 estilos profesionales
- [x] Soporte de foto con crop inteligente
- [x] Campos de educación con detalles
- [x] Código modular y limpio
- [ ] Más estilos de CV
- [ ] Guardado en localStorage
- [ ] Exportación/Importación JSON
- [ ] Modo oscuro
- [ ] Soporte multiidioma
- [ ] Vista previa en tiempo real
- [ ] Plantillas predefinidas

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si quieres ayudar:

1. **Fork** el proyecto
2. Crea tu **feature branch** (`git checkout -b feature/NuevoEstilo`)
3. **Commit** tus cambios (`git commit -m 'Add: Nuevo estilo corporativo'`)
4. **Push** a la branch (`git push origin feature/NuevoEstilo`)
5. Abre un **Pull Request**

### Tipos de Contribuciones

- 🎨 Nuevos estilos de CV
- 🐛 Reportar bugs
- 📝 Mejorar documentación
- ✨ Nuevas features
- 🌍 Traducciones

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 💖 Créditos

Desarrollado con ❤️ para la comunidad

- **Diseño**: Inspirado en las mejores prácticas de CV profesionales
- **Iconos**: Heroicons (vía Tailwind)
- **Generación PDF**: jsPDF

## 📧 Contacto

¿Tienes preguntas o sugerencias? 

- 📫 Abre un [Issue](../../issues)
- 💬 Inicia una [Discusión](../../discussions)

---

<div align="center">

**⭐ Si te gusta este proyecto, dale una estrella en GitHub ⭐**

Hecho con 💜 para ayudarte a conseguir tu trabajo ideal

[⬆ Volver arriba](#-curriinsta)

</div>
