import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../lib/supabase.js';

interface PublicParticipant {
  full_name: string;
  club: string;
  category: string;
  fide_id: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Fetch confirmed participants (paid or confirmed status)
    const { data, error } = await supabase
      .from('registrations')
      .select('full_name, club, category, fide_id')
      .in('status', ['paid', 'confirmed'])
      .order('full_name', { ascending: true });

    if (error) {
      console.error('Error fetching participants:', error);
      return res.status(500).json({ error: 'Failed to fetch participants' });
    }

    const participants: PublicParticipant[] = data || [];

    // Group by category for convenience
    const byCategory = {
      'Open Șah Rapid': participants.filter(p => p.category === 'Open Șah Rapid'),
      'Open Blitz': participants.filter(p => p.category === 'Open Blitz'),
      'Rapid + Blitz': participants.filter(p => p.category === 'Rapid + Blitz'),
    };

    // Set cache header (60 seconds)
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');

    return res.status(200).json({
      total: participants.length,
      participants,
      byCategory,
    });
  } catch (error) {
    console.error('Participants endpoint error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
