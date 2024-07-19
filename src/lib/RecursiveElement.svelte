<script lang="ts">
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	import type { Element } from '../ambient'; 
	import { Input } from "$lib/components/ui/input/index.js";
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
	<div class="flex flex-row">
	<button style="padding-left: {indent}px" 
	on:click={toggleOpen} 
	class="bg-gray-400 flex flex-row w-full text-3xl rounded-lg px-4 py-2">
		{name}
		{#if open}
			<ChevronDown size={40} />
		{:else}
			<ChevronUp size={40}/>
		{/if}
	</button>
	<Rename />
	<Delete />
	</div>

	{#if open}
		<ul>
			<div class="overflow-hidden transition-all duration-300 ease-in-out">
				{#each children as child}
				<li class="flex flex-row text-2xl py-2 px-2 border-2 rounded-lg mx-1 my-1">
					{#if child.type == 'struc'}
					<li>
					<svelte:self
						children={child.children}
						indent={indent + 1}
						{structure}
						name={child.name}
						/>
					</li>
					{:else}

					<Input 
					value={child.name} 
					type="email" 
					placeholder="Name" 
					class="max-w-xs" />
					<Type />
					<Multiplicity />
					{/if}
				</li>

				{/each}
			</div>
		</ul>
	{/if}
</div>
