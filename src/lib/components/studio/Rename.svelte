<script lang="ts">
	import { Button, buttonVariants } from '@/components/ui/button/index.js';
	import * as Dialog from '@/components/ui/dialog/index.js';
	import { Input } from '@/components/ui/input/index.js';
	import { Label } from '@/components/ui/label/index.js';
	import { renameElement } from '@/hooks/functions';
	import { m } from '@/paraglide/messages.js';
	import { elementsStore } from '@/hooks/store';
	import { Pen } from '@lucide/svelte';
	import type { IElement } from '@/hooks/types';

	interface Props {
		id: string;
	}

	let { id }: Props = $props();
	let name: string = $state("");

	let elementsStore_local: IElement[];
	elementsStore.subscribe((value: IElement[]) => {
		elementsStore_local = value;

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
			<Dialog.Title>{m.rename_title()}</Dialog.Title>
			<Dialog.Description>
				{m.rename_desc()}
			</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="name" class="text-right">{m.rename_name()}</Label>
				<Input id="name" bind:value={name} class="col-span-3" />
			</div>
		</div>
		<Dialog.Footer>
			<Dialog.Close>
				<Button type="submit" onclick={renameEl}>{m.submit()}</Button>
			</Dialog.Close>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
