import React from "react";
import AuthHeader from "../components/AuthHeader";
import Stepper from "../components/Stepper";
import TextField from "../components/TextField";
import PrimaryButton from "../components/PrimaryButton";
import Divider from "../components/Divider";
import GoogleButton from "../components/GoogleButton";

export default function AuthPage() {
  return (
    <div className="min-h-screen text-slate-900">
      <div className="mx-auto grid min-h-screen w-full place-items-center px-4 py-8">
        <div className="w-full max-w-xl text-center">
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

        <Stepper
          steps={[
            "Enter your email address",
            "Provide your basic info",
            "Create your password",
          ]}
          activeIndex={0}
        />

        <TextField
          label="What's your email?"
          type="email"
          placeholder="Enter your email address"
        />

        <PrimaryButton>Next</PrimaryButton>

        <Divider label="OR" />

        <GoogleButton>Sign up with Google</GoogleButton>
      </div>
      </div>
    </div>
  );
}
