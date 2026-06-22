export function localeAlternates(path: string) {
  return { languages: { en: `/en${path}`, ro: `/ro${path}` } };
}
