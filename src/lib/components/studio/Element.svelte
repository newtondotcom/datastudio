<script lang="ts">
	import Add from '@/components/studio/Add.svelte';
	import Delete from '@/components/studio/Delete.svelte';
	import Multiplicity from '@/components/studio/Multiplicity.svelte';
	import Name from '@/components/studio/Name.svelte';
	import Rename from '@/components/studio/Rename.svelte';
	import IType from '@/components/studio/Type.svelte';
	import { elementsStore, typesStore } from '@/hooks/store';
	import { cn } from '@/hooks/utils';
	import { ChevronDown, ChevronUp } from '@lucide/svelte';
	import type { IElement } from '@/hooks/types';

	import Desc from './Desc.svelte';

	interface Props {
		id: string;
	}

	let { id }: Props = $props();

	let el_local: IElement = $state();
	let type_local: IType = $state();

	let elementsStore_local: IElement[] = $state([]);
	let children: IElement[] = $state([]);
	let typesStore_local: IType[];

	elementsStore.subscribe((value) => {
		elementsStore_local = value;
		children = value.filter((el) => el.id_parent === id);
		updateStruct();
	});
	typesStore.subscribe((value: IType[]) => {
		typesStore_local = value;
		updateStruct();
	});

	function updateStruct() {
		children = elementsStore_local.filter((el) => el.id_parent === id);
		el_local = elementsStore_local.find((el: IElement) => el.id === id);
		if (el_local == undefined) {
			console.log('Element not found : ', id, elementsStore_local);
		}
		if (typesStore_local) {
			type_local = typesStore_local.find((type: IType) => type.name === el_local?.type);
			if (type_local == undefined) {
				console.log('Type not found : ', el_local.name, el_local.type, typesStore_local);
			}
		}
	}

	let open = $state(true);
	function toggleOpen() {
		open = !open;
	}
</script>

<div
	class={cn('my-4 w-full rounded-lg border-2 bg-secondary px-4 py-2', 'border-' + el_local.color)}
	data-swapy-item={el_local.id}
>
	<div class="flex w-full flex-row items-center justify-between">
		<div class={cn('flex flex-row rounded-md px-2 py-1', 'bg-' + el_local.color)}>
			<button onclick={toggleOpen} class="flex w-full flex-row rounded-lg px-2 text-3xl">
				{type_local.name}
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
								'flex w-full flex-row justify-between rounded-xl px-2 py-2',
								'bg-' +
									(child.struct
										? elementsStore_local.find((el) => el.id_parent === null && el.type === child.type)
												?.color
										: 'secondary')
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
