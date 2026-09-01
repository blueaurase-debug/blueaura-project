"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type MaterialItem = {
  id: number;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
};

type AtaData = {
  number: string;
  project: string;
  title: string;
  reason: string;
  description: string;
  materials: MaterialItem[];
  materialTotal: number;
  hours: number;
  hourlyRate: number;
  labour: number;
  useOutgoing: boolean;
  outgoing: number;
  added: number;
  subtotal: number;
  vat: number;
  total: number;
  timelineImpact: string;
  createdAt: string;
  status?: string;
  sentAt?: string;
};

export default function AtaPreviewPage() {
  const [data, setData] = useState<AtaData | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(
      "blueaura-ata-preview"
    );

    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  const money = (value: number) =>
    new Intl.NumberFormat("sv-SE", {
      style: "currency",
      currency: "SEK",
      maximumFractionDigits: 2,
    }).format(value);

  const sendForApproval = () => {
  if (!data) return;

  const sentData = {
    ...data,
    status: "Väntar",
    sentAt: new Date().toISOString(),
  };

  const savedRegister = localStorage.getItem(
    "blueaura-ata-register"
  );

  const register = savedRegister
    ? JSON.parse(savedRegister)
    : [];

  const existingIndex = register.findIndex(
    (item: { number: string }) =>
      item.number === data.number
  );

  if (existingIndex >= 0) {
    register[existingIndex] = sentData;
  } else {
    register.push(sentData);
  }

  localStorage.setItem(
    "blueaura-ata-register",
    JSON.stringify(register)
  );

  localStorage.setItem(
    "blueaura-ata-sent",
    JSON.stringify(sentData)
  );

  window.location.href =
    "/projects/fernando/ata/client";
};

  if (!data) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white">
        <div className="mx-auto max-w-md px-6 py-10">
          <p className="text-zinc-400">
            Ingen ÄTA-data hittades.
          </p>

          <Link
            href="/projects/fernando/ata/new"
            className="mt-5 inline-block text-sm underline"
          >
            Tillbaka
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-2xl">
        <Link
  href={`/projects/fernando/ata/new?edit=${encodeURIComponent(
    data.number
  )}`}
  className="mb-6 inline-block text-sm text-zinc-400 hover:text-white"
>
  ← Redigera ÄTA
</Link>

        <div className="overflow-hidden rounded-3xl bg-white text-zinc-950">
          <header className="border-b border-zinc-200 px-6 py-7">
            <p className="text-xs font-medium tracking-[0.35em] text-zinc-500">
              BLUEAURA
            </p>

            <div className="mt-3 flex items-start justify-between gap-5">
              <div>
                <h1 className="text-2xl font-semibold">
                  Ändrings- och tilläggsarbete
                </h1>

                <p className="mt-2 text-sm text-zinc-500">
                  {data.project}
                </p>
              </div>

              <span className="rounded-full bg-zinc-100 px-3 py-2 text-xs font-medium">
                {data.number}
              </span>
            </div>
          </header>

          <div className="space-y-7 px-6 py-7">
            <section>
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                Ändring
              </p>

              <h2 className="mt-2 text-xl font-semibold">
                {data.title}
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                Orsak: {data.reason}
              </p>

              <p className="mt-4 whitespace-pre-line text-sm leading-6 text-zinc-700">
                {data.description}
              </p>
            </section>

            <section>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold">
                  Material
                </h3>

                <span className="font-medium">
                  {money(data.materialTotal)}
                </span>
              </div>

              <div className="divide-y divide-zinc-200 rounded-xl border border-zinc-200">
                {data.materials.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
                  >
                    <div>
                      <p className="font-medium">
                        {item.description || "Material"}
                      </p>

                      <p className="mt-1 text-xs text-zinc-500">
                        {item.quantity} {item.unit} ×{" "}
                        {money(item.unitPrice)}
                      </p>
                    </div>

                    <span>
                      {money(
                        item.quantity * item.unitPrice
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="flex items-center justify-between border-b border-zinc-200 pb-5">
              <div>
                <h3 className="font-semibold">
                  Arbete
                </h3>

                <p className="mt-1 text-xs text-zinc-500">
                  {data.hours} h ×{" "}
                  {money(data.hourlyRate)}
                </p>
              </div>

              <span className="font-medium">
                {money(data.labour)}
              </span>
            </section>

            {data.useOutgoing && (
              <section className="flex items-center justify-between">
                <span className="text-sm text-zinc-600">
                  Avgående
                </span>

                <span className="text-sm">
                  - {money(data.outgoing)}
                </span>
              </section>
            )}

            <section className="rounded-2xl bg-zinc-100 p-5">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-500">
                    Summa exkl. moms
                  </span>
                  <span>{money(data.subtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500">
                    Moms 25%
                  </span>
                  <span>{money(data.vat)}</span>
                </div>

                <div className="border-t border-zinc-300 pt-4">
                  <div className="flex items-end justify-between gap-4">
                    <span className="font-semibold">
                      Totalt inkl. moms
                    </span>

                    <span className="text-2xl font-semibold">
                      {money(data.total)}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                Påverkan på tidplan
              </p>

              <p className="mt-2 font-medium">
                {data.timelineImpact}
              </p>
            </section>

            <section className="border-t border-zinc-200 pt-6">
              <p className="text-xs leading-5 text-zinc-500">
                Detta är en förhandsgranskning av ÄTA.
                Dokumentet är ännu inte skickat för
                godkännande.
              </p>
            </section>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Link
  href={`/projects/fernando/ata/new?edit=${encodeURIComponent(
    data.number
  )}`}
  className="block w-full rounded-2xl border border-zinc-700 px-5 py-4 text-center font-medium"
>
  Redigera
</Link>

          <button
            type="button"
            onClick={sendForApproval}
            className="w-full rounded-2xl bg-white px-5 py-4 font-medium text-black"
          >
            Skicka för godkännande
          </button>
        </div>
      </div>
    </main>
  );
}