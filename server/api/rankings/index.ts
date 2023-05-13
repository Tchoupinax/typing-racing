import { defineEventHandler } from 'h3'
import { createKysely } from '@vercel/postgres-kysely';
import { Database } from '../../types/database';
import { match } from 'ts-pattern';
 
const db = createKysely<Database>();

export default defineEventHandler(async () => {
  return match(process.env.NODE_ENV)
    .with('production', () => computeReponse())
    .otherwise(() => computeFakeResponse())
})

async function computeReponse() {
  const rows = await db
  .selectFrom('scores')
  .select(["nickname", "score_wpm"])
  .limit(10)
  .orderBy('score_wpm', 'desc')
  .execute();

  return rows
}

function computeFakeResponse() {
  return [
    { nickname: "Fake 1", score_wpm: 23 },
    { nickname: "Fake 2", score_wpm: 13 },
    { nickname: "Fake 3", score_wpm: 3 },
  ]
}