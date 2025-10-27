import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wagevsvfxvtmtgdnozin.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhZ2V2c3ZmeHZ0bXRnZG5vemluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1OTY2NTAsImV4cCI6MjA3NzE3MjY1MH0.EftO-FTw4aHjn1hn1q1C84uTzLyXlg4XTwO3hRir5jI';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be provided.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
