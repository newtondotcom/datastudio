<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { exportMarkdown } from '$lib/scripts/exports/markdown';
	import { exportStructure } from '$lib/scripts/functions';
	import t from '$lib/scripts/locales';
	import type { IStructure } from '../../../ambient';

	async function exportation() {
		const structure: IStructure = await exportStructure();
		const md: string = await exportMarkdown(structure);
		console.log(md);
	}
</script>

<Button on:click={exportation}>{t('header_uml')}</Button>
