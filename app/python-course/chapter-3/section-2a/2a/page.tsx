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
                        Earier, we mentioned <Italic>in-line styling</Italic>, so what is it? In-line styling is a way to style HTML without a seperate <Italic>Style Sheet</Italic> (we'll discuss Style Sheets in a moment).
                    </Pmt25>
                    <Pmt10>
                        Using in-line styling is easy, inside of an element just use style="" and start writing css rules. In-line styling is usually frowned upon as it is <Italic>not</Italic> easily reuable, which does not adhere to our philosophy <Italic>"Don't repeat yourself"</Italic>.
                    </Pmt10>
                    <Pmt10>
                        Look at our h1 element above, it has two rules, "color: red;" and "text-align: center;". Imagine we wanted to give our p element the same rules, we'd have to copy-paste them, <Italic>repeating</Italic> ourselfs unnecessarily.
                    </Pmt10>
                    <Pmt10>
                        This is why using a seperate <Italic>Style Sheet</Italic> is recommended. A seperate Style Sheet allows you to give elements Ids and classes, and style them, styling groups of elements at once.
                    </Pmt10>
                    <H1mt50>How do we make a Style Sheet?</H1mt50>
                    <Pmt25>{`To make an external Style Sheet, create a seperate file ending in .css (styles.css) and link it in our <head> element using a link element.`}</Pmt25>
                    <Pmt25>Link Element Example:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>
                            {`<link rel="stylesheet" href="styles.css">`}
                        </StandardContainerP>
                    </StandardContainer>
                    <Pmt10>Note: The rel must be set to "stylesheet", it stands for <Italic>relationship</Italic>.</Pmt10>
                    <Pmt10>
                        Note: The href is the location of the .css file, without a file path, it will assume that the .css file is in the same directory as the html file.
                    </Pmt10>
                    <H1mt50>How are Style Sheets structured?</H1mt50>
                    <Pmt25>Style Sheets are structured in the following format <Italic>identifier attribute: property; (rule)</Italic>.</Pmt25>
                    <Pmt25>Let's look at an example:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>{"h2 {"}</StandardContainerP>
                        <StandardContainerP>{"\u00A0\u00A0\u00A0\u00A0color: red;"}</StandardContainerP>
                        <StandardContainerP>{"}"}</StandardContainerP>
                    </StandardContainer>
                    <Pmt10>
                        {`Note: Our rule still works the same way as {color: red;}, but the proper syntax has been listed above.`}
                    </Pmt10>
                    <Pmt25>
                        The rule above will set the color of <Italic>every</Italic> h2 element in the document to <Italic>red</Italic>; as it uses an element as the <Italic>identifier</Italic>.
                    </Pmt25>
                    <Pmt25>Try using an element identifier to style all p elements:</Pmt25>
                    <HTMLViewer 
                        htmlCode={'<!DOCTYPE html>\n<html>\n<head>\n\t<title>Page Title</title>\n</head>\n<body>\n\t<h1">This is a Heading</h1>\n\t<div>\n\t\t<h2>This is an H2</h2>\n\t\t<p>This is a paragraph</p>\n\t</div>\n\t<p>This is another paragraph</p>\n</body>\n</html>'}
                        useStyleSheet={true}
                    />
                    <H1mt50>What is a class in CSS?</H1mt50>
                    <Pmt25>What if we only wanted to style certain p elements? Then, we could use a <Italic>class</Italic>.</Pmt25>
                    <Pmt25>Let's look at an example of an element with a class:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>{`<p class="centered-red-p">This is a paragraph</p>`}</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>And let's style the class in a .css file:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>{".centered-red-p {"}</StandardContainerP>
                        <StandardContainerP>{"\u00A0\u00A0\u00A0\u00A0color: red;"}</StandardContainerP>
                        <StandardContainerP>{"\u00A0\u00A0\u00A0\u00A0text-align: center;"}</StandardContainerP>
                        <StandardContainerP>{"}"}</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>The Style Sheet above will style all elements with the class "centered-red-p".</Pmt25>
                    <Pmt25>Let's look at it in action:</Pmt25>
                    <HTMLViewer 
                        htmlCode={'<!DOCTYPE html>\n<html>\n<head>\n\t<title>Page Title</title>\n</head>\n<body>\n\t<h1>This is a Heading</h1>\n\t<div>\n\t\t<h2>This is an H2</h2>\n\t\t<p class="centered-red-p">This is a paragraph</p>\n\t</div>\n\t<p>This is another paragraph</p>\n\t<p class="centered-red-p">This is a third paragraph</p>\n</body>\n</html>'}
                        useStyleSheet={true}
                        initalCssCode={`.centered-red-p { color: red; text-align: center; }`}
                    />
                    <Pmt25>We can see that only the elements with the class got styled.</Pmt25>
                    <H1mt50>What is an ID in CSS?</H1mt50>
                    <Pmt25>
                        Imagine this, we have a single element that we want to style; we could use classes or in-line styling but classes are geared towards <Italic>groups</Italic> of elements and in-line styling is not <Italic>identifiable</Italic>. In this case, we should use an <Italic>id</Italic>.
                    </Pmt25>
                    <Pmt25>Let's look at an element with an id:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>{`<p id="first-p">This is a paragraph</p>`}</StandardContainerP>
                    </StandardContainer>
                    <Pmt10>
                        Now, our element is <Italic>identifiable</Italic> and we can style it using a <Italic>external styling</Italic>.
                    </Pmt10>
                    <Pmt25>Let's look at how to style an id:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>{"#first-p {"}</StandardContainerP>
                        <StandardContainerP>{"\u00A0\u00A0\u00A0\u00A0color: red;"}</StandardContainerP>
                        <StandardContainerP>{"}"}</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>As seen above, to style an id, we prefix the identifier with a <Italic>#</Italic>.</Pmt25>
                    <KeyPointsContainer>
                        <StandardLi>There are three ways to use css with html; <Italic>in-line, internal, or external.</Italic></StandardLi>
                        <StandardLi>Rules are formatted as <Italic>attribute: property;.</Italic></StandardLi>
                        <StandardLi>Classes are for groups, Ids are <Italic>unique</Italic> and to be used on a single element.</StandardLi>
                        <StandardLi>If there is no prefix on an identifier, it will assume the identifier is for an element, a dot is for classes, and a hashtag represents an Id.</StandardLi>
                    </KeyPointsContainer>
                </main>
            </div>
        </div>
    );
}