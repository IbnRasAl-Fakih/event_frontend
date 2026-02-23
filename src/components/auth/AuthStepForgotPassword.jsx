import React from "react";
import AuthHeader from "./AuthHeader";
import TextField from "./TextField";
import PrimaryButton from "../PrimaryButton";

export default function AuthStepForgotPassword({ onBack, onNext }) {
  return (
    <div className="mx-auto w-full max-w-xl text-center">
      <AuthHeader
        title="Forgot password?"
        subtitle="No worries, we'll send you reset instruction"
      />

      <div className="mt-4 text-left">
        <TextField
          label="Email"
          type="email"
          placeholder="Enter your email address"
        />
      </div>

      <div className="mt-6">
        <PrimaryButton onClick={onNext}>Reset Password</PrimaryButton>
      </div>

      <div className="mt-2">
        <button onClick={onBack} className="w-full px-4 py-3 text-base font-semibold text-slate-700">Back to login</button>
      </div>
    </div>
  );
}