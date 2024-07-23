<script lang="ts">
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	import type { Element } from '../ambient';
	import { Input } from '$lib/components/ui/input/index.js';
	import Delete from '$lib/components/studio/Delete.svelte';
	import Type from '$lib/components/studio/Type.svelte';
	import Multiplicity from '$lib/components/studio/Multiplicity.svelte';
	import Rename from '$lib/components/studio/Rename.svelte';
	import { cn } from './utils';
	import Add from './components/studio/Add.svelte';

	export let indent: number = 0;
	export let id: string;

	import { structure, types } from '$lib/store';
	let structure_local: Element[];
	let children: Element[];
	structure.subscribe((value) => {
		structure_local = value;
		children = value.filter((el) => el.id_parent === id);
	});
	let types_local: Type[];
	types.subscribe((value: Type[]) => {
		types_local = value;
	});

	let parent: Element = structure_local.find((el) => el.id === id);
	let name = parent?.name;
	let type = parent?.type;
	let color = parent?.color;
	let parent_id: string = parent.id;
	let parent_indent = parent?.indent | 0;

	let open = true;

	function toggleOpen() {
		open = !open;
	}
</script>

<div class={cn('my-4 w-full rounded-lg border-2 px-4 py-2', 'border-' + color)}>
	<div class="flex w-full flex-row items-center justify-between">
		<div class={cn('flex flex-row rounded-md px-2 py-1', 'bg-' + color)}>
			<button on:click={toggleOpen} class="flex w-full flex-row rounded-lg px-2 text-3xl">
				{name} | {type}
				{#if open}
					<ChevronDown size={40} />
				{:else}
					<ChevronUp size={40} />
				{/if}
			</button>
			<Multiplicity {id} />
		</div>
		<div class="flex flex-row">
			<Add id_parent={parent_id} indent_parent={parent_indent} />
			<Delete id={parent_id} />
			<Rename />
		</div>
	</div>

	{#if open}
		<ul>
			<div class="overflow-hidden transition-all duration-300 ease-in-out">
				{#each children as child}
					<li class="mx-1 my-1 flex flex-row rounded-lg py-2 text-2xl">
						{#if types_local.find((el) => el.name === child.type)?.abstract}
							{#if types_local.find((el) => el.name === child.type)?.id_referenced == child.id}
								<svelte:self indent={indent + 1} id={child.id} />
							{:else}
								<svelte:self
									indent={indent + 1}
									id={types_local.find((el) => el.name === child.type)?.id_referenced}
								/>
							{/if}
						{:else}
							<div class="flex w-full flex-row rounded-xl bg-neutral-100 px-2 py-2">
								<Input value={child.name} type="email" placeholder="Name" class="max-w-xs" />
								<Type id={child.id} />
								<Multiplicity id={child.id} />
								<Delete id={child.id} />
							</div>
						{/if}
					</li>
				{/each}
			</div>
		</ul>
	{/if}
</div>
