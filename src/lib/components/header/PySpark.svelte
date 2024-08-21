<script lang="ts">
	import type { IStructure } from '../../../ambient';
	import { Button } from '$lib/components/ui/button/index.js';
	import { exportStructure } from '$lib/scripts/functions';
	import t from '$lib/scripts/locales';
	import { exportPySpark } from '$lib/scripts/exports/pyspark';

	async function exportation() {
		const structure: IStructure = await exportStructure();
		const md: string = await exportPySpark(structure);
		console.log(md);
	}
</script>

<Button on:click={exportation}>{t('header_pyspark')}</Button>
