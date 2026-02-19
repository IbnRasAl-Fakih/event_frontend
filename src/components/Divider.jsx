import React from "react";

export default function Divider({ label }) {
  return (
    <div className="my-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-xs text-slate-400">
      <div className="h-px bg-slate-200" />
      <span>{label}</span>
      <div className="h-px bg-slate-200" />
    </div>
  );
}