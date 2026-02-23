import mongoose from 'mongoose';

const emailLogSchema = new mongoose.Schema(
  {
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    direction: { type: String, enum: ['sent', 'received'], required: true },
    subject: String,
    body: String,
    from: String,
    to: [String],
    attachments: [{ name: String, url: String }],
    template: String,
  },
  { timestamps: true },
);

export default mongoose.model('EmailLog', emailLogSchema);
