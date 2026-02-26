import React from "react";

export function GripIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 text-white/95" fill="currentColor" aria-hidden="true">
      <circle cx="6" cy="5" r="1.1" />
      <circle cx="10" cy="5" r="1.1" />
      <circle cx="6" cy="10" r="1.1" />
      <circle cx="10" cy="10" r="1.1" />
      <circle cx="6" cy="15" r="1.1" />
      <circle cx="10" cy="15" r="1.1" />
    </svg>
  );
}

export function DeleteIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M9 9v6M15 9v6M5 7h14" strokeLinecap="round" />
      <path d="M7 7l1 12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2l1-12" />
      <path d="M10 4h4a1 1 0 0 1 1 1v2H9V5a1 1 0 0 1 1-1Z" />
    </svg>
  );
}