import React, { useState, useEffect, useCallback, useRef } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

const SearchBar = () => {
  const [term, setTerm] = useState("");
  const [result, setResult] = useState();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("x");
  const dropdownRef = useRef(null);

  function handleEnter(value) {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("x", value);
    } else {
      params.delete("x");
    }
    router.push(`${pathname}?${params.toString()}`);
    router.refresh();
    setIsFocused(false);
    inputRef.current.blur(); // Remove focus from the input field
  }

  const handleSearch = useCallback(async (searchTerm) => {
    if (!searchTerm) {
      setResult();
      return;
    }
    console.log("inside handleSearch");

    try {
      const response = await fetch(
        `/api/query/search?term=${encodeURIComponent(searchTerm)}`
      );
      const result = await response.json();
      setResult(result);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResult([]); // Clear results on error
    }
  }, []);

  const debouncedHandleSearch = useDebouncedCallback(handleSearch, 400);

  useEffect(() => {
    debouncedHandleSearch(term);
  }, [term, debouncedHandleSearch]);

  useEffect(() => {
    setTerm(search || "");
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full">
      <div>
        <div className="relative flex flex-1 flex-shrink-0">
          <input
            ref={inputRef}
            className="block text-lg font-robo w-full rounded-md border border-gray-200 py-2 pl-12 outline-none placeholder:text-gray-500"
            placeholder="Search"
            onChange={(e) => setTerm(e.target.value)}
            value={term}
            onFocus={() => setIsFocused(true)}
            //onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleEnter(term);
              }
            }}
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[25px] w-[25px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
        <div ref={dropdownRef} >
          {isFocused && term && result && (
            <div className="min-h-[20vh] max-h-[55vh] overflow-y-auto absolute z-50 shadow-md border-black">
              {result.length > 0 ? (
                <div className="z-50 bg-white border p-2">
                  <ul>
                    {result.map((item, index) => (<Link href={`post/${item.slug}`} key={index}>
                      <li key={index} className="py-2 border-b">
                        <h2 className="text-lg font-semibold">{item.title}</h2>
                        <p className="text-sm text-gray-500">
                          {item.description}
                        </p>
                      </li></Link>
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
