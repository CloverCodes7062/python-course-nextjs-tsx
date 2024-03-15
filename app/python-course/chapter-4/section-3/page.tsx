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

                const questionsCompletedRes = await fetch('http://localhost:3000/api/getCompletedQuestions?chapterSection=4-3');
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
            <StandardTitleH1>Chapter 4.3: Classes and Objects</StandardTitleH1>
            <div className="flex flex-col items-center">
                <StandardLearningObjectivesContainer pr={'200'}>
                    <StandardLi>You will understand what a <Italic>Class</Italic> is.</StandardLi>
                    <StandardLi>You will understand what an <Italic>Object</Italic> is.</StandardLi>
                    <StandardLi>You will learn how to create and use <Italic>Classes</Italic> and <Italic>Objects</Italic>.</StandardLi>
                </StandardLearningObjectivesContainer>
                <main className="w-full mt-[40px] mb-[40px]">
                    <StandardH1>What is a Class?</StandardH1>
                    <Pmt25>
                        A <Italic>class</Italic> is a blueprint or template for creating objects. It defines the properties (attributes) and behaviors (methods) that an object of that class will have.
                    </Pmt25>
                    <Pmt25>
                        Here's an example of a simple class representing a Rectangle:
                    </Pmt25>
                    <StandardContainer>
                        <ConditionalStatement>
                            <ConditionalStatementStart>{`class Rectangle:`}</ConditionalStatementStart>
                            <ConditionalStatementPiece indention={1}>{`def __init__(self, width, height):`}</ConditionalStatementPiece>
                            <ConditionalStatementPiece indention={2}>{`self.width = width`}</ConditionalStatementPiece>
                            <ConditionalStatementPiece indention={2}>{`self.height = height`}</ConditionalStatementPiece>
                            <br />
                            <ConditionalStatementPiece indention={1}>{`def area(self):`}</ConditionalStatementPiece>
                            <ConditionalStatementPiece indention={2}>{`return self.width * self.height`}</ConditionalStatementPiece>
                        </ConditionalStatement>
                    </StandardContainer>
                    <Pmt25>
                        In this example, the <Italic>Rectangle</Italic> class has two attributes (<Italic>width</Italic> and <Italic>height</Italic>) and one method (<Italic>area()</Italic>). The <Italic>__init__()</Italic> method is a special method called a constructor, which is used to initialize the object's attributes when it is created.
                    </Pmt25>
                    <H1mt50>What is an Object?</H1mt50>
                    <Pmt25>
                        An <Italic>object</Italic> is an instance of a class. It represents a specific entity or thing with its own unique set of attribute values and methods.
                    </Pmt25>
                    <StandardContainer>
                        <StandardContainerP>{`# Creating objects`}</StandardContainerP>
                        <StandardContainerP>{`rect1 = Rectangle(5, 10)`}</StandardContainerP>
                        <StandardContainerP>{`rect2 = Rectangle(3, 7)`}</StandardContainerP>
                        <br />
                        <StandardContainerP>{`# Accessing attributes and calling methods`}</StandardContainerP>
                        <StandardContainerP>{`print(rect1.width)  # Output: 5`}</StandardContainerP>
                        <StandardContainerP>{`print(rect2.area())  # Output: 21`}</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>
                        In the example above, <Italic>rect1</Italic> and <Italic>rect2</Italic> are objects of the <Italic>Rectangle</Italic> class. They have their own unique attribute values (<Italic>width</Italic> and <Italic>height</Italic>), and we can access these attributes and call their methods using dot notation.
                    </Pmt25>
                    <ProgrammingExercise
                        questionsCompleted={questionsCompleted}
                        setQuestionsCompleted={setQuestionsCompleted}
                        questionNumber={"4-2-1"}
                        questionTitle={"Create a Circle Class"}
                        questionDescription={`
                            Create a class called 'Circle' with the following:
                            - An __init__ method that takes in a radius and initializes a 'radius' attribute
                            - A method called 'area' that calculates and returns the area of the circle (use math.pi)
                            - A method called 'circumference' that calculates and returns the circumference of the circle
                            Create an object of the Circle class with a radius of 5, and print its area and circumference.
                        `}
                        pointsWorth={3}
                        neededOutput={''}
                    />
                    <ProgrammingExercise
                    questionsCompleted={questionsCompleted}
                    setQuestionsCompleted={setQuestionsCompleted}
                    questionNumber={"4-2-2"}
                    questionTitle={"Create a Student Class"}
                    questionDescription={`
                        Create a class called 'Student' with the following:
                        - An __init__ method that takes in a name and initializes a 'name' attribute
                        - A method called 'add_grade' that takes in a grade and appends it to a 'grades' list (initialize the 'grades' list in the __init__ method)
                        - A method called 'get_average' that calculates and returns the average of the 'grades' list
                        Create a Student object, add some grades to it, and print the student's name and average grade.
                    `}
                    pointsWorth={4}
                    neededOutput={''}
                    />
                </main>
            </div>
        </div>
    );
}