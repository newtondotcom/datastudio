<script lang="ts">
	import { Input } from '@/components/ui/input/index.js';
	import { renameElement } from '@/hooks/functions';
	import { m } from '@/paraglide/messages.js';
	import { elements } from '@/hooks/store';

	interface Props {
		id: string;
	}

	let { id }: Props = $props();

	let name: string = $state();

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

<Input
	bind:value={name}
	type="text"
	placeholder={m.rename_name()}
	class="mx-1 max-w-xs"
	on:input={renameEl}
/>
