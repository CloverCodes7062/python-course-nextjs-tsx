'use client';

import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faVial } from "@fortawesome/free-solid-svg-icons";

interface Props {
    setOutput: Dispatch<SetStateAction<{ result?: string, err?: string } | null>>;
    setRanCode: Dispatch<SetStateAction<boolean>>;
    setRenderLoading: Dispatch<SetStateAction<boolean>>;
}

export default function({ setOutput, setRanCode, setRenderLoading }: Props) {
    const editorRef = useRef(null);
    const [code, setCode] = useState('');

    const handleEditorDidMount = (editor: any, monaco: any) => {
        editorRef.current = editor;
        console.log(editorRef.current);
    }

    const handleEditorChange = (value: any, event: any) => {
        setCode(value);
    }

    const runCode = async () => {
        setOutput(null);
        setRanCode(true);
        setRenderLoading(true);

        const response = await fetch('http://localhost:3000/api/postPythonCode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: code }),
        })

        const data = await response.json();
        console.log(data);
        setOutput(data);
    }

    return (
        <div>
            <div>
                <Editor 
                    height="30vh" 
                    defaultLanguage="python" 
                    defaultValue=""
                    onMount={handleEditorDidMount}
                    onChange={handleEditorChange}
                />
            </div>
            <div>
                <button className="p-[7.5px] ml-[10px] mt-[5px] bg-run-blue text-white rounded-lg shadow-lg" onClick={runCode}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                    {" Run Code"}
                </button>
                <button className="p-[7.5px] ml-[10px] mt-[5px] bg-test-gray rounded-lg shadow-lg" onClick={runCode}>
                    <FontAwesomeIcon icon={faVial} />
                    {" Test Code"}
                </button>
            </div>
        </div>
    );
}
