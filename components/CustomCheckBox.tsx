import { CustomCheckBoxProps } from "../utils/types.ts";

export default function CustomCheckBox({ selectedRows, filteredData }: CustomCheckBoxProps) {
  return (
    <label
      className="flex items-center cursor-pointer"
      htmlFor="selectAllCheckbox"
    >
      <div
        className={`flex items-center justify-center p-[2px] mr-[5px] w-4 h-4 border-2 rounded-md transition-colors duration-300 ease-in-out mr-2 ${
          selectedRows.length === filteredData.length
            ? "bg-blue-300 border-blue-300 dark:bg-blue-800 dark:border-blue-800"
            : "bg-blue-700 border-blue-700 dark:bg-blue-400 dark:border-blue-300"
        }`}
      >
        {selectedRows.length === filteredData.length && (
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              fill="currentColor"
              className="bi bi-check"
              viewBox="0 0 16 16"
              style={{ fontWeight: "bold" }}
            >
              <path
                d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
                fill="white"
              />
            </svg>
          </div>
        )}
      </div>
    </label>
  );
}