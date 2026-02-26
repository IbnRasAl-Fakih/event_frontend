import React, { useEffect, useRef, useState } from "react";
import StepProgress from "../components/create_event/StepProgress";
import PrimaryButton from "../components/PrimaryButton";
import MediaStep from "../components/create_event/MediaStep";
import EventInfoStep from "../components/create_event/EventInfoStep";

const STEP_ITEMS = ["Event info", "Media", "Members", "Review"];

export default function CreateEventPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [dateValue, setDateValue] = useState(null);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [coverFileId, setCoverFileId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    location: "",
    time: "18:00",
    price: "",
    status: "",
    duration: "",
    size: "",
    minRating: "",
    slogan: "",
    tags: "",
    description: "",
  });
  const mediaFilesRef = useRef(mediaFiles);

  useEffect(() => {
    mediaFilesRef.current = mediaFiles;
  }, [mediaFiles]);

  useEffect(() => {
    return () => {
      mediaFilesRef.current.forEach((item) => {
        if (item.previewUrl) {
          URL.revokeObjectURL(item.previewUrl);
        }
      });
    };
  }, []);

  const setField = (key) => (event) => {
    const nextValue = event.target.value;
    setForm((prev) => ({ ...prev, [key]: nextValue }));
  };
  const setFieldValue = (key) => (nextValue) => {
    setForm((prev) => ({ ...prev, [key]: nextValue }));
  };
  const goNext = () => setActiveStep((prev) => Math.min(prev + 1, STEP_ITEMS.length - 1));
  const goBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  const renderPlaceholderStep = (title) => (
    <>
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h2>
      <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center">
        <p className="text-base font-medium text-slate-700">{title} step is not implemented yet</p>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-40">
          <PrimaryButton className="mt-0 bg-white hover:bg-sky-50" onClick={goBack}>
            Back
          </PrimaryButton>
        </div>
        <div className="w-full sm:max-w-40">
          <PrimaryButton className="mt-0 rounded-sm text-sm" onClick={goNext} disabled={activeStep === STEP_ITEMS.length - 1}>
            Next
          </PrimaryButton>
        </div>
      </div>
    </>
  );

  const renderStepContent = () => {
    if (activeStep === 0) {
      return (
        <EventInfoStep
          form={form}
          dateValue={dateValue}
          setDateValue={setDateValue}
          setField={setField}
          setFieldValue={setFieldValue}
          onNext={goNext}
        />
      );
    }

    if (activeStep === 1) {
      return (
        <MediaStep
          files={mediaFiles}
          setFiles={setMediaFiles}
          coverFileId={coverFileId}
          setCoverFileId={setCoverFileId}
          onBack={goBack}
          onNext={goNext}
        />
      );
    }

    return renderPlaceholderStep(STEP_ITEMS[activeStep]);
  };

  return (
    <section className="min-h-screen px-4 py-10 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Create new Event</h1>
          <p className="mt-3 text-sm font-medium text-slate-500 sm:text-base">
            This information will describe more about event
          </p>
        </div>

        <div className="relative z-20 mt-8 sm:mt-10">
          <StepProgress steps={STEP_ITEMS} activeIndex={activeStep} />
        </div>

        <div className="relative z-10 -mt-8 rounded-2xl border border-slate-200 bg-white px-4 pb-6 pt-10 shadow-[0_18px_45px_-35px_rgba(15,23,42,0.35)] sm:px-6 sm:pb-7 sm:pt-12 md:px-8">
          {renderStepContent()}
        </div>
      </div>
    </section>
  );
}
