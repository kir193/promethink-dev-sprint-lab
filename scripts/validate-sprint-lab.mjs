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
  const planningRepoRoot = join(root, '..', 'promethink-dev-test-planning-meta-source');
  const codeRepoRoot = join(root, '..', 'promethink-dev-test-code-source');

  const source = await readJson('fixtures/project-sprint-source.sample.json');
  const governance = await readJson('fixtures/governance-snapshot.sample.json');
  const trace = await readJson('fixtures/step-stream.sample.json');
  const resolver = await readJson('fixtures/source-resolver.sample.json');
  const mockSource = await readJson('fixtures/mock/project-sprint-source.mock.json');
  const mockGovernance = await readJson('fixtures/mock/governance-snapshot.mock.json');
  const mockTrace = await readJson('fixtures/mock/step-stream.mock.json');
  const mockResolver = await readJson('fixtures/mock/source-resolver.mock.json');
  const splitSource = await readJson('fixtures/split/project-sprint-source.sample.json');
  const splitResolver = await readJson('fixtures/split/source-resolver.sample.json');
  const splitCodeInfo = await readJson('fixtures/split/code-repo-info.sample.json');

  assert(source.state === 'connected', 'project sprint source state must be connected');
  assert(source.sourceType === 'repo', 'project sprint source must be repo-backed');
  assert(typeof source.sourceRef === 'string' && source.sourceRef.length > 0, 'project sprint source ref is required');
  assert(Array.isArray(source.sprints) && source.sprints.length > 0, 'project sprint source must include sprints');
  assert(source.activeSprint?.status === 'active', 'project sprint source must expose an active sprint');
  assert(Array.isArray(source.warnings), 'project sprint source warnings must be present');

  assert(typeof governance.health === 'string' && governance.health.length > 0, 'governance health is required');
  assert(typeof governance.progressLabel === 'string', 'governance progress label is required');
  assert(typeof governance.currentMode === 'string', 'governance currentMode is required');
  assert(!('sprints' in governance), 'governance snapshot must not contain project sprint list');
  assert(!('source' in governance), 'governance snapshot must not masquerade as sprint source');

  assert(Array.isArray(trace.events) && trace.events.length > 0, 'step stream fixture must include events');
  const eventTypes = new Set(trace.events.map((event) => event.type));
  for (const type of ['session', 'turn_start', 'step_start', 'action', 'action_result', 'step_end', 'persisted', 'done']) {
    assert(eventTypes.has(type), `step stream must include ${type}`);
  }

  assert(resolver.ok === true, 'source resolver snapshot must be ok');
  assert(typeof resolver.projectId === 'string' && resolver.projectId.length > 0, 'source resolver projectId is required');
  assert(typeof resolver.resolvedAt === 'string' && resolver.resolvedAt.length > 0, 'source resolver resolvedAt is required');
  assert(resolver.selectedProvider === 'repo', 'source resolver must select repo in the sample');
  assert(resolver.sprintSource?.state === 'connected', 'source resolver sprint source state must be connected');
  assert(resolver.sprintSource?.sourceState === 'connected', 'source resolver sprint source must be connected');
  assert(Array.isArray(resolver.sprintSource?.sprints) && resolver.sprintSource.sprints.length > 0, 'source resolver sprint source must include sprints');
  assert(resolver.governanceSnapshot && !('sprints' in resolver.governanceSnapshot), 'source resolver governance snapshot must be status-only');
  assert(Array.isArray(resolver.trace?.events) && resolver.trace.events.length > 0, 'source resolver trace must include events');

  assert(splitSource.state === 'connected', 'split source must be connected');
  assert(splitSource.sourceRef === 'kir193/promethink-dev-test-planning-meta-source', 'split source must point to planning repo');
  assert(Array.isArray(splitSource.sprints) && splitSource.sprints.length > 0, 'split source must include sprints');
  assert(splitResolver.sprintSource?.state === 'connected', 'split resolver sprint source must be connected');
  assert(splitResolver.sourceRef === 'kir193/promethink-dev-test-planning-meta-source', 'split resolver must use planning repo source');
  assert(splitCodeInfo.repoType === 'code-source', 'split code repo must identify as code source');
  assert(splitCodeInfo.hasSprintMetadata === false, 'split code repo must not claim sprint metadata');

  assert(existsSync(join(planningRepoRoot, 'README.md')), 'planning meta repo README is required');
  assert(existsSync(join(planningRepoRoot, 'ROADMAP.md')), 'planning meta repo ROADMAP is required');
  assert(existsSync(join(planningRepoRoot, 'SPRINT_INDEX.md')), 'planning meta repo SPRINT_INDEX is required');
  assert(existsSync(join(planningRepoRoot, 'SPRINTS', 'S-01', 'SPRINT.md')), 'planning meta repo sprint file is required');
  assert(existsSync(join(planningRepoRoot, 'prompts', 'split_repos.md')), 'planning meta repo split repo prompt is required');
  assert(existsSync(join(codeRepoRoot, 'README.md')), 'code repo README is required');
  assert(existsSync(join(codeRepoRoot, 'package.json')), 'code repo package.json is required');
  const codeSourceIndex = await readFile(join(codeRepoRoot, 'src/index.js'), 'utf8');
  assert(codeSourceIndex.includes("repoType = 'code-source'"), 'code repo must identify itself as code source');
  assert(codeSourceIndex.includes('hasSprintMetadata: false'), 'code repo must not claim sprint metadata');

  const splitPlanningSource = await readJson('fixtures/project-sprint-source.sample.json');
  assert(splitPlanningSource.state === 'connected', 'split planning source must still be connected');
  assert(splitPlanningSource.sourceRef === 'kir193/promethink-dev-test-hybrid-sprint-source', 'hybrid source ref must use new repo name');

  assert(mockSource.sourceState === 'missing' || mockSource.sourceState === 'empty', 'mock source must represent empty or missing state');
  assert(mockSource.state === 'missing', 'mock source must expose state missing');
  assert(Array.isArray(mockSource.warnings), 'mock source warnings must be present');
  assert(typeof mockGovernance.health === 'string', 'mock governance health is required');
  assert(typeof mockGovernance.progressLabel === 'string', 'mock governance progress label is required');
  assert(Array.isArray(mockTrace.events) && mockTrace.events.length > 0, 'mock trace must include events');
  assert(mockResolver.selectedProvider === null, 'mock source resolver must not select a provider');
  assert(mockResolver.sprintSource?.state === 'missing', 'mock source resolver must expose missing state');
  assert(mockResolver.sprintSource?.sourceState === 'missing', 'mock source resolver must be missing');
  assert(Array.isArray(mockResolver.trace?.events) && mockResolver.trace.events.length > 0, 'mock source resolver trace must include events');

  for (const sprintPath of ['SPRINTS/S-01/SPRINT.md', 'SPRINTS/S-01/TASKS.md', 'SPRINTS/S-02/SPRINT.md', 'SPRINTS/S-02/TASKS.md', 'SPRINTS/S-03/SPRINT.md', 'SPRINTS/S-03/TASKS.md']) {
    assert(existsSync(join(root, sprintPath)), `missing sprint file: ${sprintPath}`);
  }

  assert(existsSync(join(root, 'prompts', 'repo_first_hybrid.md')), 'hybrid prompt pack is required');
  assert(existsSync(join(root, 'prompts', 'split_repos.md')), 'split repo prompt pack is required');
  assert(existsSync(join(root, 'prompts', 'missing_source.md')), 'missing source prompt pack is required');
  assert(existsSync(join(root, 'prompts', 'stale_source.md')), 'stale source prompt pack is required');
  assert(existsSync(join(root, 'prompts', 'governance_only.md')), 'governance-only prompt pack is required');
  assert(existsSync(join(root, 'prompts', 'trace_only.md')), 'trace-only prompt pack is required');
  assert(existsSync(join(root, 'fixtures', 'split', 'project-sprint-source.sample.json')), 'split project sprint source fixture is required');
  assert(existsSync(join(root, 'fixtures', 'split', 'source-resolver.sample.json')), 'split source resolver fixture is required');
  assert(existsSync(join(root, 'fixtures', 'split', 'code-repo-info.sample.json')), 'split code repo info fixture is required');

  console.log('Sprint lab validation passed');
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
