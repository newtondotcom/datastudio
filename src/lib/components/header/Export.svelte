<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { exportHql } from '$lib/scripts/exports/hql';
	import { exportMarkdown } from '$lib/scripts/exports/markdown';
	import { exportPySpark } from '$lib/scripts/exports/pyspark';
	import { exportSql } from '$lib/scripts/exports/sql';
	import { exportTestData } from '$lib/scripts/exports/test_data';
	import { exportUML } from '$lib/scripts/exports/uml';
	import { exportXsd } from '$lib/scripts/exports/xsd';
	import { exportStructure } from '$lib/scripts/functions';
	import t from '$lib/scripts/locales';
	import type { IStructure } from '../../../ambient';

	export let button_content: string;
	export let disabled: boolean;

	async function exportation() {
		const structure: IStructure = await exportStructure();

		let md: string | undefined;

		switch (button_content) {
			case 'header_hql':
				md = await exportHql(structure);
				break;
			case 'header_md':
				md = await exportMarkdown(structure);
				break;
			case 'header_pyspark':
				md = await exportPySpark(structure);
				break;
			case 'header_sql':
				md = await exportSql(structure);
				break;
			case 'header_test':
				md = await exportTestData(structure);
				break;
			case 'header_uml':
				md = await exportUML(structure);
				break;
			case 'header_xsd':
				md = await exportXsd(structure);
				break;
			default:
				console.log('No exportation method found');
				return;
		}

		if (md) {
			console.log(md);
		}
	}
</script>

<Button on:click={exportation} {disabled}>{t(button_content)}</Button>
