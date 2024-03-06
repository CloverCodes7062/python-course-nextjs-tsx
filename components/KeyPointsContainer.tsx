export default function KeyPointsContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="mt-[50px] pb-[15px] w-full">
            <h1 className="text-2xl font-medium">Lession Key Points:</h1>
            <ul>
                { children }
            </ul>
        </div>
    );
}