import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await supabase
    .from('employees')
    .select(`
      *,
      employee_compensation_history(id, effective_to, rate_type, amount)
    `)
    .limit(5);

  console.log("Error:", error);
  console.log("Data:", JSON.stringify(data, null, 2));
}

run();
