<script lang="ts">
	import RecursiveElement from '$lib/RecursiveElement.svelte';
	import type { Element } from '../ambient';

	import { createOrigin } from '$lib/functions';

	import { Button } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Plus } from 'lucide-svelte';

	import { structure, types } from '$lib/store';
	let structure_local: Element[];
	let types_local: Type[];
	structure.subscribe((value) => {
		structure_local = value;
		console.log(value);
	});
	types.subscribe((value) => {
		types_local = value;
	});

	let name: string;
	let type: string;
</script>

{#if structure_local.length > 0}
	<RecursiveElement indent={0} id={structure_local[0].id} />
{/if}
<Dialog.Root>
	<Dialog.Trigger>
		<Button class="mt-4">Create a new origin<Plus /></Button>
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Edit profile</Dialog.Title>
			<Dialog.Description>
				Make changes to your profile here. Click save when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="name" class="text-right">Name</Label>
				<Input bind:value={name} id="name" class="col-span-3" />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="type" class="text-right">Type</Label>
				<Input bind:value={type} id="type" class="col-span-3" />
			</div>
		</div>
		<Dialog.Footer>
			<Dialog.Close>
				<Button type="submit" on:click={createOrigin(name, type)}>Save changes</Button>
			</Dialog.Close>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
