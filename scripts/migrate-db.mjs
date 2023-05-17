import { readdir } from 'node:fs/promises'
import child_process from 'child_process'
import { join } from 'node:path'

async function run() {
  const files = await readdir('server/migrations');

  for(const file of files ) {
    const pathfile = join(process.cwd(), '/', 'server/migrations', '/', file);
    child_process.execSync(
      `psql postgres://postgres:postgres@localhost:5432/postgres?sslmode=disable -f ${pathfile}`
    );
  }

  console.log('Migrations applied.');
}

run();
