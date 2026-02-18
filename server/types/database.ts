import { type ScoresTable } from "./tables/scores";
import { type TextsTable } from "./tables/texts";

export interface Database {
  texts: TextsTable;
  scores: ScoresTable;
}
