"use client";

import { useId, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faXmark } from "@fortawesome/free-solid-svg-icons";

export const SERVICE_AREA_OPTIONS = [
  "General / not sure yet",
  "Repair & rental",
  "Networking & cabling",
  "Software licences",
  "CCTV / security",
  "WFH service",
] as const;

export const SERVICE_AREA_OTHER = "Other";

export type ServiceAreaSelection = {
  presets: string[];
  custom: string[];
};

type Props = {
  value: ServiceAreaSelection;
  onChange: (next: ServiceAreaSelection) => void;
  /** When set, only this service line is shown (no other options). */
  lockedInterest?: string;
};

export function formatServiceAreas({ presets, custom }: ServiceAreaSelection): string {
  const parts = [...presets, ...custom.filter((c) => !presets.includes(c))];
  return parts.length > 0 ? parts.join(", ") : "Not specified";
}

export default function ServiceAreaPicker({ value, onChange, lockedInterest }: Props) {
  const listId = useId();
  const otherPanelId = useId();
  const [open, setOpen] = useState(true);
  const [otherDraft, setOtherDraft] = useState("");

  if (lockedInterest) {
    return (
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-foreground/70">
          Service line
        </span>
        <div className="rounded-xl border border-brand/30 bg-brand/10 px-4 py-3">
          <p className="text-sm font-bold text-foreground">{lockedInterest}</p>
          <p className="mt-1 text-xs text-foreground/55">
            Locked to the product you selected — change it by closing this form and choosing another
            item.
          </p>
        </div>
      </div>
    );
  }

  const otherSelected = value.presets.includes(SERVICE_AREA_OTHER);

  const pillLabels = useMemo(() => {
    const labels: { key: string; label: string; kind: "preset" | "custom" }[] = [];
    for (const p of value.presets) {
      labels.push({ key: `preset:${p}`, label: p, kind: "preset" });
    }
    for (const c of value.custom) {
      if (!value.presets.includes(c)) {
        labels.push({ key: `custom:${c}`, label: c, kind: "custom" });
      }
    }
    return labels;
  }, [value.presets, value.custom]);

  const selectedCount = pillLabels.length;

  function togglePreset(opt: string) {
    const has = value.presets.includes(opt);
    const presets = has ? value.presets.filter((p) => p !== opt) : [...value.presets, opt];
    onChange({ ...value, presets });
  }

  function removePill(kind: "preset" | "custom", label: string) {
    if (kind === "preset") {
      onChange({ ...value, presets: value.presets.filter((p) => p !== label) });
    } else {
      onChange({ ...value, custom: value.custom.filter((c) => c !== label) });
    }
  }

  function clearAll() {
    setOtherDraft("");
    onChange({ presets: [], custom: [] });
  }

  function addCustomService() {
    const text = otherDraft.trim();
    if (!text) return;
    const exists =
      value.custom.some((c) => c.toLowerCase() === text.toLowerCase()) ||
      value.presets.some((p) => p.toLowerCase() === text.toLowerCase()) ||
      SERVICE_AREA_OPTIONS.some((o) => o.toLowerCase() === text.toLowerCase());
    if (exists) {
      setOtherDraft("");
      return;
    }
    onChange({ ...value, custom: [...value.custom, text] });
    setOtherDraft("");
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-foreground/70">
          Service area{" "}
          <span className="font-normal normal-case text-foreground/50">(select all that apply)</span>
        </span>
        {selectedCount > 0 ? (
          <button
            type="button"
            onClick={clearAll}
            className="shrink-0 text-xs font-semibold text-brand hover:text-brand-hover"
          >
            Clear all
          </button>
        ) : null}
      </div>

      <div className="overflow-hidden rounded-xl border-2 border-brand/35 bg-card">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-2 border-b border-brand/15 bg-brand/[0.04] px-3 py-2.5 text-left sm:px-4"
          aria-expanded={open}
          aria-controls={listId}
        >
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
            {pillLabels.length === 0 ? (
              <span className="text-sm text-foreground/45">Select service areas…</span>
            ) : (
              pillLabels.map((pill) => (
                <span
                  key={pill.key}
                  className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand"
                >
                  <span className="truncate">{pill.label}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removePill(pill.kind, pill.label);
                    }}
                    className="rounded-full p-0.5 hover:bg-brand/20"
                    aria-label={`Remove ${pill.label}`}
                  >
                    <FontAwesomeIcon icon={faXmark} className="h-3 w-3" />
                  </button>
                </span>
              ))
            )}
          </div>
          <span className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-foreground/55">
            {selectedCount} selected
            <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} className="h-3 w-3 text-brand" />
          </span>
        </button>

        {open ? (
          <div id={listId} className="p-3 sm:p-4">
            <div className="grid gap-2 sm:grid-cols-2">
              {SERVICE_AREA_OPTIONS.map((opt) => {
                const checked = value.presets.includes(opt);
                return (
                  <label
                    key={opt}
                    className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm transition ${
                      checked
                        ? "border-brand/40 bg-brand/10 text-foreground"
                        : "border-foreground/12 bg-section text-foreground/80 hover:border-brand/25"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => togglePreset(opt)}
                      className="h-4 w-4 shrink-0 rounded border-foreground/20 text-brand focus:ring-brand/30"
                    />
                    {opt}
                  </label>
                );
              })}
            </div>

            <label
              className={`mt-2 flex cursor-pointer flex-col gap-0.5 rounded-lg border px-3 py-2.5 text-sm transition sm:col-span-2 ${
                otherSelected
                  ? "border-brand/40 bg-brand/10 text-foreground"
                  : "border-foreground/12 bg-section text-foreground/80 hover:border-brand/25"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={otherSelected}
                  onChange={() => togglePreset(SERVICE_AREA_OTHER)}
                  className="h-4 w-4 shrink-0 rounded border-foreground/20 text-brand focus:ring-brand/30"
                />
                <span className="font-semibold">{SERVICE_AREA_OTHER}</span>
              </span>
              <span className="pl-6 text-xs text-foreground/55">
                Add a short description after selecting
              </span>
            </label>
          </div>
        ) : null}
      </div>

      {otherSelected ? (
        <div
          id={otherPanelId}
          className="rounded-xl border border-brand/20 border-l-4 border-l-brand bg-brand/[0.06] p-4 sm:p-5"
        >
          <h3 className="text-sm font-bold text-foreground">Tell us about your requirement</h3>
          <p className="mt-1 text-xs leading-relaxed text-foreground/60 sm:text-sm">
            A short description helps us route your request to the right engineer and send a GST-ready
            quote.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-stretch">
            <input
              type="text"
              value={otherDraft}
              onChange={(e) => setOtherDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addCustomService();
                }
              }}
              placeholder="e.g. Biometric attendance, printer AMC, …"
              className="h-11 min-w-0 flex-1 rounded-lg border border-foreground/15 bg-card px-3 text-sm text-foreground outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
            <button
              type="button"
              onClick={addCustomService}
              disabled={!otherDraft.trim()}
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-lg bg-brand px-6 text-sm font-semibold text-white shadow-md transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              Add Service
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
