import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/client';

const LiveQuotePage = () => {
  const { token } = useParams();
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    api.get(`/quotes/live/${token}`).then((res) => setQuote(res.data)).catch(() => null);
  }, [token]);

  if (!quote) return <div className="p-8 text-slate-200">Loading quote...</div>;

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="card">
        <h1 className="text-2xl font-semibold">Quote {quote.quoteNumber}</h1>
        <p className="text-slate-400">Client: {quote.client?.companyName}</p>
        <div className="mt-4 space-y-3">
          {quote.items.map((item, idx) => (
            <div key={`${item.name}-${idx}`} className="flex items-center justify-between rounded-xl bg-white/5 p-3">
              <div className="flex items-center gap-3">
                {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="h-12 w-12 rounded-lg object-cover" />}
                <p>{item.name}</p>
              </div>
              <p>${item.unitPrice} × {item.quantity}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-lg">Total: ${quote.total}</p>
      </div>
    </div>
  );
};

export default LiveQuotePage;
