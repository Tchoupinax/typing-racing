import { ScoresTable } from "./tables/scores";
import { TextsTable } from "./tables/texts";

export interface Database {
  texts: TextsTable;
  scores: ScoresTable;
}
