import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PaperNotes · 兔的论文笔记',
  description: '按 Task、Insight、Novelty、Solution、Flaw 与 Thinking 组织的论文笔记。',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
