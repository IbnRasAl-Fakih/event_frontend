import React, { useState } from "react";
import DropdownField from "../components/DropdownField";
import ModernDatePicker from "../components/ModernDatePicker";
import ModernTimePicker from "../components/ModernTimePicker";
import StepProgress from "../components/create_event/StepProgress";
import EventField from "../components/create_event/EventField";
import PrimaryButton from "../components/PrimaryButton";

const STEP_ITEMS = ["Event info", "Media", "Members", "Review"];

export default function CreateEventPage() {
  const [dateValue, setDateValue] = useState(null);
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

  const setField = (key) => (event) => {
    const nextValue = event.target.value;
    setForm((prev) => ({ ...prev, [key]: nextValue }));
  };
  const setFieldValue = (key) => (nextValue) => {
    setForm((prev) => ({ ...prev, [key]: nextValue }));
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
          <StepProgress steps={STEP_ITEMS} activeIndex={0} />
        </div>

        <div className="relative z-10 -mt-8 rounded-2xl border border-slate-200 bg-white px-4 pb-6 pt-10 shadow-[0_18px_45px_-35px_rgba(15,23,42,0.35)] sm:px-6 sm:pb-7 sm:pt-12 md:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Event information</h2>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-[2fr_1fr]">
            <EventField placeholder="Name" value={form.name} onChange={setField("name")} />
            <ModernDatePicker
              label="Date"
              hideLabel
              value={dateValue}
              onChange={setDateValue}
              groupClassName="h-12 border-slate-200 bg-slate-50 text-sm text-slate-700 focus-within:border-sky-300 focus-within:ring-2 focus-within:ring-sky-100"
              dateInputClassName="px-4 py-3"
              buttonClassName="text-slate-500"
              valueSegmentClassName="text-sm font-medium text-slate-700"
              iconClassName="text-slate-700"
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-[2fr_1fr]">
            <EventField
              placeholder="Location"
              value={form.location}
              onChange={setField("location")}
            />
            <ModernTimePicker
              placeholder="Time"
              value={form.time}
              onChange={setFieldValue("time")}
              iconClassName="text-slate-700"
            />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-5">
            <EventField placeholder="Price" value={form.price} onChange={setField("price")} />
            <DropdownField
              label="Status"
              hideLabel
              placeholder="Status"
              value={form.status}
              options={["Active", "Draft", "Planned", "Closed"]}
              onChange={setFieldValue("status")}
              buttonClassName="h-12 bg-slate-50 py-0 text-sm font-medium focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
              menuClassName="mt-1 border border-slate-200"
              optionClassName="text-sm"
            />
            <EventField placeholder="Duration" value={form.duration} onChange={setField("duration")} />
            <EventField placeholder="Size" type="number" value={form.size} onChange={setField("size")} />
            <EventField
              placeholder="Min rating"
              type="number"
              value={form.minRating}
              onChange={setField("minRating")}
            />
          </div>

          <div className="mt-4">
            <EventField placeholder="Slogan" value={form.slogan} onChange={setField("slogan")} />
          </div>

          <div className="mt-4">
            <EventField placeholder="Tags" value={form.tags} onChange={setField("tags")} />
          </div>

          <div className="mt-4">
            <EventField
              as="textarea"
              placeholder="Type description here ...."
              value={form.description}
              onChange={setField("description")}
              rows={6}
            />
          </div>

          <div className="mt-5 flex justify-end">
            <div className="w-full max-w-40">
              <PrimaryButton className="mt-0 rounded-xl text-sm">
                Next
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}