import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lead, User, listLeads, createLead, updateLead, deleteLead } from '../lib/api';
import LeadModal from '../components/LeadModal';

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Lead | null>(null);
  const navigate = useNavigate();

  const user: User = JSON.parse(localStorage.getItem('qrius.user') || '{}');
  const isAdmin = user.role === 'ADMIN';

  // Load leads whenever the search term changes.
  async function load() {
    const rows = await listLeads(search);
    setLeads(rows);
  }

  // On first render, remember the full count for the header.
  useEffect(() => {
    listLeads('').then((rows) => setTotal(rows.length));
  }, []);

  useEffect(() => {
    load();
  }, [search]);

  function logout() {
    localStorage.clear();
    navigate('/login');
  }

  function openNew() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(lead: Lead) {
    setEditing(lead);
    setModalOpen(true);
  }

  async function onSave(data: Partial<Lead>) {
    if (editing) {
      await updateLead(editing.id, data);
    } else {
      await createLead(data);
    }
    setModalOpen(false);
    await load();
    const all = await listLeads('');
    setTotal(all.length);
  }

  async function onDelete(lead: Lead) {
    await deleteLead(lead.id);
    await load();
    const all = await listLeads('');
    setTotal(all.length);
  }

  return (
    <>
      <div className="navbar">
        <img src="/qrius-logo.png" alt="Qrius" />
        <strong>Lead Manager</strong>
        <div className="spacer" />
        <span className="who" data-testid="nav-user">{user.username}</span>
        <span className="role" data-testid="nav-role">{user.role}</span>
        <button className="btn-ghost" data-testid="logout-button" onClick={logout}>Log out</button>
      </div>

      <div className="page">
        <h1>Leads</h1>

        <div className="toolbar">
          <input
            className="search"
            data-testid="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn-coral" data-testid="add-lead-button" onClick={openNew}>Add lead</button>
          {/* Bug lives here: this shows the stored total, not the number of rows on screen. */}
          <span className="count" data-testid="lead-count">Showing {total} of {total} leads</span>
        </div>

        {leads.length === 0 ? (
          <div className="empty" data-testid="empty-state">No leads found.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th><th>Email</th><th>Company</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} data-testid="lead-row">
                  <td data-testid="lead-name">{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.company}</td>
                  <td><span className={`status-pill s-${lead.status}`} data-testid="lead-status">{lead.status}</span></td>
                  <td>
                    <div className="actions">
                      <button className="btn-ghost" data-testid="edit-button" onClick={() => openEdit(lead)}>Edit</button>
                      {isAdmin && (
                        <button className="btn-danger" data-testid="delete-button" onClick={() => onDelete(lead)}>Delete</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <LeadModal lead={editing} onCancel={() => setModalOpen(false)} onSave={onSave} />
      )}
    </>
  );
}
