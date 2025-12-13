# 📊 Curriinsta - Arquitectura Modular Final

```
┌─────────────────────────────────────────────────────────────┐
│                      CURRIINSTA                             │
│              Generador de CV Profesional                    │
└─────────────────────────────────────────────────────────────┘

📁 ESTRUCTURA DE ARCHIVOS
═══════════════════════════════════════════════════════════════

curriinsta/
│
├── 📄 index.html (38 KB)
│   │
│   ├─── <head>
│   │    ├── Tailwind CSS (CDN)
│   │    ├── jsPDF (CDN)
│   │    └── styles.css (link)
│   │
│   ├─── <body>
│   │    ├── Header (logo + botón descargar)
│   │    ├── Tabs (Personal, Experiencia, Educación, Habilidades, Estilos)
│   │    └── Formularios (solo HTML)
│   │
│   └─── <scripts>
│        ├── app.js (primero)
│        └── styles-generators.js (segundo)
│
├── 🎨 styles.css (830 bytes)
│   │
│   ├── @keyframes fadeIn
│   ├── .animate-fadeIn
│   ├── .section-content
│   ├── .section-content.active
│   ├── html (smooth scroll)
│   └── ::-webkit-scrollbar (personalizado)
│
├── ⚙️ app.js (14 KB)
│   │
│   ├── [VARIABLES GLOBALES]
│   │   ├── experienceCount, educationCount, skillCount, languageCount
│   │   ├── selectedStyle
│   │   └── photoDataURL
│   │
│   ├── [FUNCIONES UTILITARIAS]
│   │   ├── cropImageCenter() → Recorta fotos
│   │   ├── addSection() → Helper para secciones PDF
│   │   ├── addPhotoRect() → Añade foto rectangular
│   │   ├── addPhotoSquare() → Añade foto cuadrada
│   │   └── eliminarFoto() → Borra foto
│   │
│   ├── [INICIALIZACIÓN]
│   │   └── window.onload → Setup de eventos
│   │
│   ├── [NAVEGACIÓN]
│   │   ├── cambiarSeccion() → Cambia tabs
│   │   └── seleccionarEstilo() → Selecciona estilo PDF
│   │
│   ├── [GESTIÓN DE FORMULARIOS]
│   │   ├── agregarExperiencia()
│   │   ├── agregarEducacion()
│   │   ├── agregarHabilidad()
│   │   ├── agregarIdioma()
│   │   └── eliminar()
│   │
│   └── [GENERACIÓN PDF]
│       └── generarPDF() → Función principal
│           ├── Recorta fotos (rect + square)
│           ├── Recopila datos del formulario
│           └── Llama al generador de estilo
│
└── 🎨 styles-generators.js (40 KB)
    │
    ├── genMinimal(doc, data)
    ├── genSidebar(doc, data)
    ├── genGradient(doc, data)
    ├── genTech(doc, data)
    ├── genCoral(doc, data)
    ├── genElegant(doc, data)
    ├── genTimeline(doc, data)
    ├── genRightBar(doc, data)
    └── genBlocks(doc, data)


🔄 FLUJO DE EJECUCIÓN
═══════════════════════════════════════════════════════════════

1. Usuario abre index.html
   └─> Carga Tailwind CSS (CDN)
   └─> Carga jsPDF (CDN)
   └─> Carga styles.css
   └─> Renderiza HTML

2. Se cargan los scripts
   └─> app.js (primero - helpers + lógica)
   └─> styles-generators.js (segundo - generadores)

3. window.onload ejecuta
   └─> Inicializa formularios
   └─> Configura eventos

4. Usuario interactúa
   └─> Llena formularios
   └─> Sube foto (opcional)
   └─> Selecciona estilo

5. Usuario hace clic "Descargar PDF"
   └─> generarPDF() (app.js)
       ├─> cropImageCenter() crea 2 versiones
       ├─> Recopila todos los datos
       └─> Llama a genEstilo() (styles-generators.js)
           └─> Genera PDF
               └─> doc.save('curri.pdf')


✅ SEPARACIÓN COMPLETA
═══════════════════════════════════════════════════════════════

HTML    → index.html (solo estructura, sin CSS ni JS inline)
CSS     → styles.css (solo estilos, sin HTML ni JS)
JS      → 2 archivos:
          ├── app.js (lógica de aplicación)
          └── styles-generators.js (solo generadores de estilos)


🎯 VENTAJAS
═══════════════════════════════════════════════════════════════

✓ Código limpio y organizado
✓ Fácil mantenimiento
✓ Separación de responsabilidades
✓ Escalable (añadir estilos es trivial)
✓ Sin código duplicado
✓ Debugging simplificado
✓ Colaboración efectiva
