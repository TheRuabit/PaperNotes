export type CatalogPaper = {
  slug: string;
  title: string;
  arxivId: string;
  arxivUrl: string;
  date: string | null;
  categories: string[];
  keywords: string[];
  read: boolean;
  excerpt: string;
};

export type Catalog = {
  version: number;
  paperCount: number;
  categories: Record<string, number>;
  papers: CatalogPaper[];
};

export type Paper = Omit<CatalogPaper, 'excerpt'> & {
  codeUrl: string | null;
  sections: Array<{ slug: string; title: string; markdown: string }>;
};

export type ReaderFontSize = 'small' | 'medium' | 'large';

export function assetPath(basePath: string, path: string) {
  return `${basePath.replace(/\/?$/, '/')}${path.replace(/^\//, '')}`;
}

export const appPath = (path: string) => assetPath(import.meta.env?.BASE_URL ?? '/', path);

export function readerFontClass(size: ReaderFontSize) {
  return `reader-font-${size}`;
}

export function filterPapers(
  papers: CatalogPaper[],
  query: string,
  categories: Set<string>,
) {
  const needle = query.trim().toLocaleLowerCase();
  return papers.filter((paper) => {
    const categoryMatches = !categories.size || paper.categories.some((category) => categories.has(category));
    const text = [paper.title, paper.excerpt, ...paper.keywords].join(' ').toLocaleLowerCase();
    return categoryMatches && (!needle || text.includes(needle));
  });
}

async function loadJson<T>(path: string): Promise<T> {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Unable to load ${path}`);
  return response.json() as Promise<T>;
}

export const loadCatalog = () => loadJson<Catalog>(appPath('/data/catalog.json'));
export const loadPaper = (slug: string) => loadJson<Paper>(appPath(`/data/papers/${encodeURIComponent(slug)}.json`));
