<script lang="ts">
	import { Button } from '@/components/ui/button/index.js';
	import { createElement } from '@/hooks/functions';
	import { Plus } from '@lucide/svelte';

	interface Props {
		id_parent: string;
	}

	let { id_parent }: Props = $props();

	async function create() {
		const parentId = id_parent;
		await createElement(parentId);
	}
</script>

<Button variant="ghost" onclick={create}><Plus /></Button>
