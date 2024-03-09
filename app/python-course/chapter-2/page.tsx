import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Chapter 2",
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
            <h1 className="m-[10px] text-center font-bold text-4xl">Chapter 2</h1>
            <div className="m-auto">
                <h2 className="m-[10px] font-semibold text-2xl">Covered In this Chapter:</h2>
                <ul className="ml-[50px]">
                    <a href="/python-course/chapter-2/section-1">
                        <li>
                            <p className="m-[15px] text-lg"><span className="font-semibold">Section 1: More Conditional Statements;</span> A showcase of more conditional statements.</p>
                        </li>
                    </a>
                    <a href="/python-course/chapter-2/section-2"> 
                        <li>
                            <p className="m-[15px] text-lg"><span className="font-semibold">Section 2: Simple Loops;</span> What is a loop?</p>
                        </li>
                    </a>
                    <a href="/python-course/chapter-2/section-3"> 
                        <li>
                            <p className="m-[15px] text-lg"><span className="font-semibold">Section 2: More Data Structures and More Loops;</span> A showcase of more data structures (list, dict)</p>
                        </li>
                    </a>
                </ul>
            </div>
        </div>
    );
}