<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { renameIElement } from '$lib/functions';
	export let id: string;

	let name: string;

	import { structure } from '$lib/store';
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
		await renameIElement(id, name);
	}
</script>

<Input bind:value={name} type="email" placeholder="Name" class="max-w-xs" on:input={renameEl} />
