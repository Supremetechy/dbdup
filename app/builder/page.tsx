import Link from "next/link";

const tools = [
  {
    title: "Architecture canvas",
    description:
      "Create a visual system model with load balancers, services, queues, caches, databases, and AI models.",
    status: "Canvas workspace",
  },
  {
    title: "Simulation controls",
    description:
      "Configure traffic, duration, capacity, latency, and jitter to produce a measurable timeline.",
    status: "Simulation workspace",
  },
  {
    title: "Chaos testing",
    description:
      "Test node crashes, latency spikes, capacity drops, connection cuts, and traffic surges.",
    status: "Available in simulation",
  },
];

export default function BuilderPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500 font-bold">
            R
          </span>
          <span className="font-semibold">Resilience Lab</span>
        </Link>
        <Link href="/" className="text-sm text-slate-300 transition hover:text-white">
          Back to overview
        </Link>
      </nav>

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-16 lg:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-300">
          Builder workspace
        </p>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
          Model, simulate, and challenge your architecture.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          This is the starting point for the Resilience Lab workflow. Choose a
          workspace below to move from an architecture idea to measurable
          resilience insights.
        </p>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {tools.map((tool, index) => (
            <article
              key={tool.title}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-indigo-300">0{index + 1}</span>
                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">
                  {tool.status}
                </span>
              </div>
              <h2 className="mt-8 text-xl font-semibold">{tool.title}</h2>
              <p className="mt-3 leading-7 text-slate-400">{tool.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">Ready to define your first system?</h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-300">
            The canvas and simulation components are ready to be composed into
            your working session. Start with an architecture, then save and
            replay its simulation results.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex h-11 items-center rounded-xl bg-indigo-500 px-5 font-semibold transition hover:bg-indigo-400"
          >
            Review the workflow
            <span className="ml-3">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
