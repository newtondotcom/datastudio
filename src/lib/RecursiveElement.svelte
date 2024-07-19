<script lang="ts">
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	import type { Element } from '../ambient';
	import { Input } from '$lib/components/ui/input/index.js';
	import Delete from './components/studio/Delete.svelte';
	import Type from './components/studio/Type.svelte';
	import Multiplicity from './components/studio/Multiplicity.svelte';
	import Rename from './components/studio/Rename.svelte';

	export let children: Element[] = [];
	export let indent = 0;
	export let structure: Element[] = [];
	export let name = '';

	let open = true;

	function toggleOpen() {
		open = !open;
	}
</script>

<div class="w-full px-4">
	<div class="flex w-full flex-row justify-between">
		<div class="flex flex-row">
			<button
				style="padding-left: {indent}px"
				on:click={toggleOpen}
				class="flex w-full flex-row rounded-lg px-4 py-2 text-3xl"
			>
				{name}
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
					<li class="mx-1 my-1 flex flex-row rounded-lg border-2 px-2 py-2 text-2xl">
						{#if child.type == 'struc'}
							<svelte:self
								children={child.children}
								indent={indent + 1}
								{structure}
								name={child.name}
							/>
						{:else}
							<Input value={child.name} type="email" placeholder="Name" class="max-w-xs" />
							<Type />
							<Delete />
						{/if}
					</li>
				{/each}
			</div>
		</ul>
	{/if}
</div>
