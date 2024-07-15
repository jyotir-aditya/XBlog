import { FunnelIcon } from "@heroicons/react/24/outline";
import React, { useState, useRef, useEffect } from "react";

const Filter = ({ selectedCategory, setSelectedCategory }) => {
    const [isVisible, setIsVisible] = useState(false);
    const menuRef = useRef(null);
    const logoRef = useRef(null);

    const categories = [
        { id: 1, name: "Technology" },
        { id: 2, name: "Lifestyle" },
        { id: 3, name: "Health & Fitness" },
        { id: 4, name: "Travel" },
        { id: 5, name: "Food & Recipes" },
        { id: 6, name: "Finance & Business" },
        { id: 7, name: "Education" },
        { id: 8, name: "Entertainment" },
        { id: 9, name: "Science" },
        { id: 10, name: "Sports" },
        { id: 11, name: "Politics" },
        { id: 12, name: "Environment" },
        { id: 13, name: "Personal Development" },
        { id: 14, name: "Parenting & Family" },
        { id: 15, name: "Fashion & Beauty" },
        { id: 16, name: "Art & Culture" },
        { id: 17, name: "History" },
        { id: 18, name: "Gaming" },
        { id: 19, name: "DIY & Crafts" },
        { id: 20, name: "Automotive" },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current && !menuRef.current.contains(event.target) &&
                logoRef.current && !logoRef.current.contains(event.target)
            ) {
                setIsVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div>
            <div ref={logoRef} onClick={() => setIsVisible(!isVisible)} className="p-2 border rounded-sm">
                <FunnelIcon className="h-[18px] w-[18px] z-50 text-gray-500" />
            </div>
            {/* menu */}
            {isVisible && (
                <div ref={menuRef} className="border p-2 bg-white mt-4 absolute grid grid-cols-3">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className={`category-button ${
                                selectedCategory === category.id
                                    ? ""
                                    : ""
                            }`}
                            onClick={() => {selectedCategory === category.id ? setSelectedCategory(""):setSelectedCategory(category.id)}}
                        >
                            <div
                                className={`overflow-hidden text-sm text-gray-400 border-b-2 border-white  hover:border-black py-4 mx-4 ${selectedCategory === category.id ? "text-zinc-950" : ""}`}
                            >
                                {category.name}
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Filter;
