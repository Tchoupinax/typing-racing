import { defineEventHandler, readRawBody } from 'h3'
import { createKysely } from '@vercel/postgres-kysely';
import { Database } from '../../types/database';
import { randomUUID } from 'crypto';
 
const db = createKysely<Database>();

export default defineEventHandler(async (request) => {
  const body = await readRawBody(request)
  if (!body) {
    return "FALSE"
  }

  const data = JSON.parse(body);
  if (!data.nickname && !data.score_wpm) {
    return "FALSE";
  }

  await db
    .insertInto('scores')
    .values({
      id: randomUUID(),
      nickname: data.nickname,
      score_wpm: data.score_wpm,
      created_at: new Date(),
    })
    .executeTakeFirst()
  
  return 'OK'
})
