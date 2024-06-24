import React, { useEffect, useState } from 'react';

const FilterCategories = ({ selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [scrollY, setScrollY] = useState(0);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = currentScrollY - prevScrollY;

      setOffset(prevOffset => {
        const newOffset = prevOffset - scrollDiff;
        return Math.max(Math.min(newOffset, 0), -60); // Limit offset between -60 and 0
      });

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  async function fetchCategories() {
    try {
      
      const response = await fetch(`/api/query/allcategory`);
      const categories = await response.json();
      setCategories(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  return (
    <div className='px-2  bg-white w-[52vw] border-b-[1px]' style={{ transform: `translateY(${offset}px)` }}>
      <div className='flex  no-scrollbar gap-9 overflow-x-auto'>
        <button
          className={`category-button  ${selectedCategory === "" ? "active border-b-[2px] border-black" : ""}`}
          onClick={() => setSelectedCategory("")}
        >
          <div className={`w-max text-sm py-4 text-gray-400 hover:text-black  ${selectedCategory === "" ? "text-black" : ""}`}>All Topics</div>
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-button ${selectedCategory === category.id ? "active border-b-[2px] border-black" : ""}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <div className={`w-max text-sm text-gray-400 hover:text-black py-4 ${selectedCategory === category.id ? "text-black" : ""}`}>{category.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterCategories;
