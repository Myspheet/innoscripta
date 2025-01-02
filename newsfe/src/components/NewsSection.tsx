import React, { useState } from "react";
import Post from "./Post";
import { useStateContext } from "../context/ContextProvider";

const NewsSection = ({ allNews, setNewsUrl }: any) => {
  const { user, setBaseNewsUrl } = useStateContext();

  const [isPersonalizedFeed, setIsPersonalizedFeed] = useState(false);

  const updateFeed = (
    event: React.MouseEvent<HTMLButtonElement>,
    isPersonalizedFeed: boolean
  ) => {
    event.preventDefault();

    setIsPersonalizedFeed(isPersonalizedFeed);
    setBaseNewsUrl(isPersonalizedFeed ? "news/personalized" : "news");
    setNewsUrl(`/${isPersonalizedFeed ? "news/personalized" : "news"}?page=1`);
  };

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            News Feed
          </h2>
          <div className="mt-4 text-lg text-gray-500">
            <button
              onClick={(e) => updateFeed(e, false)}
              className={`mr-4 cursor-pointer ${
                isPersonalizedFeed ? "" : "text-green-500"
              }`}
            >
              Recent News Feed
            </button>
            {user && (
              <button
                onClick={(e) => updateFeed(e, true)}
                className={`mr-4 cursor-pointer ${
                  isPersonalizedFeed ? "text-green-500" : ""
                }`}
              >
                Personalized News Feed
              </button>
            )}
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {allNews.map((post: any) => (
            <Post post={post} key={post.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
