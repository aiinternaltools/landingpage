type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/** Emits a JSON-LD script for search and answer engines. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
