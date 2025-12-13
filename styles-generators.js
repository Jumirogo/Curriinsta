// Curriinsta - PDF Style Generators
function genMinimal(doc, d) {
    const pw = doc.internal.pageSize.getWidth();
    const ph = doc.internal.pageSize.getHeight();
    const m = 25;
    let y = 25;
    
    // Foto de perfil rectangular vertical (ya recortada)
    if (d.photoRect) {
        addPhotoRect(doc, d.photoRect, pw - m - 25, 20, 25, 32, [200, 200, 200]);
    }
    
    // Nombre minimalista
    doc.setFontSize(32);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(20, 20, 20);
    doc.text(d.personalInfo.fullName, m, y);
    y += 8;
    
    // Línea sutil
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    const lineEnd = d.photoRect ? pw - m - 30 : pw - m;
    doc.line(m, y, lineEnd, y);
    y += 8;
    
    // Contacto minimalista
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    const contact = [d.personalInfo.email, d.personalInfo.phone, d.personalInfo.location].filter(Boolean).join('  •  ');
    doc.text(contact, m, y);
    y += 12;
    
    // Resumen
    if (d.personalInfo.summary) {
        const maxWidth = d.photoRect ? pw - 2*m - 30 : pw - 2*m;
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        const lines = doc.splitTextToSize(d.personalInfo.summary, maxWidth);
        doc.text(lines, m, y);
        y += lines.length * 5 + 12;
    }
    
    // Experiencia
    y = addSection(doc, 'EXPERIENCIA', d.experiences, y, m, pw, ph, [20, 20, 20], (doc, exp, y, m, pw) => {
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(20, 20, 20);
        doc.text(exp.position || 'Puesto', m, y);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(120, 120, 120);
        doc.text(`${exp.company || ''} | ${exp.period || ''}`, m, y + 5);
        y += 10;
        if (exp.description) {
            doc.setFontSize(9);
            doc.setTextColor(80, 80, 80);
            const lines = doc.splitTextToSize(exp.description, pw - 2*m);
            doc.text(lines, m, y);
            y += lines.length * 4 + 5;
        }
        return y;
    });
    
    // Educación con detalles
    y = addSection(doc, 'EDUCACIÓN', d.education, y, m, pw, ph, [20, 20, 20], (doc, edu, y, m, pw) => {
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(20, 20, 20);
        doc.text(edu.degree || 'Título', m, y);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(120, 120, 120);
        doc.text(`${edu.institution || ''} | ${edu.year || ''}`, m, y + 5);
        y += 10;
        if (edu.details) {
            doc.setFontSize(9);
            doc.setTextColor(80, 80, 80);
            const lines = doc.splitTextToSize(edu.details, pw - 2*m);
            doc.text(lines, m, y);
            y += lines.length * 4 + 5;
        }
        return y;
    });
    
    // Habilidades
    if (d.skills.length > 0) {
        if (y > ph - 30) { doc.addPage(); y = 20; }
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(20, 20, 20);
        doc.text('HABILIDADES', m, y);
        y += 8;
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(80, 80, 80);
        const skills = d.skills.join('  •  ');
        const lines = doc.splitTextToSize(skills, pw - 2*m);
        doc.text(lines, m, y);
        y += lines.length * 4 + 10;
    }
    
    // Idiomas
    if (d.languages.length > 0 && y < ph - 25) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(20, 20, 20);
        doc.text('IDIOMAS', m, y);
        y += 8;
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(80, 80, 80);
        d.languages.forEach(lang => {
            doc.text(`${lang.language}: ${lang.level || '—'}`, m, y);
            y += 5;
        });
    }
}

function genSidebar(doc, d) {
    const pw = doc.internal.pageSize.getWidth();
    const ph = doc.internal.pageSize.getHeight();
    const sw = 65;
    const m = sw + 12;
    
    // Sidebar azul
    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, sw, ph, 'F');
    
    // Foto cuadrada en el sidebar (ya recortada)
    let sidebarContentStart = 55;
    if (d.photoSquare) {
        const photoSize = 40;
        const photoX = (sw - photoSize) / 2;
        const photoY = 15;
        addPhotoSquare(doc, d.photoSquare, photoX, photoY, photoSize, [255, 255, 255], 2);
        sidebarContentStart = photoY + photoSize + 15;
    }
    
    // Header
    doc.setFillColor(37, 99, 235);
    doc.rect(sw, 0, pw - sw, 45, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(d.personalInfo.fullName, m, 22);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(d.personalInfo.email || '', m, 31);
    doc.text([d.personalInfo.phone, d.personalInfo.location].filter(Boolean).join(' | '), m, 38);
    
    // Sidebar - Habilidades
    let sy = sidebarContentStart;
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('HABILIDADES', 8, sy);
    sy += 9;
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    d.skills.forEach(skill => {
        if (sy > ph - 20) return;
        const lines = doc.splitTextToSize(skill, sw - 16);
        doc.text(lines, 8, sy);
        sy += lines.length * 4 + 3;
    });
    
    // Sidebar - Idiomas
    sy += 8;
    if (sy < ph - 40) {
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('IDIOMAS', 8, sy);
        sy += 9;
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        d.languages.forEach(lang => {
            if (sy > ph - 10) return;
            doc.text(lang.language, 8, sy);
            doc.setFontSize(7);
            doc.text(lang.level || '—', 8, sy + 3);
            sy += 10;
            doc.setFontSize(8);
        });
    }
    
    // Contenido principal
    let my = 55;
    doc.setTextColor(0, 0, 0);
    
    if (d.personalInfo.summary) {
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        const lines = doc.splitTextToSize(d.personalInfo.summary, pw - m - 12);
        doc.text(lines, m, my);
        my += lines.length * 5 + 12;
    }
    
    // Experiencia
    my = addSection(doc, 'EXPERIENCIA', d.experiences, my, m, pw, ph, [37, 99, 235], (doc, exp, y, m, pw) => {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text(exp.position || 'Puesto', m, y);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        doc.text(`${exp.company || ''} | ${exp.period || ''}`, m, y + 5);
        y += 11;
        if (exp.description) {
            doc.setFontSize(8);
            doc.setTextColor(80, 80, 80);
            const lines = doc.splitTextToSize(exp.description, pw - m - 12);
            doc.text(lines, m, y);
            y += lines.length * 3 + 4;
        }
        return y;
    });
    
    // Educación con detalles
    addSection(doc, 'EDUCACIÓN', d.education, my, m, pw, ph, [37, 99, 235], (doc, edu, y, m, pw) => {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text(edu.degree || 'Título', m, y);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        doc.text(`${edu.institution || ''} | ${edu.year || ''}`, m, y + 5);
        y += 11;
        if (edu.details) {
            doc.setFontSize(8);
            doc.setTextColor(80, 80, 80);
            const lines = doc.splitTextToSize(edu.details, pw - m - 12);
            doc.text(lines, m, y);
            y += lines.length * 3 + 4;
        }
        return y;
    });
}

function genGradient(doc, d) {
    const pw = doc.internal.pageSize.getWidth();
    const ph = doc.internal.pageSize.getHeight();
    const m = 20;
    let y = 20;
    
    // Header con gradiente simulado (púrpura → rosa → naranja)
    for (let i = 0; i < 60; i++) {
        const ratio = i / 60;
        let r, g, b;
        if (ratio < 0.5) {
            const t = ratio * 2;
            r = 147 + (219 - 147) * t;
            g = 51 + (39 - 51) * t;
            b = 234 + (119 - 234) * t;
        } else {
            const t = (ratio - 0.5) * 2;
            r = 219 + (249 - 219) * t;
            g = 39 + (115 - 39) * t;
            b = 119 + (22 - 119) * t;
        }
        doc.setFillColor(r, g, b);
        doc.rect(0, i, pw, 1, 'F');
    }
    
    // Foto rectangular en header
    if (d.photoRect) {
        addPhotoRect(doc, d.photoRect, pw - m - 25, 15, 25, 32, [255, 255, 255]);
    }
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text(d.personalInfo.fullName, m, 30);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const contact = [d.personalInfo.email, d.personalInfo.phone, d.personalInfo.location].filter(Boolean).join(' • ');
    doc.text(contact, m, 45);
    
    y = 75;
    doc.setTextColor(0, 0, 0);
    
    // Resumen
    if (d.personalInfo.summary) {
        const maxWidth = d.photoRect ? pw - 2*m - 30 : pw - 2*m;
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        const lines = doc.splitTextToSize(d.personalInfo.summary, maxWidth);
        doc.text(lines, m, y);
        y += lines.length * 5 + 12;
    }
    
    // Experiencia
    y = addSection(doc, 'EXPERIENCIA', d.experiences, y, m, pw, ph, [147, 51, 234], (doc, exp, y, m, pw) => {
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(20, 20, 20);
        doc.text(exp.position || 'Puesto', m, y);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(120, 120, 120);
        doc.text(`${exp.company || ''} | ${exp.period || ''}`, m, y + 5);
        y += 10;
        if (exp.description) {
            doc.setFontSize(9);
            doc.setTextColor(80, 80, 80);
            const lines = doc.splitTextToSize(exp.description, pw - 2*m);
            doc.text(lines, m, y);
            y += lines.length * 4 + 5;
        }
        return y;
    });
    
    // Educación CON DETALLES
    y = addSection(doc, 'EDUCACIÓN', d.education, y, m, pw, ph, [219, 39, 119], (doc, edu, y, m, pw) => {
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(20, 20, 20);
        doc.text(edu.degree || 'Título', m, y);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(120, 120, 120);
        doc.text(`${edu.institution || ''} | ${edu.year || ''}`, m, y + 5);
        y += 10;
        if (edu.details) {
            doc.setFontSize(9);
            doc.setTextColor(80, 80, 80);
            const lines = doc.splitTextToSize(edu.details, pw - 2*m);
            doc.text(lines, m, y);
            y += lines.length * 4 + 5;
        }
        return y;
    });
    
    // Habilidades
    if (d.skills.length > 0) {
        if (y > ph - 30) { doc.addPage(); y = 20; }
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(249, 115, 22);
        doc.text('HABILIDADES', m, y);
        y += 8;
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(80, 80, 80);
        const skills = d.skills.join('  •  ');
        const lines = doc.splitTextToSize(skills, pw - 2*m);
        doc.text(lines, m, y);
        y += lines.length * 4 + 10;
    }
    
    // Idiomas
    if (d.languages.length > 0 && y < ph - 25) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(249, 115, 22);
        doc.text('IDIOMAS', m, y);
        y += 8;
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(80, 80, 80);
        d.languages.forEach(lang => {
            doc.text(`${lang.language}: ${lang.level || '—'}`, m, y);
            y += 5;
        });
    }
}

function genTech(doc, d) {
    const pw = doc.internal.pageSize.getWidth();
    const ph = doc.internal.pageSize.getHeight();
    const m = 20;
    let y = 20;
    
    // Fondo oscuro
    doc.setFillColor(30, 30, 30);
    doc.rect(0, 0, pw, ph, 'F');
    
    // Header tech con verde neón
    doc.setFillColor(34, 197, 94);
    doc.rect(0, 0, pw, 3, 'F');
    
    // Foto cuadrada esquina superior derecha con borde verde
    if (d.photoSquare) {
        addPhotoSquare(doc, d.photoSquare, pw - m - 35, 15, 35, [34, 197, 94], 2);
    }
    
    doc.setTextColor(34, 197, 94);
    doc.setFontSize(28);
    doc.setFont('courier', 'bold');
    doc.text('> ' + d.personalInfo.fullName, m, 25);
    
    doc.setTextColor(34, 211, 238);
    doc.setFontSize(9);
    doc.setFont('courier', 'normal');
    const contact = [d.personalInfo.email, d.personalInfo.phone, d.personalInfo.location].filter(Boolean).join(' | ');
    doc.text('$ ' + contact, m, 35);
    
    y = 50;
    
    // Resumen
    if (d.personalInfo.summary) {
        const maxWidth = d.photoSquare ? pw - 2*m - 40 : pw - 2*m;
        doc.setTextColor(156, 163, 175);
        doc.setFontSize(9);
        doc.setFont('courier', 'normal');
        doc.text('// About', m, y);
        y += 6;
        const lines = doc.splitTextToSize(d.personalInfo.summary, maxWidth);
        doc.text(lines, m, y);
        y += lines.length * 4 + 10;
    }
    
    // Experiencia con estilo código
    if (d.experiences.length > 0) {
        if (y > ph - 40) { doc.addPage(); doc.setFillColor(30, 30, 30); doc.rect(0, 0, pw, ph, 'F'); y = 20; }
        doc.setTextColor(34, 197, 94);
        doc.setFontSize(12);
        doc.setFont('courier', 'bold');
        doc.text('function experience() {', m, y);
        y += 8;
        
        d.experiences.forEach((exp, idx) => {
            if (y > ph - 50) { doc.addPage(); doc.setFillColor(30, 30, 30); doc.rect(0, 0, pw, ph, 'F'); y = 20; }
            doc.setFontSize(10);
            doc.setTextColor(251, 191, 36);
            doc.text(`  [${idx + 1}]`, m + 5, y);
            doc.setTextColor(255, 255, 255);
            doc.text(`${exp.position || 'Position'}`, m + 15, y);
            doc.setFontSize(8);
            doc.setTextColor(156, 163, 175);
            doc.text(`     ${exp.company || ''} | ${exp.period || ''}`, m + 5, y + 5);
            y += 10;
            if (exp.description) {
                doc.setFontSize(8);
                const lines = doc.splitTextToSize('     ' + exp.description, pw - 2*m);
                doc.text(lines, m + 5, y);
                y += lines.length * 3 + 2;
            }
        });
        doc.setTextColor(34, 197, 94);
        doc.setFontSize(12);
        doc.text('}', m, y);
        y += 15;
    }
    
    // Educación CON DETALLES
    if (d.education.length > 0) {
        if (y > ph - 40) { doc.addPage(); doc.setFillColor(30, 30, 30); doc.rect(0, 0, pw, ph, 'F'); y = 20; }
        doc.setTextColor(34, 197, 94);
        doc.setFontSize(12);
        doc.setFont('courier', 'bold');
        doc.text('const education = [', m, y);
        y += 8;
        
        d.education.forEach(edu => {
            if (y > ph - 40) { doc.addPage(); doc.setFillColor(30, 30, 30); doc.rect(0, 0, pw, ph, 'F'); y = 20; }
            doc.setFontSize(9);
            doc.setTextColor(255, 255, 255);
            doc.text(`  "${edu.degree || 'Degree'}"`, m + 5, y);
            doc.setTextColor(156, 163, 175);
            doc.text(`  // ${edu.institution || ''} - ${edu.year || ''}`, m + 5, y + 5);
            y += 10;
            if (edu.details) {
                doc.setFontSize(8);
                const lines = doc.splitTextToSize('  // ' + edu.details, pw - 2*m);
                doc.text(lines, m + 5, y);
                y += lines.length * 3 + 2;
            }
        });
        doc.setTextColor(34, 197, 94);
        doc.text('];', m, y);
        y += 15;
    }
    
    // Habilidades
    if (d.skills.length > 0 && y < ph - 30) {
        if (y > ph - 40) { doc.addPage(); doc.setFillColor(30, 30, 30); doc.rect(0, 0, pw, ph, 'F'); y = 20; }
        doc.setTextColor(34, 197, 94);
        doc.setFontSize(12);
        doc.text('const skills = [', m, y);
        y += 7;
        doc.setFontSize(8);
        doc.setTextColor(251, 191, 36);
        const skillsText = d.skills.map(s => `"${s}"`).join(', ');
        const lines = doc.splitTextToSize('  ' + skillsText, pw - 2*m);
        doc.text(lines, m + 5, y);
        y += lines.length * 4 + 3;
        doc.setTextColor(34, 197, 94);
        doc.setFontSize(12);
        doc.text('];', m, y);
        y += 10;
    }
    
    // Idiomas
    if (d.languages.length > 0 && y < ph - 25) {
        doc.setTextColor(34, 197, 94);
        doc.setFontSize(12);
        doc.text('const languages = [', m, y);
        y += 7;
        doc.setFontSize(8);
        doc.setTextColor(251, 191, 36);
        d.languages.forEach(lang => {
            if (y > ph - 10) return;
            doc.text(`  "${lang.language}: ${lang.level || 'N/A'}"`, m + 5, y);
            y += 4;
        });
        doc.setTextColor(34, 197, 94);
        doc.setFontSize(12);
        doc.text('];', m, y);
    }
}

function genCoral(doc, d) {
    const pw = doc.internal.pageSize.getWidth();
    const ph = doc.internal.pageSize.getHeight();
    const m = 20;
    let y = 20;
    
    // Header coral con degradado naranja→rosa
    for (let i = 0; i < 50; i++) {
        const ratio = i / 50;
        const r = 251 + (236 - 251) * ratio;
        const g = 146 + (72 - 146) * ratio;
        const b = 60 + (153 - 60) * ratio;
        doc.setFillColor(r, g, b);
        doc.rect(0, i, pw, 1, 'F');
    }
    
    // Foto rectangular con borde naranja
    if (d.photoRect) {
        addPhotoRect(doc, d.photoRect, pw - m - 25, 15, 25, 32, [251, 146, 60]);
    }
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text(d.personalInfo.fullName, m, 28);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const contact = [d.personalInfo.email, d.personalInfo.phone, d.personalInfo.location].filter(Boolean).join(' • ');
    doc.text(contact, m, 40);
    
    y = 65;
    doc.setTextColor(0, 0, 0);
    
    // Resumen
    if (d.personalInfo.summary) {
        const maxWidth = d.photoRect ? pw - 2*m - 30 : pw - 2*m;
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        const lines = doc.splitTextToSize(d.personalInfo.summary, maxWidth);
        doc.text(lines, m, y);
        y += lines.length * 5 + 12;
    }
    
    // Experiencia con barra lateral naranja
    if (d.experiences.length > 0) {
        if (y > ph - 40) { doc.addPage(); y = 20; }
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(251, 146, 60);
        doc.text('EXPERIENCIA', m, y);
        doc.setFillColor(251, 146, 60);
        doc.rect(m, y + 2, 50, 3, 'F');
        y += 12;
        
        d.experiences.forEach(exp => {
            if (y > ph - 50) { doc.addPage(); y = 20; }
            doc.setFillColor(251, 146, 60);
            doc.circle(m + 3, y - 1, 2, 'F');
            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text(exp.position || 'Puesto', m + 8, y);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(120, 120, 120);
            doc.text(`${exp.company || ''} • ${exp.period || ''}`, m + 8, y + 5);
            y += 11;
            if (exp.description) {
                doc.setFontSize(9);
                doc.setTextColor(80, 80, 80);
                const lines = doc.splitTextToSize(exp.description, pw - m - 15);
                doc.text(lines, m + 8, y);
                y += lines.length * 4 + 6;
            }
        });
        y += 5;
    }
    
    // Educación CON DETALLES
    if (d.education.length > 0) {
        if (y > ph - 40) { doc.addPage(); y = 20; }
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(236, 72, 153);
        doc.text('EDUCACIÓN', m, y);
        doc.setFillColor(236, 72, 153);
        doc.rect(m, y + 2, 40, 3, 'F');
        y += 12;
        
        d.education.forEach(edu => {
            if (y > ph - 40) { doc.addPage(); y = 20; }
            doc.setFillColor(236, 72, 153);
            doc.circle(m + 3, y - 1, 2, 'F');
            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text(edu.degree || 'Título', m + 8, y);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(120, 120, 120);
            doc.text(`${edu.institution || ''} • ${edu.year || ''}`, m + 8, y + 5);
            y += 11;
            if (edu.details) {
                doc.setFontSize(9);
                doc.setTextColor(80, 80, 80);
                const lines = doc.splitTextToSize(edu.details, pw - m - 15);
                doc.text(lines, m + 8, y);
                y += lines.length * 4 + 6;
            }
        });
        y += 5;
    }
    
    // Habilidades
    if (d.skills.length > 0) {
        if (y > ph - 35) { doc.addPage(); y = 20; }
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(251, 191, 36);
        doc.text('HABILIDADES', m, y);
        y += 7;
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(80, 80, 80);
        const skills = d.skills.join(' • ');
        const lines = doc.splitTextToSize(skills, pw - 2*m);
        doc.text(lines, m, y);
        y += lines.length * 4 + 10;
    }
    
    // Idiomas
    if (d.languages.length > 0 && y < ph - 25) {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(251, 191, 36);
        doc.text('IDIOMAS', m, y);
        y += 7;
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(80, 80, 80);
        d.languages.forEach(lang => {
            doc.text(`${lang.language}: ${lang.level || '—'}`, m, y);
            y += 5;
        });
    }
}

function genElegant(doc, d) {
    const pw = doc.internal.pageSize.getWidth();
    const ph = doc.internal.pageSize.getHeight();
    const m = 25;
    let y = 25;
    
    // Header elegante azul oscuro
    doc.setFillColor(55, 48, 163);
    doc.rect(0, 0, pw, 50, 'F');
    
    // Detalles dorados
    doc.setFillColor(251, 191, 36);
    doc.rect(0, 48, pw, 2, 'F');
    
    // Foto rectangular con borde dorado
    if (d.photoRect) {
        addPhotoRect(doc, d.photoRect, pw - m - 25, 15, 25, 32, [251, 191, 36]);
    }
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(26);
    doc.setFont('times', 'bold');
    doc.text(d.personalInfo.fullName, m, 28);
    doc.setFontSize(10);
    doc.setFont('times', 'normal');
    const contact = [d.personalInfo.email, d.personalInfo.phone, d.personalInfo.location].filter(Boolean).join(' • ');
    doc.text(contact, m, 40);
    
    y = 65;
    doc.setTextColor(0, 0, 0);
    
    // Resumen con serif
    if (d.personalInfo.summary) {
        const maxWidth = d.photoRect ? pw - 2*m - 30 : pw - 2*m;
        doc.setFontSize(10);
        doc.setFont('times', 'italic');
        doc.setTextColor(60, 60, 60);
        const lines = doc.splitTextToSize(d.personalInfo.summary, maxWidth);
        doc.text(lines, m, y);
        y += lines.length * 5 + 12;
    }
    
    // Experiencia con viñetas doradas
    if (d.experiences.length > 0) {
        if (y > ph - 40) { doc.addPage(); y = 20; }
        doc.setFontSize(13);
        doc.setFont('times', 'bold');
        doc.setTextColor(55, 48, 163);
        doc.text('EXPERIENCIA PROFESIONAL', m, y);
        doc.setDrawColor(251, 191, 36);
        doc.setLineWidth(1);
        doc.line(m, y + 2, m + 70, y + 2);
        y += 10;
        
        d.experiences.forEach(exp => {
            if (y > ph - 50) { doc.addPage(); y = 20; }
            doc.setFillColor(251, 191, 36);
            doc.circle(m + 2, y - 1, 1.5, 'F');
            doc.setFontSize(11);
            doc.setFont('times', 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text(exp.position || 'Puesto', m + 7, y);
            doc.setFont('times', 'italic');
            doc.setFontSize(9);
            doc.setTextColor(100, 100, 100);
            doc.text(`${exp.company || ''} | ${exp.period || ''}`, m + 7, y + 5);
            y += 11;
            if (exp.description) {
                doc.setFont('times', 'normal');
                doc.setFontSize(9);
                doc.setTextColor(60, 60, 60);
                const lines = doc.splitTextToSize(exp.description, pw - m - 15);
                doc.text(lines, m + 7, y);
                y += lines.length * 4 + 6;
            }
        });
        y += 5;
    }
    
    // Educación CON DETALLES
    if (d.education.length > 0) {
        if (y > ph - 40) { doc.addPage(); y = 20; }
        doc.setFontSize(13);
        doc.setFont('times', 'bold');
        doc.setTextColor(55, 48, 163);
        doc.text('EDUCACIÓN', m, y);
        doc.setDrawColor(251, 191, 36);
        doc.line(m, y + 2, m + 40, y + 2);
        y += 10;
        
        d.education.forEach(edu => {
            if (y > ph - 40) { doc.addPage(); y = 20; }
            doc.setFillColor(251, 191, 36);
            doc.circle(m + 2, y - 1, 1.5, 'F');
            doc.setFontSize(11);
            doc.setFont('times', 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text(edu.degree || 'Título', m + 7, y);
            doc.setFont('times', 'italic');
            doc.setFontSize(9);
            doc.setTextColor(100, 100, 100);
            doc.text(`${edu.institution || ''} | ${edu.year || ''}`, m + 7, y + 5);
            y += 11;
            if (edu.details) {
                doc.setFont('times', 'normal');
                doc.setFontSize(9);
                doc.setTextColor(60, 60, 60);
                const lines = doc.splitTextToSize(edu.details, pw - m - 15);
                doc.text(lines, m + 7, y);
                y += lines.length * 4 + 6;
            }
        });
        y += 5;
    }
    
    // Habilidades
    if (d.skills.length > 0) {
        if (y > ph - 30) { doc.addPage(); y = 20; }
        doc.setFontSize(13);
        doc.setFont('times', 'bold');
        doc.setTextColor(55, 48, 163);
        doc.text('HABILIDADES', m, y);
        y += 8;
        doc.setFontSize(9);
        doc.setFont('times', 'normal');
        doc.setTextColor(60, 60, 60);
        const skills = d.skills.join(' • ');
        const lines = doc.splitTextToSize(skills, pw - 2*m);
        doc.text(lines, m, y);
        y += lines.length * 4 + 10;
    }
    
    // Idiomas
    if (d.languages.length > 0 && y < ph - 25) {
        doc.setFontSize(13);
        doc.setFont('times', 'bold');
        doc.setTextColor(55, 48, 163);
        doc.text('IDIOMAS', m, y);
        y += 8;
        doc.setFontSize(9);
        doc.setFont('times', 'normal');
        doc.setTextColor(60, 60, 60);
        d.languages.forEach(lang => {
            doc.text(`${lang.language}: ${lang.level || '—'}`, m, y);
            y += 5;
        });
    }
}

function genTimeline(doc, d) {
    const pw = doc.internal.pageSize.getWidth();
    const ph = doc.internal.pageSize.getHeight();
    const m = 20;
    const lineX = 35;
    let y = 25;
    
    // Header
    doc.setFillColor(14, 165, 233);
    doc.rect(0, 0, pw, 45, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(26);
    doc.setFont('helvetica', 'bold');
    doc.text(d.personalInfo.fullName, m, 22);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const contact = [d.personalInfo.email, d.personalInfo.phone, d.personalInfo.location].filter(Boolean).join(' • ');
    doc.text(contact, m, 35);
    
    y = 60;
    doc.setTextColor(0, 0, 0);
    
    // Resumen
    if (d.personalInfo.summary) {
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        const lines = doc.splitTextToSize(d.personalInfo.summary, pw - 2*m);
        doc.text(lines, m, y);
        y += lines.length * 5 + 15;
    }
    
    // Experiencia con timeline
    if (d.experiences.length > 0) {
        if (y > ph - 40) { doc.addPage(); y = 20; }
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(14, 165, 233);
        doc.text('EXPERIENCIA', m, y);
        y += 12;
        
        d.experiences.forEach((exp, idx) => {
            if (y > ph - 60) { doc.addPage(); y = 20; }
            
            // Línea vertical
            const lineStart = y - 5;
            const lineEnd = y + 20;
            doc.setDrawColor(14, 165, 233);
            doc.setLineWidth(2);
            doc.line(lineX, lineStart, lineX, lineEnd);
            
            // Círculo en la línea
            doc.setFillColor(14, 165, 233);
            doc.circle(lineX, y, 3, 'F');
            
            // Contenido
            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text(exp.position || 'Puesto', lineX + 8, y);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(100, 100, 100);
            doc.text(`${exp.company || ''} | ${exp.period || ''}`, lineX + 8, y + 5);
            y += 11;
            if (exp.description) {
                doc.setFontSize(9);
                doc.setTextColor(60, 60, 60);
                const lines = doc.splitTextToSize(exp.description, pw - lineX - 15);
                doc.text(lines, lineX + 8, y);
                y += lines.length * 4 + 8;
            } else {
                y += 5;
            }
        });
        y += 10;
    }
    
    // Educación con timeline
    if (d.education.length > 0) {
        if (y > ph - 40) { doc.addPage(); y = 20; }
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(14, 165, 233);
        doc.text('EDUCACIÓN', m, y);
        y += 12;
        
        d.education.forEach(edu => {
            if (y > ph - 50) { doc.addPage(); y = 20; }
            
            const lineStart = y - 5;
            const lineEnd = y + 15;
            doc.setDrawColor(14, 165, 233);
            doc.setLineWidth(2);
            doc.line(lineX, lineStart, lineX, lineEnd);
            
            doc.setFillColor(14, 165, 233);
            doc.circle(lineX, y, 3, 'F');
            
            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text(edu.degree || 'Título', lineX + 8, y);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(100, 100, 100);
            doc.text(`${edu.institution || ''} | ${edu.year || ''}`, lineX + 8, y + 5);
            y += 15;
        });
        y += 10;
    }
    
    // Habilidades e Idiomas
    if (d.skills.length > 0) {
        if (y > ph - 30) { doc.addPage(); y = 20; }
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(14, 165, 233);
        doc.text('HABILIDADES', m, y);
        y += 8;
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(60, 60, 60);
        const skills = d.skills.join(' • ');
        const lines = doc.splitTextToSize(skills, pw - 2*m);
        doc.text(lines, m, y);
        y += lines.length * 4 + 10;
    }
    
    if (d.languages.length > 0 && y < ph - 25) {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(14, 165, 233);
        doc.text('IDIOMAS', m, y);
        y += 8;
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(60, 60, 60);
        d.languages.forEach(lang => {
            doc.text(`${lang.language}: ${lang.level || '—'}`, m, y);
            y += 5;
        });
    }
}

function genRightBar(doc, d) {
    const pw = doc.internal.pageSize.getWidth();
    const ph = doc.internal.pageSize.getHeight();
    const sw = 65;
    const sidebarX = pw - sw;
    const m = 20;
    
    // Sidebar derecho rosa
    doc.setFillColor(225, 29, 72);
    doc.rect(sidebarX, 0, sw, ph, 'F');
    
    // Header
    doc.setFillColor(225, 29, 72);
    doc.rect(0, 0, sidebarX, 45, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(d.personalInfo.fullName, m, 22);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(d.personalInfo.email || '', m, 31);
    doc.text([d.personalInfo.phone, d.personalInfo.location].filter(Boolean).join(' | '), m, 38);
    
    // Sidebar - Habilidades
    let sy = 55;
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('HABILIDADES', sidebarX + 8, sy);
    sy += 10;
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    d.skills.forEach(skill => {
        if (sy > ph - 20) return;
        const lines = doc.splitTextToSize(skill, sw - 16);
        doc.text(lines, sidebarX + 8, sy);
        sy += lines.length * 4 + 4;
    });
    
    // Sidebar - Idiomas
    sy += 10;
    if (sy < ph - 40) {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('IDIOMAS', sidebarX + 8, sy);
        sy += 10;
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        d.languages.forEach(lang => {
            if (sy > ph - 10) return;
            doc.text(lang.language, sidebarX + 8, sy);
            doc.setFontSize(7);
            doc.text(lang.level || '—', sidebarX + 8, sy + 3);
            sy += 11;
            doc.setFontSize(8);
        });
    }
    
    // Contenido principal (izquierda)
    let my = 55;
    doc.setTextColor(0, 0, 0);
    
    if (d.personalInfo.summary) {
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        const lines = doc.splitTextToSize(d.personalInfo.summary, sidebarX - m - 10);
        doc.text(lines, m, my);
        my += lines.length * 5 + 12;
    }
    
    // Experiencia
    if (d.experiences.length > 0) {
        if (my > ph - 40) { doc.addPage(); my = 20; }
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(225, 29, 72);
        doc.text('EXPERIENCIA', m, my);
        my += 10;
        
        d.experiences.forEach(exp => {
            if (my > ph - 50) { doc.addPage(); my = 20; }
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text(exp.position || 'Puesto', m, my);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(100, 100, 100);
            doc.text(`${exp.company || ''} | ${exp.period || ''}`, m, my + 5);
            my += 13;
        });
    }
    
    // Educación
    if (d.education.length > 0) {
        my += 5;
        if (my > ph - 40) { doc.addPage(); my = 20; }
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(225, 29, 72);
        doc.text('EDUCACIÓN', m, my);
        my += 10;
        
        d.education.forEach(edu => {
            if (my > ph - 40) { doc.addPage(); my = 20; }
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text(edu.degree || 'Título', m, my);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(100, 100, 100);
            doc.text(`${edu.institution || ''} | ${edu.year || ''}`, m, my + 5);
            my += 13;
        });
    }
}

function genBlocks(doc, d) {
    const pw = doc.internal.pageSize.getWidth();
    const ph = doc.internal.pageSize.getHeight();
    const m = 20;
    let y = 20;
    
    // Header con bloques de color
    const blockW = pw / 3;
    doc.setFillColor(20, 184, 166); // Teal
    doc.rect(0, 0, blockW, 15, 'F');
    doc.setFillColor(250, 204, 21); // Amarillo
    doc.rect(blockW, 0, blockW, 15, 'F');
    doc.setFillColor(168, 85, 247); // Púrpura
    doc.rect(blockW * 2, 0, blockW, 15, 'F');
    
    // Nombre
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text(d.personalInfo.fullName, m, 35);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    const contact = [d.personalInfo.email, d.personalInfo.phone, d.personalInfo.location].filter(Boolean).join(' • ');
    doc.text(contact, m, 45);
    
    y = 60;
    
    // Resumen
    if (d.personalInfo.summary) {
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        const lines = doc.splitTextToSize(d.personalInfo.summary, pw - 2*m);
        doc.text(lines, m, y);
        y += lines.length * 5 + 12;
    }
    
    // Experiencia con bloque teal
    if (d.experiences.length > 0) {
        if (y > ph - 40) { doc.addPage(); y = 20; }
        
        // Bloque de color
        doc.setFillColor(20, 184, 166);
        doc.rect(m - 5, y - 8, 5, 12, 'F');
        
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(20, 184, 166);
        doc.text('EXPERIENCIA', m + 3, y);
        y += 10;
        
        d.experiences.forEach(exp => {
            if (y > ph - 50) { doc.addPage(); y = 20; }
            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text(exp.position || 'Puesto', m + 3, y);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(100, 100, 100);
            doc.text(`${exp.company || ''} | ${exp.period || ''}`, m + 3, y + 5);
            y += 11;
            if (exp.description) {
                doc.setFontSize(9);
                doc.setTextColor(60, 60, 60);
                const lines = doc.splitTextToSize(exp.description, pw - m - 10);
                doc.text(lines, m + 3, y);
                y += lines.length * 4 + 6;
            }
        });
        y += 5;
    }
    
    // Educación con bloque púrpura
    if (d.education.length > 0) {
        if (y > ph - 40) { doc.addPage(); y = 20; }
        
        doc.setFillColor(168, 85, 247);
        doc.rect(m - 5, y - 8, 5, 12, 'F');
        
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(168, 85, 247);
        doc.text('EDUCACIÓN', m + 3, y);
        y += 10;
        
        d.education.forEach(edu => {
            if (y > ph - 40) { doc.addPage(); y = 20; }
            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text(edu.degree || 'Título', m + 3, y);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(100, 100, 100);
            doc.text(`${edu.institution || ''} | ${edu.year || ''}`, m + 3, y + 5);
            y += 13;
        });
        y += 5;
    }
    
    // Habilidades con bloque amarillo
    if (d.skills.length > 0) {
        if (y > ph - 30) { doc.addPage(); y = 20; }
        
        doc.setFillColor(250, 204, 21);
        doc.rect(m - 5, y - 8, 5, 12, 'F');
        
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(202, 138, 4);
        doc.text('HABILIDADES', m + 3, y);
        y += 8;
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(60, 60, 60);
        const skills = d.skills.join(' • ');
        const lines = doc.splitTextToSize(skills, pw - m - 10);
        doc.text(lines, m + 3, y);
        y += lines.length * 4 + 10;
    }
    
    // Idiomas
    if (d.languages.length > 0 && y < ph - 25) {
        doc.setFillColor(20, 184, 166);
        doc.rect(m - 5, y - 8, 5, 12, 'F');
        
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(20, 184, 166);
        doc.text('IDIOMAS', m + 3, y);
        y += 8;
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(60, 60, 60);
        d.languages.forEach(lang => {
            doc.text(`${lang.language}: ${lang.level || '—'}`, m + 3, y);
            y += 5;
        });
    }
}
    </script>

</body>
