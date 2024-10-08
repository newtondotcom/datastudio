import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { transformerCopyButton, transformerFoldableLines } from '@rehype-pretty/transformers';
import { json } from '@sveltejs/kit';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { getHighlighter } from 'shiki';
import { unified } from 'unified';
import type { RequestHandler } from './$types';
import type { Compatible } from 'vfile';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const toHTML = (content: Compatible | undefined) =>
	unified()
		.use(remarkParse)
		.use(remarkRehype)
		.use(rehypePrettyCode, {
			theme: JSON.parse(
				String(
					readFileSync(resolve(__dirname, '../../../src/lib/components/codeblock/theme-dark.json'))
				)
			),
			transformers: [
				transformerCopyButton({
					visibility: 'always',
					feedbackDuration: 2_000
				}),
				transformerFoldableLines({
					lines: [[1, 2]]
				})
			],
			getHighlighter: (options) =>
				getHighlighter({
					...options,
					langs: [
						'plaintext',
						import('shiki/langs/javascript.mjs'),
						import('shiki/langs/typescript.mjs'),
						import('shiki/langs/css.mjs'),
						import('shiki/langs/svelte.mjs'),
						import('shiki/langs/shellscript.mjs'),
						import('shiki/langs/markdown.mjs')
					]
				}),
			keepBackground: false,
			onVisitLine(node) {
				if (node.children.length === 0) {
					// @ts-expect-error - we're changing the node type
					node.children = { type: 'text', value: ' ' };
				}
			},
			onVisitHighlightedLine(node) {
				node.properties.className = ['line--highlighted'];
			},
			onVisitHighlightedChars(node) {
				node.properties.className = ['chars--highlighted'];
			}
		})
		.use(rehypeStringify)
		.process(content);

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	const code = body.code;
	const langageId = body.langageId;

	const processedResult = await toHTML(`\`\`\`${langageId} title=""\n${code}\n\`\`\``);
	const formattedCode = String(processedResult);

	return json({ formattedCode });
};
