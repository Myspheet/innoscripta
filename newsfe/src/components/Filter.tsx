import { useState } from "react";
import { useStateContext } from "../context/ContextProvider";

export default function Filter({
  categories = [],
  sources = [],
  setNewsUrl,
}: any) {
  const { baseNewsUrl } = useStateContext();
  const initialState = {
    source: "",
    category: "",
    date_from: "",
    search: "",
  };
  const [filters, setFilters] = useState(initialState);

  const handleFilter = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    event.preventDefault();
    console.log(
      "filterssssss",
      filters,
      event.currentTarget.name,
      event.currentTarget.value
    );

    const name = event.currentTarget.name;
    const value = event.currentTarget.value;

    // update the filter state with the selected filter, using the field name as key and value as value
    setFilters((prevFilters: any) => {
      const newFilters = {
        ...prevFilters,
        [name]: value,
      }; //[...prevFilters];
      return newFilters;
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let query = "";
    Object.entries(filters).forEach(([key, value]) => {
      query += `${key}=${value}&`;
    });

    setNewsUrl(`/${baseNewsUrl}?${query}`);
  };

  return (
    <div className="mx-auto max-w-screen-md max-w-screen-lg">
      <div className="flex flex-col">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
            <div className="relative mb-10 w-full flex  items-center justify-between rounded-md">
              <svg
                className="absolute left-2 block h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" className=""></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65" className=""></line>
              </svg>
              <input
                type="name"
                name="search"
                onChange={handleFilter}
                value={filters.search}
                className="h-12 w-full cursor-text rounded-md border border-gray-100 bg-gray-100 py-4 pr-40 pl-12 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="Search by name, type, manufacturer, etc"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-stone-600">
                  Category
                </label>

                <select
                  onChange={handleFilter}
                  id="category"
                  name="category"
                  value={filters.category}
                  className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                >
                  <option value="">All</option>
                  {categories.map((category: any) => (
                    <option key={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-stone-600">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date_from"
                  value={filters.date_from}
                  onChange={handleFilter}
                  className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-stone-600">
                  Source
                </label>

                <select
                  id="source"
                  name="source"
                  onChange={handleFilter}
                  value={filters.source}
                  className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                >
                  <option value="">All</option>

                  {sources.map((source: any) => (
                    <option key={source.id}>{source.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
              <button
                onClick={() => setFilters(initialState)}
                type="reset"
                className="rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-700 outline-none hover:opacity-80 focus:ring"
              >
                Reset
              </button>
              <button className="rounded-lg bg-blue-600 px-8 py-2 font-medium text-white outline-none hover:opacity-80 focus:ring">
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
