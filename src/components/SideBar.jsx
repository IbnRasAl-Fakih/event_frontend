import React from "react";
import { useNavigate } from "react-router-dom";
import SideBarNavItem from "./SideBarNavItem";
import expandButtonIcon from "../images/expand_button_icon.png";
import collapseButtonIcon from "../images/collapse_button_icon.png";
import homeIcon from "../images/home_icon.png";
import eventsIcon from "../images/events_icon.png";
import notificationIcon from "../images/notification_icon.png";
import calendarIcon from "../images/calendar_icon.png";
import mapIcon from "../images/map_icon.png";
import friendsIcon from "../images/friends_icon.png";
import chatsIcon from "../images/chats_icon.png";
import profileIcon from "../images/profile_icon.png";
import settingsIcon from "../images/settings_icon.png";
import searchIcon from "../images/search_icon.png";
import helpButtonIcon from "../images/help_button_icon.png";
import toggleThemeLightButtonIcon from "../images/toggle_theme_light_button_icon.png";
import toggleThemeDarkButtonIcon from "../images/toggle_theme_dark_button_icon.png";

const menuItems = [
  { key: "home", label: "Home", icon: homeIcon },
  { key: "events", label: "Events", icon: eventsIcon },
  { key: "notifications", label: "Notifications", icon: notificationIcon, badge: "" },
  { key: "calendar", label: "Calendar", icon: calendarIcon },
  { key: "map", label: "Map", icon: mapIcon },
  { key: "friends", label: "Friends", icon: friendsIcon },
  { key: "chats", label: "Chats", icon: chatsIcon },
  { key: "profile", label: "Profile", icon: profileIcon },
  { key: "settings", label: "Settings", icon: settingsIcon },
];

// убрать
function placeholder(action) {
  console.info(`TODO: ${action}`);
}

export default function SideBar({ currentPage, isExpanded, sidebarWidth, onToggle }) {
  const navigate = useNavigate();

  return (
    <aside
      className="fixed inset-y-0 left-0 z-20 border-r border-slate-200 bg-white transition-all duration-200"
      style={{ width: sidebarWidth }}
    >
      <div className="flex h-full flex-col px-3 py-4">
        {isExpanded ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="h-14 w-14 object-contain"
              />
              <span className="ml-2 text-2xl font-semibold text-[#1E3A5F]">Event</span>
            </div>
            <button
              type="button"
              onClick={onToggle}
              className="rounded p-1 text-xl leading-none text-slate-700 hover:bg-slate-100"
              aria-label="Collapse sidebar"
            >
              <img
                className="h-5 w-5 object-contain"
                src={collapseButtonIcon}
                alt=""
                aria-hidden="true"
              />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="h-14 w-14 object-contain"
            />
            <button
              type="button"
              onClick={onToggle}
              className="mt-2 rounded p-1 text-xl leading-none text-slate-700 hover:bg-slate-100"
              aria-label="Expand sidebar"
            >
              <img
                className="h-5 w-5 object-contain"
                src={expandButtonIcon}
                alt=""
                aria-hidden="true"
              />
            </button>
          </div>
        )}

        {isExpanded ? (
          <div className="relative mt-4">
            <img
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 object-contain"
              src={searchIcon}
              alt=""
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Search"
              className="h-11 w-full rounded-lg bg-slate-100 pl-10 pr-4 text-sm text-slate-500 outline-none"
            />
          </div>
        ) : null}

        {isExpanded ? (
          <p className="mt-5 text-xs font-medium uppercase tracking-wide text-slate-400">
            Main Menu
          </p>
        ) : null}

        <nav className={`${isExpanded ? "mt-3 gap-1" : "mt-6 gap-4"} flex flex-col`}>
          {menuItems.map((item) => (
            <SideBarNavItem
              key={item.key}
              isExpanded={isExpanded}
              icon={item.icon}
              name={item.label}
              isActive={currentPage === item.key}
              badge={item.badge}
              onClick={() => navigate(`/${item.key}`)}
            />
          ))}
        </nav>

        {isExpanded ? (
          <hr className="mt-3 border-t border-slate-300" />
        ) : null}

        <div className={`${isExpanded ? "pt-3" : "pt-2"} mt-auto`}>
          {isExpanded ? (
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => placeholder("Theme switch")}
                className="rounded-full px-2 py-1 text-slate-500 hover:bg-slate-100"
              >
                <img
                  className="w-16 object-contain"
                  src={toggleThemeLightButtonIcon}
                  alt=""
                  aria-hidden="true"
                />
              </button>
              <button
                type="button"
                onClick={() => placeholder("Help")}
                className="rounded-full px-2 py-1 text-slate-500 hover:bg-slate-100"
              >
                <img
                  className="h-6 w-6 object-contain"
                  src={helpButtonIcon}
                  alt=""
                  aria-hidden="true"
                />
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => placeholder("Help")}
                className="grid h-9 w-full place-items-center rounded-full text-slate-500 hover:bg-slate-100"
                aria-label="Help"
              >
                <img
                  className="h-6 w-6 object-contain"
                  src={helpButtonIcon}
                  alt=""
                  aria-hidden="true"
                />
              </button>
              <button
                type="button"
                onClick={() => placeholder("Theme switch")}
                className="grid h-9 w-full place-items-center rounded-full text-slate-500 hover:bg-slate-100"
                aria-label="Theme switch"
              >
                <img
                  className="w-16 object-contain"
                  src={toggleThemeLightButtonIcon}
                  alt=""
                  aria-hidden="true"
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}