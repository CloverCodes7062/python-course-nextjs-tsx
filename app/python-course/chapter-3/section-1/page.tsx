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

                const questionsCompletedRes = await fetch('http://localhost:3000/api/getCompletedQuestions?chapterSection=3-1');
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
            <StandardTitleH1>Chapter 3.1: Data Structure Mutability</StandardTitleH1>
            <div className="flex flex-col items-center">
                <StandardLearningObjectivesContainer pr={'150'}>
                    <StandardLi>You will understand what <Italic>Mutability</Italic> is.</StandardLi>
                    <StandardLi>You will know the type of <Italic>Mutability</Italic> each data structure has.</StandardLi>
                </StandardLearningObjectivesContainer>
                <main className="w-full mt-[40px] mb-[40px]">
                    <StandardH1>What is Mutability?</StandardH1>
                    <Pmt25><Italic>Mutability</Italic> refers to weather or not a value can be <Italic>modified</Italic>.</Pmt25>
                    <Pmt25>Let's look at the Mutability of some data structures:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>String: Immutable</StandardContainerP>
                        <StandardContainerP>Integer: Immutable</StandardContainerP>
                        <StandardContainerP>List: Mutable</StandardContainerP>
                        <StandardContainerP>Dictionary: Mutable</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>Let's look at an example of a Mutable data structure:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>fruits = ["orange", "pear", "peach"]</StandardContainerP>
                        <StandardContainerP>print(fruits[1])</StandardContainerP>
                        <StandardContainerP>fruits[1] = "kiwi"</StandardContainerP>
                        <StandardContainerP>print(fruits[1])</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>Output:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>pear</StandardContainerP>
                        <StandardContainerP>kiwi</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>What happened? We print out fruits[1], which was "pear". Then, we <Italic>change</Italic> fruits[1] into "kiwi", our fruits is now ["orange", "kiwi", "peach"];so print(fruits[1]) prints out "kiwi". </Pmt25>
                    <Pmt10>Note: Just like lists, strings can be indexed; if name = "Jack", name[1] == "a".</Pmt10>
                    <Pmt25>Let's look at an example of immutablility in action:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>name = "Jack"</StandardContainerP>
                        <StandardContainerP>print(name[1])</StandardContainerP>
                        <StandardContainerP>name[1] = "b"</StandardContainerP>
                        <StandardContainerP>print(name[1])</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>Output:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>a</StandardContainerP>
                        <StandardContainerP>TypeError: 'str' object does not support item assignment</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>Unlike the list, we are unable to <Italic>reassign</Italic> the character at index 1.</Pmt25>
                    <Pmt10>
                        Note: You may remember string concatenation, this is <Italic>not mutability</Italic>. When you concatenate strings, a <Italic>new</Italic> string is created, it does not <Italic>change</Italic> the current string. Integers are the <Italic>same</Italic> way, even when you increment a number; i += 1, a <Italic>new</Italic> number is created and assigned to i, the current number is <Italic>not modified</Italic>.
                    </Pmt10>
                    <Pmt25>Dictionaries can be modified just like lists:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>{`student_dict = { "Mark": 79, "Jake": 84, "Paul": 63, "Saul": 98 }`}</StandardContainerP>
                        <StandardContainerP>{`print(student_dict["Mark"])`}</StandardContainerP>
                        <br />
                        <StandardContainerP>{`student_dict["Mark"] = 65`}</StandardContainerP>
                        <StandardContainerP>{`print(student_dict["Mark"])`}</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>Output:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>{`79`}</StandardContainerP>
                        <StandardContainerP>{`65`}</StandardContainerP>
                    </StandardContainer>
                </main>
            </div>
        </div>
    );
}