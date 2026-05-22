"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

export type MultiSelectOptionGroup = {
  id: string;
  label: string;
  options: MultiSelectOption[];
};

export type MultiSelectExpandableOption = {
  value: string;
  detail: string;
  onDetailChange: (detail: string) => void;
  detailLabel: string;
  detailPlaceholder: string;
  detailHint?: string;
  required?: boolean;
};

type Props = {
  label: string;
  hint?: string;
  placeholder?: string;
  countNoun?: string;
  options?: MultiSelectOption[];
  groups?: MultiSelectOptionGroup[];
  value: string[];
  onChange: (next: string[]) => void;
  searchable?: boolean;
  searchPlaceholder?: string;
  disabled?: boolean;
  className?: string;
  maxVisiblePills?: number;
  expandableOption?: MultiSelectExpandableOption;
};

const DEFAULT_MAX_PILLS = 2;

function flattenOptions(
  options: MultiSelectOption[] | undefined,
  groups: MultiSelectOptionGroup[] | undefined,
): MultiSelectOption[] {
  if (groups?.length) return groups.flatMap((g) => g.options);
  return options ?? [];
}

export default function MultiSelectDropdown({
  label,
  hint,
  placeholder = "Choose one or more…",
  countNoun = "items",
  options,
  groups,
  value,
  onChange,
  searchable = true,
  searchPlaceholder = "Search…",
  disabled = false,
  className = "",
  maxVisiblePills = DEFAULT_MAX_PILLS,
  expandableOption,
}: Props) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const allOptions = useMemo(() => flattenOptions(options, groups), [options, groups]);
  const valueSet = useMemo(() => new Set(value), [value]);
  const optionByValue = useMemo(() => new Map(allOptions.map((o) => [o.value, o])), [allOptions]);

  const selectedOptions = useMemo(
    () => value.map((v) => optionByValue.get(v)).filter((o): o is MultiSelectOption => Boolean(o)),
    [value, optionByValue],
  );

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const match = (o: MultiSelectOption) =>
      !q ||
      o.label.toLowerCase().includes(q) ||
      (o.hint?.toLowerCase().includes(q) ?? false) ||
      o.value.toLowerCase().includes(q);

    if (groups?.length) {
      return groups
        .map((group) => ({
          ...group,
          options: group.options.filter(match),
        }))
        .filter((group) => group.options.length > 0);
    }

    return [
      {
        id: "all",
        label: "",
        options: (options ?? []).filter(match),
      },
    ];
  }, [groups, options, query]);

  const filteredCount = filteredGroups.reduce((n, g) => n + g.options.length, 0);
  const visiblePills = selectedOptions.slice(0, maxVisiblePills);
  const overflowCount = Math.max(0, selectedOptions.length - maxVisiblePills);
  const showExpandable =
    expandableOption != null && valueSet.has(expandableOption.value);

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

  function clearAll(e: React.MouseEvent) {
    e.stopPropagation();
    onChange([]);
  }

  function renderOption(opt: MultiSelectOption) {
    const checked = valueSet.has(opt.value);
    const isExpandable = expandableOption?.value === opt.value;

    return (
      <li key={opt.value}>
        <button
          type="button"
          role="option"
          aria-selected={checked}
          title={opt.hint ?? opt.label}
          onClick={() => toggleOption(opt.value)}
          className={`flex w-full cursor-pointer items-start gap-3 rounded-xl px-2.5 py-2.5 text-left transition ${
            checked ? "bg-brand/8 ring-1 ring-brand/20" : "hover:bg-card"
          }`}
        >
          <span
            className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border-2 transition ${
              checked ? "border-brand bg-brand text-white" : "border-foreground/22 bg-card"
            }`}
            aria-hidden
          >
            {checked ? (
              <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 fill-none stroke-current stroke-[2.5]">
                <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : null}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium text-foreground">{opt.label}</span>
            {opt.hint ? (
              <span className="mt-0.5 block truncate text-xs text-foreground/50">{opt.hint}</span>
            ) : isExpandable ? (
              <span className="mt-0.5 block text-xs text-foreground/50">
                Add a short description after selecting
              </span>
            ) : null}
          </span>
        </button>
      </li>
    );
  }

  return (
    <div ref={rootRef} className={className}>
      <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-foreground/70">
          {label}
          {hint ? (
            <span className="font-normal normal-case text-foreground/50"> {hint}</span>
          ) : null}
        </span>
        {selectedOptions.length > 0 ? (
          <button
            type="button"
            onClick={clearAll}
            className="text-xs font-medium text-brand transition hover:text-brand-hover"
          >
            Clear all
          </button>
        ) : null}
      </div>

      <div
        className={`overflow-hidden rounded-xl border bg-card shadow-sm transition ${
          open ? "border-brand/50 ring-2 ring-brand/12" : "border-foreground/12"
        } ${disabled ? "pointer-events-none opacity-60" : ""}`}
      >
        <button
          type="button"
          disabled={disabled}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={listId}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full min-h-[3rem] items-center gap-3 px-3 py-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand/25 sm:px-4"
        >
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
            {selectedOptions.length === 0 ? (
              <span className="text-sm text-foreground/40">{placeholder}</span>
            ) : (
              <>
                {visiblePills.map((opt) => (
                  <span
                    key={opt.value}
                    className="inline-flex max-w-full items-center gap-1 rounded-lg border border-brand/25 bg-brand/10 py-1 pl-2.5 pr-1 text-xs font-semibold text-brand sm:max-w-[12rem]"
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
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-brand/70 transition hover:bg-brand/15 hover:text-brand"
                      aria-label={`Remove ${opt.label}`}
                    >
                      <FontAwesomeIcon icon={faXmark} className="text-[10px]" />
                    </span>
                  </span>
                ))}
                {overflowCount > 0 ? (
                  <span className="inline-flex h-7 items-center rounded-lg bg-brand px-2 text-xs font-bold text-white">
                    +{overflowCount}
                  </span>
                ) : null}
              </>
            )}
          </div>
          <span className="flex shrink-0 items-center gap-2">
            {selectedOptions.length > 0 ? (
              <span className="hidden text-xs tabular-nums text-foreground/45 sm:inline">
                {selectedOptions.length} {countNoun}
              </span>
            ) : null}
            <FontAwesomeIcon
              icon={open ? faChevronUp : faChevronDown}
              className="text-xs text-foreground/40"
              aria-hidden
            />
          </span>
        </button>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              key="panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-foreground/8 bg-section/80"
            >
              <div className="p-3 sm:p-4">
                {searchable ? (
                  <div className="relative mb-3">
                    <input
                      type="search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder={searchPlaceholder}
                      className="h-10 w-full rounded-lg border border-foreground/10 bg-card pl-3 pr-10 text-sm text-foreground outline-none placeholder:text-foreground/40 focus:border-brand focus:ring-2 focus:ring-brand/15"
                      autoFocus
                    />
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-foreground/35"
                    />
                  </div>
                ) : null}

                <div
                  role="listbox"
                  id={listId}
                  aria-multiselectable
                  className="max-h-52 overflow-y-auto sm:max-h-60"
                >
                  {filteredCount === 0 ? (
                    <p className="py-6 text-center text-sm text-foreground/50">No matches found</p>
                  ) : (
                    <div className="space-y-4">
                      {filteredGroups.map((group) => (
                        <div key={group.id}>
                          {group.label ? (
                            <p className="sticky top-0 z-[1] mb-1.5 bg-section/95 px-1 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground/45 backdrop-blur-sm">
                              {group.label}
                            </p>
                          ) : null}
                          <ul className="grid grid-cols-1 gap-0.5 sm:grid-cols-2 sm:gap-x-2">
                            {group.options.map(renderOption)}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <AnimatePresence initial={false}>
        {showExpandable && expandableOption ? (
          <motion.div
            key="expandable"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="mt-2 overflow-hidden rounded-xl border border-brand/25 bg-brand/[0.06]"
          >
            <div className="border-l-4 border-brand px-4 py-3 sm:px-5 sm:py-4">
              <label
                htmlFor={`${listId}-detail`}
                className="block text-sm font-semibold text-foreground"
              >
                {expandableOption.detailLabel}
                {expandableOption.required !== false ? (
                  <span className="text-brand"> *</span>
                ) : null}
              </label>
              {expandableOption.detailHint ? (
                <p className="mt-1 text-xs leading-relaxed text-foreground/55">
                  {expandableOption.detailHint}
                </p>
              ) : null}
              <textarea
                id={`${listId}-detail`}
                rows={3}
                value={expandableOption.detail}
                onChange={(e) => expandableOption.onDetailChange(e.target.value)}
                required={expandableOption.required !== false}
                placeholder={expandableOption.detailPlaceholder}
                className="mt-3 w-full resize-y rounded-lg border border-foreground/12 bg-card px-3 py-2.5 text-sm text-foreground outline-none transition placeholder:text-foreground/40 focus:border-brand focus:ring-2 focus:ring-brand/15"
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {selectedOptions.length > 0 && !open ? (
        <p className="mt-1.5 text-xs text-foreground/45">
          {selectedOptions.length} selected · tap to change
        </p>
      ) : null}
    </div>
  );
}
