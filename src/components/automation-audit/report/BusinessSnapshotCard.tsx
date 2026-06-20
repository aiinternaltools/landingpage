import { Card } from "@/components/ui/Card";
import type { BusinessSnapshot } from "@/lib/automation-audit/types";

type BusinessSnapshotCardProps = {
  snapshot: BusinessSnapshot;
};

export function BusinessSnapshotCard({ snapshot }: BusinessSnapshotCardProps) {
  return (
    <Card>
      <dl className="grid gap-4 sm:grid-cols-3">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
            Business type
          </dt>
          <dd className="mt-1 text-sm text-foreground">{snapshot.businessType}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
            Audience
          </dt>
          <dd className="mt-1 text-sm text-foreground">{snapshot.audience}</dd>
        </div>
        <div className="sm:col-span-3">
          <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
            Offer
          </dt>
          <dd className="mt-1 text-sm leading-relaxed text-foreground">
            {snapshot.offerSummary}
          </dd>
        </div>
      </dl>
    </Card>
  );
}
