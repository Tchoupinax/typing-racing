import { defineEventHandler } from 'h3'
import { createKysely } from '@vercel/postgres-kysely';
import { Database } from '../../types/database';
 
const db = createKysely<Database>();

export default defineEventHandler(async () => {
  const rows = await db
    .selectFrom('scores')
    .select(["nickname", "score_wpm"])
    .limit(10)
    .execute();
  
  return rows
})
