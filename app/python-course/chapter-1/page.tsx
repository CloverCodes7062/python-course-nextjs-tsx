import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Chapter 1",
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
        <div className="min-h-screen p-[10px] flex flex-col">
            <h1 className="m-[10px] text-center font-bold text-4xl">Chapter 1</h1>
            <div className="m-auto">
                <h2 className="m-[10px] font-semibold text-2xl">Covered In this Chapter:</h2>
                <ul className="ml-[50px]">
                    <a href="/python-course/chapter-1/section-1">
                        <li>
                            <p className="m-[15px] text-lg"><span className="font-semibold">Section 1: Variables;</span> What they are and how they work</p>
                        </li>
                    </a>
                    <a>
                        <li>
                            <p className="m-[15px] text-lg"><span className="font-semibold">Section 2: Basic Math;</span> How python handles basic arithmetic operators/operations</p>
                        </li>
                    </a>
                    <a>
                        <li>
                            <p className="m-[15px] text-lg"><span className="font-semibold">Section 3: User Input;</span> How to get and use input from a user</p>
                        </li>
                    </a>
                    <a>
                        <li>
                            <p className="m-[15px] text-lg"><span className="font-semibold">Section 4: Conditional Statements;</span> What are conditional statements and how to use them</p>
                        </li>    
                    </a>
                </ul>
            </div>
        </div>
    );
}