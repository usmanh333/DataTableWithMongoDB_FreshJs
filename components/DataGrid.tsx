import SortSVG from "./SVGs/SortSVG.tsx";
import TableHeading from "./TableHeading.tsx";
import { DataTableSchema } from "../database/datatables/types.ts";
import { useEffect, useState } from "preact/hooks";
import CustomCheckBox from "./CustomCheckBox.tsx";
import CheckSVG from "./SVGs/CheckSVG.tsx";
import TickSvg from "./SVGs/TickSvg.tsx";
import { formatDate } from "../utils/formatDate.ts";
import { ComponentType, h } from "preact";
import { DataGridProps } from "../utils/types.ts";

const DataGrid: ComponentType<DataGridProps> = ({
  data,
  currentPage,
  setCurrentPage,
  onPaginationChange,
  totalPages,
  sortColumn,
  sortOrder,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isSet, setIsSet] = useState(false);

  useEffect(() => {
    if (!isSet) {
      onPaginationChange(currentPage, itemsPerPage, sortColumn, sortOrder);
      setIsSet(true);
    }
  }, [currentPage, itemsPerPage, sortColumn, sortOrder]);

  const filterData = (data: DataTableSchema[], searchInput: string) => {
    return data.filter((product: DataTableSchema) => {
      const values = Object.values(product).map((value) =>
        String(value).toLowerCase()
      );
      return values.some((value) => value.includes(searchInput.toLowerCase()));
    });
  };
   const OrderData = filterData(data, searchInput);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    onPaginationChange(newPage, itemsPerPage, sortColumn, sortOrder);
  };

  const handleItemsPerPageChange = (event: Event) => {
    if (event.target instanceof HTMLSelectElement) {
      setItemsPerPage(Number(event.target.value));
      setCurrentPage(1);
      onPaginationChange(
        1,
        Number(event.target.value),
        sortColumn,
        sortOrder,
      );
    }
  };

  const handleSelectAllChange = () => {
    if (selectedRows.length === OrderData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(OrderData.map((row: DataTableSchema) => row._id));
    }
    setSelectAll(!selectAll);
  };

  const handleRowSelect = (rowId: string) => {
    const isSelected = selectedRows.includes(rowId);
    if (isSelected) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };

  const handleEdit = () => {
    console.log("edit clicked");
  };

  const handleSort = (column: string) => {
    const newSortOrder = column === sortColumn && sortOrder === "asc"
      ? "desc"
      : "asc";
    onPaginationChange(currentPage, itemsPerPage, column, newSortOrder);
  };

  return (
    <>
      {/* Search Input */}
      <div class="mx-2 mb-2">
        <input
          type="text"
          className="bg-gray-800 text-white border border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg py-2 px-4 w-full md:w-auto md:max-w-md mb-4"
          placeholder="Search Products..."
          value={searchInput}
          onInput={(e: h.JSX.TargetedEvent<HTMLInputElement>) =>
            setSearchInput(e.currentTarget.value)}
        />
      </div>
      {/* DataTable */}
      <section className="container mx-auto xl:max-w-full">
        <div className="flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 ">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex items-center gap-x-3">
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={selectedRows.length ===
                              OrderData.length}
                            onChange={handleSelectAllChange}
                            id="selectAllCheckbox"
                          />
                          <CustomCheckBox
                            selectedRows={selectedRows}
                            filteredData={OrderData}
                          />
                          <button
                            onClick={() => handleSort("_id")}
                            className="flex items-center gap-x-2"
                          >
                            <span>ID</span>
                            {sortColumn === "_id" && <SortSVG />}
                          </button>
                        </div>
                      </th>
                      <TableHeading
                        title={"Date"}
                        column={"date"}
                        sortColumn={sortColumn}
                        sortData={handleSort}
                      />
                      <TableHeading
                        title={"Status"}
                        column={"status"}
                        sortColumn={sortColumn}
                        sortData={handleSort}
                      />
                      <TableHeading
                        title={"Customer"}
                        column={"customer"}
                        sortColumn={sortColumn}
                        sortData={handleSort}
                      />
                      <TableHeading
                        title={"Product Name"}
                        column={"productName"}
                        sortColumn={sortColumn}
                        sortData={handleSort}
                      />
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <span>Action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {OrderData.length === 0
                      ? (
                        <tr>
                          <td
                            colSpan={6}
                            className="text-center text-red-500 font-bold p-4"
                          >
                            No matching records found!
                          </td>
                        </tr>
                      )
                      : OrderData.map((
                        orderData: DataTableSchema,
                        index: number,
                      ) => (
                        <>
                          <tr key={orderData._id}>
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              <div className="inline-flex items-center gap-x-3">
                                <label
                                  className="flex items-center cursor-pointer"
                                  htmlFor={`checkbox-${orderData._id}`}
                                >
                                  <input
                                    type="checkbox"
                                    id={`checkbox-${orderData._id}`}
                                    className="hidden"
                                    checked={selectedRows.includes(
                                      orderData._id,
                                    )}
                                    onChange={() =>
                                      handleRowSelect(orderData._id)}
                                  />
                                  <div
                                    className={`flex items-center justify-center p-[2px] mr-[5px] w-4 h-4 border-2 rounded-md transition-colors duration-300 ease-in-out mr-2 ${
                                      selectedRows.includes(orderData._id)
                                        ? "bg-blue-300 border-blue-300 dark:bg-blue-800 dark:border-blue-800"
                                        : "bg-blue-700 border-blue-700 dark:bg-blue-400 dark:border-blue-300"
                                    }`}
                                  >
                                    {selectedRows.includes(orderData._id) && (
                                      <div>
                                        <CheckSVG />
                                      </div>
                                    )}
                                  </div>
                                </label>
                                <span class="text-gray-300">
                                  #{orderData._id.slice(-4)}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              {formatDate(new Date(orderData.createdAt))}
                            </td>
                            <td className="px-4 py-4 text-sm font-medium text-gray-100 whitespace-nowrap">
                              <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                                <TickSvg />
                                <h2 className="text-xs font-medium uppercase">
                                  {orderData.status}
                                </h2>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              <div className="flex items-center gap-x-2">
                                <div>
                                  <h2 className="text-sm font-medium text-gray-200 dark:text-white ">
                                    {orderData.user.name}
                                  </h2>
                                  <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
                                    {orderData.user.email}
                                  </p>
                                  <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
                                    {orderData.user.address}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              {orderData.productName}
                            </td>

                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div className="flex items-center gap-x-6">
                                <button
                                  onClick={() => handleEdit()}
                                  className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none"
                                >
                                  Edit
                                </button>
                              </div>
                            </td>
                          </tr>
                        </>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Pagination */}
      <div className="my-10 mx-2 text-white">
        <div className="flex items-center gap-4">
          <div className="p-1 bg-[#1f2937] rounded-lg">
            <button
              className="btn mx-2 font-medium  text-white"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              {"<<"}
            </button>
            <button
              className="btn mx-2 font-medium text-white"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              {"<"}
            </button>
            <button
              className="btn mx-2 font-medium text-white"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              {">"}
            </button>
            <button
              className="btn mx-2 font-medium  text-white"
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              {">>"}
            </button>
          </div>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {currentPage} of {totalPages}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            | Go to page:
            <input
              value={currentPage}
              type="number"
              className="bg-gray-800 text-white border border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg py-1 px-2 w-20 md:w-auto md:max-w-20"
              onChange={(e: h.JSX.TargetedEvent<HTMLInputElement>) =>
                handlePageChange(Number(e.currentTarget.value))}
              min={1}
              max={totalPages}
            />
          </span>
          <span className="flex items-center gap-1">
            | &nbsp;&nbsp; Items per page:
            <select
              value={itemsPerPage}
              className="bg-gray-800 text-white border border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg py-1 px-2 w-20 md:w-auto md:max-w-20"
              onChange={handleItemsPerPageChange}
            >
              {[5, 10, 20, 30, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </span>
        </div>
      </div>
    </>
  );
};

export default DataGrid;
