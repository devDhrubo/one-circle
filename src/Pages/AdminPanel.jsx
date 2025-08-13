
import { useState } from 'react';

// Dummy data for demonstration
const stats = {
  members: 120,
  events: 5,
  upcoming: 2,
};
const members = [
  { id: 1, name: 'Alice', status: 'Pending', email: 'alice@example.com' },
  { id: 2, name: 'Bob', status: 'Active', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', status: 'Suspended', email: 'charlie@example.com' },
];
const events = [
  { id: 1, name: 'Blood Drive', date: '2025-08-20', registrations: 30 },
  { id: 2, name: 'Flood Relief', date: '2025-09-05', registrations: 15 },
];
const announcements = [
  { id: 1, message: 'Next meeting on Friday!', scheduled: '2025-08-15' },
];
const analytics = {
  engagement: 75,
  participation: 60,
};

const AdminPanel = () => {
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Hardcoded admin credentials
  const ADMIN_USER = 'admin';
  const ADMIN_PASS = 'onecircle2025';
  const [memberList, setMemberList] = useState(members);
  const [eventList, setEventList] = useState(events);
  const [announcementList, setAnnouncementList] = useState(announcements);
  const [newAnnouncement, setNewAnnouncement] = useState({ message: '', scheduled: '' });

  // Simulate admin login
  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setAdminLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid admin credentials');
    }
  };

  // Member management actions
  const updateMemberStatus = (id, status) => {
    setMemberList(memberList.map(m => m.id === id ? { ...m, status } : m));
  };

  // Event management actions
  const addEvent = (name, date) => {
    setEventList([...eventList, { id: Date.now(), name, date, registrations: 0 }]);
  };
  const updateEvent = (id, name, date) => {
    setEventList(eventList.map(e => e.id === id ? { ...e, name, date } : e));
  };
  const cancelEvent = (id) => {
    setEventList(eventList.filter(e => e.id !== id));
  };

  // Announcement management
  const scheduleAnnouncement = (e) => {
    e.preventDefault();
    setAnnouncementList([...announcementList, { ...newAnnouncement, id: Date.now() }]);
    setNewAnnouncement({ message: '', scheduled: '' });
  };

  if (!adminLoggedIn) {
    return (
      <div style={{ maxWidth: 400, margin: '80px auto', padding: 32, background: '#f3f4f6', borderRadius: 16, boxShadow: '0 2px 12px #6366f133' }}>
        <h2 style={{ color: '#6366f1', fontWeight: 700, fontSize: 28 }}>Admin Login</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
          <input name="username" type="text" placeholder="Admin Username" required style={{ padding: 10, borderRadius: 8, border: '1px solid #6366f1' }} />
          <input name="password" type="password" placeholder="Password" required style={{ padding: 10, borderRadius: 8, border: '1px solid #6366f1' }} />
          <button type="submit" style={{ background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Login</button>
          {loginError && <div style={{ color: '#991b1b', marginTop: 8 }}>{loginError}</div>}
        </form>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1100, margin: '40px auto', padding: 32, fontFamily: 'Segoe UI, sans-serif' }}>
      <h2 style={{ color: '#6366f1', fontWeight: 700, fontSize: 32, marginBottom: 24 }}>Admin Dashboard</h2>
      {/* Dashboard Overview */}
      <div style={{ display: 'flex', gap: 32, marginBottom: 32 }}>
        <div style={{ background: '#e0e7ff', borderRadius: 16, padding: 24, flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 600, color: '#3730a3' }}>Members</div>
          <div style={{ fontSize: 32, fontWeight: 700 }}>{stats.members}</div>
        </div>
        <div style={{ background: '#fef9c3', borderRadius: 16, padding: 24, flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 600, color: '#92400e' }}>Events</div>
          <div style={{ fontSize: 32, fontWeight: 700 }}>{stats.events}</div>
        </div>
        <div style={{ background: '#bbf7d0', borderRadius: 16, padding: 24, flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 600, color: '#166534' }}>Upcoming</div>
          <div style={{ fontSize: 32, fontWeight: 700 }}>{stats.upcoming}</div>
        </div>
      </div>

      {/* Member Management */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ color: '#6366f1', fontWeight: 700, fontSize: 24 }}>Member Management</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
          <thead>
            <tr style={{ background: '#f3f4f6' }}>
              <th style={{ padding: 8 }}>Name</th>
              <th style={{ padding: 8 }}>Email</th>
              <th style={{ padding: 8 }}>Status</th>
              <th style={{ padding: 8 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {memberList.map(m => (
              <tr key={m.id} style={{ background: m.status === 'Suspended' ? '#fee2e2' : m.status === 'Active' ? '#bbf7d0' : '#fef9c3' }}>
                <td style={{ padding: 8 }}>{m.name}</td>
                <td style={{ padding: 8 }}>{m.email}</td>
                <td style={{ padding: 8 }}>{m.status}</td>
                <td style={{ padding: 8 }}>
                  <button onClick={() => updateMemberStatus(m.id, 'Active')} style={{ marginRight: 8, background: '#bbf7d0', color: '#166534', border: 'none', borderRadius: 6, padding: '4px 12px', cursor: 'pointer' }}>Approve</button>
                  <button onClick={() => updateMemberStatus(m.id, 'Suspended')} style={{ marginRight: 8, background: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: 6, padding: '4px 12px', cursor: 'pointer' }}>Suspend</button>
                  <button onClick={() => updateMemberStatus(m.id, 'Rejected')} style={{ background: '#fef9c3', color: '#92400e', border: 'none', borderRadius: 6, padding: '4px 12px', cursor: 'pointer' }}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Event Management */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ color: '#6366f1', fontWeight: 700, fontSize: 24 }}>Event Management</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
          <thead>
            <tr style={{ background: '#f3f4f6' }}>
              <th style={{ padding: 8 }}>Event</th>
              <th style={{ padding: 8 }}>Date</th>
              <th style={{ padding: 8 }}>Registrations</th>
              <th style={{ padding: 8 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {eventList.map(e => (
              <tr key={e.id}>
                <td style={{ padding: 8 }}>{e.name}</td>
                <td style={{ padding: 8 }}>{e.date}</td>
                <td style={{ padding: 8 }}>{e.registrations}</td>
                <td style={{ padding: 8 }}>
                  <button onClick={() => updateEvent(e.id, e.name + ' (Updated)', e.date)} style={{ marginRight: 8, background: '#e0e7ff', color: '#3730a3', border: 'none', borderRadius: 6, padding: '4px 12px', cursor: 'pointer' }}>Update</button>
                  <button onClick={() => cancelEvent(e.id)} style={{ background: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: 6, padding: '4px 12px', cursor: 'pointer' }}>Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: 16 }}>
          <input type="text" placeholder="Event Name" id="eventName" style={{ marginRight: 8, padding: 8, borderRadius: 6, border: '1px solid #6366f1' }} />
          <input type="date" id="eventDate" style={{ marginRight: 8, padding: 8, borderRadius: 6, border: '1px solid #6366f1' }} />
          <button onClick={() => {
            const name = document.getElementById('eventName').value;
            const date = document.getElementById('eventDate').value;
            if (name && date) addEvent(name, date);
          }} style={{ background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Create Event</button>
        </div>
      </div>

      {/* Announcement Management */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ color: '#6366f1', fontWeight: 700, fontSize: 24 }}>Announcement Management</h3>
        <form onSubmit={scheduleAnnouncement} style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <input type="text" placeholder="Announcement Message" value={newAnnouncement.message} onChange={e => setNewAnnouncement({ ...newAnnouncement, message: e.target.value })} style={{ flex: 2, padding: 8, borderRadius: 6, border: '1px solid #6366f1' }} />
          <input type="date" value={newAnnouncement.scheduled} onChange={e => setNewAnnouncement({ ...newAnnouncement, scheduled: e.target.value })} style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #6366f1' }} />
          <button type="submit" style={{ background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Schedule</button>
        </form>
        <ul>
          {announcementList.map(a => (
            <li key={a.id} style={{ marginBottom: 8, background: '#f3f4f6', borderRadius: 8, padding: 12 }}>
              <strong>{a.message}</strong> <span style={{ color: '#6366f1', marginLeft: 8 }}>({a.scheduled})</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Analytics */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ color: '#6366f1', fontWeight: 700, fontSize: 24 }}>Analytics</h3>
        <div style={{ display: 'flex', gap: 32 }}>
          <div style={{ background: '#e0e7ff', borderRadius: 16, padding: 24, flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 600, color: '#3730a3' }}>User Engagement</div>
            <div style={{ fontSize: 32, fontWeight: 700 }}>{analytics.engagement}%</div>
          </div>
          <div style={{ background: '#bbf7d0', borderRadius: 16, padding: 24, flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 600, color: '#166534' }}>Event Participation</div>
            <div style={{ fontSize: 32, fontWeight: 700 }}>{analytics.participation}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
