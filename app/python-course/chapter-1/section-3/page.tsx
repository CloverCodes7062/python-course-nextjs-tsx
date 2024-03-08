'use client';

import H1mt50 from "@/components/H1mt50";
import Italic from "@/components/Italic";
import KeyPointsContainer from "@/components/KeyPointsContainer";
import Pmt10 from "@/components/Pmt10";
import Pmt25 from "@/components/Pmt25";
import ProgrammingExercise from "@/components/ProgrammingExercise";
import StandardContainer from "@/components/StandardContainer";
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

export default function Section3() {
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

                const questionsCompletedRes = await fetch('http://localhost:3000/api/getCompletedQuestions?chapterSection=1-3');
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
            <StandardTitleH1>Chapter 1.3: User Input</StandardTitleH1>
            <div className="flex flex-col items-center">
                <StandardLearningObjectivesContainer pr={'350'}>
                    <StandardLi>You will understand how to get user input</StandardLi>
                    <StandardLi>You will understand how to use user input</StandardLi>
                </StandardLearningObjectivesContainer>
                <main className="w-full mt-[40px] mb-[40px]">
                    <StandardH1>How do we get user input?</StandardH1>
                    <Pmt25>
                        To get user input in python, we can use <Italic>input()</Italic> and assign the result to a variable.
                    </Pmt25>
                    <Pmt10>
                        Let's look at an example of how we can use input() to get user input.
                    </Pmt10>
                    <StandardContainer>
                        <p className="font-medium">name = input()</p>
                    </StandardContainer>
                    <Pmt25>
                        Once ran, the program will ask the user for an input which will then be assigned to the variable name.
                    </Pmt25>
                    <Pmt10>Note: if a string is placed inside of input(), input("Enter a name: ") the string will be printed first, with a place for input next to it.</Pmt10>
                    <ProgrammingExercise
                        questionsCompleted={questionsCompleted}
                        setQuestionsCompleted={setQuestionsCompleted}
                        questionNumber={"1-3-1"}
                        questionTitle={"User Input Test"}
                        questionDescription={"Write a program that takes a user input, assigns it to a variable, and then outputs it"}
                        pointsWorth={2}
                        neededOutput={''}
                    />
                    <Pmt25>
                        Earlier, we talked about different data types in python, (string, integer, float) and you may have noticed that input always returns a string. Which can be tested if you try to add two numbers collected from inputs. To fix this, we must learn about type conversions.
                    </Pmt25>
                    <H1mt50>What are type conversions and how can we preform them?</H1mt50>
                    <Pmt10>Type conversions allow you to convert data from one type to another. For example, a string "5" can be converted into integer 5, and integer 5 can be converted into float 5.0.</Pmt10>
                    <Pmt10>Listed below are the most common type conversions, and what they are compatible with.</Pmt10>
                    <StandardContainer>
                        <p className="font-medium">str(): attempts to convert the data within the parentheses to a string.</p>
                        <p className="font-medium">int(): attempts to convert the data within the parentheses to an integer.</p>
                        <p className="font-medium">float(): attempts to convert the data within the parentheses to a float.</p>
                    </StandardContainer>
                    <Pmt25>Let's look some examples of these type conversions: </Pmt25>
                    <StandardContainer>
                        <p className="font-medium">x = 5</p>
                        <p className="font-medium">print(x)</p>
                        <br />
                        <p className="font-medium">y = str(5)</p>
                        <p className="font-medium">print(y)</p>
                        <br />
                        <p className="font-medium">z = float(5)</p>
                        <p className="font-medium">print(z)</p>
                    </StandardContainer>
                    <Pmt10>And their outputs:</Pmt10>
                    <StandardContainer>
                        <p className="font-medium">5</p>
                        <p className="font-medium">"5"</p>
                        <p className="font-medium">5.0</p>
                    </StandardContainer>
                    <Pmt25>Let's look at some examples of type conversions with other data types:</Pmt25>
                    <StandardContainer>
                        <p className="font-medium">x = 5.4</p>
                        <p className="font-medium">print(x)</p>
                        <br />
                        <p className="font-medium">y = int(5.4)</p>
                        <p className="font-medium">print(y)</p>
                        <br />
                        <p className="font-medium">z = int("cat")</p>
                        <p className="font-medium">print(z)</p>
                        <br />
                        <p className="font-medium">a = float("cat")</p>
                        <p className="font-medium">print(a)</p>
                    </StandardContainer>
                    <Pmt10>And their outputs:</Pmt10>
                    <StandardContainer>
                        <p className="font-medium">5.4</p>
                        <p className="font-medium">5</p>
                        <p className="font-medium">ValueError: invalid literal for int() with base 10: 'cat'</p>
                        <p className="font-medium">ValueError: could not convert string to float: 'cat'</p>
                    </StandardContainer>
                    <Pmt25>
                        From the output above, we can see that converting a float to an integer is allowed, but it always rounds down to the nearest integer. However, a string cannot be converted to an integer or float unless the string exclusively contains an integer or float.
                    </Pmt25>
                    <Pmt10>
                        For example, "5" was converted to intger 5, and "55.4" can be converted to either an integer or float, but "cat" cannot be converted and "5 5" cannot be converted because it contains a whitespace " ".
                    </Pmt10>
                    <ProgrammingExercise
                        questionsCompleted={questionsCompleted}
                        setQuestionsCompleted={setQuestionsCompleted}
                        questionNumber={"1-3-2"}
                        questionTitle={"Type Conversion Sandbox"}
                        questionDescription={"Write a program that prints str(5) and then play around a bit with type conversions!"}
                        pointsWorth={1}
                        neededOutput={'5\n'}
                    />
                    <H1mt50>What do type conversions have to do with User Input?</H1mt50>
                    <Pmt25>Let's look at the example below, you have a program that asks a user for two ages (we'll choose 5 and 10) and then adds them:</Pmt25>
                    <StandardContainer>
                        <p className="font-medium">age1 = input()</p>
                        <p className="font-medium">age2 = input()</p>
                        <p className="font-medium">print(age1 + age2)</p>
                    </StandardContainer>
                    <Pmt10>Output:</Pmt10>
                    <StandardContainer>
                        <p className="font-medium">510</p>
                    </StandardContainer>
                    <H1mt50>What happened?</H1mt50>
                    <Pmt10>
                        input() collects a string input, remember that strings are not added, they are concatenated. So "5" + "10" = "510". If we want to collect an integer input we have to use int(input()), which collects a string input and then attempts to convert it.
                    </Pmt10>
                    <Pmt25>Let's try again, using int(input()) instead:</Pmt25>
                    <StandardContainer>
                        <p className="font-medium">age1 = int(input())</p>
                        <p className="font-medium">age2 = int(input())</p>
                        <p className="font-medium">print(age1 + age2)</p>
                    </StandardContainer>
                    <Pmt10>Output:</Pmt10>
                    <StandardContainer>
                        <p className="font-medium">15</p>
                    </StandardContainer>
                    <Pmt25>Nice! By using int(input()) we are able to collect integers instead of strings.</Pmt25>
                    <Pmt10>
                        Note: You can also do the same thing with float(input()) to collect a float, but keep in mind that the string input must be a float or integer for the conversion to work.
                    </Pmt10>
                    <KeyPointsContainer>
                        <StandardLi>User input can be collected using input()</StandardLi>
                        <StandardLi>The standard type conversions are float(), int(), and str()</StandardLi>
                        <StandardLi>input() collects a string which can be converted using int(input()) or float(input())</StandardLi>
                    </KeyPointsContainer>
                </main>
            </div>
        </div>
    );
}