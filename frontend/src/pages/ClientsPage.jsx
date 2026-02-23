import { useEffect, useState } from 'react';
import api from '../api/client';

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ companyName: '', primaryEmail: '', tags: '' });

  const load = () => api.get('/clients').then((res) => setClients(res.data));
  useEffect(() => {
    load();
  }, []);

  const addClient = async (event) => {
    event.preventDefault();
    await api.post('/clients', {
      ...form,
      tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      contacts: [],
      notes: [],
      customFields: [],
    });
    setForm({ companyName: '', primaryEmail: '', tags: '' });
    load();
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[340px_1fr]">
      <form onSubmit={addClient} className="card space-y-3">
        <h2 className="text-lg font-semibold">Add Client</h2>
        <input className="w-full rounded-xl bg-white/5 p-3" placeholder="Company name" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} />
        <input className="w-full rounded-xl bg-white/5 p-3" placeholder="Primary email" value={form.primaryEmail} onChange={(e) => setForm({ ...form, primaryEmail: e.target.value })} />
        <input className="w-full rounded-xl bg-white/5 p-3" placeholder="Tags comma separated" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
        <button className="rounded-xl bg-accent px-4 py-2 font-medium text-slate-900">Save Client</button>
      </form>
      <div className="card">
        <h2 className="mb-4 text-lg font-semibold">Clients</h2>
        <div className="space-y-3">
          {clients.map((client) => (
            <div key={client._id} className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="font-medium">{client.companyName}</p>
              <p className="text-sm text-slate-400">{client.primaryEmail}</p>
              <p className="mt-1 text-xs text-accent">{client.tags?.join(', ') || 'No tags'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientsPage;
