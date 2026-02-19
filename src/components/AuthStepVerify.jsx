import React, { useMemo, useRef, useState } from "react";
import AuthHeader from "./AuthHeader";
import PrimaryButton from "./PrimaryButton";
import securityIcon from "../images/security_icon.png";

export default function AuthStepVerify({ onBack, onNext }) {
  const [codes, setCodes] = useState(() => Array(6).fill(""));
  const [focusedIndex, setFocusedIndex] = useState(null);
  const inputsRef = useRef([]);
  const placeholder = "0";

  const setInputRef = (index) => (node) => {
    inputsRef.current[index] = node;
  };

  const focusInput = (index) => {
    const node = inputsRef.current[index];
    if (node) node.focus();
  };

  const handleChange = (index, event) => {
    const raw = event.target.value || "";
    const nextChar = raw.replace(/\D/g, "").slice(-1);

    setCodes((prev) => {
      const next = [...prev];
      next[index] = nextChar;
      return next;
    });

    if (nextChar && index < codes.length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !codes[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pasted = (event.clipboardData?.getData("text") || "")
      .replace(/\D/g, "")
      .slice(0, codes.length);
    if (!pasted) return;

    setCodes((prev) => {
      const next = [...prev];
      pasted.split("").forEach((char, i) => {
        next[i] = char;
      });
      return next;
    });

    const nextIndex = Math.min(pasted.length, codes.length - 1);
    focusInput(nextIndex);
  };

  const placeholderByIndex = useMemo(
    () =>
      codes.map((value, index) =>
        value || focusedIndex === index ? "" : placeholder
      ),
    [codes, focusedIndex]
  );

  return (
    <>
      <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-[var(--color-bg)]">
        <img className="h-8 w-8 object-contain" src={securityIcon} alt="securityIcon" />
      </div>
      <AuthHeader
        title="Verify your identity"
        subtitle={
          <>
            We&apos;ve sent a 6-digit verification code to your email address.
            Enter the code below to confirm your identity.
          </>
        }
        showLogo={false}
      />

      <div className="mt-12 text-left text-sm text-slate-600">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <React.Fragment key={`code-${index}`}>
              <input
                ref={setInputRef(index)}
                className="h-14 w-14 rounded-2xl border border-slate-300 text-center text-2xl font-semibold text-slate-800 outline-none transition placeholder-[#939394] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                inputMode="numeric"
                maxLength={1}
                onChange={(event) => handleChange(index, event)}
                onBlur={() => setFocusedIndex(null)}
                onFocus={() => setFocusedIndex(index)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                onPaste={handlePaste}
                placeholder={placeholderByIndex[index]}
                type="text"
                value={codes[index]}
              />
              {index === 2 ? (
                <span className="text-2xl font-bold text-slate-400">-</span>
              ) : null}
            </React.Fragment>
          ))}
        </div>
      </div>

      <button
        className="mt-4 text-sm font-medium text-[var(--color-primary)] hover:opacity-80"
        type="button"
      >
        Didn&apos;t receive a code? Resend
      </button>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <button
          className="mt-4 w-full rounded-full border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
          type="button"
          onClick={onBack}
        >
          Back
        </button>
        <PrimaryButton onClick={onNext}>Next</PrimaryButton>
      </div>
    </>
  );
}
