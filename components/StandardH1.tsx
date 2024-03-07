export default function StandardH1({ children }: { children: React.ReactNode }) {
    return (
        <h1 className="text-left text-2xl font-medium">{ children }</h1>
    );
}