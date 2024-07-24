<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { createIElement } from '$lib/scripts/functions';
	import { Plus } from 'lucide-svelte';

	export let id_parent: string;

	async function create() {
		const parentId = await id_parent;
		await createIElement(parentId);
	}
</script>

<Button variant="outline" on:click={create}><Plus /></Button>
