import nodemailer from 'nodemailer';
import EmailLog from '../models/EmailLog.js';

export const mailboxStub = async (_req, res) => {
  res.json({
    message: 'Mailbox connection stub ready for IMAP/POP3 integration',
    providers: ['imap', 'pop3'],
  });
};

export const sendEmailStub = async (req, res) => {
  const { client, to, subject, body, template, signature } = req.body;

  const transporter = nodemailer.createTransport({ jsonTransport: true });
  await transporter.sendMail({
    to,
    subject,
    html: `${body}<br/><br/>${signature || ''}`,
  });

  const log = await EmailLog.create({
    client,
    direction: 'sent',
    to,
    subject,
    body,
    template,
  });

  res.status(201).json({ message: 'Email stub sent/logged', log });
};
