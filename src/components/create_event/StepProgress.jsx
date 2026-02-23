import React from "react";

export default function StepProgress({ steps, activeIndex }) {
  return (
    <div className="relative z-30 mx-auto w-full max-w-3xl rounded-2xl border border-sky-100 bg-[var(--color-bg)] px-5 py-5 sm:rounded-3xl sm:px-8 sm:py-6">
      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {steps.map((label, index) => {
          const isActive = index === activeIndex;
          const isPassed = index < activeIndex;

          return (
            <div key={label} className="relative">
              {index < steps.length - 1 ? (
                <div className="absolute left-1/2 right-[calc(-50%-0.5rem)] top-2 h-0.5 bg-sky-300/70 sm:right-[calc(-50%-1rem)]" />
              ) : null}
              <div className="relative z-10 flex flex-col items-center text-center">
                <span
                  className={`h-4 w-4 rounded-full border-2 ${
                    isActive || isPassed
                      ? "border-sky-500 bg-sky-500"
                      : "border-sky-300 bg-sky-200"
                  }`}
                />
                <span
                  className={`mt-2.5 text-xs font-medium sm:text-sm ${
                    isActive ? "text-sky-600" : "text-sky-400"
                  }`}
                >
                  {label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
