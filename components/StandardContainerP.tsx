export default function StandardContainerP({ children }: { children: React.ReactNode }) {
    return (
        <p className="font-medium">{ children }</p>
    );
}