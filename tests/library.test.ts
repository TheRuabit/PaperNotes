import assert from 'node:assert/strict';
import test from 'node:test';

import { filterPapers, type CatalogPaper } from '../lib/papers.ts';

const papers: CatalogPaper[] = [
  {
    slug: 'memdecay',
    title: 'MemDecay: Region-Aware KV Cache Eviction',
    arxivId: '2607.10582',
    arxivUrl: 'https://arxiv.org/abs/2607.10582',
    date: '2026-07-12',
    categories: ['KV Cache 压缩与驱逐'],
    keywords: ['Agent 轨迹', 'KV cache'],
    read: false,
    excerpt: '按轨迹处理 KV cache 驱逐。',
  },
  {
    slug: 'topas',
    title: 'TOPAS: Workflow-Aware Scheduling',
    arxivId: '2608.25523',
    arxivUrl: 'https://arxiv.org/abs/2608.25523',
    date: '2026-08-26',
    categories: ['Agent 推理优化'],
    keywords: ['workflow-aware 调度'],
    read: true,
    excerpt: '按工作流关键路径调度。',
  },
];

test('filterPapers intersects category selection with a case-insensitive search', () => {
  const shown = filterPapers(papers, 'KV', new Set(['KV Cache 压缩与驱逐']));

  assert.deepEqual(shown.map((paper) => paper.slug), ['memdecay']);
});
