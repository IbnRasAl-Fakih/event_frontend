import React from "react";

export default function SideBarNavItem({
  isExpanded,
  icon,
  name,
  isActive,
  badge,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center ${
        isExpanded ? "justify-between px-3 py-2 text-left" : "justify-center px-0 py-0 h-10"
      } rounded-lg text-slate-700 transition hover:bg-slate-100 ${
        isActive ? "bg-slate-100" : ""
      }`}
      aria-label={name}
    >
      <span className={`flex items-center ${isExpanded ? "gap-2" : ""}`}>
        <img
          className="h-5 w-5 object-contain"
          src={icon || ""}
          alt=""
          aria-hidden="true"
        />
        {isExpanded ? <span>{name}</span> : null}
      </span>
      {isExpanded && badge ? (
        <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs text-rose-500">
          {badge}
        </span>
      ) : null}
    </button>
  );
}