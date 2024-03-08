
export default function ConditionalStatementStart({ children, indention = 0 }: { children: React.ReactNode, indention?: number }){
    return (
        <p className={`indent-[${indention * 25}px] font-medium`}>{ children }</p>
    );
}