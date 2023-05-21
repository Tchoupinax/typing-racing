import { defineEventHandler } from 'h3'
import { createKysely } from '@vercel/postgres-kysely';
import { Database } from '../../types/database';
import { sql } from 'kysely';
import { match } from 'ts-pattern';
 
const db = createKysely<Database>();

export default defineEventHandler(async () => {
  return match(process.env.NODE_ENV)
    .with('development', () => computeReponse())
    .otherwise(() => computeFakeResponse())
})

async function computeReponse() {
  const query = sql`SELECT content FROM texts ORDER BY RANDOM() LIMIT 1;`.compile(db)
  const { rows } = await db.executeQuery(query) as { rows: Array<{ content: string }> }
  
  return {
    text: rows[0].content as string,
  }
}

function computeFakeResponse() {
  return {
    text: "A game that allows you to train your strike speed"
  }
}
