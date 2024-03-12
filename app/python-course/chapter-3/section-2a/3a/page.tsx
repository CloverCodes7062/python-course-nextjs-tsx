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

                const questionsCompletedRes = await fetch('http://localhost:3000/api/getCompletedQuestions?chapterSection=3-3a');
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
            <StandardTitleH1>Chapter 3.2a.3a: Flask</StandardTitleH1>
            <div className="flex flex-col items-center">
                <StandardLearningObjectivesContainer pr={'150'}>
                    <StandardLi>You will understand <Italic>what Flask</Italic> is.</StandardLi>
                    <StandardLi>You will learn what a <Italic>back-end</Italic> is.</StandardLi>
                    <StandardLi>You will understand how to <Italic>use Flask</Italic> to make a <Italic>dynamic back-end</Italic>.</StandardLi>
                </StandardLearningObjectivesContainer>
                <main className="w-full mt-[40px] mb-[40px]">
                    <StandardH1>What is a a Front-End?</StandardH1>
                    <Pmt25>
                        So far, we've built basic static websites using HTML, and CSS. This is front-end code, it runs on a client's computer and can be directly interacted with.
                    </Pmt25>
                    <Pmt10>
                        What if we wanted our code to run on a seperate server which can reduce load time for clients? We could use a <Italic>back-end</Italic> for this.
                    </Pmt10>
                    <H1mt50>What is a Back-End?</H1mt50>
                    <Pmt25>Before we discuss what a back-end is, let's look at what you can use one for:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>
                            <Italic>User Authentication;</Italic> most user authentication is done on a back-end so users cannot see sensitive data.
                        </StandardContainerP>
                        <br />
                        <StandardContainerP>
                            <Italic>API Integration;</Italic> it is common to let a back-end server handle api requests for security reasons.
                        </StandardContainerP>
                        <br />
                        <StandardContainerP>
                            <Italic>Server-Side Rendering;</Italic> you can render html files on a back-end to take load off of a user's machine.
                        </StandardContainerP>
                        <br />
                        <StandardContainerP>
                            <Italic>Data Processing;</Italic> processing data on the front-end can be intensive on a user's machine and reveal sensitive data.
                        </StandardContainerP>
                        <br />
                        <StandardContainerP>
                            <Italic>Generate Dynamic Content;</Italic> a back-end can be used to generate dynamic content basec on a user's inputs.
                        </StandardContainerP>
                    </StandardContainer>
                    <Pmt10>Note: Dynamic content generation can also be done in the front-end using <Italic>JavaScript</Italic>.</Pmt10>
                    <Pmt25>Before we talk about generation dynamic content, let's learn about <Italic>serving static files</Italic> using <Italic>Flask</Italic>.</Pmt25>
                    <H1mt50>What is Flask?</H1mt50>
                    <Pmt25>
                        Flask is a lightweight, open-source Python web <Italic>framework</Italic> used for building web applications.
                    </Pmt25>
                    <H1mt50>How do we use Flask?</H1mt50>
                    <Pmt25>First, open your ide and type "pip install flask" in the terminal. Then look at the code below to get setup.</Pmt25>
                    <Pmt25>Basic Flask App (we'll break down how it works in a moment):</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>from flask import Flask, render_template</StandardContainerP>
                        <br />
                        <StandardContainerP>app = Flask(__name__)</StandardContainerP>
                        <br />
                        <StandardContainerP>@app.route("/")</StandardContainerP>
                        <StandardContainerP>def hello_world():</StandardContainerP>
                        <ConditionalStatementPiece>return render_template("index.html")</ConditionalStatementPiece>
                        <br />
                        <StandardContainerP>if __name__ == "__main__":</StandardContainerP>
                        <ConditionalStatementPiece>app.run(debug=True)</ConditionalStatementPiece>
                    </StandardContainer>
                    <Pmt25>Let's breakdown the <Italic>boilerplate code</Italic>:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>
                            <Italic>from flask import Flask, render_template</Italic>; As flask is comprised of third-part code, it must be imported.
                        </StandardContainerP>
                        <br />
                        <StandardContainerP>
                            <Italic>app = Flask(__name__)</Italic>; It is common convention to name the flask application "app", then initalize it using the Flask() function with __name__ passed to it.
                        </StandardContainerP>
                        <br />
                        <StandardContainerP>
                            <Italic>if __name__ == "__main__":... </Italic>; This is not required but recommended and explains why we pass __name__ to Flask(), __name__ is initalized to main by default by Python. This means if you import this code later on in another function, you won't accessidently run it, since name will not == main.
                        </StandardContainerP>
                    </StandardContainer>
                    <Pmt10>
                        Note: Don't worry if you don't know what <Italic>importing code</Italic> is, we'll discuss modules and libraries in future chapters.
                    </Pmt10>
                    <Pmt25>
                        We'll learn about __name__, __main__, libraries and modules in later chapters; for now, let's focus on the <Italic>@app.route("/")</Italic>. What is it?
                    </Pmt25>
                    <H1mt50>Routing</H1mt50>
                    <Pmt25>
                        If you look at the URL of your current webpage, you'll see <Italic>/python-course/chapter-3/section-2a/3a</Italic>; this is our <Italic>route</Italic>. <Italic>"/"</Italic> is the default route you end up on. For example, when you visit youtube.com/, you'll notice that it is the same as youtube.com, so we define our default route as <Italic>"/"</Italic>.
                    </Pmt25>
                    <Pmt10>
                        How does it work? When "/" is visited, the function directly under <Italic>@app.route("/")</Italic> is called, returning our <Italic>render_template</Italic> named "index.html".
                    </Pmt10>
                    <Pmt10>Note: "index.html" is just a regular .html file.</Pmt10>
                    <Pmt10>Note: Flask expects .html files to be stored in a folder "templates" inside of the root directory.</Pmt10>
                    <Pmt25>Let's add another <Italic>route</Italic> to our website:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>from flask import Flask, render_template</StandardContainerP>
                        <br />
                        <StandardContainerP>app = Flask(__name__)</StandardContainerP>
                        <br />
                        <StandardContainerP>@app.route("/")</StandardContainerP>
                        <StandardContainerP>def hello_world():</StandardContainerP>
                        <ConditionalStatementPiece>return render_template("index.html")</ConditionalStatementPiece>
                        <br />
                        <StandardContainerP>@app.route("/home")</StandardContainerP>
                        <StandardContainerP>def home():</StandardContainerP>
                        <ConditionalStatementPiece>return render_template("home.html")</ConditionalStatementPiece>
                        <br />
                        <StandardContainerP>if __name__ == "__main__":</StandardContainerP>
                        <ConditionalStatementPiece>app.run(debug=True)</ConditionalStatementPiece>
                    </StandardContainer>
                    <Pmt10>
                        The new route, renders our template "home.html" when "/home" is visited; <Italic>that's it</Italic> this is all we need to do to serve static files using flask.
                    </Pmt10>
                    <H1mt50>Redirects</H1mt50>
                    <Pmt25>Some websites don't use "/" as their home page, they <Italic>redirect</Italic> to another route like "/homepage".</Pmt25>
                    <Pmt25>Example of redirecting:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>from flask import Flask, render_template, redirect, url_for</StandardContainerP>
                        <br />
                        <StandardContainerP>app = Flask(__name__)</StandardContainerP>
                        <br />
                        <StandardContainerP>@app.route("/")</StandardContainerP>
                        <StandardContainerP>def hello_world():</StandardContainerP>
                        <ConditionalStatementPiece>return redirect(url_for("home"))</ConditionalStatementPiece>
                        <br />
                        <StandardContainerP>@app.route("/home")</StandardContainerP>
                        <StandardContainerP>def home():</StandardContainerP>
                        <ConditionalStatementPiece>return render_template("home.html")</ConditionalStatementPiece>
                        <br />
                        <StandardContainerP>if __name__ == "__main__":</StandardContainerP>
                        <ConditionalStatementPiece>app.run(debug=True)</ConditionalStatementPiece>
                    </StandardContainer>
                    <Pmt25>
                        When "/" is visited, the user will automatically be redirected to the url for our home function, which returns "home.html".
                    </Pmt25>
                    <Pmt10>
                        Note: The route and function <Italic>do not</Italic> have to share a name. Even if our route was "/homepage", it would still redirect to "/homepage" using the same code, since our function name is "home" and that is what we are getting the url for.
                    </Pmt10>
                    <H1mt50>URL Parameters</H1mt50>
                    <Pmt25>
                        Earlier, we mentioned that we can use a back-end to <Italic>generate dynamic content</Italic>
                    </Pmt25>
                    <Pmt10>URL Parameters can be passed to a back-end, just like <Italic>variables</Italic>.</Pmt10>
                    <Pmt25>Let's look at an example of a URL Parameter:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>from flask import Flask, render_template, redirect, url_for</StandardContainerP>
                        <br />
                        <StandardContainerP>app = Flask(__name__)</StandardContainerP>
                        <br />
                        <StandardContainerP>{`@app.route("/home", defaults={"name": None})`}</StandardContainerP>
                        <StandardContainerP>{`@app.route("/home/<name>")`}</StandardContainerP>
                        <StandardContainerP>def home(name):</StandardContainerP>
                        <ConditionalStatementPiece>return render_template("home.html", name=name)</ConditionalStatementPiece>
                        <br />
                        <StandardContainerP>if __name__ == "__main__":</StandardContainerP>
                        <ConditionalStatementPiece>app.run(debug=True)</ConditionalStatementPiece>
                    </StandardContainer>
                    <Pmt25>
                        {`Now, we can visit "/home" or "/home/(anyname)" and that name will be passed to our html file and <Italic>rendered</Italic> inside of {{ name }}.`}
                    </Pmt25>
                    <Pmt25>Let's look at our new html file:</Pmt25>
                    <br />
                    <img src='https://i.imgur.com/4HidUpb.png' />
                    <Pmt25>
                        We can see that we have <Italic>code</Italic> in our html file! This code checks if name has been passed to it, if it has, then it renders name inside of an h2 element.
                    </Pmt25>
                    <H1mt50>Query Parameters</H1mt50>
                    <Pmt25>URL's often have something like this in them "?color=red&name=john", this is a Query Parameter.</Pmt25>
                    <Pmt25>Let's look at an example of how to <Italic>access</Italic> query parameters:</Pmt25>
                    <StandardContainer>
                        <StandardContainerP>from flask import Flask, render_template, redirect, url_for</StandardContainerP>
                        <br />
                        <StandardContainerP>app = Flask(__name__)</StandardContainerP>
                        <br />
                        <StandardContainerP>{`@app.route("/home")`}</StandardContainerP>
                        <StandardContainerP>def home():</StandardContainerP>
                        <ConditionalStatementPiece>name = request.args.get('name')</ConditionalStatementPiece>
                        <ConditionalStatementPiece>color = request.args.get('color')</ConditionalStatementPiece>
                        <ConditionalStatementPiece>return render_template("home.html", name=name, color=color)</ConditionalStatementPiece>
                        <br />
                        <StandardContainerP>if __name__ == "__main__":</StandardContainerP>
                        <ConditionalStatementPiece>app.run(debug=True)</ConditionalStatementPiece>
                    </StandardContainer>
                    <br />
                    <Pmt25>And our updated html file:</Pmt25>
                    <img src='https://i.imgur.com/q3ysA9U.png' />
                    <Pmt25>When you visit a URL using query parameters, you are making a <Italic>GET</Italic> request.</Pmt25>
                </main>
            </div>
        </div>
    );
}