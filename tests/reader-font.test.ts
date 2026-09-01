import assert from 'node:assert/strict';
import test from 'node:test';

import * as papers from '../lib/papers.ts';

test('reader font choices map to the three public text-scale classes', () => {
  const classFor = (papers as { readerFontClass?: (size: string) => string }).readerFontClass;

  assert.equal(typeof classFor, 'function');
  assert.deepEqual(['small', 'medium', 'large'].map((size) => classFor!(size)), [
    'reader-font-small',
    'reader-font-medium',
    'reader-font-large',
  ]);
});
