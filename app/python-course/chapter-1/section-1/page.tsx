import PythonCodeForm from "@/components/PythonCodeForm";
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
            <h1 className="text-center mt-[15px] mb-[15px] font-semibold text-3xl">Getting Started</h1>
            <div className="flex flex-col items-center">
                <div className="p-[10px] pr-[300px] mt-[50px] border-2 border-gray-200 border-l-green-500 border-l-4 rounded-lg shadow-lg">
                    <h2 className="mb-[5px] font-medium text-2xl">Learning Objectives</h2>
                    <h3 className="text-lg">After this section: </h3>
                    <ul>
                        <li className="indent-[25px]"><span className="text-2xl">&bull;</span>You will understand what a variable is</li>
                        <li className="indent-[25px]"><span className="text-2xl">&bull;</span>You will understand how to create a variable.</li>
                        <li className="indent-[25px]"><span className="text-2xl">&bull;</span>You will understand how to use a variable</li>
                        <li className="indent-[25px]"><span className="text-2xl">&bull;</span>You will understand how to output to the console</li>
                    </ul>
                </div>
                <main className="w-full mt-[40px] mb-[40px]">
                    <h1 className="text-left text-2xl font-medium mb-[10px]">So what is a variable?</h1>
                    <p className="text-pretty text-lg w-[700px]">
                        A variable in programming is almost identical to a variable in algebra, think of them as a
                        <span className="italic font-medium"> letter or word </span>
                        that holds a value.
                    </p>
                    <p className="text-pretty mt-[10px] text-lg w-[700px]">
                        To create a variable in python, we need to use the assignment operator (=), 
                         the value on the right will be assigned to the 
                        <span className="italic font-medium"> variable name </span>
                        on the left.
                    </p>
                    <div className="mt-[10px] p-[10px] pt-[15px] pb-[15px] w-full flex items-center border-2 border-gray-200 rounded-lg shadow-lg">
                        <p className="font-medium">x = 5</p>
                    </div>
                    <p className="text-pretty mt-[10px] text-lg w-[700px]">
                        In the example above, we create a variable <span className="italic font-medium">x</span> and use the <span className="italic font-medium">assignment operator</span> to assign it a value of 5.
                    </p>
                    <p className="text-pretty mt-[25px] text-lg w-[700px]">
                        Let's look at another example:
                    </p>
                    <div className="mt-[10px] p-[10px] pt-[15px] pb-[15px] w-full flex items-center border-2 border-gray-200 rounded-lg shadow-lg">
                        <p className="font-medium">x = "cat"</p>
                    </div>
                    <p className="text-pretty mt-[10px] text-lg w-[700px]">
                        Again, we use the <span className="italic font-medium">assignment operator</span> to give x a value, but this time its <span className="italic font-medium">"cat"</span>. Last time, we assigned it an <span className="italic font-medium">integer</span> so quotes are not needed. Anytime you want to use a string (word) in python, you must use " " or ' ' since unquoted letters/words are seen as variables.
                    </p>
                    <h1 className="mb-[10px] mt-[50px] text-left text-2xl font-medium">How can we use variables?</h1>
                    <p className="text-pretty mt-[10px] text-lg w-[700px]">Variables can be used in several different ways, but for now, we'll talk about using them with the <span className="italic font-medium">assignment operator</span>, and shortly after, <span className="italic font-medium">outputting them</span> (and other values) to the console with <span className="italic font-medium">print()</span></p>
                    <p className="text-pretty mt-[10px] text-lg w-[700px]">Let's create two <span className="italic font-medium">integer</span> variables: </p>
                    <div className="mt-[10px] p-[10px] pt-[15px] pb-[15px] w-full flex flex-col justify-center border-2 border-gray-200 rounded-lg shadow-lg">
                        <p className="font-medium">x = 5</p>
                        <p className="font-medium">y = 4</p>
                    </div>
                    <p className="text-pretty mt-[10px] text-lg w-[700px]">Now, let's create a third one using the previous two:</p>
                    <div className="mt-[10px] p-[10px] pt-[15px] pb-[15px] w-full flex flex-col justify-center border-2 border-gray-200 rounded-lg shadow-lg">
                        <p className="font-medium">z = x + y</p>
                    </div>
                    <p className="text-pretty mt-[10px] text-lg w-[700px]">What value is assigned to z? Correct, z is assigned the value 9. Everything on the right side of the = is computed first, x (5) + y (4) = 9 and then 9 assigned to z.</p>

                    <p className="text-pretty mt-[25px] text-lg w-[700px]">Strings are a little different, since you can't "add" words.</p>
                    <p className="text-pretty mt-[5px] text-lg w-[700px]">Let's looks at an example: </p>
                    <div className="mt-[10px] p-[10px] pt-[15px] pb-[15px] w-full flex flex-col justify-center border-2 border-gray-200 rounded-lg shadow-lg">
                        <p className="font-medium">x = "cat"</p>
                        <p className="font-medium">y = "dog"</p>
                        <p className="font-medium">z = x + y</p>
                    </div>
                    <p className="text-pretty mt-[10px] text-lg w-[700px]">What value is assigned to z? Correct, z is assigned the value "catdog". Everything on the right side of the = is computed first, but since we can't "add" strings, we concatenate them; x ("cat") + y ("dog") = "catdog" and then "catdog" assigned to z.</p>
                    <p className="text-pretty mt-[25px] text-lg w-[700px]">Eariler, and in the learning objectives, <span className="italic font-medium">print()</span> is mentioned. print() is a <span className="italic font-medium">function</span> that takes a value and outputs it to the <span className="italic font-medium">console</span>. Note that the value does not have to be a variable.</p>
                    <p className="text-pretty mt-[10px] text-lg w-[700px]">Let's look at an example:</p>
                    <div className="mt-[10px] p-[10px] pt-[15px] pb-[15px] w-full flex flex-col justify-center border-2 border-gray-200 rounded-lg shadow-lg">
                        <p className="font-medium">x = 5</p>
                        <p className="font-medium">print(x)</p>
                    </div>
                    <p className="text-pretty mt-[10px] text-lg w-[700px]">When we run this program, it outputs:</p>
                    <div className="mt-[10px] p-[10px] pt-[15px] pb-[15px] w-full flex flex-col justify-center border-2 border-gray-200 rounded-lg shadow-lg">
                        <p className="font-medium">5</p>
                    </div>

                    <div className="mt-[50px] pb-[15px] w-full flex flex-col justify-center border-2 border-gray-200 rounded-lg shadow-lg">
                        <div className="relative flex justify-between text-2xl p-[10px] pb-[25px] text-left bg-red rounded-lg">
                            <div>
                                <h1 className="text-white font-medium">Exercise:</h1>
                                <h2 className="text-white font-medium">Print To Console</h2>
                            </div>
                            <div>
                                <h2 className="text-white font-medium">Points:</h2>
                                <p className="text-white text-right font-medium">0/1</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-pretty mt-[10px] text-lg w-[700px]">We've talked enough about variables and print(), it's time to write some code! Create a fews variables and try outputting to the console with print(). Also try using print() on a non variable, print("cat"). Don't worry if you get errors, we'll discuss those shortly</p>
                        </div>
                        <div>
                            <PythonCodeForm />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}