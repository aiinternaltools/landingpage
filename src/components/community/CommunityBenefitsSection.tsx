import { communityBenefits, communityWaitlist } from "@/content/community";
import { CommunityBenefitIcon } from "@/components/community/CommunityBenefitIcon";

export function CommunityBenefitsSection() {
  return (
    <>
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 md:items-end md:gap-8">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-accent">
            {communityWaitlist.benefitsHeading}
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {communityWaitlist.benefitsSubheading}
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-muted md:text-right">
          This is a preview of the practical hub you will access after launch. Join the
          waitlist now to secure one of the first{" "}
          {communityWaitlist.freeAccessLimit.toLocaleString()} free spots.
        </p>
      </div>

      <ul className="mx-auto mt-9 grid max-w-5xl gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-5">
        {communityBenefits.map((benefit) => (
          <li
            key={benefit.id}
            className="card-elevated card-elevated-hover group flex h-full gap-4 rounded-2xl p-5"
          >
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background/80 text-muted transition-colors group-hover:border-accent/35 group-hover:bg-accent/10 group-hover:text-accent"
              aria-hidden
            >
              <CommunityBenefitIcon id={benefit.id} />
            </span>
            <p className="pt-1.5 text-sm leading-relaxed text-foreground">{benefit.text}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
