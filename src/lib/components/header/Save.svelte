<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { exportStructure } from '$lib/scripts/functions';
	import t from '$lib/scripts/locales';
	import { onMount } from 'svelte';
	import { tinykeys } from 'tinykeys';

	async function on_bind() {
		console.log('save');
		await saveJSONFile();
	}

	async function saveJSONFile() {
		const structure = await exportStructure();
		const jsonString = JSON.stringify(structure, null, 2);
		const blob = new Blob([jsonString], { type: 'application/json' });
		const url = URL.createObjectURL(blob);

		const a = document.createElement('a');
		a.href = url;
		a.download = 'structure.json';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}

	onMount(() => {
		tinykeys(window, {
			'$mod+s': (event: { preventDefault: () => void; key: any }) => {
				event.preventDefault();
				on_bind();
			}
		});
	});
</script>

<Button on:click={on_bind}>{t('header_save')}</Button>
