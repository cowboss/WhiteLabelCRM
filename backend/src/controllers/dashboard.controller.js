import Client from '../models/Client.js';
import Quote from '../models/Quote.js';
import Job from '../models/Job.js';
import Invoice from '../models/Invoice.js';

export const getMetrics = async (_req, res) => {
  const [clients, quotes, jobs, invoices, revenueRows] = await Promise.all([
    Client.countDocuments(),
    Quote.countDocuments(),
    Job.countDocuments(),
    Invoice.countDocuments(),
    Invoice.find({ status: 'paid' }).select('total createdAt'),
  ]);

  const revenue = revenueRows.reduce((sum, row) => sum + row.total, 0);

  res.json({
    totals: { clients, quotes, jobs, invoices, revenue },
    trend: revenueRows.map((row) => ({ date: row.createdAt, total: row.total })),
  });
};
