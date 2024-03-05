'use client';

import { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";

export default function() {
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
        const response = await fetch('http://localhost:3000/api/postPythonCode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: code }),
        })

        const data = await response.json();
        console.log(data);
    }

    return (
        <div className="overflow-y-auto">
            <Editor 
                height="30vh" 
                defaultLanguage="python" 
                defaultValue=""
                onMount={handleEditorDidMount}
                onChange={handleEditorChange}
            />
            <button className="bg-green-500" onClick={runCode}>Run Code</button>
        </div>
    );
}