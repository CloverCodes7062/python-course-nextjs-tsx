import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Chapter 3.2a",
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
            <h1 className="m-[10px] text-center font-bold text-4xl">Chapter 3.2a</h1>
            <div className="m-auto">
                <h2 className="m-[10px] font-semibold text-2xl">Covered In this Section:</h2>
                <ul className="ml-[50px]">
                    <a href="/python-course/chapter-3/section-2a/1a">
                        <li>
                            <p className="m-[15px] text-lg"><span className="font-semibold">Section 1: HTML;</span> What is HTML?</p>
                        </li>
                    </a>
                    <a href="/python-course/chapter-3/section-2a/2a"> 
                        <li>
                            <p className="m-[15px] text-lg"><span className="font-semibold">Section 2: CSS;</span> What is CSS?</p>
                        </li>
                    </a>
                    <a href="/python-course/chapter-3/section-2a/3a">
                        <li>
                            <p className="m-[15px] text-lg"><span className="font-semibold">Section 3: Flask;</span> What is Flask?</p>
                        </li>
                    </a>
                </ul>
            </div>
        </div>
    );
}