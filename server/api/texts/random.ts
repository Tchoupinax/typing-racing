import { defineEventHandler } from 'h3'
import { createKysely } from '@vercel/postgres-kysely';
import { Database } from '../../types/database';
import { sql } from 'kysely';
import { match } from 'ts-pattern';
 
const db = createKysely<Database>();

export default defineEventHandler(async (event) => {
  const language = event.context.params?.language ?? "english";
  return match(process.env.NODE_ENV)
    .with('production', () => computeReponse(mapLanguage(language)))
    .otherwise(() => computeFakeResponse())
})

async function computeReponse(language: string): Promise<{ text: string}> {
  const query = sql`SELECT content FROM texts WHERE language=${language} ORDER BY RANDOM() LIMIT 1;`.compile(db)
  const { rows } = await db.executeQuery(query) as { rows: Array<{ content: string }> }

  if (rows.length === 0) {
    return computeReponse("EN");
  }
  return {
    text: rows[0].content as string,
  }
}

function mapLanguage(language: string): string {
  return match(language)
  .with("english", () => "EN")
  .with("typescript", () => "TYPESCRIPT")
  .otherwise(() => "EN");
}

function computeFakeResponse() {
  return {
    text: "Bonjour comment allez-vous ce matin?"
  }
}
