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
  if (!data.text) {
    return "FALSE";
  }

  const row = await db
    .insertInto('texts')
    .values({
      id: randomUUID(),
      content: data.text,
      created_at: new Date(),
      updated_at: new Date(),
    })
    .returning(['id', 'content'])
    .executeTakeFirst()
  
  return {
    id: row?.id,
    text: row?.content
  }
})
