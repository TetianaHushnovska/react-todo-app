interface AddTaskButtonProps {
  onClick: () => void;
}

export default function AddTaskButton({ onClick }: AddTaskButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-[50px] h-[50px] rounded-full bg-[#6C63FF] flex justify-center items-center shadow-[0px_0px_4px_0px_#6C63FF]"
    >
      <svg className="w-[24px] h-[24px]">
        <use href="/icons.svg#icon-plus" />
      </svg>
    </button>
  );
}
