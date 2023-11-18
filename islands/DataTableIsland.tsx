import { useState } from "preact/hooks";
import DataGrid from "../components/DataGrid.tsx";

export default function DataTableIsland() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortColumn, setSortColumn] = useState("_id");
  const [sortOrder, setSortOrder] = useState("asc");

  async function onPaginationChange(
    pageNumber: number,
    itemsPerPage: number,
    newSortColumn = "_id",
    newSortOrder: string | undefined,
  ) {
    try {
      if (newSortColumn && newSortOrder) {
        setSortColumn(newSortColumn);
        setSortOrder(newSortOrder);
      }
      const res = await fetch("/api/getProducts", {
        method: "POST",
        body: JSON.stringify({
          pageNumber,
          itemsPerPage,
          sortColumn: newSortColumn,
          sortOrder: newSortOrder,
        }),
      });
      const resData = await res.json();
      setData(resData.data);
      setTotalPages(resData.totalPages);
      setCurrentPage(resData.currentPage);
    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <div class="mx-7">
      <DataGrid
        data={data}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onPaginationChange={onPaginationChange}
        totalPages={totalPages}
        sortColumn={sortColumn}
        sortOrder={sortOrder}
      />
    </div>
  );
}
