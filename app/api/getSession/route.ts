import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";

export async function GET(req: any, res: any) {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();

    if (data?.user?.role) {
        return new Response(JSON.stringify({ result: data.user.role }));
    }

    return new Response(JSON.stringify({ result: 'no user found' }));
}