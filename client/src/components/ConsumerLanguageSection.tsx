import type { ConsumerLanguageGroup } from "../types";

export default function ConsumerLanguageSection({
  consumerLanguage,
}: {
  consumerLanguage: ConsumerLanguageGroup[];
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">Consumer Language</h2>
      <ul className="space-y-3">
        {consumerLanguage.map((group) => (
          <li key={group.theme}>
            <p className="text-sm font-medium text-slate-700">{group.theme}</p>
            <div className="mt-1.5 flex flex-wrap gap-2">
              {group.phrases.map((phrase) => (
                <span
                  key={phrase}
                  className="rounded-md bg-amber-50 px-2.5 py-1 text-sm text-amber-800 ring-1 ring-inset ring-amber-200"
                >
                  &ldquo;{phrase}&rdquo;
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
