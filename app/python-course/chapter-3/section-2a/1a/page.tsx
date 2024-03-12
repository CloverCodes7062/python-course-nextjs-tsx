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
            <StandardTitleH1>Chapter 3.2a.1a: HTML</StandardTitleH1>
            <div className="flex flex-col items-center">
                <StandardLearningObjectivesContainer pr={'150'}>
                    <StandardLi>You will understand <Italic>what HTML</Italic> is.</StandardLi>
                    <StandardLi>You will understand how to <Italic>use HTML</Italic> to make a basic website.</StandardLi>
                </StandardLearningObjectivesContainer>
                <main className="w-full mt-[40px] mb-[40px]">
                    <StandardH1>What is HTML?</StandardH1>
                    <Pmt25>
                        <Italic>HTML</Italic> stands for <Italic>Hypertext Markup Language</Italic>, it defines the <Italic>structure</Italic> of a website using elements; and it used on over 95% of websites.
                    </Pmt25>
                    <Pmt25>
                        {`Elements have an opening tag (<h1>), content (Website Header), and a closing tag (</h1>); <h1>Website Header</h1>`}
                    </Pmt25>
                    <Pmt25>Let's look at some common elements and what they do.</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>{`<h1></h1>: Heading 1; usually at the top of a page`}</StandardContainerP>
                        <StandardContainerP>{`<h2></h2>: Heading 2; usually used to represent sections of a page`}</StandardContainerP>
                        <StandardContainerP>{`<p></p>: Paragraph; used to represent standard text`}</StandardContainerP>
                        <StandardContainerP>{`<div></div>: Container; used as a container or way to group elements, defined by its children`}</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>Let's look at an example of a basic websites structure.</Pmt25>
                    <HTMLViewer 
                        htmlCode={'<!DOCTYPE html>\n<html>\n<head>\n\t<title>Page Title</title>\n</head>\n<body>\n\t<h1>This is a Heading</h1>\n\t<p>This is a paragraph.</p>\n</body>\n</html>'}
                    />
                    <H1mt50>What are these elements?</H1mt50>
                    <Pmt25>Before we start creating a website using our elements above, we must write some <Italic>boilerplate code</Italic> (code that has to be repeated everytime, with little to no altercation).</Pmt25>
                    <Pmt10>Let's breakdown our <Italic>boilerplate:</Italic></Pmt10>
                    <StandardContainer>
                        <StandardContainerP>{`<!DOCTYPE html>: This tells the browser that our document is using HTML`}</StandardContainerP>
                        <br />
                        <StandardContainerP>{`<html></html>: This is the start of an html document, every element must be inside of it`}</StandardContainerP>
                        <br />
                        <StandardContainerP>{`<head></head>: Usually used to set a page's metadata (title, etc), elements inside are not visable`}</StandardContainerP>
                        <br />
                        <StandardContainerP>{`<title></title>: Changes the title displayed on the window, should be placed inside of a head element`}</StandardContainerP>
                        <br />
                        <StandardContainerP>{`<body></body>: This represents the entire visable page, every visable element should be inside of it`}</StandardContainerP>
                    </StandardContainer>
                    <Pmt25>
                        Now that we understand our necessary <Italic>boilerplate</Italic>, we can start building a page. Inside of our body element, which <Italic>represents</Italic> the visiable document, we have a h1 element and a p element. The h1 creates a large header, representing the name of the page, and a p element is just regular text.
                    </Pmt25>
                    <Pmt25>Let's look another document, this time with a bit more complexity:</Pmt25>
                    <HTMLViewer 
                        htmlCode={'<!DOCTYPE html>\n<html>\n<head>\n\t<title>Page Title</title>\n</head>\n<body>\n\t<h1>This is a Heading</h1>\n\t<div>\n\t\t<h2>This is an H2</h2>\n\t\t<p>This is a paragraph</p>\n\t</div>\n\t<p>This is another paragraph</p>\n</body>\n</html>'}
                    />
                    <Pmt25>
                        Again, we have an h1 element and a p element; but this time we also have an h2 element and a div element. The h2 is just a smaller heading, but what is a div?
                    </Pmt25>
                    <Pmt10>
                        In our list above, it says that div elements are <Italic>containers</Italic>. Look at how we used the div, we used the div to <Italic>group</Italic> and h2 and a p element together.
                    </Pmt10>
                    <Pmt25>Note: As divs are just containers, they aren't visiable by default</Pmt25>
                    <Pmt10>Let's use CSS to make our div visiable:</Pmt10>
                    <HTMLViewer 
                        htmlCode={'<!DOCTYPE html>\n<html>\n<head>\n\t<title>Page Title</title>\n</head>\n<body>\n\t<h1>This is a Heading</h1>\n\t<div style="background-color: salmon;">\n\t\t<h2>This is an H2</h2>\n\t\t<p>This is a paragraph</p>\n\t</div>\n\t<p>This is another paragraph</p>\n</body>\n</html>'}
                    />
                    <Pmt10>Note: we will discuss CSS in the next section</Pmt10>
                    <Pmt25>Now that we can see the div, we can see that the two elements are in an container together. This is fundamentally how websites are structured; just elements in groups.</Pmt25>
                    <Pmt25>Use the sandbox below to create a simple html document.</Pmt25>
                    <HTMLViewer 
                        htmlCode={'<!DOCTYPE html>\n<html>\n<head>\n\t<title>Page Title</title>\n</head>\n<body>\n\t<h1>This is a Heading</h1>\n\t<div>\n\t\t<h2>This is an H2</h2>\n\t\t<p>This is a paragraph</p>\n\t</div>\n\t<p>This is another paragraph</p>\n</body>\n</html>'}
                    />
                </main>
            </div>
        </div>
    );
}