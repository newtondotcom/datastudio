<script lang="ts">
	import { Button } from '@/components/ui/button/index.js';
	import * as Dialog from '@/components/ui/dialog/index.js';
	import { Input } from '@/components/ui/input/index.js';
	import { Label } from '@/components/ui/label/index.js';
	import { changeDesc } from '@/hooks/functions';
	import { m } from '@/paraglide/messages.js';
	import { elementsStore } from '@/hooks/store';
	import { Captions } from '@lucide/svelte';
	import type { IElement } from '@/hooks/types';

	interface Props {
		id: string;
	}

	let { id }: Props = $props();

	let desc: string = $state("");

	let elementsStore_local: IElement[];
	elementsStore.subscribe((value: IElement[]) => {
		elementsStore_local = value;

		// The element just got deleted
		if (!value.find((el) => el.id === id)) {
			return;
		}

		const el = value.find((el) => el.id === id);
		const description = el.description || '';
		desc = description;
	});

	async function setDesc() {
		await changeDesc(id, desc);
	}
</script>

<div class="mx-1 flex flex-row items-center text-lg">
	<Dialog.Root>
		<Dialog.Trigger>
			<Button>
				<Captions />
			</Button>
		</Dialog.Trigger>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>{m.elementdesc_title()}</Dialog.Title>
				<Dialog.Description>{m.elementdesc_desc()}</Dialog.Description>
			</Dialog.Header>
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="name" class="text-right">{m.elementdesc_name()}</Label>
					<Input id="name" bind:value={desc} class="col-span-3" />
				</div>
			</div>
			<Dialog.Footer>
				<Dialog.Close>
					<Button onclick={setDesc} type="submit">{m.submit()}</Button>
				</Dialog.Close>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
</div>
