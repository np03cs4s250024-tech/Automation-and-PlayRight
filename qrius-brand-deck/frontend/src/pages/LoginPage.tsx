import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../lib/api';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function onSubmit() {
    setError('');
    try {
      const { token, user } = await login(username, password);
      // Save the session for later API calls
      localStorage.setItem('qrius.token', token);
      localStorage.setItem('qrius.user', JSON.stringify(user));
      navigate('/leads');
    } catch (e) {
      setError((e as Error).message);
    }
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <img src="/qrius-logo.png" alt="Qrius" />
        <h2 style={{ textAlign: 'center', margin: '0 0 8px' }}>Lead Manager</h2>

        {/* Note: no placeholder hint text. Find inputs by their test id. */}
        <label htmlFor="username">Username</label>
        <input
          id="username"
          data-testid="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          data-testid="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className="error" data-testid="login-error">{error}</div>}

        <button className="btn-primary" data-testid="login-button" onClick={onSubmit}>
          Sign in
        </button>
      </div>
    </div>
  );
}
