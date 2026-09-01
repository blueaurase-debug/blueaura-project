"use client";

import Link from "next/link";
import {
  Suspense,
  useEffect,
  useState,
} from "react";
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
  subproject?: string;
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
  customerComment?: string;
  decidedAt?: string;
};

function LoadingScreen() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-2xl px-6 py-10">
        <p className="text-zinc-400">
          Laddar ÄTA...
        </p>
      </div>
    </main>
  );
}

function AtaDetailsContent() {
  const searchParams = useSearchParams();

  const ataNumber = searchParams.get("number");

  const [data, setData] =
    useState<AtaData | null>(null);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedRegister = localStorage.getItem(
      "blueaura-ata-register"
    );

    if (!savedRegister || !ataNumber) {
      setLoaded(true);
      return;
    }

    const register: AtaData[] =
      JSON.parse(savedRegister);

    const selectedAta = register.find(
      (item) => item.number === ataNumber
    );

    if (selectedAta) {
      setData(selectedAta);
    }

    setLoaded(true);
  }, [ataNumber]);

  const money = (value: number) =>
    new Intl.NumberFormat("sv-SE", {
      style: "currency",
      currency: "SEK",
      maximumFractionDigits: 2,
    }).format(value);

  if (!loaded) {
    return <LoadingScreen />;
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white">
        <div className="mx-auto max-w-2xl px-6 py-10">
          <Link
            href="/projects/fernando"
            className="text-sm text-zinc-400 hover:text-white"
          >
            ← Tillbaka till projektet
          </Link>

          <p className="mt-8 text-zinc-400">
            ÄTA kunde inte hittas.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/projects/fernando"
          className="mb-6 inline-block text-sm text-zinc-400 hover:text-white"
        >
          ← Tillbaka till projektet
        </Link>

        <div className="overflow-hidden rounded-3xl bg-white text-zinc-950">
          <header className="border-b border-zinc-200 px-6 py-7">
            <p className="text-xs font-medium tracking-[0.35em] text-zinc-500">
              BLUEAURA
            </p>

            <div className="mt-3 flex items-start justify-between gap-5">
              <div>
                <h1 className="text-2xl font-semibold">
                  Ändrings- och
                  tilläggsarbete
                </h1>

                <p className="mt-2 text-sm text-zinc-500">
                  {data.project}
                </p>
              </div>

              <div className="text-right">
                <span className="rounded-full bg-zinc-100 px-3 py-2 text-xs font-medium">
                  {data.number}
                </span>

                <p className="mt-3 text-sm font-medium">
                  {data.status}
                </p>
              </div>
            </div>
          </header>

          <div className="space-y-7 px-6 py-7">
            <section>
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                Ändring
              </p>
              <div className="mt-4">
  <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
    Delprojekt
  </p>

  <p className="mt-1 text-sm font-medium">
    {data.subproject || "Hus"}
  </p>
</div>

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
                  {money(
                    data.materialTotal
                  )}
                </span>
              </div>

              <div className="divide-y divide-zinc-200 rounded-xl border border-zinc-200">
                {data.materials.map(
                  (item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
                    >
                      <div>
                        <p className="font-medium">
                          {
                            item.description
                          }
                        </p>

                        <p className="mt-1 text-xs text-zinc-500">
                          {item.quantity}{" "}
                          {item.unit} ×{" "}
                          {money(
                            item.unitPrice
                          )}
                        </p>
                      </div>

                      <span>
                        {money(
                          item.quantity *
                            item.unitPrice
                        )}
                      </span>
                    </div>
                  )
                )}
              </div>
            </section>

            <section className="flex items-center justify-between border-b border-zinc-200 pb-5">
              <div>
                <h3 className="font-semibold">
                  Arbete
                </h3>

                <p className="mt-1 text-xs text-zinc-500">
                  {data.hours} h ×{" "}
                  {money(
                    data.hourlyRate
                  )}
                </p>
              </div>

              <span className="font-medium">
                {money(data.labour)}
              </span>
            </section>

            {data.useOutgoing && (
              <section className="flex justify-between">
                <span>Avgående</span>

                <span>
                  -{" "}
                  {money(
                    data.outgoing
                  )}
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
                    {money(
                      data.subtotal
                    )}
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
                      {money(
                        data.total
                      )}
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

            {data.customerComment && (
              <section className="border-t border-zinc-200 pt-6">
                <p className="text-xs uppercase tracking-wider text-zinc-400">
                  Kundkommentar
                </p>

                <p className="mt-2 text-sm text-zinc-700">
                  {
                    data.customerComment
                  }
                </p>
              </section>
            )}

            {data.decidedAt && (
              <section className="border-t border-zinc-200 pt-6">
                <p className="text-xs uppercase tracking-wider text-zinc-400">
                  Beslut registrerat
                </p>

                <p className="mt-2 text-sm text-zinc-700">
                  {new Date(
                    data.decidedAt
                  ).toLocaleString(
                    "sv-SE"
                  )}
                </p>
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function AtaDetailsPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <AtaDetailsContent />
    </Suspense>
  );
}