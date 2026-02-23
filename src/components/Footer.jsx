import React from "react";
import socialItems from "../constants/socialItems";

const footerLinks = [
  "About Us",
  "Contacts",
  "Jobs",
  "Help Center",
  "Terms of Service",
  "Privacy Policy",
];

function placeholder(action) {
  console.info(`TODO: ${action}`);
}

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-4 pt-8 pb-4 text-slate-600">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm">
          {footerLinks.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => placeholder(`Footer link: ${item}`)}
              className="hover:text-slate-800"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4">
          {socialItems.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => placeholder(`Footer social: ${item.key}`)}
              className="text-xs font-semibold uppercase text-slate-900"
              aria-label={`Open ${item.key}`}
            >
              <img
                className="h-7 w-7 object-contain"
                src={item.icon || ""}
                alt=""
                aria-hidden="true"
              />
            </button>
          ))}
        </div>

        <p className="text-sm text-slate-500">© 2026 Event | All Rights Reserved</p>
      </div>
    </footer>
  );
}