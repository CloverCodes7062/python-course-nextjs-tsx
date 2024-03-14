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

                const questionsCompletedRes = await fetch('http://localhost:3000/api/getCompletedQuestions?chapterSection=4-1');
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
            <StandardTitleH1>Chapter 4.1: Local And Global Scope</StandardTitleH1>
            <div className="flex flex-col items-center">
                <StandardLearningObjectivesContainer pr={'125'}>
                    <StandardLi>You will understand what an <Italic>Local Scope and Local Variables</Italic> are.</StandardLi>
                    <StandardLi>You will understand what a <Italic>Global Scope and Global Variables</Italic> are.</StandardLi>
                </StandardLearningObjectivesContainer>
                <main className="w-full mt-[40px] mb-[40px]">
                    <StandardH1>What is Scope?</StandardH1>
                    <Pmt25>
                        In programming, <Italic>scope</Italic> refers to the region within a program where a particular variable, function, or object is accessible and can be referenced. Python follows a specific set of rules to determine the scope of variables and objects, this helps prevent naming conflicts and ensures proper variable access.
                    </Pmt25>
                    <H1mt50>Local Scope and Local Variables</H1mt50>
                    <Pmt25>
                        Variables defined inside a function have a <Italic>local scope</Italic>, which means they are only accessible within that function. These variables are called <Italic>local variables</Italic>.
                    </Pmt25>
                    <StandardContainer>
                    <ConditionalStatement>
                        <ConditionalStatementStart>{`def my_function():`}</ConditionalStatementStart>
                        <ConditionalStatementPiece>{`x = 10  # x is a local variable`}</ConditionalStatementPiece>
                        <ConditionalStatementPiece>{`print(x)`}</ConditionalStatementPiece>
                    </ConditionalStatement>
                    <br />
                    <StandardContainerP>{`my_function()  # Output: 10`}</StandardContainerP>
                    <StandardContainerP>{`print(x)  # Raises NameError: name 'x' is not defined`}</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>
                        In the example above, the variable <Italic>x</Italic> is defined within the <Italic>my_function()</Italic> function, so it has a local scope. It can be accessed and printed within the function, but trying to access it outside the function raises a <Italic>NameError</Italic>.
                    </Pmt25>
                    <H1mt50>Global Scope and Global Variables</H1mt50>
                    <Pmt25>
                        Variables defined outside any function or class have a <Italic>global scope</Italic>, which means they can be accessed from anywhere in the program. These variables are called <Italic>global variables</Italic>.
                    </Pmt25>
                    <StandardContainer>
                    <StandardContainerP>{`x = 10  # x is a global variable`}</StandardContainerP>
                    <br />
                    <ConditionalStatement>
                        <ConditionalStatementStart>{`def my_function():`}</ConditionalStatementStart>
                        <ConditionalStatementPiece>{`print(x)`}</ConditionalStatementPiece>
                    </ConditionalStatement>
                    <br />
                    <StandardContainerP>{`my_function()  # Output: 10`}</StandardContainerP>
                    <StandardContainerP>{`print(x)  # Output: 10`}</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>
                        In this example, <Italic>x</Italic> is defined outside the function, so it has a global scope and can be accessed from both inside and outside the <Italic>my_function()</Italic> function.
                    </Pmt25>
                    <ProgrammingExercise
                        questionsCompleted={questionsCompleted}
                        setQuestionsCompleted={setQuestionsCompleted}
                        questionNumber={"4-1-1"}
                        questionTitle={"Local vs Global"}
                        questionDescription={`Create a function called 'scope_example' that defines a local variable 'x' with a value of 10. Inside the function, print the value of 'x'.\n\n Outside the function, define a global variable 'y' with a value of 20.\n Print the value of 'y'.\n\n Call the 'scope_example' function, then try to print the value of 'x' outside the function to observe the difference between local and global scope.
                        `}
                        pointsWorth={2}
                        neededOutput={''}
                    />
                    <ProgrammingExercise
                        questionsCompleted={questionsCompleted}
                        setQuestionsCompleted={setQuestionsCompleted}
                        questionNumber={"4-1-2"}
                        questionTitle={"Modifying Global Variables"}
                        questionDescription={`Define a global variable 'count' with an initial value of 0. Create a function called 'increment' that increases the value of 'count' by 1 and prints the new value. Call the 'increment' function three times and observe the output.`}
                        pointsWorth={2}
                        neededOutput={''}
                    />
                </main>
            </div>
        </div>
    );
}