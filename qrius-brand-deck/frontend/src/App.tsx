import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import LeadsPage from './pages/LeadsPage';

// Is there a signed-in user?
function isAuthed(): boolean {
  return !!localStorage.getItem('qrius.token');
}

// A wrapper that redirects to /login when not signed in.
function Protected({ children }: { children: JSX.Element }) {
  return isAuthed() ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/leads"
        element={
          <Protected>
            <LeadsPage />
          </Protected>
        }
      />
      <Route path="*" element={<Navigate to="/leads" replace />} />
    </Routes>
  );
}
