import type { ConsumerLanguageGroup } from "../types";

export default function ConsumerLanguageSection({
  consumerLanguage,
}: {
  consumerLanguage: ConsumerLanguageGroup[];
}) {
  return (
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
  );
}
