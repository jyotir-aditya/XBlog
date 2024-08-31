"use client";
import React from "react";
import Link from "next/link";

const Controls = ({ currentPage, totalPages }) => {
  return (
    <div className="flex w-full mb-[10vh] justify-center items-center gap-8 sm:mb-4 mt-4">
      {currentPage > 1 && (
        <Link href={`/posts/all?page=${currentPage - 1}`} passHref>
          <div
            aria-label="Previous page"
            className="px-4 py-2 bg-black text-white rounded"
          >
            Previous
          </div>
        </Link>
      )}
      <span className="text-lg font-robo font-medium">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages && (
        <Link href={`/posts/all?page=${currentPage + 1}`} passHref>
          <div
            aria-label="Next page"
            className="px-4 py-2 bg-black text-white rounded"
          >
            Next
          </div>
        </Link>
      )}
    </div>
  );
};

export default Controls;