import React, { useEffect, useRef, useState } from "react";

function joinClasses(...parts) {
  return parts.filter(Boolean).join(" ");
}

export default function AuthDropdownField({
  label,
  value,
  options,
  onChange,
  placeholder = "",
  className = "",
  hideLabel = false,
  buttonClassName = "",
  menuClassName = "",
  optionClassName = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const displayValue = value || placeholder || label || "";
  const isPlaceholder = !value && Boolean(placeholder || label);

  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  return (
    <div
      className={joinClasses(
        "grid text-left text-sm text-slate-600",
        hideLabel ? "gap-0" : "gap-2",
        className
      )}
    >
      <span className={hideLabel ? "sr-only" : ""}>{label}</span>
      <div className="relative" ref={wrapperRef}>
        <button
          type="button"
          className={joinClasses(
            "flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]",
            buttonClassName
          )}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className={isPlaceholder ? "text-slate-500" : ""}>{displayValue}</span>
          <span className="mr-1 text-slate-500" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path
                d="M5 7.5 10 12.5 15 7.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>

        {isOpen ? (
          <div
            className={joinClasses(
              "absolute z-10 mt-2 w-full overflow-hidden rounded-xl bg-white shadow-[0_14px_34px_-18px_rgba(15,23,42,0.45)]",
              menuClassName
            )}
          >
            {options.map((option) => (
              <button
                key={option}
                type="button"
                className={joinClasses(
                  "w-full px-4 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-50",
                  optionClassName
                )}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}