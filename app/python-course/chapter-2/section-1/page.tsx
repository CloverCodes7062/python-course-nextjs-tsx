'use client';

import ConditionalStatement from "@/components/ConditionalStatement";
import ConditionalStatementPiece from "@/components/ConditionalStatementPiece";
import ConditionalStatementStart from "@/components/ConditionalStatementStart";
import H1mt50 from "@/components/H1mt50";
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

                const questionsCompletedRes = await fetch('http://localhost:3000/api/getCompletedQuestions?chapterSection=2-1');
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
            <StandardTitleH1>Chapter 2.1: More Conditional Statements</StandardTitleH1>
            <div className="flex flex-col items-center">
                <StandardLearningObjectivesContainer pr={'225'}>
                    <StandardLi>You will understand <Italic>else</Italic></StandardLi>
                    <StandardLi>You will understand <Italic>elif</Italic></StandardLi>
                    <StandardLi>You will understand how to chain together conditional statements</StandardLi>
                </StandardLearningObjectivesContainer>
                <main className="w-full mt-[40px] mb-[40px]">
                    <StandardH1>What are the other conditional statements?</StandardH1>
                    <Pmt25>
                        Besides if, there are two other conditional statements in Python, <Italic>else and elif</Italic> both of which are using <Italic>alongside</Italic> if.
                    </Pmt25>
                    <Pmt10>Let's Look at an example:</Pmt10>
                    <StandardContainer>
                        <StandardContainerP>x = 10</StandardContainerP>
                        <ConditionalStatement>
                            <ConditionalStatementStart>{"if x > 5:"}</ConditionalStatementStart>
                            <ConditionalStatementPiece>{"print(x)"}</ConditionalStatementPiece>
                            <ConditionalStatementStart>{"if x > 6:"}</ConditionalStatementStart>
                            <ConditionalStatementPiece>{"print(x)"}</ConditionalStatementPiece>
                        </ConditionalStatement>
                    </StandardContainer>
                    <Pmt10>Output:</Pmt10>
                    <StandardContainer>
                        <StandardContainerP>5</StandardContainerP>
                        <StandardContainerP>6</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>But what if we only want one of the statements to execute?</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>x = 10</StandardContainerP>
                        <ConditionalStatement>
                            <ConditionalStatementStart>{"if x > 5:"}</ConditionalStatementStart>
                            <ConditionalStatementPiece>{"print(x)"}</ConditionalStatementPiece>
                            <ConditionalStatementStart>{"elif x > 6:"}</ConditionalStatementStart>
                            <ConditionalStatementPiece>{"print(x)"}</ConditionalStatementPiece>
                        </ConditionalStatement>
                    </StandardContainer>
                    <Pmt10>Output:</Pmt10>
                    <StandardContainer>
                        <StandardContainerP>5</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>
                        Since the first if statement was executed, the elif was <Italic>ignored</Italic>. However, if the first statement doesn't execute, the program will check the <Italic>elif</Italic> expression and execute it if it evaulates to <Italic>True</Italic>.
                    </Pmt25>
                    <Pmt10>What if we wanted the second statement to execute <Italic>everytime</Italic> as long as the first one doesn't execute?</Pmt10>
                    <StandardContainer>
                        <StandardContainerP>x = 10</StandardContainerP>
                        <StandardContainerP>y = 8</StandardContainerP>
                        <ConditionalStatement>
                            <ConditionalStatementStart>{"if x > y:"}</ConditionalStatementStart>
                            <ConditionalStatementPiece>{"print(x)"}</ConditionalStatementPiece>
                            <ConditionalStatementStart>{"else:"}</ConditionalStatementStart>
                            <ConditionalStatementPiece>{"print(y)"}</ConditionalStatementPiece>
                        </ConditionalStatement>
                    </StandardContainer>
                    <Pmt10>Output:</Pmt10>
                    <StandardContainer>
                        <StandardContainerP>8</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>In the code above, x is not greater than y so it goes to the else and executes it <Italic>regardless</Italic> of the value of y. Unlike the elif statement that still has an expression that must evaulate to <Italic>True</Italic>.</Pmt25>
                    <H1mt50>Conditional Statement Chaining</H1mt50>
                    <Pmt25>Conditional statements can be <Italic>chained</Italic> together.</Pmt25>
                    <Pmt10>Let's Look at an example:</Pmt10>
                    <StandardContainer>
                        <StandardContainerP>x = 15</StandardContainerP>
                        <StandardContainerP>y = 10</StandardContainerP>
                        <ConditionalStatement>
                            <ConditionalStatementStart>{"if x > 20:"}</ConditionalStatementStart>
                            <ConditionalStatementPiece>{"print(x)"}</ConditionalStatementPiece>
                            <ConditionalStatementStart>{"elif x > 5:"}</ConditionalStatementStart>
                            <ConditionalStatementPiece>{'print(x is greater than 5)'}</ConditionalStatementPiece>
                            <ConditionalStatementStart>{"elif x > 3:"}</ConditionalStatementStart>
                            <ConditionalStatementPiece>{'print(x is greater than 3)'}</ConditionalStatementPiece>
                            <ConditionalStatementStart>{"else:"}</ConditionalStatementStart>
                            <ConditionalStatementPiece>{'print(y)'}</ConditionalStatementPiece>
                        </ConditionalStatement>
                    </StandardContainer>
                    <Pmt10>Output:</Pmt10>
                    <StandardContainer>
                        <StandardContainerP>x is greater than 5</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>
                        The first statement does not execute, so the program goes to {'"elif x > 5"'} and executes it since x is greater than 5, then the rest of the statements are skipped.<Italic>else</Italic> will only be executed if <Italic>none</Italic> of the other statements execute.
                    </Pmt25>
                    <ProgrammingExercise
                        questionsCompleted={questionsCompleted}
                        setQuestionsCompleted={setQuestionsCompleted}
                        questionNumber={"2-1-1"}
                        questionTitle={"Use an elif statement"}
                        questionDescription={`Write a program asks a user for an integer input, and prints out "x is greater than 5" if x is greater than 5 otherwise print out "x is less than 5"`}
                        pointsWorth={2}
                        neededOutput={''}
                    />
                </main>
            </div>
        </div>
    );
}