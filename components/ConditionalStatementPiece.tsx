export default function ConditionalStatementPiece({ children, indention = 1 }: { children: React.ReactNode, indention?: number }) {
    return (
        <p className={`ml-[${indention * 25}px] indent-[${indention * 25}px] font-medium`}>{ children }</p>
    );
}