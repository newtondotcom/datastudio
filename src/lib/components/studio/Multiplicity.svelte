<script lang="ts">
	import * as Select from '@/components/ui/select';
	import { changeMultiplicity } from '@/hooks/functions';
	import { elementsStore } from '@/hooks/store';
	import { SquareM } from '@lucide/svelte';
	import type { IElement } from '@/hooks/types';

	interface Props {
		id: string;
	}

	let { id }: Props = $props();

	let value = $state<string[]>([]);
	let multiplicity: number;
	let valueDisplayed: any = $state('');

	let elementsStore_local: IElement[];
	elementsStore.subscribe((v: IElement[]) => {
		elementsStore_local = v;

		// The element just got deleted
		if (!value.find((el) => el.id === id)) {
			return;
		}

		const el = value.find((el) => el.id === id);
		const multiplicity = el.multiplicity;
		valueDisplayed = {
			label: multiplicity.toString(),
			value: multiplicity.toString()
		};
		if (valueDisplayed.label == '2') {
			valueDisplayed.label == 'n';
		}
	});

	async function setMultiplicity(event: any) {
		// event.value is now an array of strings
		multiplicity = parseInt(event.value[0]);
		console.log('multp has changed', multiplicity);
		await changeMultiplicity(id, multiplicity);
	}
</script>

<div class="flex flex-row items-center text-lg">
	<div class="mx-1"><SquareM /></div>
	<Select.Root type="single" name="multiplicity" bind:value>
		<Select.Trigger class="w-[80px]">
			{valueDisplayed}
		</Select.Trigger>
		<Select.Content>
			<Select.Item value="0" label="0">0</Select.Item>
			<Select.Item value="1" label="1">1</Select.Item>
			<Select.Item value="2" label="n">n</Select.Item>
		</Select.Content>
	</Select.Root>
</div>
