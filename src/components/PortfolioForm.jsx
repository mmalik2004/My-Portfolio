import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import '../styles/PortfolioForm.css';


const STEPS = ['Basic Info', 'Skills', 'Projects', 'Experience', 'Education'];

const EMPTY_PROJECT = { title: '', bullets: ['', '', ''], tags: '', github: '' };
const EMPTY_EXP     = { role: '', company: '', period: '', bullets: ['', '', ''], tags: '' };
const EMPTY_EDU     = { degree: '', school: '', period: '', grade: '', desc: '' };

function StepIndicator({ current }) {
  return (
    <div className="pf-steps">
      {STEPS.map((s, i) => (
        <div key={s} className={`pf-step ${i === current ? 'active' : ''} ${i < current ? 'done' : ''}`}>
          <div className="pf-step-dot">{i < current ? '✓' : i + 1}</div>
          <span className="pf-step-label">{s}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Step 0: Basic Info ── */
function StepBasic({ data, onChange }) {
  return (
    <div className="pf-fields">
      <div className="pf-field">
        <label>Full Name *</label>
        <input placeholder="e.g. Rahul Sharma" value={data.name} onChange={e => onChange('name', e.target.value)} />
      </div>
      <div className="pf-field">
        <label>Role / Title *</label>
        <input placeholder="e.g. Full Stack Developer" value={data.role} onChange={e => onChange('role', e.target.value)} />
      </div>
      <div className="pf-field">
        <label>Short Bio *</label>
        <textarea rows={3} placeholder="Write a 2-3 line intro about yourself..." value={data.bio} onChange={e => onChange('bio', e.target.value)} />
      </div>
      <div className="pf-row">
        <div className="pf-field">
          <label>Email</label>
          <input placeholder="you@example.com" value={data.email} onChange={e => onChange('email', e.target.value)} />
        </div>
        <div className="pf-field">
          <label>Location</label>
          <input placeholder="City, State, Country" value={data.location} onChange={e => onChange('location', e.target.value)} />
        </div>
      </div>
      <div className="pf-row">
        <div className="pf-field">
          <label>GitHub URL</label>
          <input placeholder="https://github.com/..." value={data.github} onChange={e => onChange('github', e.target.value)} />
        </div>
        <div className="pf-field">
          <label>LinkedIn URL</label>
          <input placeholder="https://linkedin.com/in/..." value={data.linkedin} onChange={e => onChange('linkedin', e.target.value)} />
        </div>
      </div>
      <div className="pf-row">
        <div className="pf-field">
          <label>Stat 1 (e.g. 500+ DSA Problems)</label>
          <input placeholder="500+" value={data.stat1n} onChange={e => onChange('stat1n', e.target.value)} />
          <input style={{marginTop:6}} placeholder="label e.g. DSA Problems" value={data.stat1l} onChange={e => onChange('stat1l', e.target.value)} />
        </div>
        <div className="pf-field">
          <label>Stat 2 (e.g. CGPA)</label>
          <input placeholder="8.00" value={data.stat2n} onChange={e => onChange('stat2n', e.target.value)} />
          <input style={{marginTop:6}} placeholder="label e.g. CGPA" value={data.stat2l} onChange={e => onChange('stat2l', e.target.value)} />
        </div>
        <div className="pf-field">
          <label>Stat 3 (optional)</label>
          <input placeholder="AIR 10K" value={data.stat3n} onChange={e => onChange('stat3n', e.target.value)} />
          <input style={{marginTop:6}} placeholder="label e.g. JEE Rank" value={data.stat3l} onChange={e => onChange('stat3l', e.target.value)} />
        </div>
      </div>
    </div>
  );
}

/* ── Step 1: Skills ── */
function StepSkills({ data, onChange }) {
  const groups = data.skillGroups;

  const updateGroup = (gi, field, val) => {
    const updated = groups.map((g, i) => i === gi ? { ...g, [field]: val } : g);
    onChange('skillGroups', updated);
  };

  const addGroup = () => onChange('skillGroups', [...groups, { title: '', skills: '' }]);
  const removeGroup = (gi) => onChange('skillGroups', groups.filter((_, i) => i !== gi));

  return (
    <div className="pf-fields">
      <p className="pf-hint">Add skill categories (e.g. Languages, Frameworks, Tools). Separate skills with commas.</p>
      {groups.map((g, gi) => (
        <div key={gi} className="pf-card">
          <div className="pf-card-header">
            <span className="pf-card-num">Group {gi + 1}</span>
            {groups.length > 1 && (
              <button className="pf-remove" onClick={() => removeGroup(gi)}>Remove</button>
            )}
          </div>
          <div className="pf-field">
            <label>Category Name</label>
            <input placeholder="e.g. Languages" value={g.title} onChange={e => updateGroup(gi, 'title', e.target.value)} />
          </div>
          <div className="pf-field">
            <label>Skills (comma separated)</label>
            <input placeholder="JavaScript, Python, Java" value={g.skills} onChange={e => updateGroup(gi, 'skills', e.target.value)} />
          </div>
        </div>
      ))}
      <button className="pf-add-btn" onClick={addGroup}>+ Add Skill Group</button>
    </div>
  );
}

/* ── Step 2: Projects ── */
function StepProjects({ data, onChange }) {
  const projects = data.projects;

  const updateProject = (pi, field, val) => {
    const updated = projects.map((p, i) => i === pi ? { ...p, [field]: val } : p);
    onChange('projects', updated);
  };

  const updateBullet = (pi, bi, val) => {
    const updated = projects.map((p, i) => {
      if (i !== pi) return p;
      const bullets = p.bullets.map((b, j) => j === bi ? val : b);
      return { ...p, bullets };
    });
    onChange('projects', updated);
  };

  const addProject = () => onChange('projects', [...projects, { ...EMPTY_PROJECT, bullets: ['', '', ''] }]);
  const removeProject = (pi) => onChange('projects', projects.filter((_, i) => i !== pi));

  return (
    <div className="pf-fields">
      {projects.map((p, pi) => (
        <div key={pi} className="pf-card">
          <div className="pf-card-header">
            <span className="pf-card-num">Project {pi + 1}</span>
            {projects.length > 1 && (
              <button className="pf-remove" onClick={() => removeProject(pi)}>Remove</button>
            )}
          </div>
          <div className="pf-row">
            <div className="pf-field">
              <label>Project Title *</label>
              <input placeholder="e.g. Chat App" value={p.title} onChange={e => updateProject(pi, 'title', e.target.value)} />
            </div>
            <div className="pf-field">
              <label>Date</label>
              <input placeholder="e.g. Oct 2025" value={p.date} onChange={e => updateProject(pi, 'date', e.target.value)} />
            </div>
          </div>
          <div className="pf-field">
            <label>Description Points (up to 3)</label>
            {p.bullets.map((b, bi) => (
              <input key={bi} style={{marginBottom:6}} placeholder={`Point ${bi + 1}`} value={b} onChange={e => updateBullet(pi, bi, e.target.value)} />
            ))}
          </div>
          <div className="pf-row">
            <div className="pf-field">
              <label>Tech Tags (comma separated)</label>
              <input placeholder="React, Node.js, MongoDB" value={p.tags} onChange={e => updateProject(pi, 'tags', e.target.value)} />
            </div>
            <div className="pf-field">
              <label>GitHub Link</label>
              <input placeholder="https://github.com/..." value={p.github} onChange={e => updateProject(pi, 'github', e.target.value)} />
            </div>
          </div>
        </div>
      ))}
      <button className="pf-add-btn" onClick={addProject}>+ Add Project</button>
    </div>
  );
}

/* ── Step 3: Experience ── */
function StepExperience({ data, onChange }) {
  const exps = data.experiences;

  const update = (ei, field, val) => {
    onChange('experiences', exps.map((e, i) => i === ei ? { ...e, [field]: val } : e));
  };

  const updateBullet = (ei, bi, val) => {
    onChange('experiences', exps.map((e, i) => {
      if (i !== ei) return e;
      return { ...e, bullets: e.bullets.map((b, j) => j === bi ? val : b) };
    }));
  };

  const add = () => onChange('experiences', [...exps, { ...EMPTY_EXP, bullets: ['', '', ''] }]);
  const remove = (ei) => onChange('experiences', exps.filter((_, i) => i !== ei));

  return (
    <div className="pf-fields">
      <p className="pf-hint">Leave empty if no experience yet — that section will be hidden.</p>
      {exps.map((e, ei) => (
        <div key={ei} className="pf-card">
          <div className="pf-card-header">
            <span className="pf-card-num">Experience {ei + 1}</span>
            {exps.length > 1 && <button className="pf-remove" onClick={() => remove(ei)}>Remove</button>}
          </div>
          <div className="pf-row">
            <div className="pf-field">
              <label>Role / Position *</label>
              <input placeholder="e.g. SDE Intern" value={e.role} onChange={ev => update(ei, 'role', ev.target.value)} />
            </div>
            <div className="pf-field">
              <label>Company *</label>
              <input placeholder="e.g. Google" value={e.company} onChange={ev => update(ei, 'company', ev.target.value)} />
            </div>
          </div>
          <div className="pf-row">
            <div className="pf-field">
              <label>Period</label>
              <input placeholder="e.g. May 2025 - Present" value={e.period} onChange={ev => update(ei, 'period', ev.target.value)} />
            </div>
            <div className="pf-field">
              <label>Status Badge</label>
              <input placeholder="Currently Working / Completed" value={e.badge} onChange={ev => update(ei, 'badge', ev.target.value)} />
            </div>
          </div>
          <div className="pf-field">
            <label>Description Points</label>
            {e.bullets.map((b, bi) => (
              <input key={bi} style={{marginBottom:6}} placeholder={`Point ${bi + 1}`} value={b} onChange={ev => updateBullet(ei, bi, ev.target.value)} />
            ))}
          </div>
          <div className="pf-field">
            <label>Tech Tags (comma separated)</label>
            <input placeholder="React, Node.js" value={e.tags} onChange={ev => update(ei, 'tags', ev.target.value)} />
          </div>
        </div>
      ))}
      <button className="pf-add-btn" onClick={add}>+ Add Experience</button>
    </div>
  );
}

/* ── Step 4: Education ── */
function StepEducation({ data, onChange }) {
  const edus = data.education;

  const update = (i, field, val) => {
    onChange('education', edus.map((e, idx) => idx === i ? { ...e, [field]: val } : e));
  };

  const add = () => onChange('education', [...edus, { ...EMPTY_EDU }]);
  const remove = (i) => onChange('education', edus.filter((_, idx) => idx !== i));

  return (
    <div className="pf-fields">
      {edus.map((e, i) => (
        <div key={i} className="pf-card">
          <div className="pf-card-header">
            <span className="pf-card-num">Education {i + 1}</span>
            {edus.length > 1 && <button className="pf-remove" onClick={() => remove(i)}>Remove</button>}
          </div>
          <div className="pf-row">
            <div className="pf-field">
              <label>Degree / Level *</label>
              <input placeholder="e.g. B.Tech Computer Engineering" value={e.degree} onChange={ev => update(i, 'degree', ev.target.value)} />
            </div>
            <div className="pf-field">
              <label>School / University *</label>
              <input placeholder="e.g. IIT Delhi" value={e.school} onChange={ev => update(i, 'school', ev.target.value)} />
            </div>
          </div>
          <div className="pf-row">
            <div className="pf-field">
              <label>Period</label>
              <input placeholder="e.g. 2022 - Present" value={e.period} onChange={ev => update(i, 'period', ev.target.value)} />
            </div>
            <div className="pf-field">
              <label>Grade / CGPA / Percentage</label>
              <input placeholder="e.g. CGPA: 8.40" value={e.grade} onChange={ev => update(i, 'grade', ev.target.value)} />
            </div>
          </div>
          <div className="pf-field">
            <label>Short Description</label>
            <input placeholder="One line about this degree..." value={e.desc} onChange={ev => update(i, 'desc', ev.target.value)} />
          </div>
        </div>
      ))}
      <button className="pf-add-btn" onClick={add}>+ Add Education</button>
    </div>
  );
}

/* ── Main Form ── */
export default function PortfolioForm({ onClose }) {
  const { setUserData } = usePortfolio();
  const [step, setStep] = useState(0);

  const [basic, setBasic] = useState({
    name: '', role: '', bio: '', email: '', location: '', github: '', linkedin: '',
    stat1n: '', stat1l: '', stat2n: '', stat2l: '', stat3n: '', stat3l: '',
  });
  const [skills, setSkills] = useState({
    skillGroups: [{ title: '', skills: '' }],
  });
  const [projects, setProjects] = useState({
    projects: [{ ...EMPTY_PROJECT, bullets: ['', '', ''] }],
  });
  const [experience, setExperience] = useState({
    experiences: [{ ...EMPTY_EXP, bullets: ['', '', ''] }],
  });
  const [education, setEducation] = useState({
    education: [{ ...EMPTY_EDU }],
  });

  const updateBasic = (k, v) => setBasic(prev => ({ ...prev, [k]: v }));
  const updateSkills = (k, v) => setSkills(prev => ({ ...prev, [k]: v }));
  const updateProjects = (k, v) => setProjects(prev => ({ ...prev, [k]: v }));
  const updateExperience = (k, v) => setExperience(prev => ({ ...prev, [k]: v }));
  const updateEducation = (k, v) => setEducation(prev => ({ ...prev, [k]: v }));

  const canNext = () => {
    if (step === 0) return basic.name.trim() && basic.role.trim() && basic.bio.trim();
    return true;
  };

  const handleSubmit = () => {
    const stats = [];
    if (basic.stat1n) stats.push({ n: basic.stat1n, l: basic.stat1l });
    if (basic.stat2n) stats.push({ n: basic.stat2n, l: basic.stat2l });
    if (basic.stat3n) stats.push({ n: basic.stat3n, l: basic.stat3l });

    setUserData({
      name: basic.name,
      role: basic.role,
      bio: basic.bio,
      email: basic.email,
      location: basic.location,
      github: basic.github,
      linkedin: basic.linkedin,
      stats,
      skillGroups: skills.skillGroups.filter(g => g.title.trim()),
      projects: projects.projects.filter(p => p.title.trim()),
      experiences: experience.experiences.filter(e => e.role.trim() && e.company.trim()),
      education: education.education.filter(e => e.degree.trim()),
    });
    onClose();
  };

  const steps = [
    <StepBasic      data={basic}      onChange={updateBasic}      />,
    <StepSkills     data={skills}     onChange={updateSkills}     />,
    <StepProjects   data={projects}   onChange={updateProjects}   />,
    <StepExperience data={experience} onChange={updateExperience} />,
    <StepEducation  data={education}  onChange={updateEducation}  />,
  ];

  return (
    <div className="pf-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="pf-modal">

        {/* Header */}
        <div className="pf-header">
          <h2 className="pf-title">Build Your Portfolio</h2>
          <button className="pf-close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Steps */}
        <StepIndicator current={step} />

        {/* Step content */}
        <div className="pf-content">
          <h3 className="pf-step-title">{STEPS[step]}</h3>
          {steps[step]}
        </div>

        {/* Footer nav */}
        <div className="pf-footer">
          {step > 0 && (
            <button className="pf-btn-secondary" onClick={() => setStep(s => s - 1)}>Back</button>
          )}
          <div style={{ flex: 1 }} />
          {step < STEPS.length - 1 ? (
            <button
              className="pf-btn-primary"
              onClick={() => setStep(s => s + 1)}
              disabled={!canNext()}
            >
              Next
            </button>
          ) : (
            <button className="pf-btn-primary" onClick={handleSubmit}>
              Generate Portfolio
            </button>
          )}
        </div>

      </div>
    </div>
  );
}