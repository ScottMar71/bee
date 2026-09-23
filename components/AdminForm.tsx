"use client";

import { useState } from "react";
import {
  deletePhotoAction,
  logoutAction,
  saveSiteAction,
  uploadPhotoAction,
} from "@/app/actions/admin";
import type { Ale, SiteContent, WhatsOnItem } from "@/lib/types";

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function AdminForm({ initial }: { initial: SiteContent }) {
  const [site, setSite] = useState(initial);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function save() {
    setBusy(true);
    setStatus("");
    try {
      await saveSiteAction(site);
      setStatus("Saved. The public pages will update in a moment.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-4xl">What’s on editor</h1>
        <form action={logoutAction}>
          <button className="min-h-11 rounded-full border border-ink/15 px-5 text-sm">
            Log out
          </button>
        </form>
      </div>

      <Section title="What’s on">
        {site.whatsOn.map((item, index) => (
          <div key={item.id} className="mb-4 rounded-2xl bg-cream-dark p-4">
            <Field
              label="Title"
              value={item.title}
              onChange={(title) =>
                patchList("whatsOn", index, { ...item, title })
              }
            />
            <Field
              label="Details"
              value={item.detail}
              multiline
              onChange={(detail) =>
                patchList("whatsOn", index, { ...item, detail })
              }
            />
            <button
              type="button"
              className="mt-2 text-sm text-brick"
              onClick={() =>
                setSite((s) => ({
                  ...s,
                  whatsOn: s.whatsOn.filter((row) => row.id !== item.id),
                }))
              }
            >
              Remove
            </button>
          </div>
        ))}
        <AddButton
          onClick={() =>
            setSite((s) => ({
              ...s,
              whatsOn: [
                ...s.whatsOn,
                { id: newId(), title: "", detail: "" } satisfies WhatsOnItem,
              ],
            }))
          }
        >
          Add event
        </AddButton>
      </Section>

      <Section title="Real ales">
        {site.ales.map((ale, index) => (
          <div key={ale.id} className="mb-4 rounded-2xl bg-cream-dark p-4">
            <Field
              label="Name"
              value={ale.name}
              onChange={(name) => patchAles(index, { ...ale, name })}
            />
            <Field
              label="Brewery"
              value={ale.brewery}
              onChange={(brewery) => patchAles(index, { ...ale, brewery })}
            />
            <Field
              label="Note"
              value={ale.note}
              onChange={(note) => patchAles(index, { ...ale, note })}
            />
            <button
              type="button"
              className="mt-2 text-sm text-brick"
              onClick={() =>
                setSite((s) => ({
                  ...s,
                  ales: s.ales.filter((row) => row.id !== ale.id),
                }))
              }
            >
              Remove
            </button>
          </div>
        ))}
        <AddButton
          onClick={() =>
            setSite((s) => ({
              ...s,
              ales: [
                ...s.ales,
                { id: newId(), name: "", brewery: "", note: "" } satisfies Ale,
              ],
            }))
          }
        >
          Add ale
        </AddButton>
      </Section>

      <Section title="Quiz">
        <Field
          label="Introduction"
          multiline
          value={site.quiz.intro}
          onChange={(intro) =>
            setSite((s) => ({ ...s, quiz: { ...s.quiz, intro } }))
          }
        />
        <Field
          label="Next date"
          value={site.quiz.nextDate}
          onChange={(nextDate) =>
            setSite((s) => ({ ...s, quiz: { ...s.quiz, nextDate } }))
          }
        />
        <Field
          label="Time"
          value={site.quiz.time}
          onChange={(time) =>
            setSite((s) => ({ ...s, quiz: { ...s.quiz, time } }))
          }
        />
        <Field
          label="Notes"
          multiline
          value={site.quiz.notes}
          onChange={(notes) =>
            setSite((s) => ({ ...s, quiz: { ...s.quiz, notes } }))
          }
        />
      </Section>

      <Section title="Food">
        <Field
          label="Friday pizza"
          multiline
          value={site.food.fridayPizza}
          onChange={(fridayPizza) =>
            setSite((s) => ({ ...s, food: { ...s.food, fridayPizza } }))
          }
        />
        <Field
          label="Sunday roasts"
          multiline
          value={site.food.roasts}
          onChange={(roasts) =>
            setSite((s) => ({ ...s, food: { ...s.food, roasts } }))
          }
        />
      </Section>

      <Section title="Opening hours">
        {site.hours.map((row, index) => (
          <Field
            key={row.day}
            label={row.day}
            value={row.hours}
            onChange={(hours) =>
              setSite((s) => ({
                ...s,
                hours: s.hours.map((item, i) =>
                  i === index ? { ...item, hours } : item,
                ),
              }))
            }
          />
        ))}
      </Section>

      <Section title="Contact">
        <Field
          label="Email"
          value={site.contact.email}
          onChange={(email) =>
            setSite((s) => ({ ...s, contact: { ...s.contact, email } }))
          }
        />
        <Field
          label="Phone (leave blank to hide)"
          value={site.contact.phone}
          onChange={(phone) =>
            setSite((s) => ({ ...s, contact: { ...s.contact, phone } }))
          }
        />
      </Section>

      <button
        type="button"
        onClick={save}
        disabled={busy}
        className="min-h-12 w-full rounded-full bg-brick text-lg font-semibold text-cream hover:bg-brick-dark disabled:opacity-60"
      >
        {busy ? "Saving…" : "Save changes"}
      </button>
      {status ? <p className="text-sm text-muted">{status}</p> : null}

      <Section title="Gallery photos">
        <ul className="space-y-3">
          {site.gallery.map((item) => (
            <li
              key={item.src}
              className="flex items-center justify-between gap-3 rounded-xl bg-cream-dark px-4 py-3 text-sm"
            >
              <span className="truncate">{item.alt || item.src}</span>
              <button
                type="button"
                className="text-brick"
                onClick={async () => {
                  await deletePhotoAction(item.src);
                  setSite((s) => ({
                    ...s,
                    gallery: s.gallery.filter((row) => row.src !== item.src),
                  }));
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <form
          className="mt-6 space-y-3"
          action={async (formData) => {
            setBusy(true);
            try {
              await uploadPhotoAction(formData);
              window.location.reload();
            } catch (error) {
              setStatus(
                error instanceof Error ? error.message : "Upload failed.",
              );
            } finally {
              setBusy(false);
            }
          }}
        >
          <label className="block text-sm font-medium">
            Add a photo
            <input
              type="file"
              name="photo"
              accept="image/jpeg,image/png,image/webp"
              required
              className="mt-2 block w-full text-sm"
            />
          </label>
          <label className="block text-sm font-medium">
            Caption
            <input
              type="text"
              name="alt"
              defaultValue="The Beehive"
              className="mt-1 min-h-12 w-full rounded-xl border border-ink/15 bg-cream px-3 py-2"
            />
          </label>
          <button
            type="submit"
            className="min-h-12 rounded-full bg-ink px-6 font-semibold text-cream"
          >
            Upload photo
          </button>
        </form>
      </Section>
    </div>
  );

  function patchList(
    key: "whatsOn",
    index: number,
    value: WhatsOnItem,
  ) {
    setSite((s) => ({
      ...s,
      [key]: s[key].map((row, i) => (i === index ? value : row)),
    }));
  }

  function patchAles(index: number, value: Ale) {
    setSite((s) => ({
      ...s,
      ales: s.ales.map((row, i) => (i === index ? value : row)),
    }));
  }
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-2xl">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  const cls =
    "mt-1 min-h-12 w-full rounded-xl border border-ink/15 bg-cream px-3 py-2";
  return (
    <label className="mb-3 block text-sm font-medium">
      {label}
      {multiline ? (
        <textarea
          className={`${cls} min-h-24`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className={cls}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}

function AddButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="min-h-11 rounded-full border border-ink/15 px-5 text-sm"
    >
      {children}
    </button>
  );
}
