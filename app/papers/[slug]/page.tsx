import { PaperReader } from '@/components/paper-reader';

export default async function PaperPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PaperReader slug={slug} />;
}
