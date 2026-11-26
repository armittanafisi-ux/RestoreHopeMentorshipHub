import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

interface GoalCompletionGraphProps {
  percent: number;
  trailColor: string;
  className: string; //to change its size
}

const GoalCompleteGraph = ({percent, trailColor= "#DCBFDD", className="h-80 w-80"}: GoalCompletionGraphProps) => {
    return (
        <div className={className}>
            <CircularProgressbarWithChildren
                value={percent}
                strokeWidth={7}
                styles={buildStyles({
                    pathColor: "8E5A9B",
                    trailColor,
                    strokeLinecap: "round",
                })}
            >
                <span className="text-7xl text-[#39263F]">
                    {percent}%
                </span>
                <span className="text-[#39263F]">
                    COMPLETE
                </span>
            </CircularProgressbarWithChildren>
        </div>
    );
};

export default GoalCompleteGraph;