function decodeBasicEntities(text: string): string {
  return text
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#(\d+);/g, (_, n: string) =>
      String.fromCharCode(Number.parseInt(n, 10))
    )
    .replace(/&#x([a-f\d]+);/gi, (_, h: string) =>
      String.fromCharCode(Number.parseInt(h, 16))
    );
}

function stripTagsToText(html: string): string {
  let s = html;
  s = s.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ");
  s = s.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ");
  s = s.replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, " ");
  s = s.replace(/<\/(p|div|h[1-6]|li|tr|blockquote)>/gi, "\n");
  s = s.replace(/<br\s*\/?>/gi, "\n");
  s = s.replace(/<[^>]+>/g, " ");
  s = decodeBasicEntities(s);
  s = s.replace(/[ \t\f\v\r]+/g, " ");
  s = s.replace(/\n +/g, "\n");
  s = s.replace(/\n{3,}/g, "\n\n");
  return s.trim();
}

export function extractTitle(html: string): string {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match ? stripTagsToText(match[1]) : "";
}

export function htmlToPlainText(html: string): string {
  const title = extractTitle(html);
  const body = stripTagsToText(html);
  if (title) {
    return `Title: ${title}\n\n${body}`;
  }
  return body;
}
