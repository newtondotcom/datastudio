<script lang="ts">
	import IElement from '$lib/Element.svelte';
	import type { IElement } from '../ambient';
	import { createITypestruct } from '$lib/functions';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Plus } from 'lucide-svelte';

	import { structure } from '$lib/store';
	let structure_local: IElement[];
	let origins: IElement[];
	structure.subscribe((value) => {
		structure_local = value;
		origins = value.filter((el: IElement) => el.indent === 0);
	});

	let name: string;
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<Button class="mx-1">Create a type<Plus /></Button>
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
		</div>
		<Dialog.Footer>
			<Dialog.Close>
				<Button type="submit" on:click={createITypestruct(name)}>Save changes</Button>
			</Dialog.Close>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

{#if origins.length > 0}
	{#each origins as origin}
		<IElement id={origin.id} />
	{/each}
{/if}
