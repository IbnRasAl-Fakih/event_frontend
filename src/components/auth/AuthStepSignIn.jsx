import React, { useState } from "react";
import AuthHeader from "./AuthHeader";
import PrimaryButton from "../PrimaryButton";
import SecondaryButton from "../SecondaryButton";
import Divider from "../Divider";
import showPasswordIcon from "../../images/show_password_icon.png";
import hidePasswordIcon from "../../images/hide_password_icon.png";

export default function AuthStepSignIn({ onCreateAccount, onForgotPassword }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mx-auto w-full max-w-xl text-center">
      <AuthHeader title="" subtitle="" />

      <div className="w-full rounded-[28px] border border-slate-200 px-10 py-10 text-left shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)]">
        <div className="text-center text-xl font-semibold text-slate-800">
          Sign in
        </div>

        <label className="mt-6 grid gap-2 text-sm text-slate-600">
          <span>Email or mobile phone number</span>
          <input
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
            type="text"
            placeholder="Enter your email"
          />
        </label>

        <label className="mt-4 grid gap-2 text-sm text-slate-600">
          <div className="flex items-center justify-between">
            <span>Your password</span>
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
        </label>

        <div className="mt-6">
          <PrimaryButton>Log in</PrimaryButton>
        </div>

        <p className="mt-4 text-center text-xs text-slate-500">
          By continuing, you agree to the{" "}
          <button className="underline underline-offset-2">Terms of use</button>{" "}
          and{" "}
          <button className="underline underline-offset-2">Privacy Policy</button>.
        </p>

        <div className="mt-6 flex items-center justify-between text-xs text-slate-500">
          <button className="underline underline-offset-2">
            Other issue with sign in
          </button>
          <button onClick={onForgotPassword} className="underline underline-offset-2">
            Forget your password
          </button>
        </div>
      </div>

      <Divider label="New to our community" />

      <SecondaryButton onClick={onCreateAccount}>Create an account</SecondaryButton>
    </div>
  );
}
