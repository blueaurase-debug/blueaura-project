"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

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
  subtotal: number;
  vat: number;
  total: number;
  timelineImpact: string;
  status: string;
  sentAt: string;
  customerComment?: string;
  decidedAt?: string;
};

export default function AtaClientPage() {
  return (
    <Suspense fallback={null}>
      <AtaClientContent />
    </Suspense>
  );
}

function AtaClientContent() {
  const searchParams = useSearchParams();
  const ataNumber = searchParams.get("number");

  const [data, setData] = useState<AtaData | null>(null);

  const [decision, setDecision] = useState<
    "Godkänd" | "Avvisad" | null
  >(null);

  const [comment, setComment] = useState("");

  useEffect(() => {
  if (ataNumber) {
    const savedRegister = localStorage.getItem(
      "blueaura-ata-register"
    );

    const register: AtaData[] = savedRegister
      ? JSON.parse(savedRegister)
      : [];

    const selectedAta = register.find(
      (item) => item.number === ataNumber
    );

    if (selectedAta) {
      setData(selectedAta);
    }

    return;
  }

  const saved = localStorage.getItem(
    "blueaura-ata-sent"
  );

  if (saved) {
    setData(JSON.parse(saved));
  }
}, [ataNumber]);

  const money = (value: number) =>
    new Intl.NumberFormat("sv-SE", {
      style: "currency",
      currency: "SEK",
      maximumFractionDigits: 2,
    }).format(value);

  const saveDecision = (
    status: "Godkänd" | "Avvisad"
  ) => {
    if (!data) return;

    const completedAta = {
      ...data,
      status,
      customerComment: comment,
      decidedAt: new Date().toISOString(),
    };

    const existingRegister = localStorage.getItem(
      "blueaura-ata-register"
    );

    const register: AtaData[] = existingRegister
      ? JSON.parse(existingRegister)
      : [];

    const existingIndex = register.findIndex(
      (item) => item.number === completedAta.number
    );

    if (existingIndex >= 0) {
      register[existingIndex] = completedAta;
    } else {
      register.push(completedAta);
    }

    localStorage.setItem(
      "blueaura-ata-register",
      JSON.stringify(register)
    );

    localStorage.setItem(
      "blueaura-ata-decision",
      JSON.stringify(completedAta)
    );

    setDecision(status);
  };

  if (!data) {
    return (
      <main className="min-h-screen bg-zinc-100 px-5 py-10">
        <div className="mx-auto max-w-lg">
          <p>Ingen ÄTA hittades.</p>
        </div>
      </main>
    );
  }

  if (decision) {
    return (
      <main className="min-h-screen bg-zinc-100 px-5 py-10 text-zinc-950">
        <div className="mx-auto max-w-lg">
          <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
            <p className="text-xs tracking-[0.35em] text-zinc-400">
              BLUEAURA
            </p>

            <h1 className="mt-6 text-2xl font-semibold">
              {decision === "Godkänd"
                ? "ÄTA godkänd"
                : "ÄTA avvisad"}
            </h1>

            <p className="mt-3 text-zinc-500">
              {data.number} – {data.title}
            </p>

            <p className="mt-6 text-sm text-zinc-500">
              Beslutet har registrerats.
            </p>

            <a
              href="/projects/fernando"
              className="mt-7 block w-full rounded-2xl bg-zinc-950 px-5 py-4 font-medium text-white"
            >
              Tillbaka till projektet
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-8 text-zinc-950">
      <div className="mx-auto max-w-lg">
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <header className="border-b border-zinc-200 px-6 py-7">
            <p className="text-xs font-medium tracking-[0.35em] text-zinc-400">
              BLUEAURA
            </p>

            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <h1 className="text-xl font-semibold">
                  Ändrings- och tilläggsarbete
                </h1>

                <p className="mt-2 text-sm text-zinc-500">
                  {data.project}
                </p>
              </div>

              <span className="rounded-full bg-zinc-100 px-3 py-2 text-xs">
                {data.number}
              </span>
            </div>
          </header>

          <div className="space-y-7 px-6 py-7">
            <section>
              <h2 className="text-xl font-semibold">
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
              <h3 className="mb-3 font-semibold">
                Material
              </h3>

              <div className="divide-y divide-zinc-200 rounded-xl border border-zinc-200">
                {data.materials.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between gap-4 px-4 py-3 text-sm"
                  >
                    <div>
                      <p>{item.description}</p>

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

            <section className="flex justify-between">
              <div>
                <p className="font-semibold">
                  Arbete
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  {data.hours} h ×{" "}
                  {money(data.hourlyRate)}
                </p>
              </div>

              <span>
                {money(data.labour)}
              </span>
            </section>

            {data.useOutgoing && (
              <section className="flex justify-between">
                <span>Avgående</span>

                <span>
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

                  <span>
                    {money(data.subtotal)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500">
                    Moms 25%
                  </span>

                  <span>
                    {money(data.vat)}
                  </span>
                </div>

                <div className="border-t border-zinc-300 pt-4">
                  <div className="flex items-end justify-between">
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
              <p className="text-xs uppercase tracking-wider text-zinc-400">
                Påverkan på tidplan
              </p>

              <p className="mt-2 font-medium">
                {data.timelineImpact}
              </p>
            </section>

            <section className="border-t border-zinc-200 pt-6">
              <label className="text-sm font-medium">
                Kommentar
              </label>

              <textarea
                rows={4}
                value={comment}
                onChange={(e) =>
                  setComment(e.target.value)
                }
                placeholder="Valfri kommentar..."
                className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none"
              />
            </section>

            <section className="space-y-3">
  <button
    type="button"
    onClick={() =>
      saveDecision("Godkänd")
    }
    className="w-full rounded-2xl bg-zinc-950 px-5 py-4 font-medium text-white"
  >
    Godkänn ÄTA
  </button>

  <button
    type="button"
    onClick={() =>
      saveDecision("Avvisad")
    }
    className="w-full rounded-2xl border border-zinc-300 px-5 py-4 font-medium"
  >
    Avvisa
  </button>

  <a
    href="/projects/fernando"
    className="block w-full rounded-2xl border border-zinc-300 px-5 py-4 text-center font-medium text-zinc-700"
  >
    Tillbaka till projektet
  </a>
</section>

            <p className="text-xs leading-5 text-zinc-400">
              Genom att godkänna bekräftar kunden den
              beskrivna ändringen, angivet pris och
              eventuell påverkan på tidplan.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}