import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

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
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full bg-gray-600 hover:bg-gray-400"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2 ">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <IconButton key={page} {...getItemProps(page)}>
            {page}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full  bg-gray-600 hover:bg-gray-400"
        onClick={next}
        disabled={active === totalPages}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
