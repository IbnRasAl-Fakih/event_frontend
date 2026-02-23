import React from "react";

export default function EventField({
  placeholder,
  value,
  onChange,
  type = "text",
  rightIcon,
  as = "input",
  rows = 5,
  children,
}) {
  const baseClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-500 focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-100";

  if (as === "select") {
    return (
      <div className="relative">
        <select className={`${baseClass} h-12 appearance-none pr-10`} value={value} onChange={onChange}>
          {children}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
          ▾
        </span>
      </div>
    );
  }

  if (as === "textarea") {
    return (
      <textarea
        className={`${baseClass} min-h-[112px] resize-none py-4`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
      />
    );
  }

  return (
    <div className="relative">
      <input
        className={`${baseClass} h-12 ${rightIcon ? "pr-11" : ""} ${
          type === "number"
            ? "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            : ""
        }`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {rightIcon ? (
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
          {rightIcon}
        </span>
      ) : null}
    </div>
  );
}