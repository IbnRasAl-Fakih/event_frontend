import React from "react";

export default function PrimaryButton({ children }) {
  return (
    <button className="mt-4 w-full rounded-full border border-[var(--color-primary)] bg-[var(--color-bg)] px-4 py-3 text-sm font-semibold text-[var(--color-primary)] transition hover:opacity-90">
      {children}
    </button>
  );
}
