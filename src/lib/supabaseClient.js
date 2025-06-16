import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mniwbtlawknevocoljyw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uaXdidGxhd2tuZXZvY29sanl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5OTgwNTIsImV4cCI6MjA2NTU3NDA1Mn0.J3lXY83_HMclM5yknFx-jM-zZiUWiwgR21nve8zIG0Q';

export const supabase = createClient(supabaseUrl, supabaseKey);
