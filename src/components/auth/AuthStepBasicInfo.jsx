import React, { useEffect, useMemo, useRef, useState } from "react";
import AuthHeader from "./AuthHeader";
import Stepper from "./Stepper";
import TextField from "./TextField";
import AuthDropdownField from "../DropdownField";
import PrimaryButton from "../PrimaryButton";
import defaultUserAvatar from "../../images/default_user_avatar.png";
import uploadAvatarButtonIcon from "../../images/upload_avatar_button_icon.png";
import worldCities from "world-cities-json";
import { parseDate } from "@internationalized/date";
import ModernDatePicker from "../ModernDatePicker";
import PhotoEditorModal from "../PhotoEditorModal";

export default function AuthStepBasicInfo({ steps, activeIndex = 1, onNext }) {
  const [sex, setSex] = useState("");
  const [sexOther, setSexOther] = useState("");
  const [cityQuery, setCityQuery] = useState("");
  const [cityOpen, setCityOpen] = useState(false);
  const [birthDate, setBirthDate] = useState(null);
  const [avatarSrc, setAvatarSrc] = useState(defaultUserAvatar);
  const [uploadedPhotoSrc, setUploadedPhotoSrc] = useState("");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const sexOtherRef = useRef(null);
  const photoInputRef = useRef(null);

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
    if (sex === "Other") {
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
          <div className="relative inline-flex h-20 w-20 items-center justify-center rounded-full border border-sky-300 bg-sky-50">
            <img
              className="h-full w-full rounded-full object-cover"
              src={avatarSrc}
              alt="Profile"
            />
            <button
              type="button"
              onClick={() => photoInputRef.current?.click()}
              className="absolute bottom-1 right-0 z-10 grid h-7 w-7 translate-x-1/3 translate-y-1/3 place-items-center rounded-full border-2 border-white bg-sky-500 text-white shadow-sm"
              aria-label="Upload profile photo"
            >
              <img
                className="h-7 w-7 object-contain"
                src={uploadAvatarButtonIcon}
                alt=""
                aria-hidden="true"
              />
            </button>
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => {
                  const nextSrc = reader.result;
                  if (typeof nextSrc !== "string") return;
                  setUploadedPhotoSrc(nextSrc);
                  setIsEditorOpen(true);
                };
                reader.readAsDataURL(file);
                event.target.value = "";
              }}
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
          />
          <TextField label="Job" placeholder="Musician" />
          {sex !== "Other" ? (
            <AuthDropdownField
              label="Sex"
              className="mt-3"
              placeholder="Sex"
              value={sex}
              options={["Male", "Female", "Other"]}
              onChange={setSex}
            />
          ) : (
            <label className="mt-3 grid gap-2 text-left text-sm text-slate-600">
              <span>Sex</span>
              <div className="relative">
                <input
                  ref={sexOtherRef}
                  className="h-[42px] w-full rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm outline-none transition focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                  placeholder="Specify"
                  value={sexOther}
                  onChange={(event) => setSexOther(event.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-2/3 text-sm text-slate-400 hover:text-slate-600"
                  onClick={() => {
                    setSex("");
                    setSexOther("");
                  }}
                >
                  x
                </button>
              </div>
            </label>
          )}
        </div>
      </div>

      <div className="mt-6">
        <PrimaryButton onClick={onNext}>Next</PrimaryButton>
      </div>

      {isEditorOpen && uploadedPhotoSrc ? (
        <PhotoEditorModal
          imageSrc={uploadedPhotoSrc}
          onClose={() => setIsEditorOpen(false)}
          onSave={(resultSrc) => {
            setAvatarSrc(resultSrc);
            setIsEditorOpen(false);
          }}
        />
      ) : null}
    </>
  );
}
