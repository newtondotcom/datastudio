<script lang="ts">
	import type { Element } from '../ambient';

	export let children: Element[] = [];
	export let indent = 0;
	export let structure: Element[] = [];
	export let name = '';

	let open = true;

	function toggleOpen() {
		open = !open;
	}
</script>

<div>
	<button style="padding-left: {indent}px" on:click={toggleOpen} class="bg-gray-400">
		{name}
		{open ? '(opened)' : '(closed)'}
	</button>

	{#if open}
		<ul>
			<div class="overflow-hidden transition-all duration-300 ease-in-out">
				{#each children as child}
					<li class="flex flex-row">
						{#if child.type == 'struc'}
							<div>{child.name}</div>
						{:else}
							<div>{child.name}</div>
							<div>{child.type}</div>
							<div>{child.multiplicity.with}</div>
						{/if}
					</li>
					<svelte:self
						children={child.children}
						indent={indent + 24}
						{structure}
						name={child.name}
					/>
				{/each}
			</div>
		</ul>
	{/if}
</div>
