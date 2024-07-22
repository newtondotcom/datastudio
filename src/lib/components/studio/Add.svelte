<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { genUID, genColor, addElement } from '$lib/functions';
	import { Plus } from 'lucide-svelte';

	export let id_parent: string;
	export let indent_parent: number;

	async function create() {
		const parentId = await id_parent;
		const element: Element = {
			id: await genUID(),
			name: 'edit',
			type: 'string',
			multiplicity: 0,
			id_parent: parentId,
			color: await genColor(indent_parent + 1),
			indent: indent_parent + 1
		};
		addElement(element);
	}
</script>

<Button variant="outline" on:click={create}><Plus /></Button>
