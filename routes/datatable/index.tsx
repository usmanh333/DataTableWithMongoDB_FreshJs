import DataTableIsland from "../../islands/DataTableIsland.tsx";

export default function index() {
  return (
    <div class="flex-grow ">
      <h2 className="text-3xl text-white font-bold leading-7 mx-9 my-8">
        Products
      </h2>
      <DataTableIsland />
    </div>
  );
}
