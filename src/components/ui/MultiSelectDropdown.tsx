"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export type MultiSelectOption = {
  value: string;
  label: string;
  hint?: string;
};

type Props = {
  label: string;
  hint?: string;
  placeholder?: string;
  countNoun?: string;
  options: MultiSelectOption[];
  value: string[];
  onChange: (next: string[]) => void;
  searchable?: boolean;
  searchPlaceholder?: string;
  disabled?: boolean;
  className?: string;
  /** Pills shown in the closed trigger before overflow badge */
  maxVisiblePills?: number;
};

const DEFAULT_MAX_PILLS = 3;

export default function MultiSelectDropdown({
  label,
  hint,
  placeholder = "Select options…",
  countNoun = "items",
  options,
  value,
  onChange,
  searchable = true,
  searchPlaceholder = "Search",
  disabled = false,
  className = "",
  maxVisiblePills = DEFAULT_MAX_PILLS,
}: Props) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const valueSet = useMemo(() => new Set(value), [value]);

  const optionByValue = useMemo(() => new Map(options.map((o) => [o.value, o])), [options]);

  const selectedOptions = useMemo(
    () => value.map((v) => optionByValue.get(v)).filter((o): o is MultiSelectOption => Boolean(o)),
    [value, optionByValue],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter(
      (o) =>
        o.label.toLowerCase().includes(q) ||
        (o.hint?.toLowerCase().includes(q) ?? false) ||
        o.value.toLowerCase().includes(q),
    );
  }, [options, query]);

  const visiblePills = selectedOptions.slice(0, maxVisiblePills);
  const overflowCount = Math.max(0, selectedOptions.length - maxVisiblePills);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function toggleOption(optValue: string) {
    onChange(
      valueSet.has(optValue) ? value.filter((v) => v !== optValue) : [...value, optValue],
    );
  }

  function removePill(optValue: string, e: React.MouseEvent) {
    e.stopPropagation();
    onChange(value.filter((v) => v !== optValue));
  }

  return (
    <div ref={rootRef} className={className}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-foreground/70">
        {label}
        {hint ? (
          <span className="font-normal normal-case text-foreground/50"> {hint}</span>
        ) : null}
      </span>

      <div
        className={`overflow-hidden rounded-2xl border bg-section transition-shadow ${
          open
            ? "border-brand/60 shadow-lg shadow-brand/10 ring-2 ring-brand/15"
            : "border-foreground/12 hover:border-brand/35"
        } ${disabled ? "pointer-events-none opacity-60" : ""}`}
      >
        <button
          type="button"
          disabled={disabled}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={listId}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center gap-2 px-3 py-2.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand/30 sm:px-4 sm:py-3"
        >
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
            {selectedOptions.length === 0 ? (
              <span className="text-sm text-foreground/45">{placeholder}</span>
            ) : (
              <>
                {visiblePills.map((opt) => (
                  <span
                    key={opt.value}
                    className="inline-flex max-w-[9rem] items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white shadow-sm shadow-brand/25 sm:max-w-[11rem]"
                  >
                    <span className="truncate">{opt.label}</span>
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => removePill(opt.value, e)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          removePill(opt.value, e as unknown as React.MouseEvent);
                        }
                      }}
                      className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/20 transition hover:bg-white/35"
                      aria-label={`Remove ${opt.label}`}
                    >
                      <FontAwesomeIcon icon={faXmark} className="text-[9px]" />
                    </span>
                  </span>
                ))}
                {overflowCount > 0 ? (
                  <>
                    <span className="text-sm font-medium text-foreground/40" aria-hidden>
                      …
                    </span>
                    <span
                      className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-brand px-1.5 text-xs font-bold text-white shadow-sm"
                      title={`${overflowCount} more ${countNoun} selected`}
                    >
                      {overflowCount}
                    </span>
                  </>
                ) : null}
              </>
            )}
          </div>
          <FontAwesomeIcon
            icon={open ? faChevronUp : faChevronDown}
            className="shrink-0 text-sm text-foreground/40"
            aria-hidden
          />
        </button>

        {open ? (
          <div className="border-t border-foreground/10 px-3 pb-3 pt-3 sm:px-4 sm:pb-4">
            {searchable ? (
              <div className="relative">
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="h-10 w-full rounded-xl border-0 bg-card py-2 pl-3 pr-10 text-sm text-foreground shadow-sm outline-none ring-1 ring-foreground/8 placeholder:text-foreground/40 focus:ring-2 focus:ring-brand/25"
                  autoFocus
                />
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-foreground/35"
                  aria-hidden
                />
              </div>
            ) : null}

            <div
              role="listbox"
              id={listId}
              aria-multiselectable
              className={`max-h-56 overflow-y-auto sm:max-h-64 ${searchable ? "mt-3" : ""}`}
            >
              {filtered.length === 0 ? (
                <p className="py-8 text-center text-sm text-foreground/50">No matches</p>
              ) : (
                <ul className="grid grid-cols-1 gap-1 min-[420px]:grid-cols-2 min-[420px]:gap-x-4 min-[420px]:gap-y-0.5">
                  {filtered.map((opt) => {
                    const checked = valueSet.has(opt.value);
                    return (
                      <li key={opt.value}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={checked}
                          title={opt.hint ?? opt.label}
                          onClick={() => toggleOption(opt.value)}
                          className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-1 py-2 text-left transition hover:bg-card/80"
                        >
                          <span
                            className={`h-[18px] w-[18px] shrink-0 rounded-[4px] border-2 transition ${
                              checked
                                ? "border-brand bg-brand"
                                : "border-foreground/20 bg-card"
                            }`}
                            aria-hidden
                          />
                          <span className="min-w-0 truncate text-sm text-foreground">{opt.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
