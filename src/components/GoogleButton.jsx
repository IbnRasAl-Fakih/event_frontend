import React from "react";
import googleLogo from "../images/google_logo.png";

export default function GoogleButton({ children }) {
  return (
    <button
      className="mx-auto inline-flex items-center gap-3 rounded-full border border-slate-300 bg-white px-8 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400"
      type="button"
    >
      <img
        className="h-6 w-6 object-contain"
        src={googleLogo}
        alt=""
        aria-hidden="true"
      />
      {children}
    </button>
  );
}
