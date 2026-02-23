import PDFDocument from 'pdfkit';
import Invoice from '../models/Invoice.js';

export const listInvoices = async (_req, res) => {
  const invoices = await Invoice.find().populate('client job').sort({ createdAt: -1 });
  res.json(invoices);
};

export const createInvoice = async (req, res) => {
  const invoice = await Invoice.create({ ...req.body, invoiceNumber: `I-${Date.now()}` });
  res.status(201).json(invoice);
};

export const updateInvoice = async (req, res) => {
  const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
  return res.json(invoice);
};

export const invoicePdfStub = async (req, res) => {
  const invoice = await Invoice.findById(req.params.id).populate('client');
  if (!invoice) return res.status(404).json({ message: 'Invoice not found' });

  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename=invoice-${invoice.invoiceNumber}.pdf`);
  doc.pipe(res);
  doc.fontSize(20).text(`Invoice ${invoice.invoiceNumber}`);
  doc.moveDown().fontSize(12).text(`Client: ${invoice.client?.companyName || 'N/A'}`);
  doc.text(`Total: $${invoice.total}`);
  doc.text('This is a functional PDF export stub for iterative enhancement.');
  doc.end();
};
