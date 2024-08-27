<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { exportXsd } from '$lib/scripts/exports/xsd';
	import { exportStructure } from '$lib/scripts/functions';
	import t from '$lib/scripts/locales';
	import type { IStructure } from '../../../ambient';

	async function exportation() {
		const structure: IStructure = await exportStructure();
		const md: string = await exportXsd(structure);
		console.log(md);
	}
</script>

<Button on:click={exportation}>{t('header_xsd')}</Button>
