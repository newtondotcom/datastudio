<script lang="ts">
	import type { IStructure } from '../../../ambient';
	import { Button } from '$lib/components/ui/button/index.js';
	import { exportUML } from '$lib/scripts/exports/uml';
	import { exportStructure } from '$lib/scripts/functions';
	import t from '$lib/scripts/locales';

	async function exportation() {
		const structure: IStructure = await exportStructure();
		const uml: string = await exportUML(structure);
		console.log(uml);
	}
</script>

<Button on:click={exportation}>{t('header_uml')}</Button>
