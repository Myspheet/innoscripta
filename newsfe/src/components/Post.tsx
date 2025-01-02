import { Link } from "react-router";

export default function Post({ post }: any) {
  return (
    <div
      key={post.id}
      className="flex flex-col rounded-lg shadow-lg overflow-hidden"
    >
      <img
        className="h-48 w-full object-cover"
        src={post.image ?? "https://placehold.co/400"}
        // alt={post.title}
      />
      <Link to={`${post.url}`} target="_blank">
        <div className="flex-1 bg-white p-6 flex flex-col justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-indigo-600">
              Category - {post.category.name}
            </p>
            <p className="text-sm font-medium text-indigo-600">
              Source - {post.source.name}
            </p>
            {/* Format the published_at date to a more readable format */}
            <p>Published at - {post.published_at.split("T")[0]} </p>

            {/* <a href="#" className="block mt-2"> */}
            <p className="text-xl font-semibold text-gray-900">{post.title}</p>
            <p className="mt-3 text-base text-gray-500">{post.description}</p>
            {/* </a> */}
          </div>
          <div className="mt-6 flex items-center">
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                Author - {post.author.name}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
