<script lang="ts">
	import type { IStructure } from '../../../ambient';
	import { Button } from '$lib/components/ui/button/index.js';
	import { exportStructure } from '$lib/scripts/functions';
	import t from '$lib/scripts/locales';
	import { exportSql } from '$lib/scripts/exports/sql';

	async function exportation() {
		const structure: IStructure = await exportStructure();
		const md: string = await exportSql(structure);
		console.log(md);
	}
</script>

<Button on:click={exportation}>{t('header_sql')}</Button>
