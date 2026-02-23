import React from "react";
import socialItems from "../constants/socialItems";

function placeholder(action) {
  console.info(`TODO: ${action}`);
}

export default function ComingSoonPage() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white px-6 py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_30%,rgba(170,232,255,0.75),transparent_38%),radial-gradient(circle_at_36%_66%,rgba(117,202,255,0.72),transparent_46%),radial-gradient(circle_at_74%_53%,rgba(136,158,255,0.62),transparent_38%),radial-gradient(circle_at_50%_100%,rgba(120,210,255,0.35),transparent_44%)]" />
      <div className="pointer-events-none absolute left-[-130px] top-[-120px] h-[500px] w-[500px] rounded-full bg-cyan-200/65 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-170px] left-[24%] h-[560px] w-[560px] rounded-full bg-sky-300/70 blur-[130px]" />
      <div className="pointer-events-none absolute right-[-90px] top-[24%] h-[500px] w-[500px] rounded-full bg-indigo-300/65 blur-[125px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0)_28%,rgba(255,255,255,0.18)_48%,rgba(255,255,255,0.62)_72%,rgba(255,255,255,0.94)_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.22] [background-image:radial-gradient(rgba(42,64,101,0.35)_0.45px,transparent_0.45px)] [background-size:3px_3px]" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-6xl">
          We are creating
          <br />
          something amazing
        </h1>
        <p className="mt-7 text-xl text-slate-700">We will launch this page soon!</p>

        <p className="mt-10 text-xs uppercase tracking-[0.16em] text-slate-500">
          Follow our social media
        </p>
        <div className="mt-4 flex justify-center gap-6">
          {socialItems.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => placeholder(`Social: ${item.key}`)}
            >
              <img
                className="h-8 w-8 object-contain"
                src={item.icon || ""}
                alt=""
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
