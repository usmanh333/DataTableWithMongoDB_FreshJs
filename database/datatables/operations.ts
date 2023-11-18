import { db } from "../connection.ts";
import { DataTableSchema } from "./types.ts";

const profileCollection = db.collection<DataTableSchema>("orderData");

export async function fetchDataTableData(
  page: number,
  recordsPerPage: number,
  sortColumn: string,
  sortOrder: string,
) {
  try {
    const skip = (page - 1) * recordsPerPage;
    const sortQuery: any = {};

    if (sortColumn === "date") {
      sortQuery.createdAt = sortOrder === "asc" ? 1 : -1;
    } else if (sortColumn === "customer") {
      sortQuery["user.name"] = sortOrder === "asc" ? 1 : -1;
    } else {
      sortQuery[sortColumn] = sortOrder === "asc" ? 1 : -1;
    }
    const totalCount = await profileCollection.countDocuments({});
    const users = await profileCollection
      .find()
      .sort(sortQuery)
      .skip(skip)
      .limit(recordsPerPage)
      .toArray();

    const totalPages = Math.ceil(totalCount / recordsPerPage);
    return { data: users, currentPage: page, totalPages };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
