import { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import {
  deleteTask,
  editTask,
  restoreTask,
  Task,
  toggleTask,
} from "../redux/tasks/slice";
import AddTaskModal from "./AddTaskModal";
import { showUndoToast } from "../ui/showUndoToast";
import { clearLastDeleted, setLastDeleted } from "../redux/undo/slice";

interface TaskCardProps {
  item: Task;
}

export default function TaskCard({ item }: TaskCardProps) {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    dispatch(setLastDeleted(item));
    dispatch(deleteTask(item.id));

    showUndoToast({
      seconds: 5,
      onUndo: () => {
        dispatch(restoreTask(item));
        dispatch(clearLastDeleted());
      },
    });
  };

  const handleCheck = () => {
    dispatch(toggleTask(item.id));
  };

  const handleEditSubmit = (title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    dispatch(editTask({ id: item.id, title: trimmed }));
    setShowModal(false);
  };

  return (
    <div className="w-full min-h-[26px] flex justify-between items-center">
      {/* Left side */}
      <div className="flex flex-1 max-w-[475px]">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={handleCheck}
          className="
            appearance-none
            w-[26px] h-[26px] mr-[17px]
            rounded-sm
            border border-[#6C63FF]
            bg-transparent
            checked:bg-[#6C63FF]
            checked:border-[#6C63FF]
            relative
            transition
            after:content-['']
            after:absolute
            after:left-[8px]
            after:top-[4px]
            after:w-[6px]
            after:h-[12px]
            after:border-r-2
            after:border-b-2
            after:border-white
            after:rotate-45
            after:opacity-0
            checked:after:opacity-100
          "
        />

        <h3
          className={[
            "flex-1 text-xl font-medium uppercase transition truncate",
            item.completed
              ? "text-[#252525]/50 line-through dark:text-white/35"
              : "text-[#252525] dark:text-white",
          ].join(" ")}
        >
          {item.title}
        </h3>
      </div>

      {/* Right side buttons */}
      <div className="w-[62px] flex gap-[10px]">
        <div
          onClick={() => setShowModal(true)}
          className="text-[#CDCDCD] hover:text-[#6C63FF] transition"
        >
          <svg className="w-[18px] h-[18px]">
            <use href="/icons.svg#icon-pen" />
          </svg>
        </div>

        <div
          onClick={handleDelete}
          className="text-[#CDCDCD] hover:text-[#E50000] transition"
        >
          <svg className="w-[18px] h-[18px]">
            <use href="/icons.svg#icon-trash" />
          </svg>
        </div>
      </div>

      {showModal && (
        <AddTaskModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleEditSubmit}
          initialTitle={item.title}
          submitText="Save"
        />
      )}
    </div>
  );
}
