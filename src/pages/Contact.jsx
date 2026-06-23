import { useState } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/Contact.css';

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);

const MsgIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 2-7 20-4-9-9-4 20-7z"/>
    <path d="M22 2 11 13"/>
  </svg>
);

const EMAILJS_SERVICE_ID  = 'service_7hpf0zl';
const EMAILJS_TEMPLATE_ID = 'template_iw22vu9';
const EMAILJS_PUBLIC_KEY  = 'zkD-GXTmMim-ahN7m';

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', subject: '', message: '',
  });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Name is required';
    if (!form.email.trim())   e.email   = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleChange = (k, v) => {
    setForm(prev => ({ ...prev, [k]: v }));
    if (errors[k]) setErrors(prev => ({ ...prev, [k]: '' }));
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setStatus('sending');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          subject:    form.subject || '(No subject)',
          message:    form.message,
          to_name:    'Mehak',
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch  {
      setStatus('error');
    }
  };

  return (
    <div className="page">
      <div className="container">

        {/* Header */}
        <div className="section-header reveal">
          <p className="section-tag">Get In Touch</p>
          <h2 className="section-title">Contact</h2>
          
        </div>

        {/* Intro line */}
        <p className="contact-intro reveal">
          I am currently open to new opportunities. Whether you have a question,
          a project idea, or just want to say hi — my inbox is always open.
        </p>

        {/* Form card — full width */}
        <div className="glass contact-form-card reveal">

          <h3 className="contact-form-title">Send a Message</h3>

          {/* Name + Email */}
          <div className="contact-row">
            <div className="contact-field">
              <label className="contact-label">
                <span className="contact-label-icon"><UserIcon /></span>
                Name *
              </label>
              <input
                className={`contact-input ${errors.name ? 'contact-input-err' : ''}`}
                placeholder="Your full name"
                value={form.name}
                onChange={e => handleChange('name', e.target.value)}
              />
              {errors.name && <span className="contact-err">{errors.name}</span>}
            </div>

            <div className="contact-field">
              <label className="contact-label">
                <span className="contact-label-icon"><EmailIcon /></span>
                Email *
              </label>
              <input
                className={`contact-input ${errors.email ? 'contact-input-err' : ''}`}
                placeholder="your@email.com"
                value={form.email}
                onChange={e => handleChange('email', e.target.value)}
              />
              {errors.email && <span className="contact-err">{errors.email}</span>}
            </div>
          </div>

          {/* Subject */}
          <div className="contact-field">
            <label className="contact-label">Subject</label>
            <input
              className="contact-input"
              placeholder="What is this about? (optional)"
              value={form.subject}
              onChange={e => handleChange('subject', e.target.value)}
            />
          </div>

          {/* Message */}
          <div className="contact-field">
            <label className="contact-label">
              <span className="contact-label-icon"><MsgIcon /></span>
              Message *
            </label>
            <textarea
              className={`contact-input contact-textarea ${errors.message ? 'contact-input-err' : ''}`}
              placeholder="Write your message here..."
              rows={6}
              value={form.message}
              onChange={e => handleChange('message', e.target.value)}
            />
            {errors.message && <span className="contact-err">{errors.message}</span>}
          </div>

          {/* Submit */}
          <button
            className="contact-submit"
            onClick={handleSubmit}
            disabled={status === 'sending'}
          >
            {status === 'sending' ? (
              <>
                <span className="contact-spinner" />
                Sending...
              </>
            ) : (
              <>
                <SendIcon />
                Send Message
              </>
            )}
          </button>

          {status === 'success' && (
            <div className="contact-success">
              Message sent successfully! I will get back to you soon.
            </div>
          )}

          {status === 'error' && (
            <div className="contact-error">
              Something went wrong. Please try again or email me directly.
            </div>
          )}

        </div>
      </div>
    </div>
  );
}