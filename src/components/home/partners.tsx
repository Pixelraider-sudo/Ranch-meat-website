import { partners } from "@/services/mock-data";

const marquee = [...partners, ...partners];

export function Partners() {
  return (
    <section className="border-y bg-background/95">
      <div className="mx-auto max-w-[88rem] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-eyebrow text-primary">Trusted Partners</p>

          <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
            Trusted by Kenya's leading restaurants and hospitality brands
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            From premium restaurants to hotel groups, Ranch Meat is built for
            businesses that demand consistent quality, verified sourcing and
            reliable chilled delivery.
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />

          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />

          <div className="group overflow-hidden">
            <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-4 group-hover:[animation-play-state:paused]">
              {marquee.map((partner, index) => (
                <div
                  key={`${partner}-${index}`}
                  className="flex h-16 min-w-[170px] items-center justify-center rounded-2xl border bg-card px-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
                >
                  <span className="font-display text-base font-semibold text-foreground">
                    {partner}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <span>Restaurants</span>
          <span className="size-1 rounded-full bg-border" />
          <span>Hotels</span>
          <span className="size-1 rounded-full bg-border" />
          <span>Butcheries</span>
          <span className="size-1 rounded-full bg-border" />
          <span>Wholesale Buyers</span>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-\\[marquee_28s_linear_infinite\\] {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}