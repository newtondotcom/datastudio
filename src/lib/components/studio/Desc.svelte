<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { changeDesc } from '$lib/scripts/functions';
	import t from '$lib/scripts/locales';
	import { elements } from '$lib/scripts/store';
	import { Captions } from 'lucide-svelte';

	export let id: string;

	let desc: string;

	let elements_local: IElement[];
	elements.subscribe((value: IElement[]) => {
		elements_local = value;

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
				<Dialog.Title>{t('elementdesc_title')}</Dialog.Title>
				<Dialog.Description>{t('elementdesc_desc')}</Dialog.Description>
			</Dialog.Header>
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="name" class="text-right">{t('elementdesc_name')}</Label>
					<Input id="name" bind:value={desc} class="col-span-3" />
				</div>
			</div>
			<Dialog.Footer>
				<Dialog.Close>
					<Button on:click={setDesc} type="submit">{t('submit')}</Button>
				</Dialog.Close>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
</div>
