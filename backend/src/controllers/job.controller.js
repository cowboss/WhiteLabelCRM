import Job from '../models/Job.js';

export const listJobs = async (_req, res) => {
  const jobs = await Job.find().populate('client assignedUsers').sort({ createdAt: -1 });
  res.json(jobs);
};

export const createJob = async (req, res) => {
  const job = await Job.create({ ...req.body, jobNumber: `J-${Date.now()}` });
  res.status(201).json(job);
};

export const updateJob = async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!job) return res.status(404).json({ message: 'Job not found' });
  return res.json(job);
};
