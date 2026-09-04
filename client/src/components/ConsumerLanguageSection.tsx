import type { ConsumerLanguageGroup } from "../types";

export default function ConsumerLanguageSection({
  consumerLanguage,
}: {
  consumerLanguage: ConsumerLanguageGroup[];
}) {
  return (
    <ul className="space-y-5">
      {consumerLanguage.map((group) => (
        <li key={group.theme}>
          <p className="text-sm text-ink">{group.theme}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {group.phrases.map((phrase) => (
              <span key={phrase} className="rounded-md bg-accent-soft px-2.5 py-1 text-sm text-accent-dark">
                &ldquo;{phrase}&rdquo;
              </span>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
