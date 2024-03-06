export default function LearningObjectiveLi({ children }: { children: React.ReactNode }) {
    return (
        <li className="indent-[25px]"><span className="text-2xl">&bull;</span> { children }</li>
    );
}