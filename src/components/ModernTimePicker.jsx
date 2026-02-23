import React, { useEffect, useMemo, useRef, useState } from "react";
import ClockIcon from "./svg_icons/ClockIcon";

function joinClasses(...parts) {
  return parts.filter(Boolean).join(" ");
}

export default function ModernTimePicker({
  label = "Time",
  hideLabel = true,
  value,
  onChange,
  placeholder = "Time",
  className = "",
  inputClassName = "",
  iconClassName = "",
  stepMinutes = 30,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  const hasValue = Boolean(value);
  const timeOptions = useMemo(() => {
    const list = [];
    const step = Math.max(5, stepMinutes);
    for (let minutes = 0; minutes < 24 * 60; minutes += step) {
      const hours = String(Math.floor(minutes / 60)).padStart(2, "0");
      const mins = String(minutes % 60).padStart(2, "0");
      list.push(`${hours}:${mins}`);
    }
    return list;
  }, [stepMinutes]);

  useEffect(() => {
    if (!isOpen) return;
    const handleOutside = (event) => {
      if (!wrapperRef.current?.contains(event.target)) setIsOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      className={joinClasses(
        "grid text-left text-sm text-slate-600",
        hideLabel ? "gap-0" : "gap-2",
        className
      )}
    >
      {!hideLabel ? <span>{label}</span> : null}

      <div className="group relative" ref={wrapperRef}>
        {!hasValue && !isFocused ? (
          <span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-sm font-medium text-slate-400 transition group-focus-within:text-sky-500">
            {placeholder}
          </span>
        ) : null}

        <input
          ref={inputRef}
          type="text"
          readOnly
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onClick={() => setIsOpen((prev) => !prev)}
          className={joinClasses(
            "h-12 w-full rounded-xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50 px-4 pr-20 text-sm font-medium text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.04)] outline-none transition",
            "hover:border-slate-300 hover:bg-white",
            "focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-100",
            "cursor-pointer",
            inputClassName
          )}
          aria-label={label}
          placeholder={placeholder}
        />

        <button
          type="button"
          onClick={() => {
            inputRef.current?.focus();
            setIsOpen((prev) => !prev);
          }}
          className="absolute right-4 top-2 flex h-9 items-center gap-1 rounded-lg px-2.5 text-slate-500"
          aria-label={`Open ${label.toLowerCase()} picker`}
        >
          <ClockIcon className={iconClassName} />
        </button>

        {isOpen ? (
          <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-30 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.35)] backdrop-blur-sm">
            <div className="border-b border-slate-100 bg-gradient-to-r from-sky-50 to-cyan-50 px-3 py-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Select time
              </p>
            </div>
            <div className="max-h-56 overflow-y-auto p-2">
              <div className="grid grid-cols-2 gap-1">
                {timeOptions.map((option) => {
                  const selected = option === value;
                  return (
                    <button
                      key={option}
                      type="button"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => {
                        onChange?.(option);
                        setIsOpen(false);
                        inputRef.current?.focus();
                      }}
                      className={joinClasses(
                        "flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition",
                        selected
                          ? "bg-sky-100 text-sky-700 ring-1 ring-sky-200"
                          : "text-slate-700 hover:bg-slate-50"
                      )}
                    >
                      <span>{option}</span>
                      {selected ? (
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-sky-500"
                          aria-hidden="true"
                        />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
