<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { exportHql } from '$lib/scripts/exports/hql';
	import { exportStructure } from '$lib/scripts/functions';
	import t from '$lib/scripts/locales';
	import type { IStructure } from '../../../ambient';

	async function exportation() {
		const structure: IStructure = await exportStructure();
		const md: string = await exportHql(structure);
		console.log(md);
	}
</script>

<Button on:click={exportation}>{t('header_hql')}</Button>
