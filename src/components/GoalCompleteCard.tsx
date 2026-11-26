// import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
import GoalCompleteGraph from "./GoalCompleteGraph";

interface GoalCompletionCardProps {
    percent: number;
}

const GoalCompletionCard = ({ percent }: GoalCompletionCardProps) => {
    return (
        <div className="flex h-full w-full flex-col rounded-3xl bg-[#FFF9FF] p-6 shadow-sm">
            <h1 className="text-3xl font-semibold text-[#39263F]">GOAL COMPLETION</h1>
            <div className="flex flex-1 items-center justify-center">
                <GoalCompleteGraph percent={percent} trailColor= "#DCBFDD" className="h-64 w-64"/>
            </div>
        </div>
    );
}

export default GoalCompletionCard;