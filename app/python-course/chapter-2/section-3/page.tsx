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

                const questionsCompletedRes = await fetch('http://localhost:3000/api/getCompletedQuestions?chapterSection=2-3');
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
            <StandardTitleH1>Chapter 2.3: Data Structures and Loops</StandardTitleH1>
            <div className="flex flex-col items-center">
                <StandardLearningObjectivesContainer pr={'150'}>
                    <StandardLi>You will what <Italic>Lists and Dictionaries</Italic> are</StandardLi>
                    <StandardLi>You will understand how Lists and Dictionaries interact with Loops</StandardLi>
                </StandardLearningObjectivesContainer>
                <main className="w-full mt-[40px] mb-[40px]">
                    <StandardH1>What is a List?</StandardH1>
                    <Pmt25>A list in Python is self-explanatory, it's <Italic>list</Italic> of <Italic>items</Italic>.</Pmt25>
                    <Pmt10>Imagine that we have a several different fruits, we could define them using variables (orange = "orange", apple = "apple", pear = "pear"), or we can place them all in a <Italic>list</Italic>.</Pmt10>
                    <Pmt25>Let's look at an example:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>fruits = ["orange", "apple", "pear"]</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>From the example above, you can see that lists are a great, <Italic>concise</Italic> way to group items together. But how do we access them?</Pmt25>
                    <H1mt50>List Indexing</H1mt50>
                    <Pmt25>Lists in Python are <Italic>0-indexed</Italic>, meaning that all items have an <Italic>index</Italic> from 0 to n (length of list - 1).</Pmt25>
                    <Pmt10>Let's look at an example of <Italic>list indexing</Italic>.</Pmt10>
                    <StandardContainer>
                        <StandardContainerP>fruits = ["orange", "apple", "pear"]</StandardContainerP>
                        <StandardContainerP>print(fruits[0])</StandardContainerP>
                        <StandardContainerP>print(fruits[1])</StandardContainerP>
                        <StandardContainerP>print(fruits[2])</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>Output:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>orange</StandardContainerP>
                        <StandardContainerP>apple</StandardContainerP>
                        <StandardContainerP>pear</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>
                        You can see above that we just need to use [(index)] to access the item at that index in our list.
                    </Pmt25>
                    <Pmt10>Note: fruits[3] would raise an IndexError since we only have 0, 1, 2.</Pmt10>
                    <Pmt25>
                        If you look back at the example from where we printed our fruits, you may remember our philosophy <Italic>"Don't repeat yourself"</Italic>. Since we have serveral similar lines of code, we should implement a loop to <Italic>iterate</Italic> through the list, repeating our code for us.
                    </Pmt25>
                    <Pmt10>Note: the length of a list can be found using <Italic>len()</Italic></Pmt10>
                    <Pmt25>Let's look an example:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>fruits = ["orange", "apple", "pear"]</StandardContainerP>
                        <br />
                        <StandardContainerP>i = 0</StandardContainerP>
                        <ConditionalStatement>
                            <ConditionalStatementStart>{"while i < len(fruits):"}</ConditionalStatementStart>
                            <ConditionalStatementPiece>{"print(fruits[i])"}</ConditionalStatementPiece>
                            <ConditionalStatementPiece>{"i += 1"}</ConditionalStatementPiece>
                        </ConditionalStatement>
                    </StandardContainer>
                    <Pmt25>Output:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>orange</StandardContainerP>
                        <StandardContainerP>apple</StandardContainerP>
                        <StandardContainerP>pear</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>We can also do the same thing using a for loop and <Italic>range()</Italic>.</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>fruits = ["orange", "apple", "pear"]</StandardContainerP>
                        <br />
                        <ConditionalStatement>
                            <ConditionalStatementStart>{"for i in range(len(fruits)):"}</ConditionalStatementStart>
                            <ConditionalStatementPiece>{"print(fruits[i])"}</ConditionalStatementPiece>
                        </ConditionalStatement>
                    </StandardContainer>
                    <Pmt25>Output:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>orange</StandardContainerP>
                        <StandardContainerP>apple</StandardContainerP>
                        <StandardContainerP>pear</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>
                        Remember that range goes from 0 to n - 1. len(fruits) is 3, so our range is 0, 1, 2. In this case, a for loop is more concise, since we don't need a <Italic>helper variable</Italic>.
                    </Pmt25>
                    <ProgrammingExercise
                        questionsCompleted={questionsCompleted}
                        setQuestionsCompleted={setQuestionsCompleted}
                        questionNumber={"2-3-1"}
                        questionTitle={"Print List"}
                        questionDescription={`Create a variable and assign a list to it, then use any type of loop to iterate through it, printing out the contents of the list.`}
                        pointsWorth={1}
                        neededOutput={'sdasdadd'}
                    />
                    <H1mt50>What is a Dictionary?</H1mt50>
                    <Pmt25>A dictionary is a way to store values in <Italic>key, value</Italic> pairs.</Pmt25>
                    <Pmt10>Imagine that we a list of students and each student has a grade, how would we code that?</Pmt10>
                    <Pmt25>One way is to use a <Italic>dictionary</Italic>, let's look at an example:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>{`student_dict = { "Mark": 79, "Jake": 84, "Paul": 63, "Saul": 98 }`}</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>This is a dictionary, you can see that we values are stored name: grade.</Pmt25>
                    <Pmt10>
                        How do we access values in a dictionary? To access a value in a dictionary, we need to use dict[key].
                    </Pmt10>
                    <Pmt25>Let's look at an example:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>print(student_dict["Mark"])</StandardContainerP>
                        <StandardContainerP>print(student_dict["Saul"])</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>Output:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>79</StandardContainerP>
                        <StandardContainerP>98</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>
                        From the example above, you can see that to access a value in a dictionary, we must provide a key. You also may have noticed that we <Italic>repeated</Italic> code again, this means we can use a loop.
                    </Pmt25>
                    <Pmt25>
                        Before we talk about how to iterate through a dictionary, we must talk about another way to use for loops. So far, we've only used them in combination with <Italic>range()</Italic>; but what happens if we don't use range()?
                    </Pmt25>
                    <Pmt25>Let's look at an example of this using lists:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>fruits = ["orange", "apple", "pear"]</StandardContainerP>
                        <br />
                        <ConditionalStatement>
                            <ConditionalStatementStart>{"for fruit in fruits:"}</ConditionalStatementStart>
                            <ConditionalStatementPiece>{"print(fruit)"}</ConditionalStatementPiece>
                        </ConditionalStatement>
                    </StandardContainer>
                    <Pmt25>Output:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>orange</StandardContainerP>
                        <StandardContainerP>apple</StandardContainerP>
                        <StandardContainerP>pear</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>We can use a for loop to iterate through <Italic>any iterable data structure</Italic> using the format <Italic>for item in items</Italic>.</Pmt25>
                    <Pmt25>Let's look an example of how we can loop through a dictionary:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>{`student_dict = { "Mark": 79, "Jake": 84, "Paul": 63, "Saul": 98 }`}</StandardContainerP>
                        <br />
                        <ConditionalStatement>
                            <ConditionalStatementStart>{"for key in student_dict:"}</ConditionalStatementStart>
                            <ConditionalStatementPiece>{"print(student_dict[key])"}</ConditionalStatementPiece>
                        </ConditionalStatement>
                    </StandardContainer>
                    <Pmt25>Output:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>79</StandardContainerP>
                        <StandardContainerP>84</StandardContainerP>
                        <StandardContainerP>63</StandardContainerP>
                        <StandardContainerP>98</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>
                        Even though our items in the dictionary are stored in <Italic>key, value</Italic> pairs, each iteration of the loop only has access to a key. If we want to get the value, we must <Italic>index</Italic> the dictionary using the key.
                    </Pmt25>
                    <ProgrammingExercise
                        questionsCompleted={questionsCompleted}
                        setQuestionsCompleted={setQuestionsCompleted}
                        questionNumber={"2-3-2"}
                        questionTitle={"Grocery Dictionary"}
                        questionDescription={`Create a dictionary called groceries and loop through it using a for loop.`}
                        pointsWorth={1}
                        neededOutput={''}
                    />
                    <H1mt50>Searching Lists and Dictionaries</H1mt50>
                    <Pmt25>
                        Imagine that we have a list of fruits, how can we search it for a value? Correct, we could use a list and compare each found value to the value we want to find; but we can also use the <Italic>in</Italic> keyword.
                    </Pmt25>
                    <Pmt25>Let's look at an example of <Italic>in</Italic>.</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>fruits = ["orange", "apple", "pear"]</StandardContainerP>
                        <br />
                        <ConditionalStatement>
                            <ConditionalStatementStart>{`if "apple" in fruits:`}</ConditionalStatementStart>
                            <ConditionalStatementPiece>{`print('"apple" is in fruits')`}</ConditionalStatementPiece>
                            <ConditionalStatementStart>{`else:`}</ConditionalStatementStart>
                            <ConditionalStatementPiece>{`print('"apple" is not in fruits')`}</ConditionalStatementPiece>
                        </ConditionalStatement>
                    </StandardContainer>
                    <Pmt25>Dictionaries work the same way, but it only checks the keys <Italic>not the values</Italic>.</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>{`student_dict = { "Mark": 79, "Jake": 84, "Paul": 63, "Saul": 98 }`}</StandardContainerP>
                        <br />
                        <ConditionalStatement>
                            <ConditionalStatementStart>{`if "Mark" in student_dict:`}</ConditionalStatementStart>
                            <ConditionalStatementPiece>{`print('"Mark" is in student_dict')`}</ConditionalStatementPiece>
                            <ConditionalStatementStart>{`else:`}</ConditionalStatementStart>
                            <ConditionalStatementPiece>{`print('"Mark" is not in fruits')`}</ConditionalStatementPiece>
                        </ConditionalStatement>
                    </StandardContainer>
                    <H1mt50>Techincal Coding Question</H1mt50>
                    <Pmt25>
                        A techincal coding question is a question you must solve my creating a program. These are questions you may be asked in technical interviews. These are <Italic>hard</Italic> so don't feel bad if you struggle on them or are unable to solve them for a while.
                    </Pmt25>
                    <ProgrammingExercise
                        questionsCompleted={questionsCompleted}
                        setQuestionsCompleted={setQuestionsCompleted}
                        questionNumber={"2-3-3"}
                        questionTitle={"Two Sum"}
                        questionDescription={`Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\nYou can return the answer in any order.\n\nExample:\nInput: nums = [2, 7, 11, 15], target = 9\nOutput: [0, 1]\n\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].`}
                        pointsWorth={4}
                        neededOutput={''}
                    />
                </main>
            </div>
        </div>
    );
}