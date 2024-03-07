'use client';

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import PythonCodeForm from "./PythonCodeForm";
import QuestionLoading from "./QuestionLoading";

interface QuestionCompletedData {
    question: string;
    points_worth: number;
}

interface Props {
    questionsCompleted: QuestionCompletedData[];
    questionNumber: string;
    questionTitle: string;
    questionDescription: string;
    pointsWorth: number;
    neededOutput: string;
    setQuestionsCompleted: Dispatch<SetStateAction<QuestionCompletedData[]>>;
}

export default function ProgrammingExercise({ questionsCompleted, setQuestionsCompleted, questionNumber, questionTitle, questionDescription, pointsWorth, neededOutput }: Props) {
        const [output, setOutput] = useState<{ result?: string, err?: string } | null>(null);;
        const [renderLoading, setRenderLoading] = useState(true);
        const [ranCode, setRanCode] = useState(false);
        
        useEffect(() => {
            if (output) {
                setRenderLoading(false);

                if (output.result) {
                    const checkIfOutputIsValid = async () => {
                        if (!neededOutput) {
                            console.log("calling API ROUTE1");
                            const response = await fetch('http://localhost:3000/api/postQuestionResult', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ question: questionNumber, points_worth: pointsWorth }),
                            });
                            setQuestionsCompleted(prevQuestions => [...prevQuestions, { question: questionNumber, points_worth: pointsWorth }]);
                        } else if (neededOutput == output.result) {
                            console.log("calling API ROUTE2");
                            const response = await fetch('http://localhost:3000/api/postQuestionResult', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ question: questionNumber, points_worth: pointsWorth }),
                            });
                            setQuestionsCompleted(prevQuestions => [...prevQuestions, { question: questionNumber, points_worth: pointsWorth }]);
                        }
                    }

                    checkIfOutputIsValid();
                }
            }
        }, [output]);

        const isResultOutput = (output: { result?: string, err?: string }): output is { result: string } => {
            return output.hasOwnProperty('result');
        }

        return (
            <div className="mt-[50px] pb-[15px] w-full flex flex-col justify-center border-2 border-gray-200 rounded-lg shadow-lg">
                <div
                    className={`relative flex justify-between text-2xl p-[12.5px] pb-[25px] text-left rounded-t-lg ${
                        questionsCompleted.some((q) => q.question === questionNumber)
                            ? 'bg-green-500'
                            : 'bg-red'
                    }`}
                >
                    <div>
                        <h1 className="text-white font-medium text-lg">Programming Exercise:</h1>
                        <h2 className="indent-[25px] text-white font-medium">{questionTitle}</h2>
                    </div>
                    <div>
                        <h2 className="text-white font-medium">Points:</h2>
                        <p className="text-white text-right font-medium">
                            {questionsCompleted.some((q) => q.question === questionNumber)
                                ? `${pointsWorth}/${pointsWorth}`
                                : `0/${pointsWorth}`}
                        </p>
                    </div>
                </div>
                <div className="p-[10px] pl-[25px] pb-[20px]">
                    <p className="text-pretty mt-[10px] text-lg w-[700px]">{questionDescription}</p>
                </div>
    
                <div>
                    <PythonCodeForm
                        setOutput={setOutput}
                        setRanCode={setRanCode}
                        setRenderLoading={setRenderLoading}
                    />
                </div>
                <div>
                    <div className="pl-[10px] pr-[10px] mt-[15px] mb-[15px] ml-[10px] mr-[10px] flex items-center justify-between bg-output-gray rounded-lg shadow-lg">
                        <h2 className="text-xl font-medium">Test Results: </h2>
                        <button className="p-[7.5px] ml-[10px] mt-[5px] mb-[10px] bg-test-gray rounded-lg shadow-lg">
                            Close
                        </button>
                    </div>
                </div>
                {ranCode && (
                    <div>
                        {renderLoading && <QuestionLoading />}
                        <div className="pt-[25px] pd-[25px] pr-[15px] pl-[15px] flex items-center">
                            <div
                                className={`p-[10px] w-full h-full rounded-lg shadow-lg border-2 border-gray-200 ${
                                    output
                                        ? isResultOutput(output)
                                            ? 'border-l-green-500 border-l-4'
                                            : 'border-l-red border-l-4'
                                        : ''
                                } flex items-center`}
                            >
                                {output
                                    ? isResultOutput(output)
                                        ? <p className="res">{(output as { result: string }).result}</p>
                                        : <p className="err">{(output as { err: string }).err}</p>
                                    : null}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
}