import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { transformerCopyButton, transformerFoldableLines } from '@rehype-pretty/transformers';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import type { Compatible } from 'vfile';

export const toHTML = (content: Compatible | undefined) =>
	unified()
		.use(remarkParse)
		.use(remarkRehype)
		.use(rehypePrettyCode, {
			theme: JSON.parse(
				String(readFileSync(resolve(__dirname, './src/lib/components/codeblock/dark.json')))
			),
			transformers: [
				transformerCopyButton({
					visibility: 'always',
					feedbackDuration: 2_500
				}),
				transformerFoldableLines({
					lines: [[1, 2]]
				})
			]
		})
		.use(rehypeStringify)
		.process(content);
