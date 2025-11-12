import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../src/lib/supabase'; // Asumiendo que crearás este archivo
import { LeadSchema, APIResponse } from '../../src/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, error: `Method ${req.method} Not Allowed` });
  }

  try {
    const validation = LeadSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ success: false, error: validation.error.issues[0].message });
    }

    const { error } = await supabase.from('leads').insert([validation.data]);

    if (error) {
      // Código de error para violación de constraint de unicidad en PostgreSQL
      if (error.code === '23505') {
        return res.status(409).json({ success: false, error: 'Email already exists' });
      }
      throw error;
    }

    return res.status(201).json({ success: true, data: { message: 'Lead created successfully' } });
  } catch (e) {
    const error = e instanceof Error ? e.message : 'An unknown error occurred';
    console.error('Error in /api/leads:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}
