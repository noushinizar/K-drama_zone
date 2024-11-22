import React from "react";
import { IconButton } from "@material-tailwind/react";

export function CircularPagination({ active, totalPages, onChange }) {
  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    onClick: () => onChange(index),
    className: "rounded-full",
  });

  const next = () => {
    if (active === totalPages) return;
    onChange(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    onChange(active - 1);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
      {/* Previous Button (Hidden on small screens, visible on medium and larger screens) */}
      <button
        onClick={prev}
        disabled={active === 1}
        className="hidden sm:flex items-center gap-2 rounded-full bg-gray-600 hover:bg-gray-400 text-sm md:text-base px-3 py-2"
      >
        <span>Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex flex-wrap justify-center items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <IconButton
            key={page}
            {...getItemProps(page)}
            className="text-sm md:text-base p-2 sm:p-3 text-gray-500 "
          >
            {page}
          </IconButton>
        ))}
      </div>

      {/* Next Button (Hidden on small screens, visible on medium and larger screens) */}
      <button
        onClick={next}
        disabled={active === totalPages}
        className="hidden sm:flex items-center gap-2 rounded-full bg-gray-600 hover:bg-gray-400 text-sm md:text-base px-3 py-2"
      >
        <span>Next</span>
      </button>
    </div>
  );
}
