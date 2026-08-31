import Link from "next/link";

export default function FernandoProjectPage() {
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
                0 kr
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
              <p className="text-xs text-zinc-400">
                Väntar
              </p>
              <p className="mt-2 text-lg font-semibold">
                0 kr
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
              <p className="text-xs text-zinc-400">
                Utkast
              </p>
              <p className="mt-2 text-lg font-semibold">
                0 kr
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-dashed border-zinc-800 p-8 text-center">
            <p className="text-sm text-zinc-400">
              Inga ÄTA registrerade ännu.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}