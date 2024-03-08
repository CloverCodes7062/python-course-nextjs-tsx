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


export default function Section4() {
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

                const questionsCompletedRes = await fetch('http://localhost:3000/api/getCompletedQuestions?chapterSection=1-4');
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
            <StandardTitleH1>Chapter 1.4: Conditional Statements</StandardTitleH1>
            <div className="flex flex-col items-center">
                <StandardLearningObjectivesContainer pr={'250'}>
                    <StandardLi>You will understand <Italic>what</Italic> a conditional statement is</StandardLi>
                    <StandardLi>You will understand <Italic>how to use</Italic> conditional statments</StandardLi>
                    <StandardLi>You will understand <Italic>boolean values</Italic></StandardLi>
                </StandardLearningObjectivesContainer>
                <main className="w-full mt-[40px] mb-[40px]">
                    <StandardH1>What are conditional statements?</StandardH1>
                    <Pmt25>Conditional statements in python are a way to <Italic>conditionally</Italic> execute code.</Pmt25>
                    <Pmt10>Let's look at an example:</Pmt10>
                    <StandardContainer>
                        <StandardContainerP>x = 5</StandardContainerP>
                        <ConditionalStatement>
                            <ConditionalStatementStart>{"if x < 5:"}</ConditionalStatementStart>
                            <ConditionalStatementPiece>{"print(x)"}</ConditionalStatementPiece>
                        </ConditionalStatement>  
                    </StandardContainer>
                    <Pmt10>And the output:</Pmt10>
                    <StandardContainer>
                        <StandardContainerP>5</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>As expected, the program outputs 5 since {"x < 5"}. What if our conditional statment was "if {"x > 5"}"?</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>x = 5</StandardContainerP>
                        <ConditionalStatement>
                            <ConditionalStatementStart>{"if x > 5:"}</ConditionalStatementStart>
                            <ConditionalStatementPiece>{"print(x)"}</ConditionalStatementPiece>
                        </ConditionalStatement>  
                    </StandardContainer>
                    <Pmt10>Output:</Pmt10>
                    <StandardContainer>
                        <StandardContainerP>{''}</StandardContainerP>
                    </StandardContainer>
                    <Pmt10>That's right, the print() is skipped and nothing is outputted to the console.</Pmt10>
                    <Pmt25>Let's look at a better example of this:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>x = 22</StandardContainerP>
                        <StandardContainerP>y = 10</StandardContainerP>
                        <ConditionalStatement>
                            <ConditionalStatementStart>{"if x > 5:"}</ConditionalStatementStart>
                            <ConditionalStatementPiece>{"print(x)"}</ConditionalStatementPiece>
                        </ConditionalStatement>
                        <ConditionalStatement>
                            <ConditionalStatementStart>{"if y < 5:"}</ConditionalStatementStart>
                            <ConditionalStatementPiece>{"print(x)"}</ConditionalStatementPiece>
                        </ConditionalStatement> 
                    </StandardContainer>
                    <Pmt10>Output:</Pmt10>
                    <StandardContainer>
                        <StandardContainerP>22</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>
                        You can see that the first print() is executed since x is greater than 5, but the second print() is skipped since y is not less than 5.
                    </Pmt25>
                    <Pmt10>Why is the second one skipped? An if statement is formatted as (if expression is true, execute the indented code below it). There are only two different values an if statement registers, <Italic>True and False</Italic>, and the indented code below it only runs if the expression is <Italic>True</Italic>. This brings us to <Italic>Boolean Values</Italic>.</Pmt10>
                    <H1mt50>What are Boolean Values?</H1mt50>
                    <Pmt25>There are only two boolean values, <Italic>True and False</Italic> but there are several <Italic>Truthy and Falsy</Italic> values (Values that evaulate to True, and values that evaulate to False).</Pmt25>
                    <Pmt10>Either, we learned that if statements only execute if an expression is true. To expand on this Python <Italic>evaluates the entire expression</Italic> and if it evaulates to a <Italic>Truthy Value</Italic> then it runs the indented code, <Italic>Falsy Values</Italic> are skipped.</Pmt10>
                    <Pmt25>Let's look at Some <Italic>Truthy and Falsy Values</Italic> in Python:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>Truthy Values:</StandardContainerP>
                        <StandardContainerP>Boolean True</StandardContainerP>
                        <StandardContainerP>Numeric Values except 0</StandardContainerP>
                        <StandardContainerP>Non-Empty Strings</StandardContainerP>
                        <StandardContainerP>Non-Empty Lists</StandardContainerP>
                        <StandardContainerP>Non-Empty Tuples</StandardContainerP>
                        <StandardContainerP>Non-Empty Dictionaries</StandardContainerP>
                        <StandardContainerP>Non-Empty Sets</StandardContainerP>
                        <br />
                        <StandardContainerP>Falsy Values:</StandardContainerP>
                        <StandardContainerP>0</StandardContainerP>
                        <StandardContainerP>0.0</StandardContainerP>
                        <StandardContainerP>None</StandardContainerP>
                        <StandardContainerP>Boolean False</StandardContainerP>
                        <StandardContainerP>Empty Strings</StandardContainerP>
                        <StandardContainerP>Empty Lists</StandardContainerP>
                        <StandardContainerP>Empty Tuples</StandardContainerP>
                        <StandardContainerP>Empty Dictionaries</StandardContainerP>
                        <StandardContainerP>Empty Sets</StandardContainerP>
                    </StandardContainer>
                    <Pmt10>
                        Note: There should be serveral names listed above that you have never heard of; don't worry, you will learn this throughout the course.
                        
                    </Pmt10>
                    <Pmt10>
                        Note: If you want to check if a value is equal to another inside of a conditional statement, you <Italic>cannot</Italic> use =, since it is the assignment operator, you must use the <Italic>comparison operator</Italic> (==).
                    </Pmt10>
                    <ProgrammingExercise
                        questionsCompleted={questionsCompleted}
                        setQuestionsCompleted={setQuestionsCompleted}
                        questionNumber={"1-4-1"}
                        questionTitle={"Name Test"}
                        questionDescription={`Write a program that asks a user for an input and then outputs ${`name = "Susan" if name is equal to "Susan"`}`}
                        pointsWorth={1}
                        neededOutput={'name = Susan\n'}
                    />
                    <ProgrammingExercise
                        questionsCompleted={questionsCompleted}
                        setQuestionsCompleted={setQuestionsCompleted}
                        questionNumber={"1-4-2"}
                        questionTitle={"Is x > y?"}
                        questionDescription={'Write a program that creates two variables, x and y and assignments them integers; if x > y: print(x), if y > x: print(y)'}
                        pointsWorth={2}
                        neededOutput={''}
                    />
                    <H1mt50>Coding Assignment:</H1mt50>
                    <Pmt25>You made it to the first coding Assignment! This one is simple but requires some first-time setup, download and setup an IDE like Visual Studio Code for Python and come back.</Pmt25>
                    <Pmt10>Now that your IDE is setup, your assignment is to create a very simple calculator using variables, input() and conditional statements.</Pmt10>
                    <Pmt25>Demo video below with sample code for reference:</Pmt25>
                    <iframe width="800" height="500" src="https://www.youtube.com/embed/slr_hxfuRhk?si=f1R5XX0fZRZisCqG" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </main>
            </div>
        </div>
    );
}