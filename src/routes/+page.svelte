<script lang="ts">
	import Element from '$lib/components/studio/Element.svelte';
	import type { IElement } from '../ambient';
	import { change_colors, createTypestruct } from '$lib/scripts/functions';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { LockOpen, Plus } from 'lucide-svelte';

	import { elements } from '$lib/scripts/store';
	import t from '$lib/scripts/locales';

	let elements_local: IElement[];
	let origins: IElement[];
	elements.subscribe((value) => {
		elements_local = value;
		origins = value.filter((el: IElement) => el.indent === 0);
	});

	let name: string;

	async function change() {
		await change_colors();
	}
</script>

<div class="flex flex-row">
	<Dialog.Root>
		<Dialog.Trigger>
			<Button class="mx-1">
				{t('type_create')}
				<Plus class="mx-1" />
			</Button>
		</Dialog.Trigger>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>{t('type_create')}</Dialog.Title>
				<Dialog.Description>
					Specify the name of the type and click on save when you're done.
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
					<Button type="submit" on:click={() => createTypestruct(name)}>Save changes</Button>
				</Dialog.Close>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
	<Button on:click={change}>
		{t('header_colors')}
		<LockOpen class="mx-1" />
	</Button>
</div>

{#if origins.length > 0}
	{#each origins as origin}
		<Element id={origin.id} />
	{/each}
{/if}
