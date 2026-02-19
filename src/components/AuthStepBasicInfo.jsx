import React, { useEffect, useMemo, useRef, useState } from "react";
import AuthHeader from "./AuthHeader";
import Stepper from "./Stepper";
import TextField from "./TextField";
import PrimaryButton from "./PrimaryButton";
import defaultUserAvatar from "../images/default_user_avatar.png";
import worldCities from "world-cities-json";
import { parseDate } from "@internationalized/date";
import ModernDatePicker from "./ModernDatePicker";

export default function AuthStepBasicInfo({ steps, activeIndex = 1, onNext }) {
  const [sex, setSex] = useState("Male");
  const [sexOther, setSexOther] = useState("");
  const [sexOpen, setSexOpen] = useState(false);
  const [cityQuery, setCityQuery] = useState("");
  const [cityOpen, setCityOpen] = useState(false);
  const [birthDate, setBirthDate] = useState(null);
  const sexButtonRef = useRef(null);
  const sexWrapperRef = useRef(null);
  const sexOtherRef = useRef(null);
  const birthPlaceholder = useMemo(() => parseDate("2004-06-14"), []);

  const cityOptions = useMemo(() => {
    const query = cityQuery.trim().toLowerCase();
    if (query.length < 2) return [];
    const dataSource = Array.isArray(worldCities?.cities)
      ? worldCities.cities
      : [];
    const results = dataSource.filter((city) => {
      const name = city.city?.toLowerCase() || "";
      const ascii = city.city_ascii?.toLowerCase() || "";
      return name.includes(query) || ascii.includes(query);
    });
    const mapped = results.map((city) => ({
      label: `${city.city}, ${city.country}`,
    }));
    const seen = new Set();
    return mapped
      .filter((item) => {
        if (seen.has(item.label)) return false;
        seen.add(item.label);
        return true;
      })
      .slice(0, 6);
  }, [cityQuery]);

  useEffect(() => {
    if (!sexOpen) return;
    const handleOutsideClick = (event) => {
      if (!sexWrapperRef.current?.contains(event.target)) {
        setSexOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [sexOpen]);

  useEffect(() => {
    if (sex === "Other") {
      sexButtonRef.current?.blur();
      setSexOpen(false);
      setTimeout(() => sexOtherRef.current?.focus(), 0);
    }
  }, [sex]);

  return (
    <>
      <AuthHeader
        title="Create an account"
        subtitle="Provide your basic info"
      />

      <Stepper steps={steps} activeIndex={activeIndex} />

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white px-6 py-6 text-left shadow-sm">
        <div className="text-center">
          <div className="text-sm font-semibold text-slate-700">
            Let&apos;s start with the basic information
          </div>
          <div className="mt-1 text-xs text-slate-400">
            Let&apos;s get to know you better. This information will appear on your profile
          </div>
        </div>

        <div className="mt-5 flex items-center gap-4">
          <div className="relative h-14 w-14 overflow-hidden rounded-full inline-flex items-center">
            <img
              className="object-contain"
              src={defaultUserAvatar}
              alt=""
              aria-hidden="true"
            />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-700">Profile photo</div>
            <div className="text-xs text-slate-400">
              Optional. You can keep the default photo
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <TextField label="Full name" placeholder="Murat Abdilda" />
          <TextField label="Username" placeholder="mura_legenda" />
          <label className="grid gap-2 text-left text-sm text-slate-600">
            <span>City</span>
            <div className="relative">
              <input
                className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                placeholder="Almaty, Kazakhstan"
                value={cityQuery}
                onChange={(event) => {
                  setCityQuery(event.target.value);
                  setCityOpen(true);
                }}
                onBlur={() => setTimeout(() => setCityOpen(false), 120)}
                onFocus={() => setCityOpen(true)}
                type="text"
              />
              {cityOpen && cityOptions.length > 0 ? (
                <div className="absolute z-10 mt-2 w-full rounded-xl border border-slate-200 bg-white py-1 text-sm shadow-lg">
                  {cityOptions.map((option) => (
                    <button
                      key={option.label}
                      type="button"
                      className="w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-50"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => {
                        setCityQuery(option.label);
                        setCityOpen(false);
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </label>
          <ModernDatePicker
            label="Date of Birth"
            value={birthDate}
            onChange={setBirthDate}
            placeholderValue={birthPlaceholder}
          />
          <TextField label="Job" placeholder="Musician" />
          <label className="grid gap-2 text-left text-sm text-slate-600 mt-3">
            <span>Sex</span>
            <div className="relative" ref={sexWrapperRef}>
              <button
                ref={sexButtonRef}
                type="button"
                className={`flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-700 outline-none transition focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] ${
                  sex === "Other" ? "pointer-events-none opacity-0" : ""
                }`}
                onClick={() => setSexOpen((prev) => !prev)}
              >
                <span>{sex}</span>
                <span className="mr-1 text-lg text-slate-500">▾</span>
              </button>
              {sexOpen ? (
                <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl bg-white shadow-[0_14px_34px_-18px_rgba(15,23,42,0.45)]">
                  {["Male", "Female", "Other"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className="w-full px-4 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-50"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => {
                        setSex(option);
                        setSexOpen(false);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : null}
              {sex === "Other" ? (
                <div className="absolute inset-0">
                  <input
                    ref={sexOtherRef}
                    className="h-full w-full rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm outline-none transition focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                    placeholder="Specify"
                    value={sexOther}
                    onChange={(event) => setSexOther(event.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-sm text-slate-400 hover:text-slate-600"
                    onClick={() => {
                      setSex("Male");
                      setSexOther("");
                      setSexOpen(false);
                    }}
                  >
                    x
                  </button>
                </div>
              ) : null}
            </div>
          </label>
        </div>
      </div>

      <div className="mt-6">
        <PrimaryButton onClick={onNext}>Next</PrimaryButton>
      </div>
    </>
  );
}