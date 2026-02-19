import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarStateContext,
  DateInput,
  DatePicker,
  DateSegment,
  Dialog,
  Group,
  Label,
  Popover,
} from "react-aria-components";
import { useLocale } from "react-aria";

function useOutsideClose(ref, isOpen, onClose) {
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (event) => {
      if (!ref.current?.contains(event.target)) onClose();
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose, ref]);
}

function CustomDropdown({ label, value, options, onChange, widthClass }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useOutsideClose(wrapperRef, open, () => setOpen(false));

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        className="flex items-center gap-2 text-sm font-medium text-slate-700"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{label}</span>
      </button>
      {open ? (
        <div
          className={`absolute z-20 mt-2 max-h-64 overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 text-sm shadow-[0_18px_40px_-20px_rgba(15,23,42,0.45)] ${
            widthClass || "w-40"
          }`}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`w-full px-3 py-2 text-left transition hover:bg-slate-50 ${
                option.value === value ? "bg-slate-100 text-slate-900" : "text-slate-700"
              }`}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function MonthDropdown() {
  const state = React.useContext(CalendarStateContext);
  const { locale } = useLocale();
  const monthOptions = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => {
        const month = index + 1;
        const label = new Intl.DateTimeFormat(locale, { month: "long" }).format(
          new Date(2020, index, 1)
        );
        return { value: month, label };
      }),
    [locale]
  );

  if (!state) return null;
  const selectedMonth = state.focusedDate.month;
  const selectedLabel =
    monthOptions.find((option) => option.value === selectedMonth)?.label ||
    "";

  return (
    <CustomDropdown
      label={selectedLabel}
      value={selectedMonth}
      options={monthOptions}
      widthClass="w-28"
      onChange={(nextMonth) =>
        state.setFocusedDate(state.focusedDate.set({ month: Number(nextMonth) }))
      }
    />
  );
}

function YearDropdown() {
  const state = React.useContext(CalendarStateContext);
  const currentYear = new Date().getFullYear();
  const startYear = 1900;
  const years = useMemo(() => {
    const list = [];
    for (let year = currentYear; year >= startYear; year -= 1) {
      list.push(year);
    }
    return list;
  }, [currentYear]);

  if (!state) return null;
  const selectedYear = state.focusedDate.year;
  const yearOptions = years.map((year) => ({ value: year, label: `${year}` }));

  return (
    <CustomDropdown
      label={String(selectedYear)}
      value={selectedYear}
      options={yearOptions}
      widthClass="w-24"
      onChange={(nextYear) =>
        state.setFocusedDate(state.focusedDate.set({ year: Number(nextYear) }))
      }
    />
  );
}

export default function ModernDatePicker({
  label,
  value,
  onChange,
  placeholderValue,
}) {
  return (
    <DatePicker
      className="flex flex-col gap-2"
      value={value}
      onChange={onChange}
      placeholderValue={placeholderValue}
      granularity="day"
    >
      <Label className="text-sm text-slate-600">{label}</Label>
      <Group className="flex w-full items-center rounded-xl border border-slate-200 bg-white text-sm text-slate-700 outline-none transition focus-within:border-[var(--color-primary)] focus-within:ring-1 focus-within:ring-[var(--color-primary)]">
        <DateInput className="flex flex-1 px-4 py-3.5">
          {(segment) => (
            <DateSegment
              segment={segment}
              className="rounded p-0.5 leading-none text-slate-700 outline-none ring-0 data-[placeholder]:text-slate-400 data-[type=literal]:text-slate-400 data-[focused]:bg-transparent data-[focused]:text-slate-700"
            />
          )}
        </DateInput>
        <Button className="mr-3 h-8 w-8 rounded-lg text-slate-500 transition hover:bg-slate-100">
          <span className="text-lg leading-none">▾</span>
        </Button>
      </Group>
      <Popover className="rounded-2xl bg-white p-3 shadow-[0_18px_40px_-20px_rgba(15,23,42,0.45)]">
        <Dialog className="outline-none">
          <Calendar className="w-72">
            <header className="flex items-center justify-between px-2 pb-2">
              <Button
                slot="previous"
                className="h-8 w-8 rounded-lg text-slate-500 transition hover:bg-slate-100"
              >
                {"<"}
              </Button>
              <div className="flex items-center gap-1 px-1 py-1">
                <MonthDropdown />
                <YearDropdown />
              </div>
              <Button
                slot="next"
                className="h-8 w-8 rounded-lg text-slate-500 transition hover:bg-slate-100"
              >
                {">"}
              </Button>
            </header>
            <CalendarGrid className="w-full border-separate border-spacing-1">
              <CalendarGridHeader>
                {(day) => (
                  <CalendarHeaderCell className="text-center text-xs font-medium text-slate-400">
                    {day}
                  </CalendarHeaderCell>
                )}
              </CalendarGridHeader>
              <CalendarGridBody>
                {(date) => (
                  <CalendarCell
                    date={date}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-sm text-slate-700 outline-none transition data-[selected]:bg-[var(--color-primary)] data-[selected]:text-white data-[hovered]:bg-slate-100 data-[focus-visible]:ring-2 data-[focus-visible]:ring-[var(--color-primary)]"
                  />
                )}
              </CalendarGridBody>
            </CalendarGrid>
          </Calendar>
        </Dialog>
      </Popover>
    </DatePicker>
  );
}
