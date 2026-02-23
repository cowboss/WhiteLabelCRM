import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'sales' });
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      if (isRegister) await register(form);
      else await login(form.email, form.password);
      navigate('/');
    } catch {
      setError('Authentication failed. Verify your credentials.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-bg to-[#101e49] p-6">
      <form onSubmit={submit} className="card w-full max-w-md space-y-4">
        <h2 className="text-2xl font-semibold">{isRegister ? 'Create account' : 'Welcome back'}</h2>
        {isRegister && (
          <input className="w-full rounded-xl bg-white/5 p-3" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        )}
        <input className="w-full rounded-xl bg-white/5 p-3" type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full rounded-xl bg-white/5 p-3" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {isRegister && (
          <select className="w-full rounded-xl bg-white/5 p-3" onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value="sales">Sales</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
        )}
        {error && <p className="text-sm text-rose-300">{error}</p>}
        <button className="w-full rounded-xl bg-accent px-4 py-3 font-medium text-slate-900">{isRegister ? 'Register' : 'Login'}</button>
        <button type="button" className="text-sm text-slate-300" onClick={() => setIsRegister((v) => !v)}>
          {isRegister ? 'Already have an account? Login' : 'Need an account? Register'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
