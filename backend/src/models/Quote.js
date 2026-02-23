import mongoose from 'mongoose';

const quoteItemSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    imageUrl: String,
    quantity: Number,
    unitPrice: Number,
  },
  { _id: false },
);

const quoteSchema = new mongoose.Schema(
  {
    quoteNumber: { type: String, required: true, unique: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    items: [quoteItemSchema],
    markupEnabled: { type: Boolean, default: true },
    discountEnabled: { type: Boolean, default: false },
    taxEnabled: { type: Boolean, default: true },
    markupPercent: { type: Number, default: 0 },
    discountPercent: { type: Number, default: 0 },
    taxPercent: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'sent', 'accepted', 'rejected'], default: 'draft' },
    liveToken: { type: String, required: true },
    total: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model('Quote', quoteSchema);
