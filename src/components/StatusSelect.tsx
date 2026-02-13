import { useEffect, useMemo, useRef, useState } from "react";

type Option = {
  label: string;
  value: "all" | "complete" | "incomplete";
};

const Options: Option[] = [
  { label: "All", value: "all" },
  { label: "Complete", value: "complete" },
  { label: "Incomplete", value: "incomplete" },
];

interface StatusSelectProps {
  value: Option["value"];
  onChange: (v: Option["value"]) => void;
}

export default function StatusSelect({ value, onChange }: StatusSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const selected = useMemo(
    () => Options.find((o) => o.value === value) ?? Options[0],
    [value]
  );

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, []);

  return (
    <div ref={rootRef} className="relative w-[85px] h-full select-none">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={[
          "w-full h-full p-[10px]",
          "flex items-center justify-between",
          "bg-[#5B5BEA] text-white",
          "uppercase font-medium text-lg leading-none",
          "transition",
        ].join(" ")}
      >
        <span className="w-[95%] truncate">{selected.label}</span>

        {/* chevron */}
        <svg
          className={`w-3 h-2 transition ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Menu */}
      {open && (
        <div
          className={[
            "absolute left-0 right-0 py-1",
            "rounded-md bg-[#F7F7F7]",
            "border border-[#6C63FF]",
            "overflow-hidden",
          ].join(" ")}
          role="listbox"
        >
          {Options.map((opt) => {
            const active = opt.value === value;

            return (
              <div
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={[
                  "w-full text-left p-1",
                  "text-base font-normal leading-none tracking-tighter",
                  "transition",
                  active ? "text-[#6C63FF]" : "text-[#6C63FF]/80",
                  "hover:bg-[#E9E7FF]",
                  "focus:outline-none focus:bg-[#E9E7FF]",
                ].join(" ")}
                role="option"
                aria-selected={active}
              >
                {opt.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
