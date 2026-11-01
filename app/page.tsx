import Link from "next/link";

const features = [
  {
    number: "01",
    title: "Model your system",
    description:
      "Map services, databases, queues, caches, and AI components into a clear architecture before you test it.",
  },
  {
    number: "02",
    title: "Run realistic simulations",
    description:
      "Explore traffic, latency, capacity, and error behavior over time with configurable workloads.",
  },
  {
    number: "03",
    title: "Inject chaos safely",
    description:
      "Crash nodes, cut connections, spike latency, or create traffic surges to reveal weak points.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f8fc] text-slate-950">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label="Resilience Lab home">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white shadow-lg shadow-indigo-200">
            R
          </span>
          <span className="text-lg font-semibold tracking-tight">Resilience Lab</span>
        </Link>
        <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 sm:flex">
          <a href="#how-it-works" className="transition hover:text-indigo-600">
            How it works
          </a>
          <a href="#features" className="transition hover:text-indigo-600">
            Features
          </a>
          <Link href="/builder" className="text-indigo-600 transition hover:text-indigo-800">
            Open builder
          </Link>
        </div>
      </nav>

      <section className="mx-auto grid w-full max-w-7xl gap-14 px-6 pb-24 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10 lg:pt-24">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Architecture resilience, made visible
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Find the failure points before your users do.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
            Resilience Lab lets you design a system architecture, simulate its
            behavior under load, and inject controlled failures to understand
            what happens next.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/builder"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-indigo-600 px-6 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
            >
              Open the architecture builder
              <span className="ml-3 text-lg" aria-hidden="true">
                →
              </span>
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600"
            >
              See how it works
            </a>
          </div>
          <p className="mt-5 text-sm text-slate-500">
            Build a model first. No production traffic or infrastructure changes required.
          </p>
        </div>

        <div className="relative rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-200/70">
          <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Live workspace
              </p>
              <p className="mt-1 font-semibold">Checkout platform</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              Simulation ready
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["Traffic", "1,240", "requests / sec"],
              ["Latency", "84 ms", "average"],
              ["Health", "99.8%", "success rate"],
            ].map(([label, value, detail]) => (
              <div key={label} className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-500">{label}</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
                <p className="mt-1 text-xs text-slate-400">{detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl bg-slate-950 p-5 text-white">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm font-semibold">System flow</p>
              <span className="text-xs text-slate-400">12 components</span>
            </div>
            <div className="flex items-center justify-between gap-2 text-center text-xs">
              <div className="rounded-lg border border-indigo-400/60 bg-indigo-500/20 px-3 py-3">Gateway</div>
              <span className="text-indigo-300">→</span>
              <div className="rounded-lg border border-cyan-400/60 bg-cyan-500/20 px-3 py-3">Services</div>
              <span className="text-indigo-300">→</span>
              <div className="rounded-lg border border-amber-400/60 bg-amber-500/20 px-3 py-3">Data</div>
            </div>
            <div className="mt-5 flex items-center gap-2 text-xs text-slate-400">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              Chaos controls available for this simulation
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-20 lg:grid-cols-3 lg:px-10">
          {features.map((feature) => (
            <article key={feature.number}>
              <p className="text-sm font-bold text-indigo-600">{feature.number}</p>
              <h2 className="mt-4 text-xl font-semibold">{feature.title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="rounded-3xl bg-indigo-600 px-7 py-12 text-white sm:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-200">
            Your next step
          </p>
          <div className="mt-5 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
                Turn an idea into an architecture you can challenge.
              </h2>
              <p className="mt-4 max-w-xl leading-7 text-indigo-100">
                Start in the builder, arrange your components, then use the simulation
                controls to see where resilience breaks down.
              </p>
            </div>
            <Link
              href="/builder"
              className="inline-flex h-12 shrink-0 items-center justify-center rounded-xl bg-white px-6 font-semibold text-indigo-700 transition hover:bg-indigo-50"
            >
              Start building <span className="ml-3">→</span>
            </Link>
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-2 px-6 pb-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <p>Resilience Lab</p>
        <p>Design. Simulate. Strengthen.</p>
      </footer>
    </main>
  );
}
