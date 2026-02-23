import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    title: String,
  },
  { _id: false },
);

const customFieldSchema = new mongoose.Schema(
  {
    key: String,
    value: String,
  },
  { _id: false },
);

const clientSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    primaryEmail: String,
    phone: String,
    status: { type: String, default: 'lead' },
    contacts: [contactSchema],
    notes: [{ body: String, createdAt: { type: Date, default: Date.now } }],
    tags: [String],
    customFields: [customFieldSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

export default mongoose.model('Client', clientSchema);
