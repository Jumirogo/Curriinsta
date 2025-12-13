# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a Curriinsta! 🎉

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [¿Cómo puedo contribuir?](#cómo-puedo-contribuir)
- [Proceso de Pull Request](#proceso-de-pull-request)
- [Guía de Estilo](#guía-de-estilo)
- [Añadir un Nuevo Estilo de CV](#añadir-un-nuevo-estilo-de-cv)

## 📜 Código de Conducta

Este proyecto se adhiere a un código de conducta. Al participar, se espera que mantengas este código. Por favor reporta comportamientos inaceptables abriendo un issue.

## 🎯 ¿Cómo puedo contribuir?

### Reportar Bugs 🐛

Si encuentras un bug:

1. Verifica que no haya sido reportado antes en [Issues](../../issues)
2. Abre un nuevo issue con:
   - Título claro y descriptivo
   - Pasos para reproducir el problema
   - Comportamiento esperado vs actual
   - Screenshots si es posible
   - Versión del navegador

### Sugerir Mejoras ✨

¿Tienes una idea genial?

1. Abre un issue con la etiqueta `enhancement`
2. Describe claramente la mejora propuesta
3. Explica por qué sería útil
4. Si es posible, propón una implementación

### Añadir Nuevos Estilos de CV 🎨

¡Esta es una de las mejores formas de contribuir!

1. Lee la sección [Añadir un Nuevo Estilo de CV](#añadir-un-nuevo-estilo-de-cv)
2. Crea el estilo siguiendo las guías
3. Haz un Pull Request

## 🔄 Proceso de Pull Request

1. **Fork** el repositorio
2. **Clona** tu fork: `git clone https://github.com/TU_USUARIO/curriinsta.git`
3. **Crea una rama**: `git checkout -b feature/mi-contribucion`
4. **Haz tus cambios**
5. **Commit**: `git commit -m "Add: descripción clara"`
6. **Push**: `git push origin feature/mi-contribucion`
7. Abre un **Pull Request** en GitHub

### Convenciones de Commits

Usamos commits semánticos:

- `Add:` - Nueva funcionalidad
- `Fix:` - Corrección de bug
- `Update:` - Actualización de funcionalidad existente
- `Remove:` - Eliminación de código
- `Docs:` - Cambios en documentación
- `Style:` - Cambios de formato (sin afectar funcionalidad)
- `Refactor:` - Refactorización de código

Ejemplos:
```
Add: Nuevo estilo de CV corporativo
Fix: Corrección en recorte de foto para Safari
Update: Mejora en animaciones de tabs
Docs: Actualización de README con nuevos estilos
```

## 📐 Guía de Estilo

### JavaScript

- Usa `const` y `let`, nunca `var`
- Funciones descriptivas: `cropImageCenter()` ✅ vs `crop()` ❌
- Comentarios claros en funciones complejas
- Indentación: 4 espacios

```javascript
// ✅ Bien
function agregarExperiencia() {
    experienceCount++;
    const container = document.getElementById('experience-container');
    // ...
}

// ❌ Mal
function addExp() {
    expCount++;
    var c = document.getElementById('exp-cont');
    // ...
}
```

### CSS

- Usa nombres de clase descriptivos
- Agrupa propiedades relacionadas
- Comenta secciones

```css
/* ✅ Bien */
.section-content {
    display: none;
}

.section-content.active {
    display: block;
}

/* ❌ Mal */
.sc { display: none; }
.sc.a { display: block; }
```

### HTML

- Usa HTML semántico
- Atributos en orden: `id`, `class`, `data-*`, otros
- Comentarios para secciones principales

## 🎨 Añadir un Nuevo Estilo de CV

### Paso 1: Planifica tu Estilo

Define:
- **Nombre**: (ej: "Corporate", "Creative", "Modern")
- **Colores**: Paleta principal
- **Fuente**: Helvetica, Times, Courier
- **Layout**: Sidebar, single column, etc.
- **Público objetivo**: ¿A quién está dirigido?

### Paso 2: Crea la Función Generadora

Abre `styles-generators.js` y añade:

```javascript
function genMiEstilo(doc, data) {
    const pw = doc.internal.pageSize.getWidth();
    const ph = doc.internal.pageSize.getHeight();
    const m = 20; // margen
    let y = 20;   // posición Y inicial
    
    // 1. Añade la foto (si existe)
    if (data.photoRect) {
        // Para foto rectangular (25x32mm)
        addPhotoRect(doc, data.photoRect, x, y, 25, 32, [r, g, b]);
    }
    // O usa photoSquare para foto cuadrada
    if (data.photoSquare) {
        addPhotoSquare(doc, data.photoSquare, x, y, 40, [r, g, b], 2);
    }
    
    // 2. Información Personal
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(data.personalInfo.fullName, m, y);
    y += 10;
    
    doc.setFontSize(10);
    doc.text(data.personalInfo.email, m, y);
    // ...
    
    // 3. Resumen
    if (data.personalInfo.summary) {
        const lines = doc.splitTextToSize(data.personalInfo.summary, pw - 2*m);
        doc.text(lines, m, y);
        y += lines.length * 5;
    }
    
    // 4. Experiencia (OBLIGATORIO)
    data.experiences.forEach(exp => {
        doc.text(exp.position, m, y);
        doc.text(exp.company, m, y + 5);
        if (exp.description) {
            doc.text(exp.description, m, y + 10);
        }
        y += 20;
    });
    
    // 5. Educación CON DETALLES (MUY IMPORTANTE)
    data.education.forEach(edu => {
        doc.text(edu.degree, m, y);
        doc.text(edu.institution, m, y + 5);
        
        // ⚠️ NO OLVIDES LOS DETALLES
        if (edu.details) {
            const lines = doc.splitTextToSize(edu.details, pw - 2*m);
            doc.text(lines, m, y + 10);
            y += lines.length * 4;
        }
        y += 15;
    });
    
    // 6. Habilidades
    data.skills.forEach(skill => {
        doc.text(skill, m, y);
        y += 5;
    });
    
    // 7. Idiomas
    data.languages.forEach(lang => {
        doc.text(`${lang.language}: ${lang.level}`, m, y);
        y += 5;
    });
}
```

### Paso 3: Registra el Estilo

En `app.js`, dentro de `generarPDF()`:

```javascript
const styles = {
    minimal: () => genMinimal(doc, data),
    sidebar: () => genSidebar(doc, data),
    // ... otros estilos ...
    miestilo: () => genMiEstilo(doc, data)  // ← Añade aquí
};
```

### Paso 4: Añade la Tarjeta Visual

En `index.html`, sección de estilos:

```html
<div class="style-card bg-white border-2 border-gray-200 rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-all" 
     data-style="miestilo" 
     onclick="seleccionarEstilo('miestilo')">
    <div class="h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-4"></div>
    <h3 class="text-xl font-bold text-gray-900 mb-2">Mi Estilo</h3>
    <p class="text-gray-600 text-sm">Descripción breve del estilo</p>
</div>
```

### Paso 5: Prueba tu Estilo

1. Abre `index.html` en el navegador
2. Llena todos los campos del formulario
3. Sube una foto de prueba
4. Selecciona tu nuevo estilo
5. Genera el PDF
6. Verifica:
   - ✅ Foto se muestra correctamente (sin deformación)
   - ✅ Todos los datos aparecen
   - ✅ Los detalles de educación se imprimen
   - ✅ La paginación funciona
   - ✅ El diseño es profesional

### Paso 6: Documenta

Añade tu estilo a la tabla en el README:

```markdown
| **Mi Estilo** | Descripción del estilo | Profesionales creativos |
```

## ✅ Checklist antes de Hacer PR

- [ ] El código funciona sin errores en consola
- [ ] Probado en Chrome, Firefox y Safari
- [ ] La foto se recorta correctamente (no se deforma)
- [ ] Los detalles de educación se imprimen
- [ ] Código comentado adecuadamente
- [ ] Commit messages claros
- [ ] README actualizado si es necesario

## 🙏 Agradecimientos

¡Gracias por contribuir a Curriinsta! Tu trabajo ayuda a miles de personas a conseguir mejores oportunidades laborales. 💜

---

¿Tienes dudas? Abre un [Issue](../../issues) o [Discusión](../../discussions).
