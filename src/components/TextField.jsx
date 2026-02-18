import React from "react";

export default function TextField({ label, type = "text", placeholder }) {
  return (
    <label className="mt-3 grid gap-2 text-left text-sm text-slate-600">
      <span>{label}</span>
      <input
        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
        type={type}
        placeholder={placeholder}
      />
    </label>
  );
}
