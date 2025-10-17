export type NoteSummary = {
  id: string;
  title: string;
  excerpt: string;
};

export const createNoteSummary = (partial: Partial<NoteSummary>): NoteSummary => ({
  id: partial.id ?? `note_${Math.random().toString(36).slice(2)}`,
  title: partial.title ?? "Untitled Note",
  excerpt: partial.excerpt ?? "",
});
