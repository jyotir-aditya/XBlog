import React, { useState, useEffect, useCallback, useRef } from "react";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Filter from "./Filter";
import Link from "next/link";

const Search = ({ selectedCategory, setSelectedCategory }) => {
  const [term, setTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [result, setResult] = useState();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  //enter handle
  function handleEnter(value) {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("x", value);
    } else {
      params.delete("x");
    }
    console.log("replacing url");

    router.push(`/search?${params.toString()}`);
  }

  const handleSearch = useCallback(async (searchTerm) => {
    if (!searchTerm) {
      setResult();
      return;
    }

    console.log(`Searching... ${searchTerm}`);
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
  //scroll handle
  const [scrollY, setScrollY] = useState(0);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = currentScrollY - prevScrollY;

      setOffset((prevOffset) => {
        const newOffset = prevOffset - scrollDiff;
        return Math.max(Math.min(newOffset, 0), -60); // Limit offset between -60 and 0
      });

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

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
    <div
      className="mb-5 fixed  z-50 w-[25vw] "
      style={{ transform: `translateY(${offset}px)` }}
    >
      <div className="pt-2 bg-white flex items-center gap-2">
        {pathname === "/" && (
          <Filter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}
        <div className="relative flex flex-1 flex-shrink-0">
          <input
            className="block text-base font-robo w-full rounded-md border border-gray-200 py-2 pl-10 outline-none placeholder:text-gray-500"
            placeholder="Search"
            ref={inputRef}
            onChange={(e) => setTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onKeyDown={(e) => {
              e.key == "Enter" && handleEnter(term);
            }}
            value={term}
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
      </div>
      <div ref={dropdownRef} className="sm:w-[35vw] w-[90vw] absolute z-50">
        {isFocused && result && (
          <div className="min-h-[20vh] mt-4">
            {result.length > 0 ? (
              <div className="z-50 bg-white border p-2 rounded-xl min-h-[10vh] max-h-[55vh] overflow-y-auto">
                <ul>
                  {result.map((item, index) => (
                    <Link href={`/post/${item.slug}`} key={index}>
                      <li key={index} className="py-2 border-b">
                        <h2 className="text-lg font-semibold">{item.title}</h2>
                        <p className="text-sm text-gray-500">
                          {item.description}
                        </p>
                      </li>
                    </Link>
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
  );
};

export default Search;
