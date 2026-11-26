interface ActionCardProps {
    taskNum: number;
    label: string;
    onClick: () => void;
}

const ActionCard = ({ taskNum, label, onClick}: ActionCardProps) => {
    return (
        <button
            onClick={onClick}
            className="flex w-full flex-1 gap-6 items-center rounded-3xl border border-transparent bg-[#FFF9FF] px-8 py-6 text-left shadow-sm"
        >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#B8DEDA] text-lg text-[#39263F]">
                {String(taskNum).padStart(2, "0")}
            </span>
            <span className="text-[#39263F] text-3xl">
                {label}
            </span>
        </button>


    );
}

export default ActionCard;