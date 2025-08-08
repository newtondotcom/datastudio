<script lang="ts">
	import Element from '@/components/studio/Element.svelte';
	import { Button } from '@/components/ui/button/index.js';
	import * as Dialog from '@/components/ui/dialog/index.js';
	import { Input } from '@/components/ui/input/index.js';
	import { Label } from '@/components/ui/label/index.js';
	import { change_colors, createtypesStoretruct } from '@/hooks/functions';
	import { m } from '@/paraglide/messages.js';
	import { elementsStore } from '@/hooks/store';
	import { Plus, RotateCcw } from '@lucide/svelte';
	import type { IElement } from '@/hooks/types';

	let elementsStore_local: IElement[];
	let origins: IElement[] = $state([]);
	elementsStore.subscribe((value: IElement[]) => {
		elementsStore_local = value;
		origins = value.filter((el: IElement) => el.indent === 0);
	});

	let name: string = $state("");

	async function change() {
		await change_colors();
	}
</script>

<div class="flex flex-row">
	<Dialog.Root>
		<Dialog.Trigger>
			<Button class="mx-1">
				{m.type_create()}
				<Plus class="mx-1" />
			</Button>
		</Dialog.Trigger>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>{m.type_create()}</Dialog.Title>
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
					<Button type="submit" onclick={() => createtypesStoretruct(name)}>Save changes</Button>
				</Dialog.Close>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
	<Button onclick={change}>
		{m.header_colors()}
		<RotateCcw class="mx-1" />
	</Button>
</div>

{#if origins.length > 0}
	{#each origins as origin}
		<Element id={origin.id} />
	{/each}
{/if}
