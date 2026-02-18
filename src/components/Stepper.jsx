import React from "react";

export default function Stepper({ steps, activeIndex = 0 }) {
  return (
    <div className="mb-6 text-xs sm:text-sm">
      <div className="grid grid-cols-3 items-start gap-x-6">
        {steps.map((label, index) => (
          <div key={label} className="relative grid justify-items-center">
            {index > 0 ? (
              <div className="absolute left-[-50%] right-[63.5%] top-0.5 h-px bg-[#333333]/50" />
            ) : null}
            <span
              className={`relative z-10 grid h-7 w-7 place-items-center rounded-full text-[11px] ${
                index === activeIndex
                  ? "bg-[#333333] text-white"
                  : "bg-[#333333]/50 text-white"
              }`}
            >
              {index + 1}
            </span>
            <div
              className={`mt-2 text-center leading-snug ${
                index === activeIndex ? "text-[#333333]" : "text-[#333333]/50"
              }`}
            >
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
