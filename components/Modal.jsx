"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export function Modal({ children }) {
  const router = useRouter();

  return (
    <div className="w-full mt-[5vh]">
      <div className="w-full flex justify-end">
        <button
          className=""
          onClick={() => {
            router.back();
          }}
        >
          <XMarkIcon className="w-[25px] h-[25px]" />
        </button>
      </div>
      <div className="border rounded-lg">{children}</div>
    </div>
  );
}
