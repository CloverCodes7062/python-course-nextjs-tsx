import { createClient } from "@/utils/supabase/server";

export async function GET(req: any, res: any) {
    const chapterSection = req.nextUrl.searchParams.get('chapterSection');

    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    const userId = data?.user?.id;

    if (userId) {
        const { data: questionsCompleted, error } = await supabase
          .from('questions_complete_by_user')
          .select()
          .eq('id', userId)
          .ilike('question', `${chapterSection}-%`);
        
        return new Response(JSON.stringify({ questionsCompleted: questionsCompleted }));
    }

    return new Response(JSON.stringify({ questionsCompleted: '' }));
}