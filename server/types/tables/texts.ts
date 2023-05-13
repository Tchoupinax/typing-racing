export type TextsTable = {
  content: string;
  created_at: Date;
  id: string;
  updated_at: Date;
  complexity: "SMALL" | "MEDIUM" | "HIGH"
  language: "EN" | "FR"
}
