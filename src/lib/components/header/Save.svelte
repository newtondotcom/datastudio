<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { exportStructure } from '$lib/scripts/functions';
	import t from '$lib/scripts/locales';

	let is_ctrl_down = false;
	let is_s_down = false;

	async function on_bind() {
		console.log('save');
		await saveJSONFile();
		//const structure = await exportStructure();
		//console.log(structure)
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

	function on_key_down(event: KeyboardEvent) {
		if (event.repeat) return;

		switch (event.key) {
			case 'Control':
				is_ctrl_down = true;
				event.preventDefault();
				break;

			case 'Meta':
				is_ctrl_down = true;
				event.preventDefault();
				break;

			case 's':
				is_s_down = true;
				break;
		}

		if (is_ctrl_down && is_s_down) {
			on_bind();
		}
	}

	function on_key_up(event: KeyboardEvent) {
		switch (event.key) {
			case 'Control':
				is_ctrl_down = false;
				event.preventDefault();
				break;

			case 'Meta':
				is_ctrl_down = false;
				event.preventDefault();
				break;

			case 's':
				is_s_down = false;
				break;
		}
	}
</script>

<Button on:click={on_bind}>{t('header_save')}</Button>
<svelte:window on:keydown={on_key_down} on:keyup={on_key_up} />
