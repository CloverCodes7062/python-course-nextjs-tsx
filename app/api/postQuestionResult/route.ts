import { createClient } from "@/utils/supabase/server";

export async function POST(req: any, res: any) {
    console.log('postQuestionResult called');

    const body = await req.json();
    const { question, points_worth } = body;
    
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();

    const userId = data?.user?.id;

    if (userId) {
        const { data: res, error } = await supabase
        .from('questions_complete_by_user')
        .insert({
            id: userId,
            points_worth: points_worth,
            question_completed: true,
            question: question
        });
    }

    return new Response(JSON.stringify({ result: 'OK' }));
}