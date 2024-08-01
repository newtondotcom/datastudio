<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { renameElement } from '$lib/scripts/functions';
	export let id: string;

	let name: string;

	import { structure } from '$lib/scripts/store';
	let structure_local: IElement[];
	structure.subscribe((value: IElement[]) => {
		structure_local = value;

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
