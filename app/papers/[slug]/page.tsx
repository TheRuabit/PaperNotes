import catalog from '../../../public/data/catalog.json';
import { PaperReader } from '@/components/paper-reader';

export function generateStaticParams() {
  return catalog.papers.map(({ slug }) => ({ slug }));
}

export default async function PaperPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PaperReader slug={slug} />;
}
