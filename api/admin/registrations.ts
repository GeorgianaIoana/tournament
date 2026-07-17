import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase, type Registration } from '../../lib/supabase.js';

// Simple admin authentication using a secret key
// In production, consider using a proper auth system
const ADMIN_SECRET = process.env.ADMIN_SECRET;

function isAuthorized(req: VercelRequest): boolean {
  if (!ADMIN_SECRET) return false;
  const authHeader = req.headers.authorization;
  return authHeader === `Bearer ${ADMIN_SECRET}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Check authorization
  if (!isAuthorized(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    // List registrations
    const { status, category } = req.query;

    let query = supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (status && typeof status === 'string') {
      query = query.eq('status', status);
    }

    if (category && typeof category === 'string') {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching registrations:', error);
      return res.status(500).json({ error: 'Failed to fetch registrations' });
    }

    // Calculate stats
    const stats = {
      total: data.length,
      pending: data.filter(r => r.status === 'pending').length,
      paid: data.filter(r => r.status === 'paid').length,
      confirmed: data.filter(r => r.status === 'confirmed').length,
      cancelled: data.filter(r => r.status === 'cancelled').length,
      totalRevenue: data
        .filter(r => r.status === 'paid' || r.status === 'confirmed')
        .reduce((sum, r) => sum + (r.is_free_entry ? 0 : r.amount_ron), 0) / 100,
    };

    return res.status(200).json({
      registrations: data,
      stats,
    });
  }

  if (req.method === 'PATCH') {
    // Update registration status
    const { id, status } = req.body;

    if (!id || !status) {
      return res.status(400).json({ error: 'Missing id or status' });
    }

    const validStatuses = ['pending', 'paid', 'confirmed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const { data, error } = await supabase
      .from('registrations')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating registration:', error);
      return res.status(500).json({ error: 'Failed to update registration' });
    }

    return res.status(200).json({ registration: data });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
