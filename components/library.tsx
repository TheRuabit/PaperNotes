'use client';

import { useEffect, useMemo, useState } from 'react';
import { BookOpenText, Filter, Grid2X2, List, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { filterPapers, loadCatalog, type Catalog, type CatalogPaper } from '@/lib/papers';

function PaperCard({ paper }: { paper: CatalogPaper }) {
  return (
    <a className="paper-card" data-tone={paper.slug.charCodeAt(0) % 6} href={`/papers/${paper.slug}`}>
      <p className="paper-card-meta">{paper.categories[0] ?? '未分类'} · {paper.date ?? '日期未标注'}</p>
      <h2>{paper.title}</h2>
      <p className="paper-card-excerpt">{paper.excerpt}</p>
      <div className="paper-tags">{paper.keywords.slice(0, 3).map((keyword) => <span key={keyword}>{keyword}</span>)}</div>
    </a>
  );
}

export function Library() {
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [view, setView] = useState<'masonry' | 'list'>('masonry');
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => { loadCatalog().then(setCatalog).catch(() => setCatalog(null)); }, []);

  const papers = useMemo(() => catalog ? filterPapers(catalog.papers, query, selected) : [], [catalog, query, selected]);
  const toggleCategory = (category: string, checked: boolean) => setSelected((current) => {
    const next = new Set(current);
    checked ? next.add(category) : next.delete(category);
    return next;
  });

  if (!catalog) return <main className="paper-loading">正在整理论文笔记…</main>;

  return (
    <main className="site-shell">
      <header className="site-header">
        <Button variant="outline" onClick={() => setFiltersOpen(true)}><Filter /> 分类</Button>
        <a className="site-brand" href="/">PaperNotes</a>
        <div className="header-search"><Search aria-hidden="true" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索标题、关键词或观点…" aria-label="搜索论文笔记" /></div>
        <div className="view-switch" aria-label="显示方式">
          <Button variant={view === 'masonry' ? 'default' : 'outline'} size="sm" onClick={() => setView('masonry')}><Grid2X2 /> 瀑布</Button>
          <Button variant={view === 'list' ? 'default' : 'outline'} size="sm" onClick={() => setView('list')}><List /> 列表</Button>
        </div>
        <a className="github-link" href="https://github.com/TheRuabit/PaperNotes"><span>GitHub</span></a>
      </header>

      <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
        <SheetContent side="left" className="filter-sheet">
          <SheetHeader><SheetTitle>筛选笔记</SheetTitle><SheetDescription>按分类与关键词缩小范围。</SheetDescription></SheetHeader>
          <div className="filter-content">
            <label htmlFor="filter-keyword">分类关键词</label>
            <Input id="filter-keyword" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="KV cache、Agent、SLO…" />
            <div className="category-list">
              {Object.entries(catalog.categories).map(([category, count]) => (
                <label key={category} className="category-option">
                  <Checkbox checked={selected.has(category)} onCheckedChange={(checked) => toggleCategory(category, Boolean(checked))} />
                  <span>{category}</span><small>{count}</small>
                </label>
              ))}
            </div>
            <Button variant="outline" onClick={() => setSelected(new Set())}>清除分类</Button>
          </div>
        </SheetContent>
      </Sheet>

      <section className="library-intro">
        <div><p className="eyebrow">Personal reading library</p><h1>我的论文笔记</h1><p>按自己的问题意识，重组每一篇论文。</p></div>
        <p className="paper-count"><BookOpenText aria-hidden="true" /> {papers.length} / {catalog.paperCount} 篇</p>
      </section>
      {papers.length ? <section className={`paper-collection ${view === 'list' ? 'is-list' : ''}`}>{papers.map((paper) => <PaperCard key={paper.slug} paper={paper} />)}</section> : <p className="empty-state">没有匹配的笔记。试试清除分类或换一个关键词。</p>}
    </main>
  );
}
