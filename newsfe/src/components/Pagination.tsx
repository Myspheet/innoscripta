import { useStateContext } from "../context/ContextProvider";
import { constructUrlQuery } from "../helpers/helper";

export default function Pagination({
  setCurrentPage,
  currentPage,
  setNewsUrl,
  searchParams,
  lastPage = 1,
}: any) {
  const { baseNewsUrl } = useStateContext();
  const goToPage = (
    event: React.MouseEvent<HTMLButtonElement>,
    page: number
  ) => {
    event.preventDefault();

    setCurrentPage(page);
    const newUrl = constructUrlQuery(searchParams, page);
    console.log();
    setNewsUrl(`/${baseNewsUrl}?${newUrl}`);
  };

  const showPrevious = currentPage > 1;
  const showNext = currentPage < lastPage;

  return (
    <nav
      aria-label="Page Navigation"
      className="mx-auto my-10 flex max-w-xs justify-between space-x-2 rounded-md bg-white py-2"
    >
      <button
        // onClick={(event) => goToPage(event, 1)}
        {...(showPrevious && { onClick: (event) => goToPage(event, 1) })}
        className="flex items-center space-x-1 font-medium hover:text-blue-600"
        aria-label="First Page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path
            fillRule="evenodd"
            d="M13.28 3.97a.75.75 0 010 1.06L6.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0zm6 0a.75.75 0 010 1.06L12.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <button
        {...(showPrevious && {
          onClick: (event) => goToPage(event, currentPage - 1),
        })}
        className="flex items-center space-x-1 font-medium hover:text-blue-600"
        aria-label="Previous Page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path
            fillRule="evenodd"
            d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <ul className="flex items-center">
        {showPrevious && (
          <li>
            <button
              onClick={(event) => goToPage(event, currentPage - 1)}
              className="px-2 text-lg font-medium text-gray-400 sm:px-3 hover:text-blue-600"
              aria-label="Page 8"
            >
              {currentPage - 1}
            </button>
          </li>
        )}
        <li>
          <button
            className="rounded-md px-2 text-2xl font-medium text-blue-600 sm:px-3"
            aria-label="Current Page"
          >
            {currentPage}
          </button>
        </li>
        {showNext && (
          <li>
            <button
              onClick={(event) => goToPage(event, currentPage + 1)}
              className="px-2 text-lg font-medium text-gray-400 sm:px-3 hover:text-blue-600"
              aria-label="Page 10"
            >
              {currentPage + 1}
            </button>
          </li>
        )}
      </ul>
      <button
        {...(showNext && {
          onClick: (event) => goToPage(event, currentPage + 1),
        })}
        className="flex items-center space-x-1 font-medium hover:text-blue-600"
        aria-label="Next Page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path
            fillRule="evenodd"
            d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <button
        onClick={(event) => goToPage(event, lastPage)}
        className="flex items-center space-x-1 font-medium hover:text-blue-600"
        aria-label="Last Page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path
            fillRule="evenodd"
            d="M4.72 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 010-1.06zm6 0a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 010-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </nav>
  );
}
