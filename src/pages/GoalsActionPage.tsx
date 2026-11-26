import { useState } from "react";
// import { useNavigate } from "react-router";
import ActionCard from '../components/ActionCard';
import GoalCompleteCard from "../components/GoalCompleteCard";
//import NavBar from "../components/NavBar";

// interface CardTemplate {
//     id: 'meeting' | 'add' | 'update';
//     label: string;
//     taskNum: number;
//     description: string;
// }

interface Action {
    id: string;
    label: string;
}

const posActions: Action[] = [
    { id: "meeting", label: "LOG MEETING" },
    { id: "add", label: "ADD GOAL" },
    { id: "update", label: "UPDATE GOAL" },
];

interface GoalsActionPageProps {
    percent?: number;
    actions?: Action[];
}


const GoalsActionPage = ({ percent = 0, actions = posActions }: GoalsActionPageProps) => {
    const [openCard, setOpenCard] = useState<string | null>(null);

    return (

        <div className="flex flex-col px-6 pb-10 bg-[#F2DDF2] md:h-[calc(100vh-5rem)] md:overflow-hidden md:px-48">
            <h1 className="text-4xl text-[#39263F] font-bold my-10">
                GOALS
            </h1>

            <div className="flex min-h-0 flex-1 flex-col gap-10 md:flex-row">

                <div className="flex md:min-h-0 md:w-2/5">
                    {/* Change number here tochange percentage */}
                    <GoalCompleteCard percent={percent} />
                </div>

                <div className="flex flex-col font-semibold gap-5 md:min-h-0 md:w-3/5">
                    {actions.map((action, i) => (
                        <ActionCard
                            key={action.id}
                            taskNum={i + 1}
                            label={action.label}
                            onClick={() => setOpenCard(action.id)}
                        />
                    ))}
                </div>

                {/* <div className="flex min-h-0 flex-col font-semibold gap-5 md:w-3/5">
                    <ActionCard
                        taskNum={1}
                        label="LOG MEETING"
                        onClick={() => setOpenCard('meeting')}
                    />

                    <ActionCard
                        taskNum={2}
                        label="ADD GOAL"
                        onClick={() => setOpenCard('add')}
                    />

                    <ActionCard
                        taskNum={3}
                        label="UPDATE GOAL"
                        onClick={() => setOpenCard('update')}
                    />
                </div> */}


            </div>
            {openCard && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6"
                    onClick={() => setOpenCard(null)}
                >
                    <div
                        className="w-full max-w-md rounded-3xl bg-[#FFF9FF] p-8 shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="mb-4 text-2xl font-bold text-[#39263F]">
                            {actions.find((a) => a.id === openCard)?.label}
                        </h2>
                        <p className="mb-6 text-[#39263F]">
                            You clicked "{openCard}"!! The real form will go here...
                        </p>
                        <button
                            onClick={() => setOpenCard(null)}
                            className="rounded-xl bg-[#B8DEDA] px-6 py-2 text-[#39263F]"
                        >
                            CLOSE
                        </button>
                    </div>
                </div>
            )}
        </div>

    );



}

export default GoalsActionPage;