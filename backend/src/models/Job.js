import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    jobNumber: { type: String, required: true, unique: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    quote: { type: mongoose.Schema.Types.ObjectId, ref: 'Quote' },
    title: String,
    status: { type: String, enum: ['planned', 'in_progress', 'blocked', 'completed'], default: 'planned' },
    progress: { type: Number, default: 0 },
    assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    startsOn: Date,
    dueOn: Date,
  },
  { timestamps: true },
);

export default mongoose.model('Job', jobSchema);
