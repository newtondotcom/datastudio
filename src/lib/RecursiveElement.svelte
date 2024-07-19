<script lang="ts">
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	import type { Element } from '../ambient';
	import { Input } from '$lib/components/ui/input/index.js';
	import Delete from '$lib/components/studio/Delete.svelte';
	import Type from '$lib/components/studio/Type.svelte';
	import Multiplicity from '$lib/components/studio/Multiplicity.svelte';
	import Rename from '$lib/components/studio/Rename.svelte';
	import { cn } from './utils';

	export let indent: number = 0;
	export let structure: Element[] = [];
	export let id: string = '';

	let parent: Element = structure.find((el) => el.id === id);
	let name = parent.name;
	let children = structure.filter((el) => el.id_parent === id);

	enum Colors {
		blue,
		purple,
		orange,
		green,
		rose
	}

	let open = true;

	function toggleOpen() {
		open = !open;
	}

	function computeBgColor() {
		let teint = 9 - indent;
		if (teint < 0) {
			teint = 0;
		}
		return 'blue-' + teint.toString() + '00';
	}
</script>

<div class={cn('w-full rounded-lg border-2 px-4 py-2', 'border-' + computeBgColor())}>
	<div class="flex w-full flex-row items-center justify-between">
		<div class={cn('flex flex-row rounded-md px-2 py-1', 'bg-' + computeBgColor())}>
			<button on:click={toggleOpen} class="flex w-full flex-row rounded-lg text-3xl">
				{name} - {id}
				{#if open}
					<ChevronDown size={40} />
				{:else}
					<ChevronUp size={40} />
				{/if}
			</button>
			<Multiplicity />
		</div>
		<div class="flex flex-row">
			<Rename />
			<Delete />
		</div>
	</div>

	{#if open}
		<ul>
			<div class="overflow-hidden transition-all duration-300 ease-in-out">
				{#each children as child}
					<li class="mx-1 my-1 flex flex-row rounded-lg py-2 text-2xl">
						{#if child.type == 'struc'}
							<svelte:self indent={indent + 1} {structure} id={child.id} />
						{:else}
							<div class="flex w-full flex-row px-2">
								<Input value={child.name} type="email" placeholder="Name" class="max-w-xs" />
								<Type />
								<Multiplicity />
								<Delete />
							</div>
						{/if}
					</li>
				{/each}
			</div>
		</ul>
	{/if}
</div>
