<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { renameElement } from '$lib/scripts/functions';
	export let id: string;

	let name: string;

	import { elements } from '$lib/scripts/store';
	let elements_local: IElement[];
	elements.subscribe((value: IElement[]) => {
		elements_local = value;

		if (!value.find((el) => el.id === id)) {
			return;
		}

		const el = value.find((el) => el.id === id);
		name = el.name;
	});

	async function renameEl() {
		await renameElement(id, name);
	}
</script>

<Input bind:value={name} type="text" placeholder="Name" class="mx-1 max-w-xs" on:input={renameEl} />
