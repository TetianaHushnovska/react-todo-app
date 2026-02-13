import StatusSelect from "./StatusSelect";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setFilter, setQuery } from "../redux/filters/slice";
import { toggleTheme } from "../redux/theme/slice";

export default function FilterBar() {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.filter.status);
  const query = useAppSelector((state) => state.filter.query);
  const mode = useAppSelector((state) => state.theme.mode);

  return (
    <div
      className="
      w-full 
      h-auto 
      md:h-[38px] 
      flex 
      flex-col 
      md:flex-row 
      gap-4
    "
    >
      {/* Search field */}
      <div
        className="
        w-full 
        md:w-[595px] 
        h-[38px] 
        relative 
        text-[#6C63FF] 
        dark:text-[#F7F7F7]
      "
      >
        <input
          type="text"
          value={query}
          onChange={(e) => dispatch(setQuery(e.target.value))}
          placeholder="Search note..."
          className="
            w-full 
            h-full 
            px-4 
            py-[11px] 
            bg-inherit 
            border 
            border-[#6C63FF] 
            rounded-[5px] 
            outline-none 
            focus:ring-2  
            focus:ring-[#6C63FF]/40
            dark:border-[#F7F7F7] 
            dark:focus:ring-[#FFFFFF]/40
          "
        />

        {query === "" ? (
          <svg
            className="
            w-[22px] 
            h-[22px] 
            absolute 
            top-[8.5px] 
            right-4 
            stroke-current 
            pointer-events-none
          "
          >
            <use href="/icons.svg#icon-search" />
          </svg>
        ) : (
          <svg
            onClick={() => dispatch(setQuery(""))}
            className="
              w-[22px] 
              h-[22px] 
              absolute 
              top-[8.5px] 
              right-4 
              fill-white 
              cursor-pointer
            "
          >
            <use href="/icons.svg#icon-trash" />
          </svg>
        )}
      </div>

      {/* Status select */}
      <div className="w-full flex justify-between md:gap-4 md:w-auto">
        <StatusSelect value={status} onChange={(v) => dispatch(setFilter(v))} />

        {/* Theme toggle */}
        <button
          type="button"
          onClick={() => dispatch(toggleTheme())}
          className="
          w-[38px] 
          h-[38px] 
          flex 
          justify-center 
          items-center
          self-end 
          md:self-auto
        "
        >
          <svg className="w-[22px] h-[22px]">
            <use href={`/icons.svg#icon-${mode === "dark" ? "sun" : "moon"}`} />
          </svg>
        </button>
      </div>
    </div>
  );
}
