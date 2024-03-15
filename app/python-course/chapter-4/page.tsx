import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Chapter 4",
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
            <h1 className="m-[10px] text-center font-bold text-4xl">Chapter 4</h1>
            <div className="m-auto">
                <h2 className="m-[10px] font-semibold text-2xl">Covered In this Chapter:</h2>
                <ul className="ml-[50px]">
                    <a href="/python-course/chapter-4/section-1">
                        <li>
                            <p className="m-[15px] text-lg"><span className="font-semibold">Section 1: Local and Global Scope;</span> What is Scope?</p>
                        </li>
                    </a>
                    <a href="/python-course/chapter-4/section-2"> 
                        <li>
                            <p className="m-[15px] text-lg"><span className="font-semibold">Section 2: Modules, Randomness, and Time/Dates;</span> What is a Module?</p>
                        </li>
                    </a>
                    <a href="/python-course/chapter-4/section-3">
                        <li>
                            <p className="m-[15px] text-lg"><span className="font-semibold">Section 3: Classes and Objects;</span> What is a Class? What is an Object?</p>
                        </li>
                    </a>
                    <a href="/python-course/chapter-4/section-4">
                        <li>
                            <p className="m-[15px] text-lg"><span className="font-semibold">Section 4: Tuples, and References;</span> What is a Tuple, what is a reference?</p>
                        </li>    
                    </a>
                </ul>
            </div>
        </div>
    );
}