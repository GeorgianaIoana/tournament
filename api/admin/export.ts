import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase, type Registration } from '../../lib/supabase.js';

const ADMIN_SECRET = process.env.ADMIN_SECRET;

function isAuthorized(req: VercelRequest): boolean {
  if (!ADMIN_SECRET) return false;
  const authHeader = req.headers.authorization;
  return authHeader === `Bearer ${ADMIN_SECRET}`;
}

function escapeCSV(value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined) return '';
  const str = String(value);
  // Escape double quotes and wrap in quotes if contains comma, newline, or quote
  if (str.includes(',') || str.includes('\n') || str.includes('"')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleString('ro-RO', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!isAuthorized(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
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

    const registrations = data as Registration[];

    // Build CSV
    const headers = [
      'ID',
      'Nume Complet',
      'Email',
      'Telefon',
      'FIDE ID',
      'Club',
      'Categorie',
      'Suma (RON)',
      'Status',
      'Intrare Gratuită',
      'Motiv Gratuitate',
      'Data Înregistrării',
      'Data Plății',
    ];

    const rows = registrations.map(r => [
      escapeCSV(r.id),
      escapeCSV(r.full_name),
      escapeCSV(r.email),
      escapeCSV(r.phone),
      escapeCSV(r.fide_id),
      escapeCSV(r.club),
      escapeCSV(r.category),
      escapeCSV(r.is_free_entry ? 0 : r.amount_ron / 100),
      escapeCSV(r.status),
      escapeCSV(r.is_free_entry ? 'Da' : 'Nu'),
      escapeCSV(r.free_entry_reason || ''),
      escapeCSV(formatDate(r.created_at)),
      escapeCSV(formatDate(r.paid_at)),
    ]);

    const csv = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');

    // Generate filename with date
    const date = new Date().toISOString().split('T')[0];
    const filename = `registrations-${date}.csv`;

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    return res.status(200).send(csv);
  } catch (error) {
    console.error('Export error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
