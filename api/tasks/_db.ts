import pg from 'pg';

const { Pool } = pg;

type TaskSlotId = 1 | 2 | 3;

type TaskDocument = {
  label: string;
  text: string;
};

type TaskBankItem = {
  id: string;
  taskId: TaskSlotId;
  prompt: string;
  documents?: TaskDocument[];
  createdAt?: string;
};

const TABLE_NAME = 'tcf_writing_tasks';
let pool: pg.Pool | undefined;
let schemaReady: Promise<void> | undefined;

function getDatabaseUrl() {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL;
}

function getPool() {
  const connectionString = getDatabaseUrl();

  if (!connectionString) {
    throw new Error('Missing DATABASE_URL or POSTGRES_URL environment variable.');
  }

  if (!pool) {
    const isLocalDatabase = /localhost|127\.0\.0\.1/.test(connectionString);

    pool = new Pool({
      connectionString,
      ssl: isLocalDatabase ? false : { rejectUnauthorized: false },
    });
  }

  return pool;
}

async function ensureSchema() {
  const client = getPool();

  await client.query(`
    create table if not exists ${TABLE_NAME} (
      id text primary key,
      task_id integer not null check (task_id in (1, 2, 3)),
      prompt text not null,
      documents jsonb,
      created_at timestamptz not null default now()
    )
  `);
}

async function ensureSchemaOnce() {
  schemaReady ??= ensureSchema();
  return schemaReady;
}

function isTaskSlotId(value: unknown): value is TaskSlotId {
  return value === 1 || value === 2 || value === 3;
}

function parseDocuments(value: unknown): TaskDocument[] | undefined {
  if (!value) {
    return undefined;
  }

  if (!Array.isArray(value)) {
    return undefined;
  }

  const documents = value
    .map((document) => ({
      label: typeof document?.label === 'string' ? document.label : '',
      text: typeof document?.text === 'string' ? document.text : '',
    }))
    .filter((document) => document.label && document.text);

  return documents.length ? documents : undefined;
}

type TaskRow = {
  id: string;
  task_id: number;
  prompt: string;
  documents: unknown;
  created_at: Date | string;
};

function rowToTask(row: TaskRow): TaskBankItem {
  const taskId = Number(row.task_id);

  if (!isTaskSlotId(taskId)) {
    throw new Error(`Invalid task id in database row: ${row.task_id}`);
  }

  return {
    id: row.id,
    taskId,
    prompt: row.prompt,
    documents: parseDocuments(row.documents),
    createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : row.created_at,
  };
}

export async function listCustomTasks() {
  await ensureSchemaOnce();

  const result = await getPool().query<TaskRow>(`
    select id, task_id, prompt, documents, created_at
    from ${TABLE_NAME}
    order by task_id asc, created_at asc
  `);

  return result.rows.map(rowToTask);
}

export type NewCustomTask = {
  taskId: TaskSlotId;
  prompt: string;
  documents?: TaskDocument[];
};

function createTaskId() {
  return `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function createCustomTask(task: NewCustomTask) {
  await ensureSchemaOnce();

  const id = createTaskId();
  const documents = task.documents?.length ? JSON.stringify(task.documents) : null;

  const result = await getPool().query<TaskRow>(
    `
      insert into ${TABLE_NAME} (id, task_id, prompt, documents)
      values ($1, $2, $3, $4::jsonb)
      returning id, task_id, prompt, documents, created_at
    `,
    [id, task.taskId, task.prompt, documents],
  );

  return rowToTask(result.rows[0]);
}
