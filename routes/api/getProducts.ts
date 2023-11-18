import { Handlers } from "$fresh/server.ts";
import { fetchDataTableData } from "../../database/datatables/operations.ts";

export const handler: Handlers = {
  async POST(req, _) {
    try {
      const { pageNumber, itemsPerPage, sortColumn, sortOrder } = await req.json();
      const res = await fetchDataTableData(pageNumber, Number(itemsPerPage), sortColumn, sortOrder);
      return new Response(JSON.stringify(res));
    } catch (error) {
      console.error(error);
      return new Response(undefined, {
        status: 500,
      });
    }
  },
};
