<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import { SquareM } from 'lucide-svelte';

	export let id: string;

	let multiplicity: number;
	let valueDisplayed: any;

	import { structure } from '$lib/store';
	import { changeMultiplicity } from '$lib/functions';
	let structure_local: Element[];
	structure.subscribe((value: Element[]) => {
		structure_local = value;
		const el = value.find((el) => el.id === id);
		const multiplicity = el.multiplicity;
		valueDisplayed = {
			label: multiplicity.toString(),
			value: multiplicity.toString()
		};
	});

	async function setMultiplicity(event: any) {
		multiplicity = parseInt(event.value);
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
			<Select.Item value="1" label="0">0</Select.Item>
			<Select.Item value="1" label="1">1</Select.Item>
			<Select.Item value="2" label="n">n</Select.Item>
		</Select.Content>
	</Select.Root>
</div>
