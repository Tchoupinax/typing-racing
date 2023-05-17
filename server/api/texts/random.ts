import { defineEventHandler } from 'h3'
import { createKysely } from '@vercel/postgres-kysely';
import { Database } from '../../types/database';
import { sql } from 'kysely';
 
const db = createKysely<Database>();

export default defineEventHandler(async () => {
  return computeReponse();
})

async function computeReponse() {
  const query = sql`SELECT content FROM texts ORDER BY RANDOM() LIMIT 1;`.compile(db)
  const { rows } = await db.executeQuery(query) as { rows: Array<{ content: string }> }
  
  return {
    text: rows[0].content as string,
  }
}
