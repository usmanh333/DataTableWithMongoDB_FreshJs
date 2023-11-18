import { DataTableSchema } from "../database/datatables/types.ts";

export interface DataGridProps {
  data: DataTableSchema[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  onPaginationChange: (
    pageNumber: number,
    itemsPerPage: number,
    sortColumn?: string,
    sortOrder?: string,
  ) => void;
  totalPages: number;
  sortColumn: string;
  sortOrder: string;
}

export interface CustomCheckBoxProps {
  selectedRows: string[];
  filteredData: DataTableSchema[];
}

export interface TableHeadingProps {
  title: string;
  column: string;
  sortColumn: string;
  sortData: (column: string) => void;
}