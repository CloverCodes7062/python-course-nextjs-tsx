'use client';
import PythonCodeForm from "@/components/PythonCodeForm";
import { createClient } from "@/utils/supabase/server";
import { redirect, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Head from 'next/head';
import QuestionLoading from "@/components/QuestionLoading";
import StandardContainer from "@/components/StandardContainer";
import Pmt25 from "@/components/Pmt25";
import Pmt10 from "@/components/Pmt10";
import StandardTitleH1 from "@/components/StandardTitleH1";
import StandardLearningObjectivesContainer from "@/components/StandardLearningObjectivesContainer";
import StandardLi from "@/components/StandardLi";
import KeyPointsContainer from "@/components/KeyPointsContainer";
import ProgrammingExercise from "@/components/ProgrammingExercise";

interface QuestionCompletedData {
    question: string;
    points_worth: number;
}

export default function() {
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

    return (
        <div>
            <StandardTitleH1>Chapter 1.1: Variables</StandardTitleH1>
            <div className="flex flex-col items-center">
                <StandardLearningObjectivesContainer>
                    <StandardLi>You will understand what a variable is</StandardLi>
                    <StandardLi>You will understand how to create a variable.</StandardLi>
                    <StandardLi>You will understand how to use a variable</StandardLi>
                    <StandardLi>You will understand how to output to the console</StandardLi>
                </StandardLearningObjectivesContainer>
                <main className="w-full mt-[40px] mb-[40px]">
                    <h1 className="text-left text-2xl font-medium">So what is a variable?</h1>
                    <Pmt10>
                        A variable in programming is almost identical to a variable in algebra, think of them as a <span className="italic font-medium">letter or word</span> that holds a value. Variables can come in many different types, but for now, we'll look at the most basic types.
                    </Pmt10>
                    <StandardContainer>
                        <p className="font-medium">String: A string variable in python is text, which must be in wrapped ' ' or " "; ("cat" "this is a sentence")</p>
                        <p className="font-medium">Integer: An integer variable in python is a whole number; (5, 0, -10)</p>
                    </StandardContainer>
                    <Pmt25>
                        To create a variable in python, we need to use the assignment operator (=), the value on the right will be assigned to the <span className="italic font-medium">variable name</span> on the left.
                    </Pmt25>
                    <StandardContainer>
                        <p className="font-medium">x = 5</p>
                    </StandardContainer>
                    <Pmt10>
                        In the example above, we create a variable <span className="italic font-medium">x</span> and use the <span className="italic font-medium">assignment operator</span> to assign it a value of 5.
                    </Pmt10>
                    <Pmt25>
                        Let's look at another example:
                    </Pmt25>
                    <StandardContainer>
                        <p className="font-medium">x = "cat"</p>
                    </StandardContainer>
                    <Pmt10>
                        Again, we use the <span className="italic font-medium">assignment operator</span> to give x a value, but this time its <span className="italic font-medium">"cat"</span>. Last time, we assigned it an <span className="italic font-medium">integer</span> so quotes are not needed. Anytime you want to use a string in python, you must use " " or ' ' since unquoted letters/words are seen as variables.
                    </Pmt10>
                    <h1 className="mt-[50px] text-left text-2xl font-medium">How can we use variables?</h1>
                    <Pmt10>
                        Variables can be used in several different ways, but for now, we'll talk about using them with the <span className="italic font-medium">assignment operator</span>, and shortly after, <span className="italic font-medium">outputting them</span> (and other values) to the console with <span className="italic font-medium">print()</span>.
                    </Pmt10>
                    <Pmt25>
                        Let's create two <span className="italic font-medium">integer</span> variables:
                    </Pmt25>
                    <StandardContainer>
                        <p className="font-medium">x = 5</p>
                        <p className="font-medium">y = 4</p>
                    </StandardContainer>
                    <Pmt10>
                        Now, let's create a third one using the previous two:
                    </Pmt10>
                    <StandardContainer>
                        <p className="font-medium">z = x + y</p>
                    </StandardContainer>
                    <Pmt10>
                        What value is assigned to z? Correct, z is assigned the value 9. Everything on the right side of the = is computed first, x (5) + y (4) = 9 and then 9 assigned to z.
                    </Pmt10>
                    <Pmt25>
                        Strings are a little different, since you can't "add" words.
                    </Pmt25>
                    <Pmt10>
                        Let's looks at an example:
                    </Pmt10>
                    <StandardContainer>
                        <p className="font-medium">x = "cat"</p>
                        <p className="font-medium">y = "dog"</p>
                        <p className="font-medium">z = x + y</p>
                    </StandardContainer>
                    <Pmt10>
                        What value is assigned to z? Correct, z is assigned the value "catdog". Everything on the right side of the = is computed first, but since we can't "add" strings, we <span className="italic font-medium">concatenate</span> them; so we do, x ("cat") + y ("dog") = "catdog" and then "catdog" assigned to z.
                    </Pmt10>
                    <Pmt25>
                        Eariler, and in the learning objectives, <span className="italic font-medium">print()</span> is mentioned. print() is a <span className="italic font-medium">function</span> that takes a value and outputs it to the <span className="italic font-medium">console</span>. Note that the value does not have to be a variable.
                    </Pmt25>
                    <Pmt10>Let's look at an example:</Pmt10>
                    <StandardContainer>
                        <p className="font-medium">x = 5</p>
                        <p className="font-medium">print(x)</p>
                    </StandardContainer>
                    <Pmt25>
                        When we run this program, it outputs:
                    </Pmt25>
                    <StandardContainer>
                        <p className="font-medium">5</p>
                    </StandardContainer>
                    <ProgrammingExercise
                        questionsCompleted={questionsCompleted}
                        setQuestionsCompleted={setQuestionsCompleted}
                        questionNumber={"1-1-1"}
                        questionTitle={"Print To Console"}
                        questionDescription={"We've talked enough about variables and print(), it's time to write some code! Create a fews variables and try outputting to the console with print(). Also try using print() on a non variable, print('cat'). Don't worry if you get errors, we'll discuss those shortly."}
                        pointsWorth={1}
                        neededOutput={''}
                    />
                    <KeyPointsContainer>
                        <StandardLi>A variable is a<span className="italic font-medium"> letter or word </span> (can also be multiple words; this_is_a_variable)</StandardLi>
                        <StandardLi>Variables can be created using the <span className="italic font-medium">assignment operator</span> (=)</StandardLi>
                        <StandardLi>Integers are <span className="italic font-medium">added</span> (5 + 4 = 9) using (+), while strings are <span className="italic font-medium">concatenated</span> ("cat" + "dog" = "catdog")</StandardLi>
                        <StandardLi>You can output to the console using <span className="italic font-medium">print()</span></StandardLi>
                    </KeyPointsContainer>
                </main>
            </div>
        </div>
    );
}