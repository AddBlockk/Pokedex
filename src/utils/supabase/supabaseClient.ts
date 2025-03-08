import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://yyhgqyhrfghwtouxtrml.supabase.co";
const SUPABASE_KEY =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5aGdxeWhyZmdod3RvdXh0cm1sIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MTMwOTQxMCwiZXhwIjoyMDU2ODg1NDEwfQ.azJpjYOuUAMO91WB9sp4mh10xbotfLin8NXPWsW6wWc";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
