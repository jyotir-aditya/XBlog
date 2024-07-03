import React, { useState, useEffect, useCallback } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [term, setTerm] = useState("");
  const [result, setResult] = useState();
  const [isFocused, setIsFocused] = useState(false);
  const pathname = usePathname();
  const router=useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("x");
  function handleEnter(value){
    const params = new URLSearchParams(searchParams);
    if (value) {
        params.set('x', value);
      } else {
        params.delete('x');
      }
      console.log("replacing url");
      router.push(`${pathname}?${params.toString()}`);
      router.refresh();
  }
  const handleSearch = useCallback(async (searchTerm) => {
    if (!searchTerm) {
      setResult();
      return;
    }

    console.log(`Searching... ${searchTerm}`);
    console.log("search is",search);
    try {
      const response = await fetch(
        `/api/query/search?term=${encodeURIComponent(searchTerm)}`
      );
      const result = await response.json();
      setResult(result);
      console.log(result);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResult([]); // Clear results on error
    }
  }, []);

  const debouncedHandleSearch = useDebouncedCallback(handleSearch, 400);

  useEffect(() => {
    debouncedHandleSearch(term);
  }, [term, debouncedHandleSearch]);
  useEffect(()=>{
    setTerm(search);
  },[]);

  return (
    <div className=" w-full ">
      <div>
        <div className="relative flex flex-1 flex-shrink-0">
          <input
            className="block text-lg font-robo w-full rounded-md border border-gray-200 py-2 pl-12 outline-none placeholder:text-gray-500"
            placeholder="Search"
            onChange={(e) => setTerm(e.target.value)}
            value={term}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => {
              e.key == "Enter" && handleEnter(term);
            }}
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[25px] w-[25px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
      <div className="w-[35vw] absolute z-50">
            {isFocused&&term&&result && (
              <div className="min-h-[20vh] max-h-[55vh] overflow-y-auto">
                {result.length > 0 ? (
                  <div className="z-50 bg-white border p-2 ">
                    <ul>
                      {result.map((item, index) => (
                        <li key={index} className="py-2 border-b">
                          <h2 className="text-lg font-semibold">
                            {item.title}
                          </h2>
                          <p className="text-sm text-gray-500">
                            {item.description}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No results found.</p>
                )}
              </div>
            )}
          </div>
      </div>
    </div>
  );
};

export default SearchBar;
