<script lang="ts">
	import { Button } from '@/components/ui/button/index.js';
	import * as Card from '@/components/ui/card/index.js';
	import { exportHql } from '@/hooks/exports/hql';
	import { exportMarkdown } from '@/hooks/exports/markdown';
	import { exportPySpark } from '@/hooks/exports/pyspark';
	import { exportSql } from '@/hooks/exports/sql';
	import { exportTestData } from '@/hooks/exports/test_data';
	import { exportUML } from '@/hooks/exports/uml';
	import { exportXsd } from '@/hooks/exports/xsd';
	import { exportStructure } from '@/hooks/functions';
	import { m } from '@/paraglide/messages.js';
	import { ofetch } from 'ofetch';
	import type { IStructure } from '@/hooks/types';

	interface Props {
		button_content: string;
		disabled: boolean;
	}

	let { button_content, disabled }: Props = $props();

	let code: string | undefined = $state();

	async function exportation() {
		const structure: IStructure = await exportStructure();

		let code_local: string | undefined;
		let langageId: string | undefined;

		switch (button_content) {
			case 'header_hql':
				code_local = await exportHql(structure);
				langageId = 'hql';
				break;
			case 'header_md':
				code_local = await exportMarkdown(structure);
				langageId = 'markdown';
				break;
			case 'header_pyspark':
				code_local = await exportPySpark(structure);
				langageId = 'python';
				break;
			case 'header_sql':
				code_local = await exportSql(structure);
				langageId = 'sql';
				break;
			case 'header_test':
				code_local = await exportTestData(structure);
				langageId = 'json';
				break;
			case 'header_uml':
				code_local = await exportUML(structure);
				langageId = 'uml';
				break;
			case 'header_xsd':
				code_local = await exportXsd(structure);
				langageId = 'xml';
				break;
			default:
				console.log('No exportation method found');
				return;
		}

		if (code_local) {
		/*
			const data = await ofetch(`/codeblock`, {
				method: 'POST',
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				body: {
					code: code_local,
					langageId
				}
			});
			code = data.formattedCode;
		*/
			code = code_local;
		} else {
			console.log('No code to export');
		}
	}
</script>

<Button onclick={exportation} {disabled}>{m.button_content()}</Button>

{#if code}
	<div
		class="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-gray-900 bg-opacity-50"
	>
		<Card.Root>
			<Card.Header>
				<Card.Title>{m.export_title()}</Card.Title>
				<Card.Description>{m.export_desc()}</Card.Description>
			</Card.Header>
			<Card.Content>
				{@html code}
			</Card.Content>
			<Card.Footer class="flex justify-end">
				<Button
					onclick={() => {
						code = undefined;
					}}
					variant="outline"
				>
					{m.close()}
				</Button>
			</Card.Footer>
		</Card.Root>
	</div>
{/if}
