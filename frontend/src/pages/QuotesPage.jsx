import { useEffect, useState } from 'react';
import api from '../api/client';

const blankItem = { name: '', imageUrl: '', quantity: 1, unitPrice: 0 };

const QuotesPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [clients, setClients] = useState([]);
  const [item, setItem] = useState(blankItem);
  const [quoteForm, setQuoteForm] = useState({
    client: '',
    items: [],
    markupEnabled: true,
    discountEnabled: false,
    taxEnabled: true,
    markupPercent: 10,
    discountPercent: 0,
    taxPercent: 8,
  });

  const load = async () => {
    const [q, c] = await Promise.all([api.get('/quotes'), api.get('/clients')]);
    setQuotes(q.data);
    setClients(c.data);
  };

  useEffect(() => {
    load().catch(() => null);
  }, []);

  const addItem = () => {
    setQuoteForm((prev) => ({ ...prev, items: [...prev.items, item] }));
    setItem(blankItem);
  };

  const createQuote = async () => {
    await api.post('/quotes', quoteForm);
    setQuoteForm({ ...quoteForm, items: [] });
    load();
  };

  const acceptQuote = async (id) => {
    await api.post(`/quotes/${id}/accept`);
    load();
  };

  return (
    <div className="space-y-4">
      <section className="card space-y-3">
        <h2 className="text-lg font-semibold">Quote Builder</h2>
        <select className="w-full rounded-xl bg-white/5 p-3" onChange={(e) => setQuoteForm({ ...quoteForm, client: e.target.value })}>
          <option value="">Select client</option>
          {clients.map((client) => (
            <option key={client._id} value={client._id}>{client.companyName}</option>
          ))}
        </select>
        <div className="grid gap-2 md:grid-cols-4">
          <input className="rounded-xl bg-white/5 p-3" placeholder="Item name" value={item.name} onChange={(e) => setItem({ ...item, name: e.target.value })} />
          <input className="rounded-xl bg-white/5 p-3" placeholder="Image URL" value={item.imageUrl} onChange={(e) => setItem({ ...item, imageUrl: e.target.value })} />
          <input className="rounded-xl bg-white/5 p-3" type="number" placeholder="Qty" value={item.quantity} onChange={(e) => setItem({ ...item, quantity: Number(e.target.value) })} />
          <input className="rounded-xl bg-white/5 p-3" type="number" placeholder="Price" value={item.unitPrice} onChange={(e) => setItem({ ...item, unitPrice: Number(e.target.value) })} />
        </div>
        <button type="button" onClick={addItem} className="rounded-xl border border-accent/40 px-3 py-2">Add Item</button>

        <div className="grid gap-2 md:grid-cols-3">
          {['markupEnabled', 'discountEnabled', 'taxEnabled'].map((key) => (
            <label key={key} className="flex items-center gap-2 rounded-xl bg-white/5 p-3 text-sm">
              <input type="checkbox" checked={quoteForm[key]} onChange={(e) => setQuoteForm({ ...quoteForm, [key]: e.target.checked })} />
              {key}
            </label>
          ))}
        </div>
        <button type="button" onClick={createQuote} className="rounded-xl bg-accent px-4 py-2 font-medium text-slate-900">Create Quote</button>
      </section>

      <section className="card">
        <h2 className="mb-3 text-lg font-semibold">Quotes</h2>
        <div className="space-y-3">
          {quotes.map((quote) => (
            <div key={quote._id} className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p>{quote.quoteNumber} - ${quote.total}</p>
              <p className="text-sm text-slate-400">Status: {quote.status}</p>
              <a className="mr-3 text-sm text-accent" href={`/quotes/live/${quote.liveToken}`}>Live URL</a>
              <button type="button" className="text-sm text-emerald-300" onClick={() => acceptQuote(quote._id)}>Accept & Convert</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default QuotesPage;
