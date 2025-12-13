// Curriinsta - Utility Functions

// Global state
let experienceCount = 0;
let educationCount = 0;
let skillCount = 0;
let languageCount = 0;
let selectedStyle = 'minimal';
let photoDataURL = null;

/**
 * Crop image to center maintaining aspect ratio
 * @param {string} imageDataURL - Base64 image data URL
 * @param {number} targetWidth - Target width in pixels
 * @param {number} targetHeight - Target height in pixels
 * @returns {Promise<string>} Cropped image as data URL
 */
function cropImageCenter(imageDataURL, targetWidth, targetHeight) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            
            // Calculate dimensions for centered crop
            const imgAspect = img.width / img.height;
            const targetAspect = targetWidth / targetHeight;
            
            let sourceX, sourceY, sourceWidth, sourceHeight;
            
            if (imgAspect > targetAspect) {
                // Image is wider - crop sides
                sourceHeight = img.height;
                sourceWidth = img.height * targetAspect;
                sourceX = (img.width - sourceWidth) / 2;
                sourceY = 0;
            } else {
                // Image is taller - crop top/bottom
                sourceWidth = img.width;
                sourceHeight = img.width / targetAspect;
                sourceX = 0;
                sourceY = (img.height - sourceHeight) / 2;
            }
            
            // Draw cropped image
            ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, targetWidth, targetHeight);
            
            resolve(canvas.toDataURL('image/jpeg', 0.9));
        };
        img.src = imageDataURL;
    });
}

/**
 * Add section to PDF with consistent formatting
 */
function addSection(doc, title, items, y, m, pw, ph, color, renderItem) {
    if (!items || items.length === 0) return y;
    if (y > ph - 40) { doc.addPage(); y = 20; }
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...color);
    doc.text(title, m, y);
    y += 10;
    
    items.forEach(item => {
        if (y > ph - 50) { doc.addPage(); y = 20; }
        y = renderItem(doc, item, y, m, pw);
    });
    
    return y + 8;
}

/**
 * Add rectangular photo to PDF (already cropped)
 */
function addPhotoRect(doc, photo, x, y, w, h, borderColor = [200, 200, 200]) {
    if (photo) {
        doc.addImage(photo, 'JPEG', x, y, w, h);
        doc.setDrawColor(...borderColor);
        doc.setLineWidth(0.5);
        doc.rect(x, y, w, h);
    }
}

/**
 * Add square photo to PDF (already cropped)
 */
function addPhotoSquare(doc, photo, x, y, size, borderColor = [255, 255, 255], borderWidth = 2) {
    if (photo) {
        doc.addImage(photo, 'JPEG', x, y, size, size);
        doc.setDrawColor(...borderColor);
        doc.setLineWidth(borderWidth);
        doc.rect(x, y, size, size);
    }
}

/**
 * Delete uploaded photo
 */
function eliminarFoto() {
    photoDataURL = null;
    const preview = document.getElementById('photo-preview');
    preview.innerHTML = `<svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
    </svg>`;
}
// Curriinsta - Main Application Logic

/**
 * Initialize application on page load
 */
window.onload = function() {
    agregarExperiencia();
    agregarEducacion();
    agregarHabilidad();
    agregarIdioma();
    
    // Handle photo upload
    document.getElementById('photoInput').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                photoDataURL = event.target.result;
                const preview = document.getElementById('photo-preview');
                preview.innerHTML = `<img src="${photoDataURL}" class="w-full h-full object-cover">`;
            };
            reader.readAsDataURL(file);
        }
    });
};

/**
 * Change active section/tab
 */
function cambiarSeccion(seccion) {
    // Hide all sections
    document.querySelectorAll('.section-content').forEach(el => el.classList.remove('active'));
    // Show selected section
    document.getElementById('section-' + seccion).classList.add('active');
    
    // Update tab styles
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('bg-purple-600', 'text-white', 'shadow-md');
        btn.classList.add('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
    });
    document.getElementById('tab-' + seccion).classList.remove('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
    document.getElementById('tab-' + seccion).classList.add('bg-purple-600', 'text-white', 'shadow-md');
}

/**
 * Select PDF style
 */
function seleccionarEstilo(estilo) {
    selectedStyle = estilo;
    // Update style card visuals
    document.querySelectorAll('.style-card').forEach(card => {
        card.classList.remove('ring-4', 'ring-purple-500', 'ring-offset-2');
    });
    document.querySelector(`[data-style="${estilo}"]`).classList.add('ring-4', 'ring-purple-500', 'ring-offset-2');
}

/**
 * Add new experience field
 */
function agregarExperiencia() {
    experienceCount++;
    const container = document.getElementById('experience-container');
    const div = document.createElement('div');
    div.id = `exp-${experienceCount}`;
    div.className = 'p-6 bg-blue-50 border-2 border-blue-200 rounded-2xl space-y-4 animate-fadeIn';
    div.innerHTML = `
        <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold text-blue-900">Experiencia ${experienceCount}</h3>
            <button onclick="eliminar('exp-${experienceCount}')" class="text-red-500 hover:text-red-700 font-semibold">Eliminar</button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" class="exp-pos w-full px-4 py-3 bg-white border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none" placeholder="Cargo/Puesto">
            <input type="text" class="exp-comp w-full px-4 py-3 bg-white border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none" placeholder="Empresa">
        </div>
        <input type="text" class="exp-per w-full px-4 py-3 bg-white border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none" placeholder="Período (ej: 2020 - 2023)">
        <textarea class="exp-desc w-full px-4 py-3 bg-white border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none" rows="3" placeholder="Descripción de responsabilidades y logros"></textarea>
    `;
    container.appendChild(div);
}

/**
 * Add new education field
 */
function agregarEducacion() {
    educationCount++;
    const container = document.getElementById('education-container');
    const div = document.createElement('div');
    div.id = `edu-${educationCount}`;
    div.className = 'p-6 bg-green-50 border-2 border-green-200 rounded-2xl space-y-4 animate-fadeIn';
    div.innerHTML = `
        <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold text-green-900">Educación ${educationCount}</h3>
            <button onclick="eliminar('edu-${educationCount}')" class="text-red-500 hover:text-red-700 font-semibold">Eliminar</button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" class="edu-deg w-full px-4 py-3 bg-white border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none" placeholder="Título/Grado">
            <input type="text" class="edu-inst w-full px-4 py-3 bg-white border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none" placeholder="Institución">
        </div>
        <input type="text" class="edu-year w-full px-4 py-3 bg-white border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none" placeholder="Año (ej: 2018 - 2022)">
        <textarea class="edu-det w-full px-4 py-3 bg-white border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none" rows="2" placeholder="Detalles adicionales (opcional)"></textarea>
    `;
    container.appendChild(div);
}

/**
 * Add new skill field
 */
function agregarHabilidad() {
    skillCount++;
    const container = document.getElementById('skills-container');
    const div = document.createElement('div');
    div.id = `skill-${skillCount}`;
    div.className = 'flex gap-2 animate-fadeIn';
    div.innerHTML = `
        <input type="text" class="skill flex-1 px-4 py-3 bg-orange-50 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none" placeholder="Habilidad ${skillCount}">
        <button onclick="eliminar('skill-${skillCount}')" class="px-4 py-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 font-semibold">×</button>
    `;
    container.appendChild(div);
}

/**
 * Add new language field
 */
function agregarIdioma() {
    languageCount++;
    const container = document.getElementById('languages-container');
    const div = document.createElement('div');
    div.id = `lang-${languageCount}`;
    div.className = 'grid grid-cols-2 gap-4 animate-fadeIn';
    div.innerHTML = `
        <input type="text" class="lang-name px-4 py-3 bg-purple-50 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none" placeholder="Idioma">
        <div class="flex gap-2">
            <input type="text" class="lang-lvl flex-1 px-4 py-3 bg-purple-50 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none" placeholder="Nivel (ej: Nativo, Avanzado)">
            <button onclick="eliminar('lang-${languageCount}')" class="px-4 py-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 font-semibold">×</button>
        </div>
    `;
    container.appendChild(div);
}

/**
 * Delete element by ID
 */
function eliminar(id) {
    document.getElementById(id)?.remove();
}

/**
 * Main PDF generation function
 */
async function generarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Pre-process cropped photos for each style
    let photoRect = null;  // For rectangular photo styles (25x32mm)
    let photoSquare = null; // For square photo styles (40x40mm)
    
    if (photoDataURL) {
        // Create cropped versions of the photo
        photoRect = await cropImageCenter(photoDataURL, 300, 384); // Ratio 25:32
        photoSquare = await cropImageCenter(photoDataURL, 400, 400); // Square
    }
    
    const data = {
        photoRect: photoRect,
        photoSquare: photoSquare,
        personalInfo: {
            fullName: document.getElementById('fullName').value || 'Tu Nombre',
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            location: document.getElementById('location').value,
            summary: document.getElementById('summary').value
        },
        experiences: [],
        education: [],
        skills: [],
        languages: []
    };
    
    // Collect experiences
    document.querySelectorAll('[id^="exp-"]').forEach(exp => {
        const pos = exp.querySelector('.exp-pos').value;
        const comp = exp.querySelector('.exp-comp').value;
        if (pos || comp) {
            data.experiences.push({
                position: pos, 
                company: comp,
                period: exp.querySelector('.exp-per').value,
                description: exp.querySelector('.exp-desc').value
            });
        }
    });
    
    // Collect education
    document.querySelectorAll('[id^="edu-"]').forEach(edu => {
        const deg = edu.querySelector('.edu-deg').value;
        const inst = edu.querySelector('.edu-inst').value;
        if (deg || inst) {
            data.education.push({
                degree: deg, 
                institution: inst,
                year: edu.querySelector('.edu-year').value,
                details: edu.querySelector('.edu-det').value
            });
        }
    });
    
    // Collect skills
    document.querySelectorAll('.skill').forEach(s => {
        if (s.value) data.skills.push(s.value);
    });
    
    // Collect languages
    document.querySelectorAll('[id^="lang-"]').forEach(l => {
        const name = l.querySelector('.lang-name').value;
        if (name) {
            data.languages.push({
                language: name,
                level: l.querySelector('.lang-lvl').value
            });
        }
    });
    
    // Generate PDF based on selected style
    const styles = {
        minimal: () => genMinimal(doc, data),
        sidebar: () => genSidebar(doc, data),
        gradient: () => genGradient(doc, data),
        tech: () => genTech(doc, data),
        coral: () => genCoral(doc, data),
        elegant: () => genElegant(doc, data),
        timeline: () => genTimeline(doc, data),
        rightbar: () => genRightBar(doc, data),
        blocks: () => genBlocks(doc, data)
    };
    
    (styles[selectedStyle] || styles.minimal)();
    doc.save('curri.pdf');
}
