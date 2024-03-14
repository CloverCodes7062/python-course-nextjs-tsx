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

                const questionsCompletedRes = await fetch('http://localhost:3000/api/getCompletedQuestions?chapterSection=3-3');
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
            <StandardTitleH1>Chapter 3.3: Formatting</StandardTitleH1>
            <div className="flex flex-col items-center">
                <StandardLearningObjectivesContainer pr={'250'}>
                    <StandardLi>You will understand what an <Italic>F-String</Italic> is.</StandardLi>
                    <StandardLi>You will understand the different ways to print a string.</StandardLi>
                </StandardLearningObjectivesContainer>
                <main className="w-full mt-[40px] mb-[40px]">
                    <H1mt50>What is an F-String?</H1mt50>
                    <Pmt25>
                        F-Strings are an easy to to use variables in a string, it stands for <Italic>format string</Italic>.
                    </Pmt25>
                    <Pmt25>Let's look at some code:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>name = "Jake"</StandardContainerP>
                        <StandardContainerP>age = 19</StandardContainerP>
                        <StandardContainerP>
                            {`print("My " + "name" + " is " + name + ", I am " + str(age) + " years old.")`}
                        </StandardContainerP>
                    </StandardContainer>
                    <Pmt25>Output:</Pmt25>
                    <StandardContainer>My name is Mark, I am 19 years old.</StandardContainer>
                    <Pmt25>This works, but properly adding the whitespace and variables can be tedious and/or confusing.</Pmt25>
                    <Pmt25>Let's look at an example of an F-String:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>name = "Jake"</StandardContainerP>
                        <StandardContainerP>age = 19</StandardContainerP>
                        <StandardContainerP>
                            {`print(f"My name is {name}, I am {str(age)} years old.")`}
                        </StandardContainerP>
                    </StandardContainer>
                    <Pmt25>Output:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>My name is Mark, I am 19 years old.</StandardContainerP>
                    </StandardContainer>
                    <H1mt50>Seperators</H1mt50>
                    <Pmt25>There is one more way to print out strings, with ",".</Pmt25>
                    <Pmt10>Let's take a look:</Pmt10>
                    <StandardContainer>
                        <StandardContainerP>print("cat", "dog")</StandardContainerP>
                    </StandardContainer>
                    <Pmt10>Output:</Pmt10>
                    <StandardContainer>
                        <StandardContainerP>cat dog</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>We can also use a <Italic>seperator</Italic> to <Italic>format</Italic> strings.</Pmt25>
                    <Pmt10>Let's look at an example:</Pmt10>
                    <StandardContainer>
                        <StandardContainerP>
                            {`print("My", "name", "is", name, ", I am ", str(age), " years old.", sep=" ")`}
                        </StandardContainerP>
                    </StandardContainer>
                    <Pmt25>Output:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>My name is Mark, I am 19 years old.</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>
                        From this example, we can see that f-strings are a very easy way to format string, what about numbers?
                    </Pmt25>
                    <StandardContainer>
                        <StandardContainerP>number = 1/6</StandardContainerP>
                        <StandardContainerP>{`print(number)`}</StandardContainerP>
                    </StandardContainer>
                    <Pmt10>Output:</Pmt10>
                    <StandardContainer>
                        <StandardContainerP>0.16666666666666666</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>And with the format:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>number = 1/6</StandardContainerP>
                        <StandardContainerP>{`print(f"{number:.2}")`}</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>Output:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>0.17</StandardContainerP>
                    </StandardContainer>
                    <Pmt10>We can use f-strings to limit the decimal place of numbers.</Pmt10>
                    <Pmt10>Note: this does causing <Italic>rounding</Italic>.</Pmt10>
                </main>
            </div>
        </div>
    );
}