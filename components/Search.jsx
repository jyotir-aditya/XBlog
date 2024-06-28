import React, { useState, useEffect, useCallback } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useDebouncedCallback } from 'use-debounce';

const Search = () => {
  const [term, setTerm] = useState("");
  const [result, setResult] = useState();

  const handleSearch = useCallback(async (searchTerm) => {
    if (!searchTerm) {
      setResult();
      return;
    }

    console.log(`Searching... ${searchTerm}`);
    try {
      const response = await fetch(`/api/query/search?term=${encodeURIComponent(searchTerm)}`);
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

  return (<div
    className="mb-5 fixed z-50 w-[25vw] "
    style={{ transform: `translateY(${offset}px)`}}
  >
    <div className='pt-2 bg-white'>
      <div className="relative flex flex-1 flex-shrink-0">
        <input
          className="block text-base font-robo w-full rounded-md border border-gray-200 py-2 pl-10 outline-none placeholder:text-gray-500"
          placeholder="Search"
          onChange={(e) => setTerm(e.target.value)}
          value={term}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>{result&&<div className='min-h-[20vh] mt-4'>
        {result.length > 0 ? (<div className='z-50 bg-white border p-2 rounded-xl'>
            <ul>
            {result.map((item) => (
              <li key={item.id} className="py-2 border-b">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-500">{item.description}</p>
              </li>
            ))}
          </ul>
          </div>
          
        ) : (
          <p className="text-sm text-gray-500">No results found.</p>
        )}
      </div>}
      
    </div>
    </div>
  );
};

export default Search;
