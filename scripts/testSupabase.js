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

async function run() {
  try {
    console.log('Inserting test request...');
    const newReq = {
      id: `TEST-${Date.now()}`,
      name: 'Local Test',
      email: 'test@example.com',
      type: 'Website',
      budget: '1000 DZD',
      desc: 'Inserted from test script',
      status: 'pending',
      date: new Date().toISOString().slice(0,10)
    };

    const insertRes = await supabase.from('requests').insert([newReq]);
    console.log('Insert response:', insertRes);

    console.log('Fetching last 5 requests...');
    const { data, error } = await supabase.from('requests').select('*').order('date', { ascending: false }).limit(5);
    if (error) console.error('Select error:', error);
    else console.log('Recent rows:', data);
  } catch (err) {
    console.error('Error:', err.message || err);
  }
}

run();
