import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Chapter 3",
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
            <h1 className="m-[10px] text-center font-bold text-4xl">Chapter 3</h1>
            <div className="m-auto">
                <h2 className="m-[10px] font-semibold text-2xl">Covered In this Chapter:</h2>
                <ul className="ml-[50px]">
                    <a href="/python-course/chapter-3/section-1">
                        <li>
                            <p className="m-[15px] text-lg"><span className="font-semibold">Section 1: Data Structure Mutability;</span> What is Mutability?</p>
                        </li>
                    </a>
                    <a href="/python-course/chapter-3/section-2"> 
                        <li>
                            <p className="m-[15px] text-lg"><span className="font-semibold">Section 2: Functions;</span> What they are and how they work</p>
                        </li>
                    </a>
                    <a href="/python-course/chapter-3/section-2a">
                        <li>
                            <p className="m-[15px] text-lg"><span className="font-semibold">Section 2.a: Basic Web Development;</span> What is HTML, CSS, and Flask?</p>
                        </li>
                    </a>
                    <a href="/python-course/chapter-3/section-3">
                        <li>
                            <p className="m-[15px] text-lg"><span className="font-semibold">Section 3: Formatting;</span> How can we format print statements?</p>
                        </li>
                    </a>
                    <a href="/python-course/chapter-3/section-4">
                        <li>
                            <p className="m-[15px] text-lg"><span className="font-semibold">Section 4: Tuples, and References;</span> What is a Tuple, what is a reference?</p>
                        </li>    
                    </a>
                </ul>
            </div>
        </div>
    );
}