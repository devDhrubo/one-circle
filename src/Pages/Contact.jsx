import { useState } from 'react';

const socialLinks = [
  { name: 'Facebook', url: 'https://facebook.com', icon: '📘' },
  { name: 'Instagram', url: 'https://instagram.com', icon: '📸' },
  { name: 'Twitter', url: 'https://twitter.com', icon: '🐦' },
];

const faqs = [
  {
    q: 'How do I become a member?',
    a: 'Fill out the registration form on our website and await approval.'
  },
  {
    q: 'How can I participate in events?',
    a: 'Check the Events section and register for upcoming activities.'
  },
  {
    q: 'Who do I contact for urgent support?',
    a: 'Use this form or reach out via our social media channels.'
  }
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Simulate sending email and acknowledgment
    setSubmitted(true);
    // Here you would trigger backend email logic
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 32, fontFamily: 'Segoe UI, sans-serif' }}>
      <h2 style={{ color: '#6366f1', fontWeight: 700, fontSize: 32 }}>Contact & Support</h2>
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 320 }}>
          <form onSubmit={handleSubmit} style={{ background: '#f3f4f6', borderRadius: 16, padding: 24, boxShadow: '0 2px 12px #6366f133' }}>
            <label style={{ fontWeight: 600 }}>Name:
              <input type="text" name="name" value={form.name} onChange={handleChange} required style={{ width: '100%', margin: '8px 0 16px', padding: 8, borderRadius: 6, border: '1px solid #6366f1' }} />
            </label>
            <label style={{ fontWeight: 600 }}>Email:
              <input type="email" name="email" value={form.email} onChange={handleChange} required style={{ width: '100%', margin: '8px 0 16px', padding: 8, borderRadius: 6, border: '1px solid #6366f1' }} />
            </label>
            <label style={{ fontWeight: 600 }}>Subject:
              <input type="text" name="subject" value={form.subject} onChange={handleChange} required style={{ width: '100%', margin: '8px 0 16px', padding: 8, borderRadius: 6, border: '1px solid #6366f1' }} />
            </label>
            <label style={{ fontWeight: 600 }}>Message:
              <textarea name="message" value={form.message} onChange={handleChange} required rows={4} style={{ width: '100%', margin: '8px 0 16px', padding: 8, borderRadius: 6, border: '1px solid #6366f1' }} />
            </label>
            <button type="submit" style={{ background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Send Message</button>
            {submitted && (
              <div style={{ marginTop: 16, color: '#166534', background: '#bbf7d0', padding: 12, borderRadius: 8 }}>
                Thank you for contacting us! An acknowledgment email has been sent to {form.email}.
              </div>
            )}
          </form>
          <div style={{ marginTop: 32 }}>
            <h3 style={{ color: '#6366f1', fontWeight: 700, fontSize: 22 }}>Connect with us</h3>
            <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
              {socialLinks.map(link => (
                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#3730a3', fontWeight: 600, fontSize: 18, background: '#e0e7ff', borderRadius: 8, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>{link.icon}</span> {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 320 }}>
          <h3 style={{ color: '#6366f1', fontWeight: 700, fontSize: 22 }}>FAQ & Help</h3>
          <div style={{ marginTop: 12 }}>
            {faqs.map((faq, idx) => (
              <div key={idx} style={{ marginBottom: 18, background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #6366f122', padding: 16 }}>
                <div style={{ fontWeight: 600, color: '#3730a3', fontSize: 16 }}>{faq.q}</div>
                <div style={{ color: '#374151', fontSize: 15, marginTop: 4 }}>{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
