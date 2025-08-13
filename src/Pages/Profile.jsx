
import { useState } from 'react';

// Dummy data for demonstration
const dummyProfile = {
  name: 'Dolan Dhrubo Ray',
  email: 'dolandhruboray@gmail.com',
  membershipStatus: 'Regular Member',
  profilePic: '',
  events: [
    { name: 'Blood Donation Camp', date: '2025-07-10', status: 'Attended' },
    { name: 'Flood Relief', date: '2025-08-20', status: 'Registered' },
  ],
};

const Profile = () => {
  const [profile, setProfile] = useState(dummyProfile);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: profile.name, email: profile.email });
  const [profilePic, setProfilePic] = useState(profile.profilePic);

  // Handle profile picture upload
  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit (simulate secure update)
  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile({ ...profile, ...form, profilePic });
    setEditMode(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #6366f1 0%, #60a5fa 100%)',
      padding: '40px 0',
      fontFamily: 'Segoe UI, sans-serif',
    }}>
      <div style={{
        maxWidth: 700,
        margin: '0 auto',
        background: 'rgba(255,255,255,0.95)',
        borderRadius: 24,
        boxShadow: '0 8px 32px rgba(99,102,241,0.15)',
        padding: 32,
        position: 'relative',
      }}>
        <div style={{ position: 'absolute', top: 24, right: 32 }}>
          <span style={{ fontWeight: 600, color: '#6366f1', fontSize: 18 }}>🟢 {profile.membershipStatus}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32, marginBottom: 32 }}>
          <div style={{ position: 'relative' }}>
            <img
              src={profilePic || 'https://via.placeholder.com/120'}
              alt="Profile"
              style={{ width: 130, height: 130, borderRadius: '50%', objectFit: 'cover', border: '4px solid #6366f1', boxShadow: '0 2px 12px #6366f133' }}
            />
            <label htmlFor="profilePicUpload" style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              background: '#6366f1',
              color: '#fff',
              borderRadius: '50%',
              padding: 8,
              cursor: 'pointer',
              boxShadow: '0 2px 8px #6366f133',
              fontSize: 18,
            }}>✏️</label>
            <input id="profilePicUpload" type="file" accept="image/*" onChange={handlePicChange} style={{ display: 'none' }} />
          </div>
          <div>
            {!editMode ? (
              <>
                <h2 style={{ fontSize: 32, fontWeight: 700, color: '#3730a3', marginBottom: 8 }}>{profile.name}</h2>
                <p style={{ fontSize: 18, color: '#6366f1', marginBottom: 4 }}>{profile.email}</p>
                <button onClick={() => setEditMode(true)} style={{
                  marginTop: 12,
                  background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '8px 20px',
                  fontWeight: 600,
                  fontSize: 16,
                  boxShadow: '0 2px 8px #6366f133',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}>Edit Info</button>
              </>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
                <label style={{ fontWeight: 600, color: '#3730a3' }}>
                  Name:
                  <input type="text" name="name" value={form.name} onChange={handleChange} required style={{
                    marginLeft: 8,
                    padding: '6px 12px',
                    borderRadius: 6,
                    border: '1px solid #6366f1',
                    fontSize: 16,
                  }} />
                </label>
                <label style={{ fontWeight: 600, color: '#3730a3' }}>
                  Email:
                  <input type="email" name="email" value={form.email} onChange={handleChange} required style={{
                    marginLeft: 8,
                    padding: '6px 12px',
                    borderRadius: 6,
                    border: '1px solid #6366f1',
                    fontSize: 16,
                  }} />
                </label>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button type="submit" style={{
                    background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '8px 20px',
                    fontWeight: 600,
                    fontSize: 16,
                    boxShadow: '0 2px 8px #6366f133',
                    cursor: 'pointer',
                  }}>Save</button>
                  <button type="button" onClick={() => setEditMode(false)} style={{
                    background: '#e0e7ff',
                    color: '#3730a3',
                    border: 'none',
                    borderRadius: 8,
                    padding: '8px 20px',
                    fontWeight: 600,
                    fontSize: 16,
                    cursor: 'pointer',
                  }}>Cancel</button>
                </div>
              </form>
            )}
          </div>
        </div>
        <div style={{ margin: '32px 0 0 0' }}>
          <h3 style={{ fontSize: 24, fontWeight: 700, color: '#6366f1', marginBottom: 16 }}>Event Participation</h3>
          <div style={{
            borderRadius: 16,
            boxShadow: '0 2px 12px #6366f133',
            background: '#f3f4f6',
            padding: 16,
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16 }}>
              <thead>
                <tr style={{ background: '#6366f1', color: '#fff' }}>
                  <th style={{ padding: 10, border: 'none', borderRadius: '8px 0 0 8px' }}>Event</th>
                  <th style={{ padding: 10, border: 'none' }}>Date</th>
                  <th style={{ padding: 10, border: 'none', borderRadius: '0 8px 8px 0' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {profile.events.map((event, idx) => (
                  <tr key={idx} style={{ background: idx % 2 === 0 ? '#fff' : '#e0e7ff' }}>
                    <td style={{ padding: 10 }}>{event.name}</td>
                    <td style={{ padding: 10 }}>{event.date}</td>
                    <td style={{ padding: 10 }}>
                      <span style={{
                        background: event.status === 'Attended' ? '#bbf7d0' : '#fde68a',
                        color: event.status === 'Attended' ? '#166534' : '#92400e',
                        padding: '4px 12px',
                        borderRadius: 12,
                        fontWeight: 600,
                      }}>{event.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
