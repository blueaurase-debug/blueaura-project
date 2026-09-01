"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function NewAtaPage() {
  return (
    <Suspense fallback={null}>
      <NewAtaContent />
    </Suspense>
  );
}

function NewAtaContent() {
  const searchParams = useSearchParams();
  const editNumber = searchParams.get("edit");

  const [ataNumber, setAtaNumber] = useState("ÄTA-001");
  const [title, setTitle] = useState(
    "Spotlights och extra eluttag"
  );

  const [reason, setReason] = useState("Kundändring");
  const [subproject, setSubproject] = useState("Hus");

  const [description, setDescription] = useState(
    "Kök: 8 st spotlights. Badrum entréplan: 6 st spotlights samt extra dubbeluttag IP55. Badrum övre plan: 6 st spotlights samt extra dubbeluttag IP55."
  );

  const [materials, setMaterials] = useState([
    {
      id: 1,
      description: "Spotlight",
      quantity: 20,
      unit: "st",
      unitPrice: 100,
    },
    {
      id: 2,
      description: "Dubbeluttag IP55",
      quantity: 2,
      unit: "st",
      unitPrice: 250,
    },
    {
      id: 3,
      description: "Transformator",
      quantity: 2,
      unit: "st",
      unitPrice: 350,
    },
  ]);

  const [hours, setHours] = useState(25);
  const [hourlyRate, setHourlyRate] = useState(450);

  const [useOutgoing, setUseOutgoing] = useState(false);
  const [outgoing, setOutgoing] = useState(0);

  const [timelineImpact, setTimelineImpact] =
    useState("+1 arbetsdag");
      useEffect(() => {
    const savedRegister = localStorage.getItem(
      "blueaura-ata-register"
    );

    const register = savedRegister
      ? JSON.parse(savedRegister)
      : [];

    if (editNumber) {
  const savedPreview = localStorage.getItem(
    "blueaura-ata-preview"
  );

  const preview = savedPreview
    ? JSON.parse(savedPreview)
    : null;

  const draft = register.find(
    (item: { number: string }) =>
      item.number === editNumber
  );

  const source =
    preview?.number === editNumber
      ? preview
      : draft;

  if (source) {
    setAtaNumber(source.number);
    setTitle(source.title);
    setReason(source.reason);
    setSubproject(source.subproject || "Hus");
    setDescription(source.description);
    setMaterials(source.materials);
    setHours(source.hours);
    setHourlyRate(source.hourlyRate);
    setUseOutgoing(source.useOutgoing);
    setOutgoing(source.outgoing);
    setTimelineImpact(source.timelineImpact);
  }

  return;
}

    const usedNumbers = register.map(
      (item: { number?: string }) => {
        if (!item.number) return 0;

        const match = item.number.match(/(\d+)$/);

        return match ? Number(match[1]) : 0;
      }
    );

    const highestNumber =
      usedNumbers.length > 0
        ? Math.max(...usedNumbers)
        : 0;

    const nextNumber = highestNumber + 1;

    setAtaNumber(
      `ÄTA-${String(nextNumber).padStart(3, "0")}`
    );
  }, [editNumber]);

  const materialTotal = materials.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  const labour = hours * hourlyRate;
  const added = materialTotal + labour;
  const subtotal = added - (useOutgoing ? outgoing : 0);
  const vat = subtotal * 0.25;
  const total = subtotal + vat;

  const updateMaterial = (
    id: number,
    field: "description" | "quantity" | "unit" | "unitPrice",
    value: string | number
  ) => {
    setMaterials((current) =>
      current.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const addMaterial = () => {
    setMaterials((current) => [
      ...current,
      {
        id: Date.now(),
        description: "",
        quantity: 1,
        unit: "st",
        unitPrice: 0,
      },
    ]);
  };

  const removeMaterial = (id: number) => {
    setMaterials((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const money = (value: number) =>
    new Intl.NumberFormat("sv-SE", {
      style: "currency",
      currency: "SEK",
      maximumFractionDigits: 2,
    }).format(value);

  const openPreview = () => {
    const ataData = {
      number: ataNumber,
      project: "Fernando – Villa + Pool",
      title,
      reason,
      subproject,
      description,
      materials,
      materialTotal,
      hours,
      hourlyRate,
      labour,
      useOutgoing,
      outgoing,
      added,
      subtotal,
      vat,
      total,
      timelineImpact,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "blueaura-ata-preview",
      JSON.stringify(ataData)
    );

    window.location.href =
      "/projects/fernando/ata/preview";
  };
  const saveDraft = () => {
  const draftData = {
    number: ataNumber,
    project: "Fernando – Villa + Pool",
    title,
    reason,
    subproject,
    description,
    materials,
    materialTotal,
    hours,
    hourlyRate,
    labour,
    useOutgoing,
    outgoing,
    added,
    subtotal,
    vat,
    total,
    timelineImpact,
    status: "Utkast",
    updatedAt: new Date().toISOString(),
  };

  const savedRegister = localStorage.getItem(
    "blueaura-ata-register"
  );

  const register = savedRegister
    ? JSON.parse(savedRegister)
    : [];

  const existingIndex = register.findIndex(
    (item: { number: string }) =>
      item.number === ataNumber
  );

  if (existingIndex >= 0) {
    register[existingIndex] = draftData;
  } else {
    register.push(draftData);
  }

  localStorage.setItem(
    "blueaura-ata-register",
    JSON.stringify(register)
  );

  localStorage.setItem(
    "blueaura-ata-draft",
    JSON.stringify(draftData)
  );

  window.location.href =
    "/projects/fernando";
};

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
              {ataNumber}
            </p>

            <label className="block text-sm text-zinc-300">
              Rubrik
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
            />
            <label className="mt-5 block text-sm text-zinc-300">
  Delprojekt
</label>

<select
  value={subproject}
  onChange={(e) => setSubproject(e.target.value)}
  className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
>
  <option>Hus</option>
  <option>Pool</option>
  <option>Gemensamt</option>
</select>

            <label className="mt-5 block text-sm text-zinc-300">
              Orsak
            </label>

            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
            >
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
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
            />
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <h2 className="text-lg font-semibold">
              Tillkommande
            </h2>

            <div className="mt-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-zinc-300">
                  Material
                </span>

                <span className="text-sm font-medium">
                  {money(materialTotal)}
                </span>
              </div>

              <div className="space-y-3">
                {materials.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-zinc-700 bg-zinc-950 p-4"
                  >
                    <input
                      type="text"
                      value={item.description}
                      placeholder="Material"
                      onChange={(e) =>
                        updateMaterial(
                          item.id,
                          "description",
                          e.target.value
                        )
                      }
                      className="w-full bg-transparent text-sm outline-none"
                    />

                    <div className="mt-3 grid grid-cols-3 gap-2">
                      <div>
                        <p className="mb-1 text-xs text-zinc-500">
                          Antal
                        </p>

                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateMaterial(
                              item.id,
                              "quantity",
                              Number(e.target.value)
                            )
                          }
                          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm outline-none"
                        />
                      </div>

                      <div>
                        <p className="mb-1 text-xs text-zinc-500">
                          Enhet
                        </p>

                        <input
                          type="text"
                          value={item.unit}
                          onChange={(e) =>
                            updateMaterial(
                              item.id,
                              "unit",
                              e.target.value
                            )
                          }
                          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm outline-none"
                        />
                      </div>

                      <div>
                        <p className="mb-1 text-xs text-zinc-500">
                          À-pris
                        </p>

                        <input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) =>
                            updateMaterial(
                              item.id,
                              "unitPrice",
                              Number(e.target.value)
                            )
                          }
                          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm outline-none"
                        />
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {money(
                          item.quantity * item.unitPrice
                        )}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          removeMaterial(item.id)
                        }
                        className="text-xs text-zinc-500 hover:text-white"
                      >
                        Ta bort
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addMaterial}
                className="mt-3 w-full rounded-xl border border-dashed border-zinc-700 px-4 py-3 text-sm text-zinc-300 hover:border-zinc-500"
              >
                + Lägg till material
              </button>
            </div>

            <div className="mt-7 border-t border-zinc-800 pt-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-zinc-300">
                  Arbete
                </span>

                <span className="text-sm font-medium">
                  {money(labour)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="mb-2 text-xs text-zinc-500">
                    Timmar
                  </p>

                  <input
                    type="number"
                    value={hours}
                    onChange={(e) =>
                      setHours(Number(e.target.value))
                    }
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
                    onChange={(e) =>
                      setHourlyRate(Number(e.target.value))
                    }
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={useOutgoing}
                onChange={(e) =>
                  setUseOutgoing(e.target.checked)
                }
                className="h-5 w-5"
              />

              <span>Lägg till avgående</span>
            </label>

            {useOutgoing && (
              <div className="mt-5">
                <label className="block text-sm text-zinc-300">
                  Avgående belopp
                </label>

                <input
                  type="number"
                  value={outgoing}
                  onChange={(e) =>
                    setOutgoing(Number(e.target.value))
                  }
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
              value={timelineImpact}
              onChange={(e) =>
                setTimelineImpact(e.target.value)
              }
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
                  Material
                </span>
                <span>{money(materialTotal)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-zinc-400">
                  Arbete
                </span>
                <span>{money(labour)}</span>
              </div>

              <div className="flex justify-between border-t border-zinc-800 pt-3">
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

          <button
  type="button"
  onClick={saveDraft}
  className="w-full rounded-2xl border border-zinc-700 px-5 py-4 font-medium"
>
  Spara utkast
</button>

          <button
            type="button"
            onClick={openPreview}
            className="w-full rounded-2xl bg-white px-5 py-4 font-medium text-black"
          >
            Förhandsgranska
          </button>
        </div>
      </div>
    </main>
  );
}