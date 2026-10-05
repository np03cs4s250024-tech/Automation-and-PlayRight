import { useState } from 'react';
import { Lead } from '../lib/api';

// A form in a modal for creating or editing a lead.
// When `lead` is provided we are editing; otherwise we are creating.
interface Props {
  lead: Lead | null;
  onCancel: () => void;
  onSave: (data: Partial<Lead>) => void;
}

const STATUSES = ['New', 'Contacted', 'Qualified', 'Lost'];

export default function LeadModal({ lead, onCancel, onSave }: Props) {
  const [name, setName] = useState(lead?.name || '');
  const [email, setEmail] = useState(lead?.email || '');
  const [company, setCompany] = useState(lead?.company || '');
  const [status, setStatus] = useState(lead?.status || 'New');

  function save() {
    onSave({ name, email, company, status });
  }

  return (
    <div className="modal-bg">
      <div className="modal" data-testid="lead-modal">
        <h2>{lead ? 'Edit lead' : 'New lead'}</h2>

        <label htmlFor="name">Name</label>
        <input id="name" data-testid="name" value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="email">Email</label>
        <input id="email" data-testid="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="company">Company</label>
        <input id="company" data-testid="company" value={company} onChange={(e) => setCompany(e.target.value)} />

        <label htmlFor="status">Status</label>
        <select id="status" data-testid="status" value={status} onChange={(e) => setStatus(e.target.value)}>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <div className="row">
          <button className="btn-ghost" data-testid="cancel-button" onClick={onCancel}>Cancel</button>
          <button className="btn-primary" style={{ marginTop: 0 }} data-testid="save-button" onClick={save}>Save</button>
        </div>
      </div>
    </div>
  );
}
