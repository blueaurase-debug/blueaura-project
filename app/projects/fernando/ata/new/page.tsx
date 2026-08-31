"use client";

import Link from "next/link";
import { useState } from "react";

export default function NewAtaPage() {
  const [material, setMaterial] = useState(3200);
  const [hours, setHours] = useState(25);
  const [hourlyRate, setHourlyRate] = useState(450);

  const [useOutgoing, setUseOutgoing] = useState(false);
  const [outgoing, setOutgoing] = useState(0);

  const labour = hours * hourlyRate;
  const added = material + labour;
  const subtotal = added - (useOutgoing ? outgoing : 0);
  const vat = subtotal * 0.25;
  const total = subtotal + vat;

  const money = (value: number) =>
    new Intl.NumberFormat("sv-SE", {
      style: "currency",
      currency: "SEK",
      maximumFractionDigits: 2,
    }).format(value);

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-md px-6 py-10">
        <Link
          href="/projects/fernando"
          className="mb-8 inline-block text-sm text-zinc-400 hover:text-white"
        >
          ← Tillbaka till projektet
        </Link>

        <header className="mb-8">
          <p className="text-sm tracking-[0.3em] text-zinc-400">
            BLUEAURA PROJECT
          </p>

          <h1 className="mt-3 text-3xl font-semibold">
            Ny ÄTA
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Fernando – Villa + Pool
          </p>
        </header>

        <div className="space-y-6">

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="mb-4 text-xs uppercase tracking-wider text-zinc-500">
              ÄTA-001
            </p>

            <label className="block text-sm text-zinc-300">
              Rubrik
            </label>

            <input
              type="text"
              defaultValue="Spotlights och extra eluttag"
              className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
            />

            <label className="mt-5 block text-sm text-zinc-300">
              Orsak
            </label>

            <select className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none">
              <option>Kundändring</option>
              <option>Oförutsett arbete</option>
              <option>Ändrade förutsättningar</option>
              <option>Projekteringsändring</option>
              <option>Myndighetskrav</option>
              <option>Annat</option>
            </select>

            <label className="mt-5 block text-sm text-zinc-300">
              Beskrivning
            </label>

            <textarea
              rows={5}
              defaultValue={
                "Kök: 8 st spotlights. Badrum entréplan: 6 st spotlights samt extra dubbeluttag IP55. Badrum övre plan: 6 st spotlights samt extra dubbeluttag IP55."
              }
              className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
            />
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <h2 className="text-lg font-semibold">
              Tillkommande
            </h2>

            <label className="mt-5 block text-sm text-zinc-300">
              Material
            </label>

            <input
              type="number"
              value={material}
              onChange={(e) => setMaterial(Number(e.target.value))}
              className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
            />

            <label className="mt-5 block text-sm text-zinc-300">
              Arbetstid
            </label>

            <div className="mt-2 grid grid-cols-2 gap-3">
              <div>
                <p className="mb-2 text-xs text-zinc-500">
                  Timmar
                </p>

                <input
                  type="number"
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
                />
              </div>

              <div>
                <p className="mb-2 text-xs text-zinc-500">
                  Timpris
                </p>

                <input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-between text-sm">
              <span className="text-zinc-400">
                Arbete
              </span>

              <span>
                {money(labour)}
              </span>
            </div>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={useOutgoing}
                onChange={(e) => setUseOutgoing(e.target.checked)}
                className="h-5 w-5"
              />

              <span>
                Lägg till avgående
              </span>
            </label>

            {useOutgoing && (
              <div className="mt-5">
                <label className="block text-sm text-zinc-300">
                  Avgående belopp
                </label>

                <input
                  type="number"
                  value={outgoing}
                  onChange={(e) => setOutgoing(Number(e.target.value))}
                  className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
                />
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <label className="block text-sm text-zinc-300">
              Påverkan på tidplan
            </label>

            <select
  defaultValue="+1 arbetsdag"
  className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
>
  <option>Ingen påverkan</option>
  <option>+1 arbetsdag</option>
  <option>+2 arbetsdagar</option>
  <option>+3 arbetsdagar</option>
  <option>Annan påverkan</option>
            </select>
          </section>

          <section className="rounded-2xl border border-zinc-700 bg-zinc-900 p-5">
            <h2 className="mb-5 text-lg font-semibold">
              Sammanställning
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-400">
                  Tillkommande
                </span>
                <span>{money(added)}</span>
              </div>

              {useOutgoing && (
                <div className="flex justify-between">
                  <span className="text-zinc-400">
                    Avgående
                  </span>
                  <span>- {money(outgoing)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-zinc-400">
                  Summa exkl. moms
                </span>
                <span>{money(subtotal)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-zinc-400">
                  Moms 25%
                </span>
                <span>{money(vat)}</span>
              </div>

              <div className="mt-4 border-t border-zinc-700 pt-4">
                <div className="flex items-end justify-between">
                  <span className="font-medium">
                    Totalt inkl. moms
                  </span>

                  <span className="text-2xl font-semibold">
                    {money(total)}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <button className="w-full rounded-2xl border border-zinc-700 px-5 py-4 font-medium">
            Spara utkast
          </button>

          <button className="w-full rounded-2xl bg-white px-5 py-4 font-medium text-black">
            Förhandsgranska
          </button>

        </div>
      </div>
    </main>
  );
}