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

                const questionsCompletedRes = await fetch('http://localhost:3000/api/getCompletedQuestions?chapterSection=3-2');
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
            <StandardTitleH1>Chapter 3.2: Functions</StandardTitleH1>
            <div className="flex flex-col items-center">
                <StandardLearningObjectivesContainer pr={'150'}>
                    <StandardLi>You will understand what a <Italic>Function</Italic> is.</StandardLi>
                    <StandardLi>You will understand how <Italic>Functions work</Italic>, when they should be used.</StandardLi>
                </StandardLearningObjectivesContainer>
                <main className="w-full mt-[40px] mb-[40px]">
                    <StandardH1>What is a Function?</StandardH1>
                    <Pmt25>
                        A function is another way to <Italic>abstract</Italic> (hide/make reusable) a block of code. We have already been using functions, <Italic>print()</Italic> and <Italic>range()</Italic> are both functions; but now, it's time to create our own.
                    </Pmt25>
                    <Pmt25>Let's look at an example:</Pmt25>
                    <StandardContainer>
                        <ConditionalStatement>
                            <ConditionalStatementStart>{`def add(x, y):`}</ConditionalStatementStart>
                            <ConditionalStatementPiece>{`return x + y`}</ConditionalStatementPiece>
                        </ConditionalStatement>
                        <StandardContainerP>x = 5</StandardContainerP>
                        <StandardContainerP>y = 4</StandardContainerP>
                        <StandardContainerP>z = add(x, y)</StandardContainerP>
                        <StandardContainerP>print(z)</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>Output:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>9</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>Now, this is not very helpful since we could've just done x + y.</Pmt25>
                    <Pmt25>Imagine this, we want to count all <Italic>vowels</Italic> from a string; we want to do this multiple times, to multiple strings.</Pmt25>
                    <StandardContainer>
                        <ConditionalStatement>
                            <ConditionalStatementStart>{`def count_vowels(string):`}</ConditionalStatementStart>
                            <ConditionalStatementPiece>{`vowels = ["a", "e", "i", "o", "u"]`}</ConditionalStatementPiece>
                            <ConditionalStatementPiece>{`vowels_count = 0`}</ConditionalStatementPiece>
                            <br />
                            <ConditionalStatementStart indention={1}>{`for char in string:`}</ConditionalStatementStart>
                            <ConditionalStatementPiece indention={2}>{`if char in vowels:`}</ConditionalStatementPiece>
                            <ConditionalStatementPiece indention={2}>{`" "" "vowels_count += 1`}</ConditionalStatementPiece>
                            <br />
                            <ConditionalStatementPiece>return vowels_count</ConditionalStatementPiece>
                        </ConditionalStatement>
                        <br />
                        <StandardContainerP>string1 = "cat"</StandardContainerP>
                        <StandardContainerP>string2 = "racecar"</StandardContainerP>
                        <br />
                        <StandardContainerP>vowels_in_string1 = count_vowels(string1)</StandardContainerP>
                        <StandardContainerP>vowels_in_string2 = count_vowels(string2)</StandardContainerP>
                        <br />
                        <StandardContainerP>print(vowels_in_string2)</StandardContainerP>
                        <StandardContainerP>print(vowels_in_string2)</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>Output:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>1</StandardContainerP>
                        <StandardContainerP>3</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>
                        You can see in the example above that we are able to use the function multiple time by <Italic>calling</Italic> it. This allows us to create <Italic>reusable</Italic> code, adhering to our philosophy <Italic>"Don't repeat yourself".</Italic>
                    </Pmt25>
                    <H1mt50>How do Functions work?</H1mt50>
                    <Pmt25>
                        <Italic>Functions</Italic> are defined in python using the <Italic>def</Italic> keywork, then ():. Eariler, when we used a function, it had <Italic>parameters</Italic> these are values passed to a function to be used to the function.
                    </Pmt25>
                    <Pmt10>Note: Functions <Italic>do not</Italic> require parameters, but without them, their functionality may be limited.</Pmt10>
                    <Pmt10>
                        Let's talk about our example from eariler, <Italic>add(x, y)</Italic>. How does this function work? It takes two <Italic>parameters</Italic>, x and y, and returns x + y; this value is then assigned to z. The value assigned to z is <Italic>always</Italic> the value <Italic>returned</Italic> by the function with the <Italic>return</Italic> keyword.
                    </Pmt10>
                    <Pmt25>Let's look at an example of a function without <Italic>parameters</Italic>:</Pmt25>
                    <StandardContainer>
                        <ConditionalStatement>
                            <ConditionalStatementStart>{`def print_a_message():`}</ConditionalStatementStart>
                            <ConditionalStatementPiece>{`print("This is a message")`}</ConditionalStatementPiece>
                        </ConditionalStatement>
                        <br />
                        <StandardContainerP>print_a_message()</StandardContainerP>
                        <StandardContainerP>print_a_message()</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>Output:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>This is a message</StandardContainerP>
                        <StandardContainerP>This is a message</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>Note: if you define a function but do not <Italic>call</Italic> it, nothing will happen.</Pmt25>
                    <ProgrammingExercise
                        questionsCompleted={questionsCompleted}
                        setQuestionsCompleted={setQuestionsCompleted}
                        questionNumber={"3-1-1"}
                        questionTitle={"Print first vowel"}
                        questionDescription={`Create a function that prints out the first vowel of the word passed to it.\n Note: using an empty return with return nothing, use this after printing out a vowel to force the function to return`}
                        pointsWorth={1}
                        neededOutput={''}
                    />
                    <ProgrammingExercise
                        questionsCompleted={questionsCompleted}
                        setQuestionsCompleted={setQuestionsCompleted}
                        questionNumber={"3-1-2"}
                        questionTitle={"Return first vowel"}
                        questionDescription={`Create a function that returns the first vowel of the word passed to it.`}
                        pointsWorth={1}
                        neededOutput={''}
                    />
                    <ProgrammingExercise
                        questionsCompleted={questionsCompleted}
                        setQuestionsCompleted={setQuestionsCompleted}
                        questionNumber={"Mode and Mean"}
                        questionTitle={"Mode and Mean of a list"}
                        questionDescription={`Create a function returns the mode and mean of a list`}
                        pointsWorth={1}
                        neededOutput={''}
                    />
                    <ProgrammingExercise
                        questionsCompleted={questionsCompleted}
                        setQuestionsCompleted={setQuestionsCompleted}
                        questionNumber={"Mode and Mean 2"}
                        questionTitle={"Mode and Mean of parameters"}
                        questionDescription={`Create a function returns the mode and mean of the four numbers passed to it.\n Example: mode_mean(a, b, c, d)`}
                        pointsWorth={1}
                        neededOutput={''}
                    />
                </main>
            </div>
        </div>
    );
}