<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { exportHql } from '$lib/scripts/exports/hql';
	import { exportMarkdown } from '$lib/scripts/exports/markdown';
	import { exportPySpark } from '$lib/scripts/exports/pyspark';
	import { exportSql } from '$lib/scripts/exports/sql';
	import { exportTestData } from '$lib/scripts/exports/test_data';
	import { exportUML } from '$lib/scripts/exports/uml';
	import { exportXsd } from '$lib/scripts/exports/xsd';
	import { exportStructure } from '$lib/scripts/functions';
	import t from '$lib/scripts/locales';
	import { ofetch } from 'ofetch';
	import type { IStructure } from '../../../ambient';

	export let button_content: string;
	export let disabled: boolean;

	let code: string | undefined;

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
		} else {
			console.log('No code to export');
		}
	}
</script>

<Button on:click={exportation} {disabled}>{t(button_content)}</Button>

{#if code}
	<div
		class="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-gray-900 bg-opacity-50"
	>
		<Card.Root>
			<Card.Header>
				<Card.Title>{t('export_title')}</Card.Title>
				<Card.Description>{t('export_desc')}</Card.Description>
			</Card.Header>
			<Card.Content>
				{@html code}
			</Card.Content>
			<Card.Footer class="flex justify-end">
				<Button
					on:click={() => {
						code = undefined;
					}}
					variant="outline"
				>
					{t('close')}
				</Button>
			</Card.Footer>
		</Card.Root>
	</div>
{/if}
