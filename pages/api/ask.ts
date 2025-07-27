import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { question } = req.body;
    // Replace this with your AI logic or call to an AI service
    if (!question) {
      res.status(400).json({ error: 'No question provided.' });
      return;
    }
    // Dummy answer for demonstration
    res.status(200).json({ answer: `You asked: ${question}` });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}