import TasksList from "./TasksList";
import AddTaskButton from "./AddTaskButton";
import { useEffect, useState } from "react";
import AddTaskModal from "./AddTaskModal";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addTask } from "../redux/tasks/slice";
import FilterBar from "./FilterBar";
import { Toaster } from "sonner";

export default function App() {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const mode = useAppSelector((s) => s.theme.mode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  const handleAdd = (title: string) => {
    dispatch(addTask(title));
    setShowModal(false);
  };

  return (
    <div
      className="
        min-h-screen max-w-[750px] mx-auto
        px-4 sm:px-6
        pb-24 sm:pb-28
      "
    >
      {/* Header */}
      <header className="mt-6 sm:mt-[40px] mb-4 sm:mb-[18px]">
        <h1 className="uppercase font-medium text-[22px] sm:text-[26px] text-center text-[#252525] dark:text-[#F7F7F7]">
          ToDo List
        </h1>
      </header>

      <main className="flex-1 min-h-0">
        <FilterBar />
        <TasksList />
      </main>

      {/* Add Task Button */}
      <div className="fixed left-0 right-0 bottom-4 sm:bottom-[32px]">
        <div className="max-w-[750px] mx-auto px-4 sm:px-2 flex justify-end">
          <AddTaskButton onClick={() => setShowModal(true)} />
        </div>
      </div>

      {/* Add Task Modal */}
      {showModal && (
        <AddTaskModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleAdd}
        />
      )}

      <Toaster
        position="bottom-center"
        toastOptions={{
          className: "bg-transparent shadow-none border-0 p-0",
        }}
      />
    </div>
  );
}
