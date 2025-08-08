<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import { changeMultiplicity } from '$lib/scripts/functions';
	import { elements } from '$lib/scripts/store';
	import { SquareM } from 'lucide-svelte';

	interface Props {
		id: string;
	}

	let { id }: Props = $props();

	let multiplicity: number;
	let valueDisplayed: any = $state();

	let elements_local: IElement[];
	elements.subscribe((value: IElement[]) => {
		elements_local = value;

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
		multiplicity = parseInt(event.value);
		console.log('multp has changed', multiplicity);
		await changeMultiplicity(id, multiplicity);
	}
</script>

<div class="flex flex-row items-center text-lg">
	<div class="mx-1"><SquareM /></div>
	<Select.Root
		onSelectedChange={async (v) => {
			v && (await setMultiplicity(v));
		}}
		selected={valueDisplayed}
	>
		<Select.Trigger class="w-[80px]">
			<Select.Value />
		</Select.Trigger>
		<Select.Content>
			<Select.Item value="0" label="0">0</Select.Item>
			<Select.Item value="1" label="1">1</Select.Item>
			<Select.Item value="2" label="n">n</Select.Item>
		</Select.Content>
	</Select.Root>
</div>
