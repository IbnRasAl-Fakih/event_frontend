import React from "react";

export default function PrimaryButton({ children, className = "", type = "button", ...props }) {
  return (
    <button
      className={`mt-4 w-full rounded-full border border-[var(--color-primary)] bg-[var(--color-bg)] px-4 py-3 text-lg font-semibold text-[var(--color-primary)] transition hover:opacity-90 hover:bg-[#ccecff] ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
