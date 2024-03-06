import { createClient } from "@/utils/supabase/server";

export async function GET(req: any, res: any) {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();

    if (data?.user?.role && data?.user?.id) {
        return new Response(JSON.stringify({ role: data.user.role, id: data.user.id }));
    }

    return new Response(JSON.stringify({ result: 'no user found' }));
}