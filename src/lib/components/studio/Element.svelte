<script lang="ts">
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	import type { IElement } from '../../../ambient';
	import Delete from '$lib/components/studio/Delete.svelte';
	import IType from '$lib/components/studio/Type.svelte';
	import Multiplicity from '$lib/components/studio/Multiplicity.svelte';
	import Rename from '$lib/components/studio/Rename.svelte';
	import { cn } from '$lib/scripts/utils';
	import Add from '$lib/components/studio/Add.svelte';
	import Name from '$lib/components/studio/Name.svelte';

	export let id: string;

	let el_local: IElement;
	let type_local: IType;
	let color_local: string;

	import { elements, types } from '$lib/scripts/store';
	import Desc from './Desc.svelte';
	let elements_local: IElement[];
	let children: IElement[];
	let types_local: IType[];

	elements.subscribe((value) => {
		elements_local = value;
		children = value.filter((el) => el.id_parent === id);
		updateStruct();
	});
	types.subscribe((value: IType[]) => {
		types_local = value;
		updateStruct();
	});

	function updateStruct() {
		children = elements_local.filter((el) => el.id_parent === id);
		el_local = elements_local.find((el: IElement) => el.id === id);
		if (types_local) {
			type_local = types_local.find((type: IType) => type.name === el_local?.type);
			if (type_local == undefined) {
				console.log('Type not found : ', el_local.name, el_local.type, types_local);
			}
		}
	}

	let open = true;
	function toggleOpen() {
		open = !open;
	}
</script>

<div class={cn('my-4 w-full rounded-lg border-2 px-4 py-2', 'border-' + el_local.color)}>
	<div class="flex w-full flex-row items-center justify-between">
		<div class={cn('flex flex-row rounded-md px-2 py-1', 'bg-' + el_local.color)}>
			<button on:click={toggleOpen} class="flex w-full flex-row rounded-lg px-2 text-3xl">
				{el_local.name} - {type_local.name}
				{#if open}
					<ChevronDown size={40} />
				{:else}
					<ChevronUp size={40} />
				{/if}
			</button>
		</div>
		<div class="flex flex-row">
			<Add id_parent={el_local.id} />
			<Delete id={el_local.id} />
			<Rename id={el_local.id} />
		</div>
	</div>

	{#if open}
		<ul>
			<div class="overflow-hidden transition-all duration-300 ease-in-out">
				{#each children as child}
					<li class="mx-1 my-1 flex flex-row rounded-lg py-2 text-2xl">
						<div
							class={cn(
								'flex w-full flex-row rounded-xl px-2 py-2',
								'bg-' +
									(child.struct
										? elements_local.find((el) => el.id_parent === null && el.type === child.type)
												?.color
										: 'neutral-100')
							)}
						>
							<Name id={child.id} />
							<IType id={child.id} />
							<Multiplicity id={child.id} />
							<Desc id={child.id} />
							<Delete id={child.id} />
						</div>
					</li>
				{/each}
			</div>
		</ul>
	{/if}
</div>
