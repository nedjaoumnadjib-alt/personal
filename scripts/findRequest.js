/* global process */
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in environment');
  process.exit(1);
}

const supabase = createClient(url, key);

async function find(nameArg, emailArg) {
  try {
    const query = supabase.from('requests').select('*');

    if (nameArg) query.ilike('name', `%${nameArg}%`);
    if (emailArg) query.ilike('email', `%${emailArg}%`);

    const { data, error } = await query.order('date', { ascending: false }).limit(50);
    if (error) {
      console.error('Query error:', error);
      process.exit(1);
    }

    if (!data || data.length === 0) {
      console.log('No requests matched the query.');
      return;
    }

    console.log(`Found ${data.length} matching request(s):`);
    console.table(data.map(r => ({ id: r.id, name: r.name, email: r.email, status: r.status, date: r.date })));
  } catch (err) {
    console.error('Find error:', err.message || err);
  }
}

const [, , nameArg, emailArg] = process.argv;
find(nameArg, emailArg);
