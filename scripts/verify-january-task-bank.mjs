import assert from 'node:assert/strict';
import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync(new URL('../src/data/january2026Tasks.json', import.meta.url), 'utf8'));
const combinations = data.combinations;

assert.equal(data.source, 'Formation TCF Canada — Sujets Expression Écrite Janvier 2026');
assert.equal(combinations.length, 46, 'Expected all 46 January combinations');
assert.deepEqual(combinations.map((item) => item.combination), Array.from({ length: 46 }, (_, index) => index + 1));

for (const item of combinations) {
  assert.ok(item.task1.prompt.trim(), `Combination ${item.combination}: missing Tâche 1 prompt`);
  assert.ok(item.task2.prompt.trim(), `Combination ${item.combination}: missing Tâche 2 prompt`);
  assert.ok(item.task3.title.trim(), `Combination ${item.combination}: missing Tâche 3 title`);
  assert.ok(item.task3.document1.split(/\s+/).length >= 20, `Combination ${item.combination}: truncated Document 1`);
  assert.ok(item.task3.document2.split(/\s+/).length >= 20, `Combination ${item.combination}: truncated Document 2`);
  assert.ok(!/Masquer la correction|Correction/.test(JSON.stringify(item)), `Combination ${item.combination}: correction leaked into task data`);
}

const documentLengths = combinations.flatMap((item) => [
  item.task3.document1.split(/\s+/).length,
  item.task3.document2.split(/\s+/).length,
]);

console.log(JSON.stringify({
  combinations: combinations.length,
  task1Prompts: combinations.length,
  task2Prompts: combinations.length,
  task3Subjects: combinations.length,
  task3Documents: documentLengths.length,
  minTask3DocumentWords: Math.min(...documentLengths),
  maxTask3DocumentWords: Math.max(...documentLengths),
  averageTask3DocumentWords: Math.round(documentLengths.reduce((sum, count) => sum + count, 0) / documentLengths.length),
}, null, 2));
