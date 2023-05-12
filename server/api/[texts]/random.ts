import { defineEventHandler } from 'h3'
import { createKysely } from '@vercel/postgres-kysely';
import { Database } from '../../types/database';
import { sql } from 'kysely';
 
const db = createKysely<Database>();

export default defineEventHandler(async () => {
  const { rows } = await db
    .executeQuery(sql`
      SELECT content
      FROM texts
      ORDER BY RANDOM()
      LIMIT 1;
    `.compile(db))

  return {
    text: rows[0].content,
  }
})
