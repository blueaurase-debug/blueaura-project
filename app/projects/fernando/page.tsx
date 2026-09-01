"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type AtaRecord = {
  number: string;
  title: string;
  subtotal: number;
  total: number;
  timelineImpact: string;
  status: string;
  customerComment?: string;
  decidedAt?: string;
};

export default function FernandoProjectPage() {
  const [ataRegister, setAtaRegister] = useState<AtaRecord[]>([]);

  useEffect(() => {
    const savedRegister = localStorage.getItem(
      "blueaura-ata-register"
    );

    if (savedRegister) {
      setAtaRegister(JSON.parse(savedRegister));
    }
  }, []);

  const money = (value: number) =>
    new Intl.NumberFormat("sv-SE", {
      style: "currency",
      currency: "SEK",
      maximumFractionDigits: 0,
    }).format(value);

  const approved = ataRegister
    .filter((ata) => ata.status === "Godkänd")
    .reduce((sum, ata) => sum + ata.subtotal, 0);

  const waiting = ataRegister
    .filter((ata) => ata.status === "Väntar")
    .reduce((sum, ata) => sum + ata.subtotal, 0);

  const draft = ataRegister
    .filter((ata) => ata.status === "Utkast")
    .reduce((sum, ata) => sum + ata.subtotal, 0);

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-md px-6 py-10">
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-zinc-400 hover:text-white"
        >
          ← Tillbaka
        </Link>

        <header className="mb-8">
          <p className="text-sm font-medium tracking-[0.3em] text-zinc-400">
            BLUEAURA PROJECT
          </p>

          <h1 className="mt-3 text-2xl font-semibold">
            Fernando – Villa + Pool
          </h1>

          <div className="mt-3 flex items-center gap-3">
            <span className="text-sm text-zinc-400">
              Totalentreprenad
            </span>

            <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs">
              Aktiv
            </span>
          </div>
        </header>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              ÄTA
            </h2>

            <Link
              href="/projects/fernando/ata/new"
              className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black"
            >
              + Ny ÄTA
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
              <p className="text-xs text-zinc-400">
                Godkända
              </p>

              <p className="mt-2 text-lg font-semibold">
                {money(approved)}
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
              <p className="text-xs text-zinc-400">
                Väntar
              </p>

              <p className="mt-2 text-lg font-semibold">
                {money(waiting)}
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
              <p className="text-xs text-zinc-400">
                Utkast
              </p>

              <p className="mt-2 text-lg font-semibold">
                {money(draft)}
              </p>
            </div>
          </div>

          {ataRegister.length > 0 ? (
            <div className="mt-6">
              <p className="mb-3 text-sm text-zinc-400">
                ÄTA-register
              </p>

              <div className="space-y-3">
                {ataRegister.map((ata) => (
                  <Link
                    key={ata.number}
                    href={
  ata.status === "Utkast"
    ? `/projects/fernando/ata/new?edit=${encodeURIComponent(
        ata.number
      )}`
    : ata.status === "Väntar"
    ? `/projects/fernando/ata/client?number=${encodeURIComponent(
        ata.number
      )}`
    : `/projects/fernando/ata/details?number=${encodeURIComponent(
        ata.number
      )}`
}
                    className="block rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-zinc-700 hover:bg-zinc-800"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs text-zinc-500">
                          {ata.number}
                        </p>

                        <h3 className="mt-1 font-medium">
                          {ata.title}
                        </h3>

                        <p className="mt-2 text-sm text-zinc-400">
                          {money(ata.subtotal)} exkl. moms
                        </p>

                        <p className="mt-1 text-xs text-zinc-500">
                          Tidplan: {ata.timelineImpact}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          ata.status === "Godkänd"
                            ? "bg-emerald-950 text-emerald-300"
                            : ata.status === "Avvisad"
                            ? "bg-red-950 text-red-300"
                            : ata.status === "Väntar"
                            ? "bg-amber-950 text-amber-300"
                            : "bg-zinc-800 text-zinc-300"
                        }`}
                      >
                        {ata.status}
                      </span>
                    </div>

                    {ata.customerComment && (
                      <div className="mt-4 border-t border-zinc-800 pt-4">
                        <p className="text-xs text-zinc-500">
                          Kundkommentar
                        </p>

                        <p className="mt-1 text-sm text-zinc-300">
                          {ata.customerComment}
                        </p>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-zinc-800 p-8 text-center">
              <p className="text-sm text-zinc-400">
                Inga ÄTA registrerade ännu.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}