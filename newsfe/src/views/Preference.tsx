import React, { useEffect, useState } from "react";
import axiosClient from "../helpers/axiosClient";
import Select from "react-select";
import Loader from "../components/Loader";

interface IUserOptions {
  authors: number[];
  categories: number[];
  sources: number[];
}

const Preference = () => {
  const [preferences, setPreferences] = useState({});
  const [allOptions, setAllOptions] = useState<IUserOptions>({
    authors: [],
    categories: [],
    sources: [],
  });
  const [userOptions, setUserOptions] = useState<any>({
    authors: [],
    categories: [],
    sources: [],
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient.get("/profile/preferences").then(({ data }) => {
      setAllOptions(data.allOptions);
      setUserOptions(data.allUserOptions);
      setPreferences({
        authors: data.allUserOptions.authors.map((option: any) => option.id),
        categories: data.allUserOptions.categories.map(
          (option: any) => option.id
        ),
        sources: data.allUserOptions.sources.map((option: any) => option.id),
      });
      setLoading(false);
    });
  }, []);

  const updatePreference = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setLoading(true);

    axiosClient.post("/profile/preferences", preferences).then(({ data }) => {
      console.log(data);
      setLoading(false);
      setMessage(
        "Preference Updated Successfully, the page will reload in 1sec"
      );
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      return;
    });
  };

  if (loading) return <Loader />;

  return (
    <div className="relative mx-auto w-full px-5 py-16 text-gray-800 sm:px-20 md:max-w-screen-lg lg:py-24">
      <h2 className="mb-5 text-4xl text-center font-serif  sm:text-5xl">
        Customize your feed here!
      </h2>
      <p className="mb-12 text-center text-lg text-gray-600">
        You can customize your feed by selecting multiple options from the
        categories below
      </p>

      {message && (
        <p className="relative mx-auto w-full px-5 py-16 text-gray-800 sm:px-20 md:max-w-screen-lg lg:py-24 text-green-500">
          {message}
        </p>
      )}

      <ul className="divide-y divide-gray-200">
        {Object.keys(allOptions).map((key, index) => (
          <li key={index} className="text-left">
            <label htmlFor={`accordion-${index}`} className="flex flex-col">
              <div className="before:absolute before:-left-6 before:block before:text-xl before:text-blue-400 before:content-['–'] peer-checked:before:content-['+'] relative ml-4 cursor-pointer select-none items-center py-4 pr-2">
                <h3 className="text-sm lg:text-base">{key.toUpperCase()}</h3>
              </div>
              {/* <div className="peer-checked:hidden pr-2"> */}
              <div className="pb-5">
                <Select
                  defaultValue={userOptions[key as keyof IUserOptions]}
                  isMulti
                  options={allOptions[key as keyof IUserOptions]}
                  name={key}
                  getOptionLabel={(option: any) => option.name}
                  getOptionValue={(option: any) => option.id}
                  onChange={(selectedOptions: any) => {
                    console.log("selectedOptions", selectedOptions);
                    setPreferences({
                      ...preferences,
                      [key]: selectedOptions.map((option: any) => option.id),
                    });
                  }}
                />
              </div>
              {/* </div> */}
            </label>
          </li>
        ))}
      </ul>
      <div className="mt-20 flex justify-center">
        <button
          onClick={updatePreference}
          className="inline-flex cursor-pointer rounded-full bg-blue-400 px-5 py-4 text-white"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Preference;
