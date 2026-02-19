import React, { useState } from "react";
import AuthStepEmail from "../components/AuthStepEmail";
import AuthStepVerify from "../components/AuthStepVerify";
import AuthStepBasicInfo from "../components/AuthStepBasicInfo";
import AuthStepPassword from "../components/AuthStepPassword";
import AuthStepSignIn from "../components/AuthStepSignIn";
import AuthStepForgotPassword from "../components/AuthStepForgotPassword";
import ResetPassword from "../components/ResetPassword";

export default function AuthPage() {
  const [step, setStep] = useState(1);
  const steps = [
    "Enter your email address",
    "Provide your basic info",
    "Create your password",
  ];

  return (
    <div className="min-h-screen text-slate-900">
      <div className="mx-auto grid min-h-screen w-full place-items-center px-4 py-8">
        {step === 1 ? (
          <div className="w-full">
            <AuthStepSignIn 
              onCreateAccount={() => setStep(2)}
              onForgotPassword={() => setStep(6)}
            />
          </div>
        ) : step === 2 ? (
          <div className="w-full max-w-xl text-center">
            <AuthStepEmail
              steps={steps}
              activeIndex={0}
              onNext={() => setStep(3)}
              onLogIn={() => setStep(1)}
            />
          </div>
        ) : step === 3 ? (
          <div className="w-full max-w-xl rounded-[32px] border border-slate-200 bg-white px-8 py-10 text-center shadow-[0_20px_50px_-20px_rgba(15,23,42,0.35)] sm:px-10 sm:py-12">
            <AuthStepVerify
              onBack={() => setStep(2)}
              onNext={() => setStep(4)}
            />
          </div>
        ) : step === 4 ? (
          <div className="w-full max-w-xl text-center">
            <AuthStepBasicInfo
              steps={steps}
              activeIndex={1}
              onNext={() => setStep(5)}
            />
          </div>
        ) : step === 5 ? (
          <div className="w-full max-w-xl text-center">
            <AuthStepPassword
              steps={steps}
              activeIndex={2}
              onNext={() => setStep(1)}
            />
          </div>
        ) : step === 6 ? (
          <div className="w-full">
            <AuthStepForgotPassword 
              onBack={() => setStep(1)}
              onNext={() => setStep(7)}
            />
          </div>
        ) : step === 7 ? (
          <div className="w-full max-w-xl rounded-[32px] border border-slate-200 bg-white px-8 py-10 text-center shadow-[0_20px_50px_-20px_rgba(15,23,42,0.35)] sm:px-10 sm:py-12">
            <AuthStepVerify
              onBack={() => setStep(6)}
              onNext={() => setStep(8)}
            />
          </div>
        ) : step === 8 ? (
          <div className="w-full max-w-xl text-center">
            <ResetPassword onNext={() => setStep(1)} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
