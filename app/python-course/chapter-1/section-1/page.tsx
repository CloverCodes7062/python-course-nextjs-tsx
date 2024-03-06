'use client';
import PythonCodeForm from "@/components/PythonCodeForm";
import { createClient } from "@/utils/supabase/server";
import { redirect, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Head from 'next/head';
import QuestionLoading from "@/components/QuestionLoading";

interface QuestionCompletedData {
    question: string;
    points_worth: number;
}

export default function() {
    const [outputSuccess, setOutputSuccess] = useState(false);
    const [output, setOutput] = useState(null);
    const [renderLoading, setRenderLoading] = useState(true);
    const [ranCode, setRanCode] = useState(false);

    const router = useRouter();

    const [questionsCompleted, setQuestionsCompleted] = useState<QuestionCompletedData[]>([]);
    const alreadySetQuestions = useRef(false);

    useEffect(() => {
        const checkSession = async () => {
            const response = await fetch('http://localhost:3000/api/getSession');
            const data = await response.json();

            if (data?.role != "authenticated") {
                router.push('/login');
            }
            
            if (!alreadySetQuestions.current) {
                alreadySetQuestions.current = true;

                const questionsCompletedRes = await fetch('http://localhost:3000/api/getCompletedQuestions?chapterSection=1-1');
                const questionsCompletedData = await questionsCompletedRes.json();

                console.log('questionsCompletedData?.questionsCompleted', questionsCompletedData?.questionsCompleted);

                await questionsCompletedData?.questionsCompleted.forEach((element: any) => {
                    setQuestionsCompleted(prevQuestions => [...prevQuestions, { question: element.question, points_worth: element.points_worth }]);
                });
            }
        };

        checkSession();

    }, [router]);
    
    useEffect(() => {
        if (output) {
            setRenderLoading(false);
        }
    }, [output]);

    const isResultOutput = (output: { result?: string, err?: string }): output is { result: string } => {
        const checkIfOutputSuccessful = async () => {
            if (output.hasOwnProperty('result')) {
                const response = await fetch('http://localhost:3000/api/postQuestionResult', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ question: '1-1-1', points_worth: 1 }),
                })
            }
        }

        checkIfOutputSuccessful();

        return output.hasOwnProperty('result');
    }

    function UnderRunCode() {
        return (
            <div>
            {renderLoading && <QuestionLoading />}
                <div className="pt-[25px] pd-[25px] pr-[15px] pl-[15px] flex items-center">
                    <div className={`p-[10px] w-full h-full rounded-lg shadow-lg border-2 border-gray-200 ${
                        output
                            ? isResultOutput(output)
                                ? 'border-l-green-500 border-l-4'
                                : 'border-l-red border-l-4'
                            : ''
                        } flex items-center`}>
                        {output ? 
                            isResultOutput(output) ? (
                                <p className="res">{(output as { result: string }).result}</p>
                            ) : (
                                <p className="err">{(output as { err: string }).err}</p>
                            )
                        : null}
                    </div>
                </div>
            </div>
        )
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
                    <p className="text-pretty mt-[10px] text-lg w-[700px]">What value is assigned to z? Correct, z is assigned the value "catdog". Everything on the right side of the = is computed first, but since we can't "add" strings, we <span className="italic font-medium">concatenate</span> them; x ("cat") + y ("dog") = "catdog" and then "catdog" assigned to z.</p>
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
                        <div className={`relative flex justify-between text-2xl p-[12.5px] pb-[25px] text-left rounded-t-lg ${questionsCompleted.some(q => q.question === "1-1-1") ? 'bg-green-500' : 'bg-red'}`}>
                            <div>
                                <h1 className="text-white font-medium text-lg">Programming Exercise:</h1>
                                <h2 className="indent-[25px] text-white font-medium">Print To Console</h2>
                            </div>
                            <div>
                                <h2 className="text-white font-medium">Points:</h2>
                                <p className="text-white text-right font-medium">{questionsCompleted.some(q => q.question === "1-1-1") ? '1/1' : '0/1'}</p>
                            </div>
                        </div>
                        <div className="p-[10px] pl-[25px] pb-[20px]">
                            <p className="text-pretty mt-[10px] text-lg w-[700px]">We've talked enough about variables and print(), it's time to write some code! Create a fews variables and try outputting to the console with print(). Also try using print() on a non variable, print("cat"). Don't worry if you get errors, we'll discuss those shortly.</p>
                        </div>

                        <div>
                            <PythonCodeForm setOutput={setOutput} setRanCode={setRanCode} setRenderLoading={setRenderLoading}/>
                        </div>
                        <div>
                            <div className="pl-[10px] pr-[10px] mt-[15px] mb-[15px] ml-[10px] mr-[10px] flex items-center justify-between bg-output-gray rounded-lg shadow-lg">
                                <h2 className="text-xl font-medium">Test Results: </h2>
                                <button className="p-[7.5px] ml-[10px] mt-[5px] mb-[10px] bg-test-gray rounded-lg shadow-lg">Close</button>
                            </div>
                        </div>
                        {ranCode && <UnderRunCode />}
                    </div>
                </main>
            </div>
        </div>
    );
}