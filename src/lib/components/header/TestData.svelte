<script lang="ts">
	import t from '$lib/scripts/locales';
	import { Button } from '$lib/components/ui/button/index.js';
	import { exportStructure } from '$lib/scripts/functions';
	import type { IStructure } from '../../../ambient';
	import { exportTestData } from '$lib/scripts/exports/test_data';

	async function exportation() {
		const structure: IStructure = await exportStructure();
		const md: string = await exportTestData(structure);
		console.log(md);
	}
</script>

<Button on:click={exportation}>{t('header_test')}</Button>
