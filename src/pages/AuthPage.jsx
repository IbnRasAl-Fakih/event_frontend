import React, { useState } from "react";
import AuthStepEmail from "../components/AuthStepEmail";
import AuthStepVerify from "../components/AuthStepVerify";
import AuthStepBasicInfo from "../components/AuthStepBasicInfo";
import AuthStepPassword from "../components/AuthStepPassword";

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
          <div className="w-full max-w-xl text-center">
            <AuthStepEmail
              steps={steps}
              activeIndex={0}
              onNext={() => setStep(2)}
            />
          </div>
        ) : step === 2 ? (
          <div className="w-full max-w-xl rounded-[32px] border border-slate-200 bg-white px-8 py-10 text-center shadow-[0_20px_50px_-20px_rgba(15,23,42,0.35)] sm:px-10 sm:py-12">
            <AuthStepVerify
              onBack={() => setStep(1)}
              onNext={() => setStep((prev) => prev + 1)}
            />
          </div>
        ) : step === 3 ? (
          <div className="w-full max-w-xl text-center">
            <AuthStepBasicInfo
              steps={steps}
              activeIndex={1}
              onNext={() => setStep((prev) => prev + 1)}
            />
          </div>
        ) : step === 4 ? (
          <div className="w-full max-w-xl text-center">
            <AuthStepPassword
              steps={steps}
              activeIndex={2}
              onNext={() => setStep((prev) => prev + 1)}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
