import React from "react";

export default function TextField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}) {
  return (
    <label className="mt-3 grid gap-2 text-left text-sm text-slate-600">
      <span>{label}</span>
      <input
        className={`w-full rounded-xl border px-4 py-3 text-base outline-none transition focus:ring-1 ${
          error
            ? "border-red-400 focus:border-red-400 focus:ring-red-200"
            : "border-slate-200 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]"
        }`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error ? <span className="text-xs text-red-500">{error}</span> : null}
    </label>
  );
}