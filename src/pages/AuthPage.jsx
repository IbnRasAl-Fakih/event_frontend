import React, { useState } from "react";
import AuthStepEmail from "../components/auth/AuthStepEmail";
import AuthStepVerify from "../components/auth/AuthStepVerify";
import AuthStepBasicInfo from "../components/auth/AuthStepBasicInfo";
import AuthStepPassword from "../components/auth/AuthStepPassword";
import AuthStepSignIn from "../components/auth/AuthStepSignIn";
import AuthStepForgotPassword from "../components/auth/AuthStepForgotPassword";
import ResetPassword from "../components/auth/ResetPassword";
import Footer from "../components/Footer";

export default function AuthPage() {
  const [step, setStep] = useState(1);
  const steps = [
    "Enter your email address",
    "Provide your basic info",
    "Create your password",
  ];

  return (
    <div className="flex flex-col text-slate-900">
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
      <Footer />
    </div>
  );
}
