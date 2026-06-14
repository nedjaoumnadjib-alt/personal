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

async function inspect() {
  try {
    const { count: reqCount, error: countErr } = await supabase.from('requests').select('*', { count: 'exact' });
    if (countErr) console.error('Count error:', countErr);

    const { data: recentReqs, error: reqErr } = await supabase.from('requests').select('*').order('date', { ascending: false }).limit(20);
    if (reqErr) console.error('Requests select error:', reqErr);

    const { data: recentTest, error: testErr } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false }).limit(20);
    if (testErr) console.error('Testimonials select error:', testErr);

    console.log('Requests count:', reqCount ?? (Array.isArray(recentReqs) ? recentReqs.length : 0));
    if (Array.isArray(recentReqs)) console.table(recentReqs.map(r => ({ id: r.id, name: r.name, email: r.email, status: r.status, date: r.date }))); 

    console.log('\nTestimonials found:', Array.isArray(recentTest) ? recentTest.length : 0);
    if (Array.isArray(recentTest)) console.table(recentTest.map(t => ({ request_id: t.request_id, name: t.name, rating: t.rating, created_at: t.created_at })));

  } catch (err) {
    console.error('Inspect error:', err.message || err);
  }
}

inspect();
