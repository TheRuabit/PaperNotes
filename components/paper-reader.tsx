'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { ArrowLeft, ExternalLink } from 'lucide-react';

import { appPath, loadPaper, readerFontClass, type Paper, type ReaderFontSize } from '@/lib/papers';
import 'katex/dist/katex.min.css';

function ChapterLinks({ paper, className }: { paper: Paper; className: string }) {
  return <nav className={className} aria-label="笔记章节">{paper.sections.map((section) => <a key={section.slug} href={`#${section.slug}`}>{section.title}</a>)}</nav>;
}

export function PaperReader({ slug }: { slug: string }) {
  const [paper, setPaper] = useState<Paper | null>(null);
  const [failed, setFailed] = useState(false);
  const [fontSize, setFontSize] = useState<ReaderFontSize>('medium');

  useEffect(() => { loadPaper(slug).then(setPaper).catch(() => setFailed(true)); }, [slug]);

  if (failed) return <main className="paper-loading">找不到这篇笔记。</main>;
  if (!paper) return <main className="paper-loading">正在加载笔记…</main>;

  return (
    <main className={`reader-shell ${readerFontClass(fontSize)}`}>
      <header className="paper-hero">
        <a className="back-link" href={appPath('/')}><ArrowLeft aria-hidden="true" /> 返回笔记库</a>
        <p className="eyebrow">{paper.categories[0] ?? '未分类'}</p>
        <h1>{paper.title}</h1>
        <div className="paper-details">
          <div className="paper-meta-info"><span>arXiv {paper.arxivId}</span>{paper.date && <span>{paper.date}</span>}</div>
          <div className="paper-actions">
            <div className="font-size-switch" aria-label="正文字号"><span>正文</span>{(['small', 'medium', 'large'] as ReaderFontSize[]).map((size) => <button aria-pressed={fontSize === size} key={size} onClick={() => setFontSize(size)} type="button">{{ small: '小', medium: '中', large: '大' }[size]}</button>)}</div>
            <a className="paper-link-button" href={paper.arxivUrl}>原论文 <ExternalLink aria-hidden="true" /></a>{paper.codeUrl && <a className="paper-link-button" href={paper.codeUrl}>代码 <ExternalLink aria-hidden="true" /></a>}
          </div>
        </div>
      </header>

      <div className="reader-sticky-bar">
        <div className="reader-sticky-inner">
          <div className="sticky-paper-info"><strong>{paper.title}</strong><span>{paper.categories[0] ?? '未分类'} · {paper.arxivId}</span></div>
          <ChapterLinks paper={paper} className="mobile-chapters" />
        </div>
      </div>
      <div className="reader-layout">
        <ChapterLinks paper={paper} className="desktop-chapters" />
        <article className="section-stack">
          {paper.sections.map((section, index) => (
            <section className="paper-section" data-tone={index % 6} id={section.slug} key={section.slug}>
              <div className="paper-section-heading"><h2>{section.title}</h2><span>{String(index + 1).padStart(2, '0')}</span></div>
              <div className="markdown-body"><ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>{section.markdown}</ReactMarkdown></div>
            </section>
          ))}
        </article>
      </div>
      <footer className="reader-footer">仅展示个人 Markdown 笔记与原论文链接；不提供 PDF 下载或分发。</footer>
    </main>
  );
}
