import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-md px-6 py-10">
        <header className="mb-10">
          <p className="text-sm font-medium tracking-[0.3em] text-zinc-400">
            BLUEAURA
          </p>
          <h1 className="mt-2 text-3xl font-semibold">
            PROJECT
          </h1>
        </header>

        <section>
          <p className="mb-3 text-sm text-zinc-400">
            Aktiva projekt
          </p>

          <Link href="/projects/fernando">
            <div className="cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:bg-zinc-800">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-medium">
                    Fernando – Villa + Pool
                  </h2>

                  <p className="mt-1 text-sm text-zinc-400">
                    Totalentreprenad
                  </p>
                </div>

                <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs">
                  Aktiv
                </span>
              </div>
            </div>
          </Link>

          <button className="mt-5 w-full rounded-2xl bg-white px-5 py-4 font-medium text-black">
            + Nytt projekt
          </button>
        </section>
      </div>
    </main>
  );
}