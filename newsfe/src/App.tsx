import { useEffect, useState } from "react";
import "./App.css";
import NewsSection from "./components/NewsSection";
import { useStateContext } from "./context/ContextProvider";
import axiosClient from "./helpers/axiosClient";
import Pagination from "./components/Pagination";
import { useSearchParams } from "react-router";
import Filter from "./components/Filter";

function App() {
  const [searchParams] = useSearchParams();
  const { baseNewsUrl } = useStateContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [newsUrl, setNewsUrl] = useState(
    `/${baseNewsUrl}?${searchParams.toString()}`
  );
  const [newsData, setNewsData] = useState<any>({});

  // fetch news from the api
  useEffect(() => {
    axiosClient.get(newsUrl).then(({ data }) => {
      setNewsData(data);
      setCurrentPage(data.data?.current_page);
    });
    window.scrollTo(0, 0);
  }, [newsUrl]);

  if (!newsData || newsData.data?.data?.length < 1) {
    return <div>There are no news yet</div>;
  }

  return (
    <div>
      <Filter
        currentPage={currentPage}
        setNewsUrl={setNewsUrl}
        categories={newsData.categories}
        sources={newsData.sources}
      />
      <NewsSection
        allNews={newsData.data?.data ?? []}
        setNewsUrl={setNewsUrl}
      />
      {newsData.data?.last_page > 1 && (
        <Pagination
          setNewsUrl={setNewsUrl}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          searchParams={searchParams}
          lastPage={newsData.data?.last_page}
        />
      )}
    </div>
  );
}

export default App;
