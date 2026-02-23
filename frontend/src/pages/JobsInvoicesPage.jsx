import { useEffect, useState } from 'react';
import api from '../api/client';

const JobsInvoicesPage = () => {
  const [jobs, setJobs] = useState([]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    Promise.all([api.get('/jobs'), api.get('/invoices')])
      .then(([j, i]) => {
        setJobs(j.data);
        setInvoices(i.data);
      })
      .catch(() => null);
  }, []);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="card">
        <h2 className="mb-3 text-lg font-semibold">Jobs</h2>
        {jobs.map((job) => (
          <div key={job._id} className="mb-2 rounded-xl border border-white/10 p-3">
            <p>{job.jobNumber} · {job.status}</p>
            <p className="text-xs text-slate-400">Progress: {job.progress}%</p>
          </div>
        ))}
      </section>
      <section className="card">
        <h2 className="mb-3 text-lg font-semibold">Invoices</h2>
        {invoices.map((invoice) => (
          <div key={invoice._id} className="mb-2 rounded-xl border border-white/10 p-3">
            <p>{invoice.invoiceNumber} · ${invoice.total}</p>
            <p className="text-xs text-slate-400">Status: {invoice.status}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default JobsInvoicesPage;
