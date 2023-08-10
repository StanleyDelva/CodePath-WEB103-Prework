import { createClient } from '@supabase/supabase-js';

const URL = "https://nfauvtsocdajjmeukgck.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mYXV2dHNvY2RhamptZXVrZ2NrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEyNzMxNTUsImV4cCI6MjAwNjg0OTE1NX0.KXBora77CQAx_eIrZN0FbW_vXtKiXNGDgg9i60pxGHI";

export const supabase = createClient(URL,API_KEY);

