import { partners } from "@/services/mock-data";

export function Partners() {
  return (
    <div className="border-y bg-background">
      <div className="mx-auto max-w-[88rem] px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <p className="text-eyebrow shrink-0 text-muted-foreground">
            Trusted by kitchens &amp; groups
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {partners.map((partner) => (
              <li
                key={partner}
                className="font-display text-base font-semibold text-muted-foreground/70 transition-colors hover:text-foreground"
              >
                {partner}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}