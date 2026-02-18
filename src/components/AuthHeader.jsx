import React from "react";
import LogoMark from "./LogoMark";

export default function AuthHeader({ title, subtitle }) {
  return (
    <div className="mb-4 text-center">
      <LogoMark />
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h1>
      <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
    </div>
  );
}
