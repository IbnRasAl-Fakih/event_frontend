import React, { useState } from "react";
import AuthHeader from "./AuthHeader";
import Stepper from "./Stepper";
import TextField from "./TextField";
import PrimaryButton from "./PrimaryButton";
import Divider from "./Divider";
import GoogleButton from "./GoogleButton";

export default function AuthStepEmail({ steps, activeIndex = 0, onNext }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const isValidEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const handleNext = () => {
    // if (!isValidEmail(email)) {
    //   setError("Enter a valid email address.");
    //   return;
    // }
    // setError("");

    // в конце убрать комменты чтобы была валидация почты
    
    if (onNext) onNext(email.trim());
  };

  return (
    <>
      <AuthHeader
        title="Create an account"
        subtitle={
          <>
            Already have an account?{" "}
            <button className="text-[var(--color-primary)] underline underline-offset-2 hover:opacity-80">
              Log in
            </button>
          </>
        }
      />

      <Stepper steps={steps} activeIndex={activeIndex} />

      <TextField
        label="What's your email?"
        type="email"
        placeholder="Enter your email address"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
          if (error) setError("");
        }}
        error={error}
      />

      <PrimaryButton onClick={handleNext}>Next</PrimaryButton>

      <Divider label="OR" />

      <GoogleButton>Sign up with Google</GoogleButton>
    </>
  );
}