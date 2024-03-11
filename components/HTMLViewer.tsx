
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
    htmlCode: string
}

export default function HTMLViewer({ htmlCode }: Props) {
    const [textAreaHtmlCode, setTextAreaHtmlCode] = useState(htmlCode);
    const [replacedHtmlCode, setReplacedHtmlCode] = useState('');

    const replaceTags = (html: string) => {
        let replacedHtml = html.replace(/<h1\s*(style="[^"]*")?([^>]*)>/g, '<h1 class="font-semibold text-2xl mb-[15px]" $1$2>');
        replacedHtml = replacedHtml.replace(/<h2\s*(style="[^"]*")?([^>]*)>/g, '<h2 class="font-semibold text-lg mb-[10px]" $1$2>');
        replacedHtml = replacedHtml.replace(/<h3\s*(style="[^"]*")?([^>]*)>/g, '<h3 class="font-semibold text-medium mb-[25px]" $1$2>');
        replacedHtml = replacedHtml.replace(/<p\s*(style="[^"]*")?([^>]*)>/g, '<p class="text-base mb-[5px]" $1$2>');
        return replacedHtml;
    }

    useEffect(() => {
        setReplacedHtmlCode(replaceTags(htmlCode));
    }, []);

    const handleHtmlChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTextAreaHtmlCode(e.target.value);
        setReplacedHtmlCode(replaceTags(e.target.value))
    };

    return (
        <div>
            <textarea
                value={textAreaHtmlCode}
                onChange={(e) => handleHtmlChange(e)}
                rows={10}
                cols={50}
                className="mb-[15px]"
            />
            <div  
                dangerouslySetInnerHTML={{ __html: replacedHtmlCode }} 
                className="border-gray-200 rounded-lg shadow-lg min-h-[300px] p-[10px] pt-[25px]"
            />
        </div>
    );
}