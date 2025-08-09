<script lang="ts">
	import { Button } from '@/components/ui/button/index.js';
	import { exportStructure } from '@/hooks/functions';
	import { m } from '@/paraglide/messages.js';
	import { onMount } from 'svelte';
	import ShortcutManager from '@keybindy/core';

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
		const manager = new ShortcutManager();
		manager.register(
			['Ctrl', 'S'],
			() => {
				on_bind();
			},
			{
				preventDefault: true
			}
		);
		manager.register(
			['Meta', 'S'],
			() => {
				on_bind();
			},
			{
				preventDefault: true
			}
		);
	});
</script>

<Button onclick={on_bind}>{m.header_save()}</Button>
