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

                const questionsCompletedRes = await fetch('http://localhost:3000/api/getCompletedQuestions?chapterSection=2-2');
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
            <StandardTitleH1>Chapter 2.2: Simple Loops</StandardTitleH1>
            <div className="flex flex-col items-center">
                <StandardLearningObjectivesContainer pr={'300'}>
                    <StandardLi>You will what a <Italic>Loop</Italic> is</StandardLi>
                    <StandardLi>You will understand the different <Italic>types</Italic> of loops</StandardLi>
                    <StandardLi>You will how to <Italic>break</Italic> a loop</StandardLi>
                </StandardLearningObjectivesContainer>
                <main className="w-full mt-[40px] mb-[40px]">
                    <StandardH1>What is a loop?</StandardH1>
                    <Pmt25>Imagine that we need to print out the numbers 1 through 10. Right now, we would have to use <Italic>10</Italic> print statements. This brings us to a popular programming philosophy <Italic>"Don't repeat yourself"</Italic>.</Pmt25>
                    <Pmt10>Let's look at an example of how we can <Italic>repeat</Italic> code using a loop.</Pmt10>
                    <StandardContainer>
                        i = 1
                        <ConditionalStatementStart>{"while i <= 10:"}</ConditionalStatementStart>
                        <ConditionalStatementPiece>{"print(i)"}</ConditionalStatementPiece>
                        <ConditionalStatementPiece>{"i = i + 1"}</ConditionalStatementPiece>
                    </StandardContainer>
                    <Pmt10>Output:</Pmt10>
                    <StandardContainer>
                        <StandardContainerP>1</StandardContainerP>
                        <StandardContainerP>2</StandardContainerP>
                        <StandardContainerP>2</StandardContainerP>
                        <StandardContainerP>3</StandardContainerP>
                        <StandardContainerP>4</StandardContainerP>
                        <StandardContainerP>5</StandardContainerP>
                        <StandardContainerP>6</StandardContainerP>
                        <StandardContainerP>7</StandardContainerP>
                        <StandardContainerP>8</StandardContainerP>
                        <StandardContainerP>9</StandardContainerP>
                        <StandardContainerP>10</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>
                        Notice that inside of the loop, we <Italic>increment</Italic> our variable <Italic>i</Italic>. This works because <Italic>everything</Italic> on the right side is evaulated and then assigned to the variable on the left. In Python, since this is common, there is a special operator (+=) which allows use to do i += 1 instead of i = i + 1.
                    </Pmt25>
                    <Pmt10>Note: <Italic>i</Italic> is called a <Italic>helper variable</Italic> because it helps us during our loop. You'll use these a lot.</Pmt10>
                    <Pmt10>
                        A while loop is nice because in this case, we have a variable that is <Italic>incremented</Italic> on every iteration of the loop. This means that we can still use the variable after the while loop, but what if we didn't need to use the variable later?
                    </Pmt10>
                    <Pmt10>Note: you can also do i *= 2, i /= 2, i //= 2, etc.</Pmt10>
                    <Pmt25>Then we can use a <Italic>for</Italic> loop!</Pmt25>
                    <StandardContainer>
                        <ConditionalStatementStart>{"for i in range(1, 11):"}</ConditionalStatementStart>
                        <ConditionalStatementPiece>{"print(i)"}</ConditionalStatementPiece>
                    </StandardContainer>
                    <Pmt10>Output:</Pmt10>
                    <StandardContainer>
                        <StandardContainerP>1</StandardContainerP>
                        <StandardContainerP>2</StandardContainerP>
                        <StandardContainerP>2</StandardContainerP>
                        <StandardContainerP>3</StandardContainerP>
                        <StandardContainerP>4</StandardContainerP>
                        <StandardContainerP>5</StandardContainerP>
                        <StandardContainerP>6</StandardContainerP>
                        <StandardContainerP>7</StandardContainerP>
                        <StandardContainerP>8</StandardContainerP>
                        <StandardContainerP>9</StandardContainerP>
                        <StandardContainerP>10</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>
                        Let's look back at our problem statement, <Italic>print out the numbers 1 through 10</Italic>. Now, read our Python code again, and you'll notice that the for loop perfectly translate to what we are doing, simply printing out all numbers in a <Italic>range</Italic>.
                    </Pmt25>
                    <Pmt10>
                        Note: in Python, <Italic>range()</Italic> goes from the starting number to the ending number - 1, <Italic>inclusive</Italic> to <Italic>exclusive</Italic>. So we must go from 1 to 11, if we want to print 1 through 10.
                    </Pmt10>
                    <Pmt25>Imagine another scenario, we want a program that excepts user input until they enter -1, how can we do this?</Pmt25>
                    <Pmt10>Let's review the code below:</Pmt10>
                    <StandardContainer>
                        <ConditionalStatementStart>{"while True:"}</ConditionalStatementStart>
                        <ConditionalStatementPiece>{`user_input = int(input("Enter an integer: "))`}</ConditionalStatementPiece>
                        <ConditionalStatementStart indention={1}>{"if user_input == -1:"}</ConditionalStatementStart>
                        <ConditionalStatementPiece indention={2}>{`print("You entered -1!")`}</ConditionalStatementPiece>
                        <ConditionalStatementPiece indention={2}>{"break"}</ConditionalStatementPiece>
                        <ConditionalStatementPiece>{"print(user_input)"}</ConditionalStatementPiece>
                    </StandardContainer>
                    <Pmt10>Note: since a while loop executed until the expression is False, a while True loop will never end; it has to be manual ended with <Italic>break</Italic>.</Pmt10>
                    <Pmt25>
                        This is code run and print user_input until the user enters -1. When the user enters -1, the if statement executes, prints "You entered -1", and <Italic>immediately</Italic> breaks, meaning that all code below the <Italic>break</Italic> does not execute.
                    </Pmt25>
                    <ProgrammingExercise
                        questionsCompleted={questionsCompleted}
                        setQuestionsCompleted={setQuestionsCompleted}
                        questionNumber={"2-2-1"}
                        questionTitle={"FizzBuzz"}
                        questionDescription={`Write a program that defines a number n, make a loop and for every integer i <= n, print “FizzBuzz” if i is divisible by 3 and 5, “Fizz” if i is divisible by 3, “Buzz” if i is divisible by 5 or print i if none of the conditions are true. Hint: use modulo (%)`}
                        pointsWorth={1}
                        neededOutput={''}
                    />
                    <ProgrammingExercise
                        questionsCompleted={questionsCompleted}
                        setQuestionsCompleted={setQuestionsCompleted}
                        questionNumber={"2-2-2"}
                        questionTitle={"Same Password"}
                        questionDescription={`Write a program asks a user for a password and then asks the user to repeat the same password. While the second password is not equal to the first, the program should loop and ask the user to enter a password.`}
                        pointsWorth={2}
                        neededOutput={'sdasdadd'}
                    />
                    <ProgrammingExercise
                        questionsCompleted={questionsCompleted}
                        setQuestionsCompleted={setQuestionsCompleted}
                        questionNumber={"2-2-3"}
                        questionTitle={"Same Password"}
                        questionDescription={`Choose a pin and assign it to a variable "pin", then create a program that asks a user for a pin until they get it correct or they've attempted to guess it more than five times`}
                        pointsWorth={2}
                        neededOutput={'sdasdadd'}
                    />
                    <ProgrammingExercise
                        questionsCompleted={questionsCompleted}
                        setQuestionsCompleted={setQuestionsCompleted}
                        questionNumber={"2-2-4"}
                        questionTitle={"Create a sentence"}
                        questionDescription={`Write a program that asks users for words one at a time, breaks when the user enters -1 and then prints out the sentence entered. Hint: use a helper variable and string concatenation`}
                        pointsWorth={2}
                        neededOutput={'sdasdadd'}
                    />
                    <ProgrammingExercise
                        questionsCompleted={questionsCompleted}
                        setQuestionsCompleted={setQuestionsCompleted}
                        questionNumber={"2-2-5"}
                        questionTitle={"Mean, Sum and Product"}
                        questionDescription={`Write a program asks users for integers until 0 is entered, print the MEAN, SUM and PRODUCT of the entered numbers.`}
                        pointsWorth={3}
                        neededOutput={'sdasdadd'}
                    />
                    <H1mt50>Continue</H1mt50>
                    <Pmt25>
                        Last topic, <Italic>continue</Italic>. Imagine that we want to add all numbers from 1 to 100 using a loop.
                    </Pmt25>
                    <StandardContainer>
                        <ConditionalStatementStart>{"for i in range(1, 101)"}</ConditionalStatementStart>
                        <ConditionalStatementPiece>{"print(i)"}</ConditionalStatementPiece>
                    </StandardContainer>
                    <Pmt25>But what if we wanted to skip numbers divisible by 5?</Pmt25>
                    <StandardContainer>
                        <ConditionalStatementStart>{"for i in range(1, 101):"}</ConditionalStatementStart>
                        <ConditionalStatementStart indention={1}>{"if i % 5 != 0:"}</ConditionalStatementStart>
                        <ConditionalStatementPiece indention={2}>{"print(i)"}</ConditionalStatementPiece>
                    </StandardContainer>
                    <Pmt25>
                        We can also do the same thing using <Italic>continue</Italic>. When continue is executed, the code returns back to the top of the loop.
                    </Pmt25>
                    <StandardContainer>
                        <ConditionalStatementStart>{"for i in range(1, 101):"}</ConditionalStatementStart>
                        <ConditionalStatementStart indention={1}>{"if i % 5 == 0:"}</ConditionalStatementStart>
                        <ConditionalStatementPiece indention={2}>{"continue"}</ConditionalStatementPiece>
                        <ConditionalStatementPiece indention={1}>{"print(i)"}</ConditionalStatementPiece>
                    </StandardContainer>
                    <Pmt25>In both programs, numbers divisible by 5 are skipped.</Pmt25>
                </main>
            </div>
        </div>
    );
}