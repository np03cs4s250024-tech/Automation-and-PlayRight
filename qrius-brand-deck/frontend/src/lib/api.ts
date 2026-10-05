// A tiny API client. Every call goes to /api, which Vite proxies to the backend.

// The shape of a lead, matching the database.
export interface Lead {
  id: number;
  name: string;
  email: string;
  company: string;
  status: string;
  created_at: string;
}

// The signed-in user.
export interface User {
  id: number;
  username: string;
  role: string;
}

// Read the saved token from the browser.
function token(): string {
  return localStorage.getItem('qrius.token') || '';
}

// Standard headers, with the token when we have one.
function headers(): Record<string, string> {
  const h: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token()) h.Authorization = `Bearer ${token()}`;
  return h;
}

// Sign in and return the token plus the user.
export async function login(username: string, password: string) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || 'Login failed');
  }
  return res.json() as Promise<{ token: string; user: User }>;
}

// List leads, optionally filtered by a search term.
export async function listLeads(search = ''): Promise<Lead[]> {
  const url = search ? `/api/leads?search=${encodeURIComponent(search)}` : '/api/leads';
  const res = await fetch(url, { headers: headers() });
  if (!res.ok) throw new Error('Could not load leads');
  return res.json();
}

// Create a lead.
export async function createLead(data: Partial<Lead>): Promise<Lead> {
  const res = await fetch('/api/leads', {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || 'Could not create lead');
  }
  return res.json();
}

// Update a lead.
export async function updateLead(id: number, data: Partial<Lead>): Promise<Lead> {
  const res = await fetch(`/api/leads/${id}`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Could not update lead');
  return res.json();
}

// Delete a lead.
export async function deleteLead(id: number): Promise<void> {
  const res = await fetch(`/api/leads/${id}`, {
    method: 'DELETE',
    headers: headers(),
  });
  if (!res.ok) throw new Error('Could not delete lead');
}
