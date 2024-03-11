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

                const questionsCompletedRes = await fetch('http://localhost:3000/api/getCompletedQuestions?chapterSection=3-2a');
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
            <StandardTitleH1>Chapter 3.2a.2a: CSS</StandardTitleH1>
            <div className="flex flex-col items-center">
                <StandardLearningObjectivesContainer pr={'200'}>
                    <StandardLi>You will understand <Italic>what CSS</Italic> is.</StandardLi>
                    <StandardLi>You will understand how to <Italic>use CSS</Italic> to <Italic>style</Italic> html documents.</StandardLi>
                </StandardLearningObjectivesContainer>
                <main className="w-full mt-[40px] mb-[40px]">
                    <StandardH1>What is CSS?</StandardH1>
                    <Pmt25>
                        CSS stands for Cascading Style Sheets, it is a language used to <Italic>style</Italic> html documents.
                    </Pmt25>
                    <Pmt25>Let's look at a <Italic>styled</Italic> document:</Pmt25>
                    <HTMLViewer 
                        htmlCode={'<!DOCTYPE html>\n<html>\n<head>\n\t<title>Page Title</title>\n</head>\n<body>\n\t<h1 style="color: red;">This is a Heading</h1>\n\t<div style="background-color: salmon;">\n\t\t<h2>This is an H2</h2>\n\t\t<p>This is a paragraph</p>\n\t</div>\n\t<p>This is another paragraph</p>\n</body>\n</html>'}
                    />
                    <Pmt25>
                        In the document above, we can see that our div's background color is "salmon" and our h1's color is "red". This is because we use CSS to style it; we set the h1's color to "red" and the div's background-color to "salmon". More specifically, we used <Italic>in-line CSS</Italic>.
                    </Pmt25>
                    <H1mt50>How is CSS structured?</H1mt50>
                    <Pmt25>
                        CSS uses <Italic>rules</Italic>, these rules change an element's styles. For example, by default, all text is black, but our h1's text is red. These rules are structured <Italic>attribute: property;</Italic>.
                    </Pmt25>
                    <Pmt25>Some Popular CSS <Italic>rules:</Italic></Pmt25>
                    <StandardContainer>
                        <StandardContainerP>
                            color: (wanted color); This rule is used to set the color of <Italic>text</Italic>.
                        </StandardContainerP>
                        <br />
                        <StandardContainerP>
                            background-color: (wanted color); This rule is used to set an element's <Italic>background color</Italic>.
                        </StandardContainerP>
                        <br />
                        <StandardContainerP>
                            font-size: (value); This rule is used to set the <Italic>size</Italic> of text.
                        </StandardContainerP>
                        <br />
                        <StandardContainerP>
                            font-weight: (value); This rule is used to set the <Italic>boldness</Italic> of the text.
                        </StandardContainerP>
                        <br />
                        <StandardContainerP>
                            text-align: (left, center, right); This rule is used to set the <Italic>horizontal alignment</Italic> of an element's text.
                        </StandardContainerP>
                    </StandardContainer>
                    <Pmt10>Note: rules can use regular colors (red, green, blue), hexcolors starting with # or rgb values in the format rgb(255, 255, 255).</Pmt10>
                    <Pmt10>Note: rules can use a variety of measurements most commonly, px, em, rem, vh, vw.</Pmt10>
                    <Pmt25>Let's look at <Italic>text-align:</Italic></Pmt25>
                    <HTMLViewer 
                        htmlCode={'<!DOCTYPE html>\n<html>\n<head>\n\t<title>Page Title</title>\n</head>\n<body>\n\t<h1 style="color: red; text-align: center;">This is a Heading</h1>\n\t<div style="background-color: salmon;">\n\t\t<h2>This is an H2</h2>\n\t\t<p>This is a paragraph</p>\n\t</div>\n\t<p>This is another paragraph</p>\n</body>\n</html>'}
                    />
                    <Pmt25>
                        By default, all text in HTML is left-aligned, but centering text is extremely popular and important to web design.
                    </Pmt25>
                    <H1mt50>In-line Styling</H1mt50>
                    <Pmt25>
                        Earier, we mentioned <Italic>in-line styling</Italic>, so what is it? In-line styling is a way to style HTML without a seperate <Italic>stylesheet</Italic> (we'll discuss stylesheets in a moment).
                    </Pmt25>
                    <Pmt10>
                        Using in-line styling is easy, inside of an element just use style="" and start writing css rules. In-line styling is usually frowned upon as it is <Italic>not</Italic> easily reuable, which does not adhere to our philosophy <Italic>"Don't repeat yourself"</Italic>.
                    </Pmt10>
                    <Pmt10>
                        Look at our h1 element above, it has two rules, "color: red;" and "text-align: center;". Imagine we wanted to give our p element the same rules, we'd have to copy-paste them, <Italic>repeating</Italic> ourselfs unnecessarily.
                    </Pmt10>
                    <Pmt10>
                        This is why using a seperate <Italic>stylesheet</Italic> is recommended. A seperate stylesheet allows you to give elements Ids and classes, and style them, styling groups of elements at once.
                    </Pmt10>
                    <H1mt50>How do we make a stylesheet?</H1mt50>
                </main>
            </div>
        </div>
    );
}