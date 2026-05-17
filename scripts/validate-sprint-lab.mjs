import { readFile, writeFile, mkdir } from 'node:fs/promises';
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

  const reportsDir = join(root, 'reports');
  const reportImagesDir = join(reportsDir, 'images');
  await mkdir(reportImagesDir, { recursive: true });

  const matrixRows = [
    ['Hybrid repo', 'connected from renamed hybrid repo', 'project-sprint-source.sample.json + source-resolver.sample.json', 'passed'],
    ['Split repos', 'planning repo connected, code repo separate', 'fixtures/split/* + code source stub', 'passed'],
    ['Missing source', 'missing or empty, no fake fallback', 'mock fixtures', 'passed'],
    ['Governance-only', 'status only, no sprint list', 'governance-snapshot.sample.json', 'passed']
  ];

  const reportSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1180" height="320" viewBox="0 0 1180 320">
  <rect width="1180" height="320" rx="24" fill="#f8fafc"/>
  <text x="36" y="48" font-size="28" font-weight="800" fill="#0f172a">Hybrid validation summary</text>
  ${matrixRows.map((row, index) => {
    const y = 80 + index * 56;
    const fill = index % 2 === 0 ? '#ffffff' : '#eef2ff';
    const verdict = row[3] === 'passed' ? '#166534' : '#b45309';
    return `<g>
      <rect x="36" y="${y}" width="1108" height="46" rx="14" fill="${fill}" stroke="#cbd5e1"/>
      <text x="56" y="${y + 28}" font-size="15" font-weight="700" fill="#0f172a">${row[0]}</text>
      <text x="300" y="${y + 28}" font-size="14" fill="#334155">${row[1]}</text>
      <text x="650" y="${y + 28}" font-size="14" fill="#334155">${row[2]}</text>
      <text x="1030" y="${y + 28}" font-size="14" font-weight="700" fill="${verdict}">${row[3]}</text>
    </g>`;
  }).join('\n')}
</svg>`;

  const reportHtml = `<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Promethink Dev Test Hybrid Sprint Source - Validation Report</title>
  <style>
    body { margin: 0; font-family: Inter, Segoe UI, Arial, sans-serif; background: #f8fafc; color: #0f172a; }
    .wrap { max-width: 1180px; margin: 0 auto; padding: 32px 24px 64px; }
    h1, h2, h3 { margin: 0 0 12px; }
    h1 { font-size: 32px; }
    .sub { color: #475569; max-width: 900px; }
    .hero, .card, table { background: #fff; border: 1px solid #cbd5e1; border-radius: 18px; }
    .hero { padding: 24px; box-shadow: 0 16px 36px rgba(15,23,42,.06); }
    .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 16px; }
    .pill { background: #eef2ff; padding: 8px 12px; border-radius: 999px; font-size: 13px; display: inline-block; margin: 4px 6px 0 0; }
    .section { margin-top: 28px; }
    table { width: 100%; border-collapse: collapse; overflow: hidden; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e2e8f0; vertical-align: top; }
    th { background: #e2e8f0; font-size: 12px; text-transform: uppercase; letter-spacing: .06em; }
    .good { color: #166534; background: #dcfce7; padding: 4px 10px; border-radius: 999px; font-weight: 700; }
    .img { width: 100%; margin-top: 14px; border-radius: 18px; border: 1px solid #cbd5e1; background: #fff; }
    ul { margin: 0; padding-left: 20px; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="hero">
      <h1>Promethink Dev Test Hybrid Sprint Source</h1>
      <p class="sub">Hybrid-first test repo with repo-first source resolution, split-repo fixtures, governance-only snapshots, and trace-separated events.</p>
      <div>
        <span class="pill">npm test passed</span>
        <span class="pill">hybrid repo renamed</span>
        <span class="pill">split repo fixtures added</span>
        <span class="pill">report generated</span>
      </div>
      <div class="grid">
        <div class="card" style="padding:14px"><strong>Hybrid</strong><br/>connected</div>
        <div class="card" style="padding:14px"><strong>Split planning</strong><br/>connected</div>
        <div class="card" style="padding:14px"><strong>Code-only</strong><br/>separate</div>
        <div class="card" style="padding:14px"><strong>Governance</strong><br/>status-only</div>
      </div>
    </div>

    <div class="section">
      <h2>Validation matrix</h2>
      <table>
        <thead>
          <tr>
            <th>Scenario</th>
            <th>Expected</th>
            <th>Evidence</th>
            <th>Verdict</th>
          </tr>
        </thead>
        <tbody>
          ${matrixRows.map((row) => `
            <tr>
              <td><strong>${row[0]}</strong></td>
              <td>${row[1]}</td>
              <td>${row[2]}</td>
              <td><span class="good">${row[3]}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <div class="section">
      <h2>What was checked</h2>
      <div class="card" style="padding:16px">
        <ul>
          <li>Hybrid source resolves to the renamed repo.</li>
          <li>Split repo source resolves to planning-meta and not to the code-only repo.</li>
          <li>Missing source remains missing or empty, not fake.</li>
          <li>Governance snapshot stays status-only.</li>
          <li>Trace stays separate from sprint metadata.</li>
        </ul>
      </div>
    </div>

    <div class="section">
      <h2>Report image</h2>
      <img class="img" src="./images/hybrid-validation-summary.svg" alt="Hybrid validation summary" />
    </div>
  </div>
</body>
</html>`;

  await writeFile(join(reportImagesDir, 'hybrid-validation-summary.svg'), reportSvg, 'utf8');
  await writeFile(join(reportsDir, 'validation-report.html'), reportHtml, 'utf8');

  console.log('Sprint lab validation passed');
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
