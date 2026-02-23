import { useEffect, useState } from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import api from '../api/client';
import MetricCard from '../components/MetricCard';

const DashboardPage = () => {
  const [data, setData] = useState({ totals: {}, trend: [] });

  useEffect(() => {
    api.get('/dashboard/metrics').then((res) => setData(res.data)).catch(() => {
      setData({
        totals: { clients: 0, quotes: 0, jobs: 0, invoices: 0, revenue: 0 },
        trend: [],
      });
    });
  }, []);

  const metrics = [
    ['Clients', data.totals.clients || 0],
    ['Quotes', data.totals.quotes || 0],
    ['Jobs', data.totals.jobs || 0],
    ['Invoices', data.totals.invoices || 0],
    ['Revenue', `$${data.totals.revenue || 0}`],
  ];

  return (
    <>
      <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
        {metrics.map(([title, value]) => (
          <MetricCard key={title} title={title} value={value} subtitle="Live CRM metric" />
        ))}
      </section>
      <section className="card h-[340px]">
        <h2 className="mb-4 text-lg font-semibold">Revenue Trend</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.trend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="date" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Line dataKey="total" stroke="#16b8f3" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </section>
    </>
  );
};

export default DashboardPage;
