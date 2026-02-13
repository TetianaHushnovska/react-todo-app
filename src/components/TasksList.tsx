import { selectVisibleTasks } from "../redux/filters/selectors";
import { useAppSelector } from "../redux/hooks";
import TaskCard from "./TaskCard";

export default function TasksList() {
  const list = useAppSelector(selectVisibleTasks);

  return (
    <div className="w-full py-[13px] px-4 md:px-[115px]">
      <ul>
        {list.map((item) => (
          <li key={item.id} className="py-[17px] border-b border-[#6C63FF]/50">
            <TaskCard item={item} />
          </li>
        ))}
      </ul>

      {/* Empty list */}
      {list.length === 0 && (
        <>
          <img
            src="/img/noItems.png"
            alt="No items in the list"
            srcSet="/img/noItems.png 1x, /img/noItems@2x.png 2x"
            className="
              w-[221px] h-[174px]
              mx-auto
              mb-5
              mt-[17px]
              dark:brightness-90 dark:contrast-110
            "
          />
          <p className="font-normal text-xl text-center dark:text-[#F7F7F7]">
            Empty...
          </p>
        </>
      )}
    </div>
  );
}
