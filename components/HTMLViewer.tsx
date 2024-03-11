
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { parse, serialize } from 'parse5';

interface Props {
    htmlCode: string
    useStyleSheet?: boolean
    initalCssCode?: string
}

export default function HTMLViewer({ htmlCode, useStyleSheet = false, initalCssCode = '' }: Props) {
    const [textAreaHtmlCode, setTextAreaHtmlCode] = useState(htmlCode);
    const [replacedHtmlCode, setReplacedHtmlCode] = useState('');
    const [cssCode, setCssCode] = useState('');

    const styleRef = useRef<HTMLStyleElement | null>(null);
    
    const replaceTags = (html: string) => {
        const doc = parse(html);
    
        const modifyNode = (node: any) => {
            let tailwindClasses = '';
            let existingClasses = '';
    
            if (node.nodeName === 'h1') {
                tailwindClasses = 'font-semibold text-2xl mb-[15px]';
            } else if (node.nodeName === 'h2') {
                tailwindClasses = 'font-semibold text-lg mb-[10px]';
            } else if (node.nodeName === 'h3') {
                tailwindClasses = 'font-semibold text-medium mb-[25px]';
            } else if (node.nodeName === 'p') {
                tailwindClasses = 'text-base mb-[5px]';
            }
    
            const existingClassAttr = node.attrs?.find((attr: any) => attr.name.toLowerCase() === 'class');
            if (existingClassAttr) {
                existingClasses = existingClassAttr.value;
            }
    
            const newClassValue = `${tailwindClasses} ${existingClasses}`.trim();
            const classAttrIndex = node.attrs?.findIndex((attr: any) => attr.name.toLowerCase() === 'class') ?? -1;
            if (classAttrIndex !== -1) {
                node.attrs[classAttrIndex].value = newClassValue;
            } else {
                node.attrs = [...(node.attrs || []), { name: 'class', value: newClassValue }];
            }
    
            if (node.childNodes) {
                node.childNodes.forEach(modifyNode);
            }
        };
    
        modifyNode(doc);
        const replacedHtml = serialize(doc);
    
        return replacedHtml;
    };

    useEffect(() => {
        const style = document.createElement("style");
        styleRef.current = style;
        document.head.appendChild(style);
        if (initalCssCode) {
            setCssCode(initalCssCode);
        }
        
        setReplacedHtmlCode(replaceTags(htmlCode));
    }, []);

    useEffect(() => {
        if (styleRef.current) {
            const scopedCssCode = cssCode
            .split("\n")
            .map((rule) => `:scope .scoped-styles ${rule}`)
            .join("\n");
            styleRef.current.innerHTML = scopedCssCode;
        }
    
    }, [cssCode]);

    const handleHtmlChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTextAreaHtmlCode(e.target.value);
        setReplacedHtmlCode(replaceTags(e.target.value))
    };

    return (
        <div>
            <div className="flex gap-[10px]">
                <textarea
                    value={textAreaHtmlCode}
                    onChange={(e) => handleHtmlChange(e)}
                    rows={10}
                    cols={50}
                    className="mb-[15px]"
                />
                {useStyleSheet &&
                <textarea
                    value={cssCode}
                    onChange={(e) => setCssCode(e.target.value)}
                    rows={10}
                    cols={50}
                    className="mb-[15px]"
                    placeholder="Enter CSS code here"
                />}
            </div>
            <div  
                dangerouslySetInnerHTML={{ __html: `<div class="scoped-styles">${replacedHtmlCode}</div>` }}
                className="border-gray-200 rounded-lg shadow-lg min-h-[300px] p-[10px] pt-[25px]"
            />
        </div>
    );
}