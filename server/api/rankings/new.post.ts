import { defineEventHandler, readRawBody } from 'h3'
import { createKysely } from '@vercel/postgres-kysely';
import { Database } from '../../types/database';
import { randomUUID } from 'crypto';
import { match } from 'ts-pattern';
 
type Body = {
  nickname: string;
  score_wpm: number;
}

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

  return match(process.env.NODE_ENV)
  .with('production', () => computeReponse(data))
  .otherwise(() => computeFakeResponse(data))
})

async function computeReponse(data: Body) {
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
}

function computeFakeResponse(data: Body) {
  console.log('inserted score');
  console.log({
    id: randomUUID(),
    nickname: data.nickname,
    score_wpm: data.score_wpm,
    created_at: new Date(),
  })
  return 'OK'
}