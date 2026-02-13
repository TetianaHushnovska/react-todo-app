import { toast } from "sonner";
import { useEffect, useState } from "react";

function CountdownBadge({ seconds }: { seconds: number }) {
  const [t, setT] = useState(seconds);

  useEffect(() => {
    const id = setInterval(() => {
      setT((v) => (v <= 1 ? 0 : v - 1));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-sm font-semibold">
      {t}
    </span>
  );
}

export function showUndoToast({
  seconds = 5,
  onUndo,
}: {
  seconds?: number;
  onUndo: () => void;
}) {
  toast.custom(
    (t) => (
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999]">
        <button
          type="button"
          onClick={() => {
            onUndo();
            toast.dismiss(t);
          }}
          className="
    inline-flex items-center gap-2
    h-[38px] px-4
    rounded-xl border-2 border-[#6C63FF]
    bg-gradient-to-r from-[#5B5BEA] to-[#6C63FF]
    text-white
    shadow-[0_10px_24px_0_rgba(108,99,255,0.35)]
    hover:shadow-[0_14px_30px_0_rgba(108,99,255,0.45)]
    active:scale-[0.98]
    transition
    whitespace-nowrap
  "
        >
          <CountdownBadge seconds={seconds} />

          <span className="uppercase text-base leading-none">Undo</span>

          <svg className="w-[15px] h-[14px] shrink-0" fill="none">
            <use href="/icons.svg#icon-undo" />
          </svg>
        </button>
      </div>
    ),
    { duration: seconds * 1000 }
  );
}
