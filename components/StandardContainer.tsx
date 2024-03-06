export default function StandardContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="mt-[10px] p-[10px] pt-[15px] pb-[15px] gap-[5px] w-full flex flex-col justify-center border-2 border-gray-200 rounded-lg shadow-lg">
            { children }
        </div>
    );
}