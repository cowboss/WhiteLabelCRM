import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: { type: String, required: true, unique: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    subtotal: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'sent', 'paid', 'overdue'], default: 'draft' },
    dueDate: Date,
  },
  { timestamps: true },
);

export default mongoose.model('Invoice', invoiceSchema);
