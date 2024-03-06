export default function StandardTitleH1({ children }: { children: React.ReactNode }) {
    return (
        <h1 className="text-center mt-[15px] mb-[15px] font-semibold text-3xl">{ children }</h1>
    );
}