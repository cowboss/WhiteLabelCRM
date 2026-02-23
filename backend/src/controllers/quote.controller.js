import PDFDocument from 'pdfkit';
import { nanoid } from 'nanoid';
import Quote from '../models/Quote.js';
import Job from '../models/Job.js';
import Invoice from '../models/Invoice.js';
import { calculateQuoteTotal } from '../utils/calcTotals.js';

export const listQuotes = async (_req, res) => {
  const quotes = await Quote.find().populate('client').sort({ createdAt: -1 });
  res.json(quotes);
};

export const createQuote = async (req, res) => {
  const liveToken = nanoid(18);
  const total = calculateQuoteTotal(req.body);
  const quote = await Quote.create({
    ...req.body,
    quoteNumber: `Q-${Date.now()}`,
    liveToken,
    total,
  });

  res.status(201).json({ ...quote.toObject(), liveUrl: `${process.env.FRONTEND_URL}/quotes/live/${liveToken}` });
};

export const updateQuote = async (req, res) => {
  const payload = { ...req.body };
  if (payload.items) payload.total = calculateQuoteTotal(payload);
  const quote = await Quote.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
  if (!quote) return res.status(404).json({ message: 'Quote not found' });
  return res.json(quote);
};

export const liveQuote = async (req, res) => {
  const quote = await Quote.findOne({ liveToken: req.params.token }).populate('client');
  if (!quote) return res.status(404).json({ message: 'Quote not found' });
  return res.json(quote);
};

export const acceptQuote = async (req, res) => {
  const quote = await Quote.findByIdAndUpdate(req.params.id, { status: 'accepted' }, { new: true });
  if (!quote) return res.status(404).json({ message: 'Quote not found' });

  const job = await Job.create({
    jobNumber: `J-${Date.now()}`,
    quote: quote._id,
    client: quote.client,
    title: `Job for ${quote.quoteNumber}`,
    status: 'planned',
  });

  const invoice = await Invoice.create({
    invoiceNumber: `I-${Date.now()}`,
    job: job._id,
    client: quote.client,
    subtotal: quote.total,
    total: quote.total,
  });

  return res.json({ quote, job, invoice });
};

export const quotePdfStub = async (req, res) => {
  const quote = await Quote.findById(req.params.id).populate('client');
  if (!quote) return res.status(404).json({ message: 'Quote not found' });

  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename=quote-${quote.quoteNumber}.pdf`);
  doc.pipe(res);
  doc.fontSize(20).text(`Quote ${quote.quoteNumber}`);
  doc.moveDown().fontSize(12).text(`Client: ${quote.client?.companyName || 'N/A'}`);
  doc.text(`Total: $${quote.total}`);
  doc.text('This is a functional PDF stub for iterative enhancement.');
  doc.end();
};
