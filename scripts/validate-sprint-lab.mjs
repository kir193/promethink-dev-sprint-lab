import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function readJson(relativePath) {
  const content = await readFile(join(root, relativePath), 'utf8');
  return JSON.parse(content);
}

async function main() {
  const source = await readJson('fixtures/project-sprint-source.sample.json');
  const governance = await readJson('fixtures/governance-snapshot.sample.json');
  const trace = await readJson('fixtures/step-stream.sample.json');
  const mockSource = await readJson('fixtures/mock/project-sprint-source.mock.json');
  const mockGovernance = await readJson('fixtures/mock/governance-snapshot.mock.json');
  const mockTrace = await readJson('fixtures/mock/step-stream.mock.json');

  assert(source.sourceType === 'repo', 'project sprint source must be repo-backed');
  assert(typeof source.sourceRef === 'string' && source.sourceRef.length > 0, 'project sprint source ref is required');
  assert(Array.isArray(source.sprints) && source.sprints.length > 0, 'project sprint source must include sprints');
  assert(source.activeSprint?.status === 'active', 'project sprint source must expose an active sprint');
  assert(Array.isArray(source.warnings), 'project sprint source warnings must be present');

  assert(typeof governance.health === 'string' && governance.health.length > 0, 'governance health is required');
  assert(typeof governance.progressLabel === 'string', 'governance progress label is required');
  assert(typeof governance.currentMode === 'string', 'governance currentMode is required');
  assert(!('sprints' in governance), 'governance snapshot must not contain project sprint list');

  assert(Array.isArray(trace.events) && trace.events.length > 0, 'step stream fixture must include events');
  const eventTypes = new Set(trace.events.map((event) => event.type));
  for (const type of ['session', 'turn_start', 'step_start', 'action', 'action_result', 'step_end', 'persisted', 'done']) {
    assert(eventTypes.has(type), `step stream must include ${type}`);
  }

  assert(mockSource.sourceState === 'missing' || mockSource.sourceState === 'empty', 'mock source must represent empty or missing state');
  assert(Array.isArray(mockSource.warnings), 'mock source warnings must be present');
  assert(typeof mockGovernance.health === 'string', 'mock governance health is required');
  assert(typeof mockGovernance.progressLabel === 'string', 'mock governance progress label is required');
  assert(Array.isArray(mockTrace.events) && mockTrace.events.length > 0, 'mock trace must include events');

  for (const sprintPath of ['SPRINTS/S-01/SPRINT.md', 'SPRINTS/S-01/TASKS.md', 'SPRINTS/S-02/SPRINT.md', 'SPRINTS/S-02/TASKS.md', 'SPRINTS/S-03/SPRINT.md', 'SPRINTS/S-03/TASKS.md']) {
    assert(existsSync(join(root, sprintPath)), `missing sprint file: ${sprintPath}`);
  }

  console.log('Sprint lab validation passed');
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
