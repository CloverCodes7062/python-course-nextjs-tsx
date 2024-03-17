'use client';

import ConditionalStatement from "@/components/ConditionalStatement";
import ConditionalStatementPiece from "@/components/ConditionalStatementPiece";
import ConditionalStatementStart from "@/components/ConditionalStatementStart";
import H1mt50 from "@/components/H1mt50";
import HTMLViewer from "@/components/HTMLViewer";
import Italic from "@/components/Italic";
import KeyPointsContainer from "@/components/KeyPointsContainer";
import Pmt10 from "@/components/Pmt10";
import Pmt25 from "@/components/Pmt25";
import ProgrammingExercise from "@/components/ProgrammingExercise";
import StandardContainer from "@/components/StandardContainer";
import StandardContainerP from "@/components/StandardContainerP";
import StandardH1 from "@/components/StandardH1";
import StandardLearningObjectivesContainer from "@/components/StandardLearningObjectivesContainer";
import StandardLi from "@/components/StandardLi";
import StandardTitleH1 from "@/components/StandardTitleH1";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

interface QuestionCompletedData {
    question: string;
    points_worth: number;
}

export default function Section1() {
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

                const questionsCompletedRes = await fetch('http://localhost:3000/api/getCompletedQuestions?chapterSection=4-4');
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
            <StandardTitleH1>Chapter 4.4: Recursion</StandardTitleH1>
            <div className="flex flex-col items-center">
                <StandardLearningObjectivesContainer pr={'150'}>
                    <StandardLi>You will understand what <Italic>recursion</Italic> is.</StandardLi>
                    <StandardLi>You will learn how to write <Italic>recursive functions</Italic>.</StandardLi>
                    <StandardLi>You will learn about the advantages and limitations of recursion.</StandardLi>
                </StandardLearningObjectivesContainer>
                <main className="w-full mt-[40px] mb-[40px]">
                    <StandardH1>What is recursion?</StandardH1>
                    <Pmt25>
                        <Italic>Recursion</Italic> is a programming technique where a function calls itself to solve a problem. In other words, a recursive function is a function that is defined in terms of itself. This may sound a bit confusing at first, but recursion can be a powerful tool for solving certain types of problems, especially those that can be broken down into smaller instances of the same problem.
                    </Pmt25>
                    <H1mt50>Writing Recursive Functions</H1mt50>
                    <Pmt25>
                        To write a recursive function, you need to have a <Italic>base case</Italic> and a <Italic>recursive case</Italic>:
                    </Pmt25>
                    <Pmt10>
                        <Italic>Base case:</Italic> This is the condition that stops the recursion. Without a base case, the function would continue calling itself indefinitely, leading to a stack overflow error.
                    </Pmt10>
                    <Pmt10>
                        <Italic>Recursive case:</Italic> This is where the function calls itself with a smaller or simpler version of the problem.
                    </Pmt10>
                    <Pmt25>Let's look at an example of a recursive function that calculates the factorial of a number:</Pmt25>
                    <StandardContainer>
                    <ConditionalStatement>
                        <ConditionalStatementStart>{`def factorial(n):`}</ConditionalStatementStart>
                        <ConditionalStatementPiece indention={1}>{`# Base case`}</ConditionalStatementPiece>
                        <ConditionalStatementPiece indention={1}>{`if n == 0:`}</ConditionalStatementPiece>
                        <ConditionalStatementPiece indention={2}>{`return 1`}</ConditionalStatementPiece>
                        <ConditionalStatementPiece indention={1}>{`# Recursive case`}</ConditionalStatementPiece>
                        <ConditionalStatementPiece indention={1}>{`else:`}</ConditionalStatementPiece>
                        <ConditionalStatementPiece indention={2}>{`return n * factorial(n - 1)`}</ConditionalStatementPiece>
                    </ConditionalStatement>
                    </StandardContainer>
                    <Pmt25>
                        In this example, the <Italic>base case</Italic> is when <Italic>n</Italic> is equal to 0, and the function returns 1 (because the factorial of 0 is 1). The <Italic>recursive case</Italic> is when <Italic>n</Italic> is greater than 0, and the function calls itself with <Italic>n - 1</Italic> as the argument, multiplying the result by <Italic>n</Italic>.
                    </Pmt25>
                    <H1mt50>Advantages and Limitations of Recursion</H1mt50>
                    <Pmt25>
                    <Italic>Advantages:</Italic>
                    <StandardContainer>
                        <StandardContainerP>Recursive functions can be more concise and easier to read than their iterative counterparts, especially for problems that can be naturally expressed in a recursive manner.</StandardContainerP>
                        <br />
                        <StandardContainerP>Recursion can lead to more efficient solutions for certain types of problems, such as those involving trees or graphs.</StandardContainerP>
                </StandardContainer>
                    </Pmt25>
                    <Pmt25>
                    <Italic>Limitations:</Italic>
                    <StandardContainer>
                        <StandardContainerP>Recursive functions can consume a lot of memory due to the function calls being stored on the call stack, potentially leading to a stack overflow error if the recursion goes too deep.</StandardContainerP>
                        <br />
                        <StandardContainerP>Recursive solutions can be less efficient than their iterative counterparts for certain types of problems, especially those involving simple loops.</StandardContainerP>
                        <br />
                        <StandardContainerP>Recursive functions can be more difficult to understand and debug, especially for those unfamiliar with the concept of recursion.</StandardContainerP>
                    </StandardContainer>
                    </Pmt25>
                    <ProgrammingExercise
                        questionsCompleted={questionsCompleted}
                        setQuestionsCompleted={setQuestionsCompleted}
                        questionNumber={"4-4-1"}
                        questionTitle={"Recursive Sum"}
                        questionDescription={`Write a recursive function that takes a list of numbers as input and returns the sum of all the numbers in the list.`}
                        pointsWorth={2}
                        neededOutput={''}
                    />
                    <ProgrammingExercise
                        questionsCompleted={questionsCompleted}
                        setQuestionsCompleted={setQuestionsCompleted}
                        questionNumber={"4-4-2"}
                        questionTitle={"Recursive Fibonacci"}
                        questionDescription={`Write a recursive function that takes a number n as input and returns the nth number in the Fibonacci sequence (where the first two numbers are 0 and 1, and each subsequent number is the sum of the two preceding ones).`}
                        pointsWorth={3}
                        neededOutput={''}
                    />
                </main>
            </div>
        </div>
    );
}