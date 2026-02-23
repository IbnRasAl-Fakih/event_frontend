import React, { useState } from "react";
import AuthHeader from "./AuthHeader";
import Stepper from "./Stepper";
import PrimaryButton from "../PrimaryButton";
import hidePasswordIcon from "../../images/hide_password_icon.png";
import showPasswordIcon from "../../images/show_password_icon.png";

export default function AuthStepPassword({ steps, activeIndex = 2, onNext }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <AuthHeader title="Create an account" subtitle="" />

      <Stepper steps={steps} activeIndex={activeIndex} />

      <div className="mt-6 grid gap-6 text-left text-sm text-slate-600">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="font-medium text-slate-700">Password</span>
            <button
              type="button"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <img
                className="h-5 w-5 object-contain"
                src={showPassword ? hidePasswordIcon : showPasswordIcon}
                alt=""
                aria-hidden="true"
              />
              <span>{showPassword ? "Hide" : "Show"}</span>
            </button>
          </div>
          <input
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
          />
          <div className="mt-2 text-xs text-slate-400">
            Use 8 or more characters with a mix of letters, numbers & symbols
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="font-medium text-slate-700">Confirm password</span>
            <button
              type="button"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"
              onClick={() => setShowConfirm((prev) => !prev)}
            >
              <img
                className="h-5 w-5 object-contain"
                src={showConfirm ? hidePasswordIcon : showPasswordIcon}
                alt=""
                aria-hidden="true"
              />
              <span>{showConfirm ? "Hide" : "Show"}</span>
            </button>
          </div>
          <input
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
            type={showConfirm ? "text" : "password"}
            placeholder="Enter your password"
          />
        </div>
      </div>

      <div className="mt-8">
        <PrimaryButton onClick={onNext}>Create</PrimaryButton>
      </div>
    </>
  );
}