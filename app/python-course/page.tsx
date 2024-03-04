import AuthButton from "@/components/AuthButton";
import DeployButton from "@/components/DeployButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";


export const metadata = {
    title: "Python Course",
};

export default async function pythonCourse() {
    
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) {
      return redirect("/login");
    }
    
    return (
        <>
            <header>
                <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                    <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                    <AuthButton />
                    </div>
                </nav>
            </header>
            <h1>Welcome to the python course!</h1>
            <main className="min-h-screen flex flex-col justify-center">
                <div className="bg-gray-100 h-full w-auto flex justify-center items-center">
                    <ul className="w-[600px]">
                        <a href="/python-course/chapter-1">
                            <li className="m-[10px] text-2xl font-semibold flex justify-center">
                                Chapter 1
                            </li>
                        </a>
                        <a href="/python-course/chapter-2">
                            <li className="m-[10px] text-2xl font-semibold flex justify-center">
                                Chapter 2
                            </li>
                        </a>
                        <a href="/python-course/chapter-3">
                            <li className="m-[10px] text-2xl font-semibold flex justify-center">
                                Chapter 3
                            </li>
                        </a>
                        <a href="/python-course/chapter-4">
                            <li className="m-[10px] text-2xl font-semibold flex justify-center">
                                Chapter 4
                            </li>
                        </a>
                    </ul>
                </div>
            </main>
        </>
    );
}