export default function({ children }: { children: React.ReactNode }) {
    return (
        <span className="italic font-medium">{ children }</span>
    );
}