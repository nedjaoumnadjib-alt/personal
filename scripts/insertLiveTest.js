import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const env = globalThis.process?.env ?? {};
const url = env.VITE_SUPABASE_URL;
const key = env.VITE_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in environment');
  globalThis.process?.exit?.(1);
}

const supabase = createClient(url, key);

async function run() {
  try {
    const marker = `LIVE-TEST-${Date.now()}`;
    const newReq = {
      id: `PRJ-${String(Math.floor(Math.random()*90000)+10000)}`,
      name: marker,
      email: `${marker.toLowerCase()}@example.com`,
      type: 'Website',
      budget: 'Testing',
      desc: 'Live flow test inserted by script',
      status: 'pending',
      date: new Date().toISOString().slice(0,10)
    };

    const insertRes = await supabase.from('requests').insert([newReq]);
    console.log('Insert response:', insertRes);

    // optionally add a testimonial linked to this request
    const newTest = {
      request_id: newReq.id,
      name: newReq.name,
      role: 'Client',
      text: 'This is a test rating inserted during live test.',
      rating: 5,
      created_at: new Date().toISOString()
    };

    const insertTest = await supabase.from('testimonials').insert([newTest]);
    console.log('Insert testimonial response:', insertTest);

    console.log('Inserted marker:', marker, 'request id:', newReq.id);
  } catch (err) {
    console.error('Error inserting live test:', err.message || err);
  }
}

run();
