'use client';

import { redirect, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import StandardContainer from "@/components/StandardContainer";
import Pmt25 from "@/components/Pmt25";
import Pmt10 from "@/components/Pmt10";
import StandardTitleH1 from "@/components/StandardTitleH1";
import StandardLearningObjectivesContainer from "@/components/StandardLearningObjectivesContainer";
import StandardLi from "@/components/StandardLi";
import KeyPointsContainer from "@/components/KeyPointsContainer";
import ProgrammingExercise from "@/components/ProgrammingExercise";
import StandardH1 from "@/components/StandardH1";

interface QuestionCompletedData {
    question: string;
    points_worth: number;
}

export default function Section2() {
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

                const questionsCompletedRes = await fetch('http://localhost:3000/api/getCompletedQuestions?chapterSection=1-2');
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
        <div className="w-[800px]">
            <StandardTitleH1>Chapter 1.2: Basic Math</StandardTitleH1>
            <div className="flex flex-col items-center">
                <StandardLearningObjectivesContainer pr={'100'}>
                    <StandardLi>You will understand the basic operands in python</StandardLi>
                    <StandardLi>You will understand the order of operations in python</StandardLi>
                    <StandardLi>You will understand how the operands affect basic data types (string, int, float)</StandardLi>
                </StandardLearningObjectivesContainer>
                <main className="w-full mt-[40px] mb-[40px]">
                    <StandardH1>What are the basic operands and operations?</StandardH1>
                    <StandardContainer>
                        <p className="font-medium">+ : Addition; 5 + 10 = 15</p>
                        <p className="font-medium">- : Subtraction; 5 - 10 = -5</p>
                        <p className="font-medium">* : Multiplication; 5 * 10 = 50</p>
                        <p className="font-medium">/ : Division (Float Division); 5 / 10 = 0.50 </p>
                        <p className="font-medium">// : Floor Division (Integer Division); 5 // 10 = 0</p>
                    </StandardContainer>
                    <Pmt25>Let's look at an indepth example of each operation on each data type:</Pmt25>
                    <StandardContainer>
                        <p className="font-medium">print(5 + 10)</p>
                        <p className="font-medium">print("cat" + "dog")</p>
                        <br />
                        <p className="font-medium">print(5 - 10)</p>
                        <p className="font-medium">print("cat" - "dog")</p>
                        <br />
                        <p className="font-medium">print(5 * 10)</p>
                        <p className="font-medium">print("cat" * 5)</p>
                        <br />
                        <p className="font-medium">print(5 / 10)</p>
                        <p className="font-medium">print("cat" / 5)</p>
                        <br />
                        <p className="font-medium">print(5 // 10)</p>
                        <p className="font-medium">print("cat" // 10)</p>
                    </StandardContainer>
                    <Pmt25>Now let's look at what our program outputted:</Pmt25>
                    <StandardContainer>
                        <p className="font-medium">15</p>
                        <p className="font-medium">"catdog"</p>
                        <br />
                        <p className="font-medium">-5</p>
                        <p className="font-medium">TypeError: unsupported operand type(s) for -: 'str' and 'str'</p>
                        <br />
                        <p className="font-medium">50</p>
                        <p className="font-medium">"catcatcatcatcat"</p>
                        <br />
                        <p className="font-medium">0.50</p>
                        <p className="font-medium">TypeError: unsupported operand type(s) for /: 'str' and 'int'</p>
                        <br />
                        <p className="font-medium">0</p>
                        <p className="font-medium">TypeError: unsupported operand type(s) for //: 'str' and 'int'</p>
                    </StandardContainer>
                    <Pmt25>
                        From the example above, you can see that integers are valid in any operation but strings can only be used a roughly half of them. Let's break down the unexpected results.
                    </Pmt25>
                    <Pmt25>
                        You cannot subtract a string from a string, so we get a TypeError, stating that our operand is unsupported.
                    </Pmt25>
                    <Pmt10>Multiplying a string by an integer will return the string x times, in our case, 5 times.</Pmt10>
                    <Pmt10>Division gives us a float (decimal), but division of strings gives us a TypeError.</Pmt10>
                    <Pmt10>Floor Division always rounds down to the nearest whole number, so 5 // 10 = 0, and again with strings, we get a TypeError.</Pmt10>
                    <ProgrammingExercise
                        questionsCompleted={questionsCompleted}
                        setQuestionsCompleted={setQuestionsCompleted}
                        questionNumber={"1-2-1"}
                        questionTitle={"Math Sandbox"}
                        questionDescription={"Play around in this sandbox with the different operands!"}
                        pointsWorth={1}
                        neededOutput={''}
                    />
                    <KeyPointsContainer>
                        <StandardLi>Subtraction, Division, and Floor Division cannot be done to strings</StandardLi>
                        <StandardLi>Multiplying a string by an integer will return the string x times</StandardLi>
                        <StandardLi>Division Returns a Float (Decmial)</StandardLi>
                        <StandardLi>Floor Division always rounds down to the nearest whole number</StandardLi>
                    </KeyPointsContainer>
                </main>
            </div>
        </div>
    );
}