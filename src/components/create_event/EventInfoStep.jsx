import React from "react";
import DropdownField from "../DropdownField";
import ModernDatePicker from "../ModernDatePicker";
import ModernTimePicker from "../ModernTimePicker";
import EventField from "./EventField";
import PrimaryButton from "../PrimaryButton";

export default function EventInfoStep({
  form,
  dateValue,
  setDateValue,
  setField,
  setFieldValue,
  onNext,
}) {
  return (
    <>
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
          <PrimaryButton className="mt-0 rounded-xl text-sm" onClick={onNext}>
            Next
          </PrimaryButton>
        </div>
      </div>
    </>
  );
}