import { useEffect, useRef, useState } from "react";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string) => void;
  initialTitle?: string;
  submitText?: string;
}

export default function AddTaskModal({
  isOpen,
  onClose,
  onSubmit,
  initialTitle = "",
  submitText = "Apply",
}: AddTaskModalProps) {
  const [title, setTitle] = useState(initialTitle);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
  };

  useEffect(() => {
    if (!isOpen) return;

    const t = setTimeout(() => inputRef.current?.focus(), 0);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) setTitle(initialTitle);
  }, [isOpen, initialTitle]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#252525]/70 px-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full
          max-w-[500px]
          min-h-[289px]
          rounded-2xl
          border 
          bg-[#F7F7F7]
          text-[#252525]
          dark:bg-[#252525]
          dark:text-[#F7F7F7]
          dark: bordder-[#F7F7F7]
          py-[18px]
          px-[30px]
        "
      >
        <h2 className="h-[24px] text-center text-2xl font-medium uppercase mb-[25px]">
          New note
        </h2>

        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          placeholder="Input your note..."
          className="
            w-full
            h-[38px]
            px-4
            py-2
            border
            border-[#6C63FF]
            bg-transparent
            rounded-[5px]
            outline-none
            mb-32
            focus:ring-2
            focus:ring-[#6C63FF]/40
            transition
            dark:border-[#F7F7F7]
            dark:focus:ring-[#FFFFFF]/40
          "
        />

        <div className="w-full h-[38px] flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className="
              w-[110px]
              h-full
              font-medium
              text-lg
              uppercase
              bg-transparent
              text-[#6C63FF]
              dark:text-[#6C63FF]
              dark:bg-transparent
              dark:hover:text-[white]
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!title.trim()}
            className="
              w-[110px]
              h-full
              font-medium
              text-lg
              uppercase
              disabled:opacity-50
              disabled:cursor-not-allowed
              transition
            "
          >
            {submitText}
          </button>
        </div>
      </div>
    </div>
  );
}
