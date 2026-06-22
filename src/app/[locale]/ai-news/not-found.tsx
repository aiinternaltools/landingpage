import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";

export default async function AiNewsNotFound() {
  const t = await getTranslations("aiNews");

  return (
    <main className="flex flex-1 flex-col">
      <Section pad="tight" className="pt-16 text-center">
        <h1 className="text-2xl font-semibold text-foreground">{t("notFound.title")}</h1>
        <p className="mt-3 text-muted">{t("notFound.description")}</p>
        <div className="mt-8">
          <Button href="/ai-news" variant="primary">
            {t("notFound.backToAiNews")}
          </Button>
        </div>
        <p className="mt-6 text-sm text-muted">
          <Link href="/" className="text-accent hover:underline">
            {t("notFound.home")}
          </Link>
        </p>
      </Section>
    </main>
  );
}
