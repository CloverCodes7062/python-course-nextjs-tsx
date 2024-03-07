export default function StandardLearningObjectivesContainer({ children, pr }: { children: React.ReactNode, pr: string }) {
    return (
        <div className={`p-[10px] pr-[${pr}px] mt-[50px] border-2 border-gray-200 border-l-green-500 border-l-4 rounded-lg shadow-lg`}>
            <h2 className="mb-[5px] font-medium text-2xl">Learning Objectives</h2>
            <h3 className="text-lg">After this section: </h3>
            <ul>
                { children }
            </ul>
        </div>
    ); 
}