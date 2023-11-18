import { TableHeadingProps } from "../utils/types.ts";
import SortSVG from "./SVGs/SortSVG.tsx";

export default function TableHeading(
  { title, column, sortColumn, sortData }: TableHeadingProps,
) {
  return (
    <th
      onClick={() => sortData(column)}
      scope="col"
      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <div className="flex items-center gap-x-3">
        <button className="flex items-center gap-x-2">
          <span>{title}</span>
          {sortColumn === column && <SortSVG />}
        </button>
      </div>
    </th>
  );
}
