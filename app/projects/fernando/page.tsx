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
  const [statusFilter, setStatusFilter] = useState("Alla");

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
    const potentialAta = approved + waiting;
    const houseContractSum = 3200000;
const poolContractSum = 391000;

const contractSum =
  houseContractSum + poolContractSum;

const currentContractSum =
  contractSum + approved;

const potentialFinalSum =
  contractSum + approved + waiting;
    const filteredAta =
  statusFilter === "Alla"
    ? ataRegister
    : ataRegister.filter((ata) => ata.status === statusFilter);

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

<div className="mb-3 rounded-2xl border border-zinc-700 bg-zinc-900 p-5">
  <p className="text-xs uppercase tracking-wider text-zinc-500">
    Potentiellt ÄTA-värde
    <section className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
  <div className="mb-5">
    <p className="text-xs uppercase tracking-wider text-zinc-500">
      Projektekonomi
    </p>

    <h2 className="mt-2 text-lg font-semibold">
      Ekonomisk översikt
    </h2>
  </div>

  <div className="space-y-4 text-sm">
    <div className="space-y-3">
  <div className="flex items-center justify-between">
    <span className="text-zinc-400">
      Hus
    </span>

    <span>
      {money(houseContractSum)}
    </span>
  </div>

  <div className="flex items-center justify-between">
    <span className="text-zinc-400">
      Pool
    </span>

    <span>
      {money(poolContractSum)}
    </span>
  </div>

  <div className="flex items-center justify-between border-t border-zinc-800 pt-3">
    <span className="font-medium">
      Kontraktssumma
    </span>

    <span className="font-semibold">
      {money(contractSum)}
    </span>
  </div>
</div>

    <div className="flex items-center justify-between">
      <span className="text-zinc-400">
        Godkända ÄTA
      </span>

      <span className="font-medium">
        + {money(approved)}
      </span>
    </div>

    <div className="border-t border-zinc-800 pt-4">
      <div className="flex items-center justify-between">
        <span className="font-medium">
          Aktuell kontraktssumma
        </span>

        <span className="text-lg font-semibold">
          {money(currentContractSum)}
        </span>
      </div>
    </div>

    <div className="flex items-center justify-between">
      <span className="text-zinc-400">
        Väntande ÄTA
      </span>

      <span className="font-medium">
        + {money(waiting)}
      </span>
    </div>

    <div className="border-t border-zinc-700 pt-4">
      <div className="flex items-center justify-between">
        <span className="font-medium">
          Potentiell slutnivå
        </span>

        <span className="text-xl font-semibold">
          {money(potentialFinalSum)}
        </span>
      </div>

      <p className="mt-2 text-xs text-zinc-500">
        Kontraktssumma + godkända och väntande ÄTA
      </p>
    </div>
  </div>
</section>
  </p>

  <p className="mt-2 text-2xl font-semibold">
    {money(potentialAta)}
  </p>

  <p className="mt-2 text-xs text-zinc-500">
    Godkända + väntande ÄTA, exkl. moms
  </p>
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
              <div className="mb-4">
  <p className="mb-3 text-sm text-zinc-400">
    ÄTA-register
  </p>

  <div className="flex gap-2 overflow-x-auto pb-1">
    {[
  {
    label: "Alla",
    value: "Alla",
    count: ataRegister.length,
  },
  {
    label: "Utkast",
    value: "Utkast",
    count: ataRegister.filter(
      (ata) => ata.status === "Utkast"
    ).length,
  },
  {
    label: "Väntar",
    value: "Väntar",
    count: ataRegister.filter(
      (ata) => ata.status === "Väntar"
    ).length,
  },
  {
    label: "Godkända",
    value: "Godkänd",
    count: ataRegister.filter(
      (ata) => ata.status === "Godkänd"
    ).length,
  },
  {
    label: "Avvisade",
    value: "Avvisad",
    count: ataRegister.filter(
      (ata) => ata.status === "Avvisad"
    ).length,
  },
].map((filter) => (
      <button
        key={filter.value}
        type="button"
        onClick={() => setStatusFilter(filter.value)}
        className={`flex items-center whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium transition ${
          statusFilter === filter.value
            ? "bg-white text-black"
            : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white"
        }`}
      >
        <span>{filter.label}</span>

<span
  className={`ml-2 rounded-full px-2 py-0.5 text-[10px] ${
    statusFilter === filter.value
      ? "bg-zinc-200 text-zinc-700"
      : "bg-zinc-800 text-zinc-400"
  }`}
>
  {filter.count}
</span>
      </button>
    ))}
  </div>
</div>

{filteredAta.length > 0 ? (
  <div className="space-y-3">
    {filteredAta.map((ata) => (
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
) : (
  <div className="rounded-2xl border border-dashed border-zinc-800 p-6 text-center">
    <p className="text-sm text-zinc-400">
      Inga ÄTA i denna kategori.
    </p>
  </div>
)}
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