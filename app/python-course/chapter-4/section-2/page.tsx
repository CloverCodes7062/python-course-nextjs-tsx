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

                const questionsCompletedRes = await fetch('http://localhost:3000/api/getCompletedQuestions?chapterSection=4-2');
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
            <StandardTitleH1>Chapter 4.2: Modules, Randomness, and Time/Dates</StandardTitleH1>
            <div className="flex flex-col items-center">
                <StandardLearningObjectivesContainer pr={'125'}>
                    <StandardLi>
                        You will learn what a <Italic>Module</Italic> is and how to import and use them.
                    </StandardLi>
                    <StandardLi>
                        You will learn about the <Italic>random</Italic> and <Italic>time</Italic> modules and how to use them.
                    </StandardLi>
                </StandardLearningObjectivesContainer>
                <main className="w-full mt-[40px] mb-[40px]">
                    <StandardH1>What is a Module?</StandardH1>
                    <Pmt25>
                        A <Italic>module</Italic> in Python is a file containing Python definitions and statements. Modules allow you to organize and reuse code by breaking it into separate files. They also provide a way to access built-in functionality or third-party libraries.
                    </Pmt25>
                    <Pmt25>
                        Python comes with a large standard library of built-in modules that you can import and use in your programs. For example, the <Italic>math</Italic> module provides functions for mathematical operations:
                    </Pmt25>
                    <StandardContainer>
                        <StandardContainerP>{`import math`}</StandardContainerP>
                        <StandardContainerP>{`print(math.sqrt(16))  # Output: 4.0`}</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>
                        You can also create your own modules by writing Python code in a separate file with a <Italic>.py</Italic> extension, and then importing and using that code in other Python scripts.
                    </Pmt25>
                    <H1mt50>The random Module</H1mt50>
                    <Pmt25>
                        The <Italic>random</Italic> module provides functions for generating random numbers and making random choices. This is useful for creating games, simulations, and other applications that require an element of randomness.
                    </Pmt25>
                    <StandardContainer>
                        <StandardContainerP>{`import random`}</StandardContainerP>
                        <StandardContainerP>{`print(random.random())  # Generates a random float between 0 and 1`}</StandardContainerP>
                        <StandardContainerP>{`print(random.randint(1, 10))  # Generates a random integer between 1 and 10`}</StandardContainerP>
                        <StandardContainerP>{`my_list = [1, 2, 3, 4, 5]`}</StandardContainerP>
                        <StandardContainerP>{`print(random.choice(my_list))  # Randomly selects an element from the list`}</StandardContainerP>
                    </StandardContainer>
                    <Pmt10>
                        Note: The random module is often import as rd, using the sytax <Italic>import random as rd</Italic> to shorten it.
                    </Pmt10>
                    <H1mt50>The time Module</H1mt50>
                    <Pmt25>
                        The <Italic>time</Italic> module provides functions for working with time and dates. It can be used to get the current time, measure elapsed time, or convert between different time representations.
                    </Pmt25>
                    <StandardContainer>
                    <StandardContainerP>{`import time`}</StandardContainerP>
                        <StandardContainerP>{`print(time.time())  # Returns the current time in seconds since the epoch`}</StandardContainerP>
                        <StandardContainerP>{`print(time.ctime())  # Returns the current time as a string`}</StandardContainerP>
                        <StandardContainerP>{`time.sleep(2)  # Pauses the program for 2 seconds`}</StandardContainerP>
                    </StandardContainer>
                    <ProgrammingExercise
                        questionsCompleted={questionsCompleted}
                        setQuestionsCompleted={setQuestionsCompleted}
                        questionNumber={"4-2-1"}
                        questionTitle={"Random Password Generator"}
                        questionDescription={`Create a function called 'generate_password' that generates a random password of a specified length. The password should consist of letters (both uppercase and lowercase) and digits. Use the random module to generate random characters and construct the password string. Call the function with a length of 8 and print the generated password.`}
                        pointsWorth={3}
                        neededOutput={''}
                    />
                    <ProgrammingExercise
                        questionsCompleted={questionsCompleted}
                        setQuestionsCompleted={setQuestionsCompleted}
                        questionNumber={"4-2-2"}
                        questionTitle={"Time Elapsed"}
                        questionDescription={`Create a program that measures the time it takes to execute a specific task. The task could be a simple loop or a function call. Use the time module to record the start time before the task, and the end time after the task. Calculate and print the elapsed time in seconds.`}
                        pointsWorth={2}
                        neededOutput={''}
                    />
                </main>
            </div>
        </div>
    );
}