import Client from '../models/Client.js';

export const listClients = async (_req, res) => {
  const clients = await Client.find().sort({ createdAt: -1 });
  res.json(clients);
};

export const createClient = async (req, res) => {
  const client = await Client.create({ ...req.body, createdBy: req.user.id });
  res.status(201).json(client);
};

export const getClient = async (req, res) => {
  const client = await Client.findById(req.params.id);
  if (!client) return res.status(404).json({ message: 'Client not found' });
  return res.json(client);
};

export const updateClient = async (req, res) => {
  const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!client) return res.status(404).json({ message: 'Client not found' });
  return res.json(client);
};

export const deleteClient = async (req, res) => {
  const client = await Client.findByIdAndDelete(req.params.id);
  if (!client) return res.status(404).json({ message: 'Client not found' });
  return res.status(204).send();
};
