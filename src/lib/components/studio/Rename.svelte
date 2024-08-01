<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Pen } from 'lucide-svelte';

	export let id: string;
	let name: string;

	import { elements } from '$lib/scripts/store';
	import { renameElement } from '$lib/scripts/functions';
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

<Dialog.Root>
	<Dialog.Trigger>
		<Button><Pen /></Button>
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Rename Structure</Dialog.Title>
			<Dialog.Description>
				Rename the structure and click on save when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="name" class="text-right">Name</Label>
				<Input id="name" bind:value={name} class="col-span-3" />
			</div>
		</div>
		<Dialog.Footer>
			<Dialog.Close>
				<Button type="submit" on:click={renameEl}>Save changes</Button>
			</Dialog.Close>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
