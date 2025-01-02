export default function Loader() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="relative">
        <div
          className="w-12 h-12 rounded-full absolute
                            border-4 border-solid border-gray-200"
        ></div>

        <div
          className="w-12 h-12 rounded-full animate-spin absolute
                            border-4 border-solid border-green-500 border-t-transparent"
        ></div>
      </div>
    </div>
  );
}