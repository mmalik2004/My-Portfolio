/* generateResume.js
   Builds a clean resume HTML page from portfolio context data,
   opens it in a new tab, and triggers browser print → Save as PDF.
   No libraries needed — works in all browsers.
*/

export function generateResumePDF(data) {
  const name     = data.name     || 'Your Name';
  const tagline  = data.tagline  || '';
  const email    = data.email    || '';
  const github   = data.github   || '';
  const linkedin = data.linkedin || '';
  const location = data.location || '';
  const bio      = data.bio      || '';

  /* ── Skills ── */
  const skillsHTML = (data.skillGroups || []).map((g) => `
    <div class="section-block">
      <span class="skill-cat">${g.category}:</span>
      <span class="skill-list">${(g.skills || []).join(', ')}</span>
    </div>`).join('');

  /* ── Experience ── */
  const expHTML = (data.experience || []).map((e) => `
    <div class="entry">
      <div class="entry-header">
        <div>
          <strong>${e.role}</strong>
          <span class="entry-company"> · ${e.company}</span>
        </div>
        <div class="entry-period">${e.period || ''}${e.type === 'active' ? ' (Current)' : ''}</div>
      </div>
      ${(e.bullets || []).length ? `<ul>${(e.bullets).map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
      ${(e.tags || []).length ? `<div class="tags">${e.tags.map(t=>`<span>${t}</span>`).join('')}</div>` : ''}
    </div>`).join('');

  /* ── Projects ── */
  const projHTML = (data.projects || []).map((p) => `
    <div class="entry">
      <div class="entry-header">
        <strong>${p.title}</strong>
        <div class="entry-period">${p.date || ''}</div>
      </div>
      ${p.desc ? `<p class="entry-desc">${p.desc}</p>` : ''}
      ${(p.tags || []).length ? `<div class="tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div>` : ''}
      ${p.github ? `<div class="entry-link">GitHub: ${p.github}</div>` : ''}
    </div>`).join('');

  /* ── Education ── */
  const eduHTML = (data.education || []).map((e) => `
    <div class="entry">
      <div class="entry-header">
        <strong>${e.degree}</strong>
        <div class="entry-period">${e.period || ''}</div>
      </div>
      <div class="entry-company">${e.school}${e.grade ? ` · ${e.grade}` : ''}</div>
      ${e.desc ? `<p class="entry-desc">${e.desc}</p>` : ''}
    </div>`).join('');

  /* ── Achievements ── */
  const achHTML = (data.achievements || []).length ? `
    <ul>${(data.achievements).map(a => `<li>${a.text}</li>`).join('')}</ul>` : '';

  /* ── Full HTML ── */
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>${name} — Resume</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      font-size: 13px; color: #1a1a2e;
      padding: 36px 44px; line-height: 1.55;
      max-width: 820px; margin: 0 auto;
    }
    /* Header */
    .resume-header { border-bottom: 2px solid #7c3aed; padding-bottom: 14px; margin-bottom: 18px; }
    .resume-name   { font-size: 28px; font-weight: 800; color: #1a1a2e; letter-spacing: -0.5px; }
    .resume-role   { font-size: 14px; color: #7c3aed; font-weight: 600; margin-top: 3px; }
    .resume-contact {
      display: flex; flex-wrap: wrap; gap: 16px; margin-top: 10px;
      font-size: 12px; color: #555;
    }
    .resume-contact span { display: flex; align-items: center; gap: 4px; }

    /* Section */
    .section { margin-bottom: 20px; }
    .section-title {
      font-size: 12px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 1.5px; color: #7c3aed;
      border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; margin-bottom: 10px;
    }

    /* Skills */
    .section-block { margin-bottom: 5px; }
    .skill-cat  { font-weight: 700; color: #374151; }
    .skill-list { color: #4b5563; }

    /* Entries */
    .entry { margin-bottom: 12px; }
    .entry-header { display: flex; justify-content: space-between; align-items: baseline; }
    .entry-company{ color: #6b7280; font-size: 12px; margin-top: 1px; }
    .entry-period  { font-size: 11px; color: #9ca3af; white-space: nowrap; margin-left: 12px; }
    .entry-desc   { font-size: 12px; color: #4b5563; margin-top: 4px; line-height: 1.5; }
    .entry-link   { font-size: 11px; color: #7c3aed; margin-top: 3px; }
    ul { padding-left: 16px; margin-top: 5px; }
    li { font-size: 12px; color: #4b5563; margin-bottom: 3px; }
    .tags { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 6px; }
    .tags span {
      font-size: 10px; background: #f3f0ff; color: #7c3aed;
      padding: 2px 8px; border-radius: 999px; border: 1px solid #e0d9ff;
    }

    /* Print */
    @media print {
      body { padding: 20px 28px; }
      @page { margin: 0.5cm; }
    }
  </style>
</head>
<body>
  <!-- Header -->
  <div class="resume-header">
    <div class="resume-name">${name}</div>
    <div class="resume-role">${tagline}</div>
    <div class="resume-contact">
      ${email    ? `<span>✉ ${email}</span>` : ''}
      ${location ? `<span>📍 ${location}</span>` : ''}
      ${github   ? `<span>⌥ ${github}</span>` : ''}
      ${linkedin ? `<span>in ${linkedin}</span>` : ''}
    </div>
  </div>

  ${bio ? `
  <div class="section">
    <div class="section-title">Summary</div>
    <p style="font-size:12.5px;color:#4b5563">${bio}</p>
  </div>` : ''}

  ${skillsHTML ? `
  <div class="section">
    <div class="section-title">Technical Skills</div>
    ${skillsHTML}
  </div>` : ''}

  ${expHTML ? `
  <div class="section">
    <div class="section-title">Experience</div>
    ${expHTML}
  </div>` : ''}

  ${projHTML ? `
  <div class="section">
    <div class="section-title">Projects</div>
    ${projHTML}
  </div>` : ''}

  ${eduHTML ? `
  <div class="section">
    <div class="section-title">Education</div>
    ${eduHTML}
  </div>` : ''}

  ${achHTML ? `
  <div class="section">
    <div class="section-title">Achievements</div>
    ${achHTML}
  </div>` : ''}

  <script>
    window.onload = function() {
      setTimeout(function() { window.print(); }, 400);
    };
  </script>
</body>
</html>`;

  /* Open in new tab and trigger print dialog (Save as PDF) */
  const blob = new Blob([html], { type: 'text/html' });
  const url  = URL.createObjectURL(blob);
  const win  = window.open(url, '_blank');
  if (!win) alert('Please allow popups to generate your resume PDF.');
}