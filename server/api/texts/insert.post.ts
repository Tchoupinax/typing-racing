import { defineEventHandler, readRawBody } from 'h3'
import { createKysely } from '@vercel/postgres-kysely';
import { Database } from '../../types/database';
import { randomUUID } from 'crypto';
import { match } from 'ts-pattern';
import { checkAdminAllowance } from '../../middlewares/admin-check'
 
type Body = {
  text: string;
}

const db = createKysely<Database>();

export default defineEventHandler(async (request) => {
  const body = await readRawBody(request)
  if (!body) {
    return "FALSE"
  }

  const data = JSON.parse(body);
  if (!data.text) {
    return "FALSE";
  }


  return checkAdminAllowance(
    request,
    () => match(process.env.NODE_ENV)
      .with('production', () => computeReponse(data))
      .otherwise(() => computeFakeResponse(data))
  );
})

async function computeReponse(data: Body) {
  await db
    .insertInto('texts')
    .values({
      id: randomUUID(),
      content: data.text,
      created_at: new Date(),
      updated_at: new Date(),
      complexity: 'MEDIUM',
      language: 'EN'
    })
    .executeTakeFirst()
  
  return 'OK'
}

function computeFakeResponse(data: Body) {
  console.log('inserted text');
  console.log({
    id: randomUUID(),
    content: data.text,
    created_at: new Date(),
    updated_at: new Date(),
    complexity: 'MEDIUM',
    language: 'EN'
  })
  return 'OK'
}