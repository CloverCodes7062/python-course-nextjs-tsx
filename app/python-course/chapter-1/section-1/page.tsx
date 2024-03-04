import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Chapter 1.1: Variables",
};

export default async function() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
      
      if (!user) {
        return redirect("/login");
    }

    return (
        <div>
            <h1>Hi</h1>
        </div>
    );
}