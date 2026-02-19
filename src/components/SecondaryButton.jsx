import React from "react";

export default function SecondaryButton({ children, ...props }) {
  return (
    <button
      className="mt-4 w-full rounded-full border border-slate-300 px-4 py-3 text-base font-semibold text-slate-700 transition hover:border-slate-400"
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}