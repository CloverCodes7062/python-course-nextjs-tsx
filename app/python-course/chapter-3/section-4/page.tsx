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

                const questionsCompletedRes = await fetch('http://localhost:3000/api/getCompletedQuestions?chapterSection=3-4');
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
            <StandardTitleH1>Chapter 3.4: More Data Structures and References</StandardTitleH1>
            <div className="flex flex-col items-center">
                <StandardLearningObjectivesContainer pr={'300'}>
                    <StandardLi>You will understand what an <Italic>Tuple</Italic> is.</StandardLi>
                    <StandardLi>You will understand what a <Italic>reference</Italic> is.</StandardLi>
                </StandardLearningObjectivesContainer>
                <main className="w-full mt-[40px] mb-[40px]">
                    <StandardH1>What is a Tuple?</StandardH1>
                    <Pmt25>
                        A <Italic>tuple</Italic> is another data structure, similar to a <Italic>list</Italic>. However, unlike a list, a tuple is <Italic>immutable</Italic>; once created, it <Italic>cannot be modified</Italic>.
                    </Pmt25>
                    <Pmt10>Let's look at an example:</Pmt10>
                    <StandardContainer>
                    <StandardContainerP>my_tuple = (1, 2, 3, 4, 5)</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>
                        You can access elements in a tuple using indexing, just like lists. However, you cannot modify the elements directly.
                    </Pmt25>
                    <StandardContainer>
                    <ConditionalStatement>
                        <ConditionalStatementStart>{`print(my_tuple[2])`}</ConditionalStatementStart>
                        <ConditionalStatementPiece>{`# Output: 3`}</ConditionalStatementPiece>
                        <ConditionalStatementStart>{`my_tuple[2] = 10`}</ConditionalStatementStart>
                        <ConditionalStatementPiece>{`# Raises TypeError: 'tuple' object does not support item assignment`}</ConditionalStatementPiece>
                    </ConditionalStatement>
                    </StandardContainer>
                    <Pmt25>
                        Tuples are useful when you want to store a collection of related, immutable data. They are also more efficient than lists for operations like assignment and accessing elements by index.
                    </Pmt25>
                    <ProgrammingExercise
                        questionsCompleted={questionsCompleted}
                        setQuestionsCompleted={setQuestionsCompleted}
                        questionNumber={"3-4-1"}
                        questionTitle={"Create a Tuple"}
                        questionDescription={`Create a tuple containing your favorite colors.`}
                        pointsWorth={1}
                        neededOutput={''}
                    />
                    <ProgrammingExercise
                        questionsCompleted={questionsCompleted}
                        setQuestionsCompleted={setQuestionsCompleted}
                        questionNumber={"3-4-2"}
                        questionTitle={"Unpack a Tuple"}
                        questionDescription={`Create a tuple with three elements, then assign the elements to separate variables and print them.`}
                        pointsWorth={1}
                        neededOutput={''}
                    />
                    <H1mt50>References</H1mt50>
                    <Pmt25>
                        In Python, variables store references to objects, rather than the objects themselves. This means that when you assign a variable to another variable, you're not creating a copy of the object, but rather a new reference to the same object.
                    </Pmt25>
                    <StandardContainer>
                        <StandardContainerP>{`a = [1, 2, 3]`}</StandardContainerP>
                        <StandardContainerP>{`b = a`}</StandardContainerP>
                        <StandardContainerP>{`print(a)`}</StandardContainerP>
                        <StandardContainerP>{`print(b)`}</StandardContainerP>
                    </StandardContainer>
                    <Pmt10>Note: <Italic>Primitive</Italic> data structures like <Italic>strings and integers</Italic> do <Italic>not</Italic> follow this</Pmt10>
                    <Pmt25>Output:</Pmt25>
                    <StandardContainer>
                    <StandardContainerP>[1, 2, 3]</StandardContainerP>
                    <StandardContainerP>[1, 2, 3]</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>
                    In the example above, both <Italic>a</Italic> and <Italic>b</Italic> reference the same list object. Modifying either of them will affect the other, because they're both pointing to the same object in memory.
                    </Pmt25>
                    <StandardContainer>
                        <StandardContainerP>{`a.append(4)`}</StandardContainerP>
                        <StandardContainerP>{`print(a)`}</StandardContainerP>
                        <StandardContainerP>{`print(b)`}</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>Output:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>[1, 2, 3, 4]</StandardContainerP>
                        <StandardContainerP>[1, 2, 3, 4]</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>
                        To create a copy of a list (or any other mutable object), you can use the <Italic>copy()</Italic> method or slice notation.
                    </Pmt25>
                    <StandardContainer>
                        <StandardContainerP>{`a = [1, 2, 3]`}</StandardContainerP>
                        <StandardContainerP>{`b = a.copy()`}</StandardContainerP>
                        <StandardContainerP>{`# OR b = a[:]`}</StandardContainerP>
                        <StandardContainerP>{`a.append(4)`}</StandardContainerP>
                        <StandardContainerP>{`print(a)`}</StandardContainerP>
                        <StandardContainerP>{`print(b)`}</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>Output:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>[1, 2, 3, 4]</StandardContainerP>
                        <StandardContainerP>[1, 2, 3]</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>
                        In this case, <Italic>a</Italic> and <Italic>b</Italic> are separate lists, and modifying one doesn't affect the other.
                    </Pmt25>
                    <ProgrammingExercise
                        questionsCompleted={questionsCompleted}
                        setQuestionsCompleted={setQuestionsCompleted}
                        questionNumber={"3-4-3"}
                        questionTitle={"Modify a Copy"}
                        questionDescription={`Create a list [1, 2, 3], then create a copy of the list using the copy() method or slice notation. Modify the copy by appending the number 4, and print both the original list and the copy to show that they are different.`}
                        pointsWorth={1}
                        neededOutput={''}
                    />
                </main>
            </div>
        </div>
    );
}