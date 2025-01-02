export const constructUrlQuery = (
  searchParam: URLSearchParams,
  currentPage: number
) => {
  let query = "";

  if (searchParam.size === 0) return `page=${currentPage}`;

  //check if page is present and add it if not
  if (!searchParam.has("page")) {
    query += `page=${currentPage}&`;
  }

  for (const [key, value] of searchParam) {
    if (key === "page") {
      query += `${key}=${currentPage}&`;
      continue;
    }
    query += `${key}=${value}&`;
  }

  return query;
};
