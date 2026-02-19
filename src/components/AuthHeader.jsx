import React from "react";
import LogoMark from "./LogoMark";

export default function AuthHeader({ title, subtitle, showLogo = true }) {
  return (
    <div className="mb-10 text-center">
      {showLogo ? <LogoMark /> : null}
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h1>
      <p className="mt-4 text-sm text-slate-500">{subtitle}</p>
    </div>
  );
}