#!/usr/bin/env node

import { createOpenAI } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { loadEnv } from 'vite';
import { z } from 'zod';

const DEFAULT_MODEL = 'gpt-4.1-mini';
const model = parseArg('--model') ?? process.env.OPENAI_MODEL ?? DEFAULT_MODEL;
const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');

for (const [key, value] of Object.entries(env)) {
  process.env[key] ??= value;
}

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error('OPENAI_API_KEY was not loaded. Make sure .env contains OPENAI_API_KEY=...');
  process.exit(1);
}

console.log('OPENAI_API_KEY: loaded');
console.log(`Model: ${model}`);

try {
  await checkModelEndpoint(apiKey, model);
  await checkAiSdkStructuredOutput(apiKey, model);
  console.log('OpenAI debug checks passed.');
} catch (error) {
  console.error('OpenAI debug check failed.');
  printError(error, apiKey);
  process.exit(1);
}

function parseArg(name) {
  const index = process.argv.indexOf(name);
  if (index === -1) return undefined;
  return process.argv[index + 1];
}

async function checkModelEndpoint(key, modelName) {
  console.log('Checking OpenAI model endpoint...');

  const response = await fetch(`https://api.openai.com/v1/models/${encodeURIComponent(modelName)}`, {
    headers: {
      Authorization: `Bearer ${key}`,
    },
  });

  const text = await response.text();
  const payload = parseJson(text);

  if (!response.ok) {
    const message = payload?.error?.message ?? text;
    throw new Error(`Model endpoint returned ${response.status}: ${message}`);
  }

  console.log(`Model endpoint OK: ${payload?.id ?? modelName}`);
}

async function checkAiSdkStructuredOutput(key, modelName) {
  console.log('Checking AI SDK structured output...');

  const openai = createOpenAI({ apiKey: key });
  const { object } = await generateObject({
    model: openai(modelName),
    schemaName: 'OpenAIDebugResult',
    schema: z.object({
      ok: z.boolean(),
      provider: z.literal('openai'),
      model: z.string(),
      message: z.string(),
    }),
    prompt: `Return a tiny JSON object confirming that OpenAI model "${modelName}" can produce structured output.`,
  });

  console.log('AI SDK structured output OK:');
  console.log(JSON.stringify(object, null, 2));
}

function parseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

function printError(error, secret) {
  const details = toSafeError(error, secret);
  console.error(JSON.stringify(details, null, 2));
}

function toSafeError(error, secret) {
  if (!error || typeof error !== 'object') {
    return redact(String(error), secret);
  }

  const result = {
    name: redact(error.name, secret),
    message: redact(error.message, secret),
  };

  for (const key of ['status', 'statusCode', 'code', 'type', 'param']) {
    if (error[key] !== undefined) {
      result[key] = redact(error[key], secret);
    }
  }

  if (error.cause) {
    result.cause = toSafeError(error.cause, secret);
  }

  return result;
}

function redact(value, secret) {
  if (value === undefined || value === null) return value;

  if (typeof value === 'string') {
    return value.split(secret).join('[REDACTED_OPENAI_API_KEY]');
  }

  return value;
}
