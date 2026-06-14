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

async function insert(name, email) {
  try {
    const id = `PRJ-${String(Math.floor(Math.random()*90000)+10000)}`;
    const newReq = {
      id,
      name: name || `Manual-${Date.now()}`,
      email: email || `manual-${Date.now()}@example.com`,
      type: 'Website',
      budget: 'Custom',
      desc: 'Inserted by admin for testing',
      status: 'pending',
      date: new Date().toISOString().slice(0,10)
    };

    const { error } = await supabase.from('requests').insert([newReq]);
    if (error) {
      console.error('Insert error:', error);
      process.exit(1);
    }

    console.log('Inserted request:', { id: newReq.id, name: newReq.name, email: newReq.email });
  } catch (err) {
    console.error('Error inserting request:', err.message || err);
  }
}

const [, , nameArg, emailArg] = process.argv;
insert(nameArg, emailArg);
