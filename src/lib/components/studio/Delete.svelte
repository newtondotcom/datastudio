<script lang="ts">
	import * as AlertDialog from '@/components/ui/alert-dialog/index.js';
	import { Button } from '@/components/ui/button/index.js';
	import { deleteElement } from '@/hooks/functions';
	import { m } from '@/paraglide/messages.js';
	import { Trash2 } from '@lucide/svelte';

	interface Props {
		id: string;
	}

	let { id }: Props = $props();

	async function del() {
		await deleteElement(id);
	}
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger asChild>
		{#snippet children({ builder })}
			<Button variant="destructive" class="mx-1" builders={[builder]}><Trash2 /></Button>
		{/snippet}
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>{m.delete_title()}</AlertDialog.Title>
			<AlertDialog.Description>
				{m.delete_desc()}
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>{m.cancel()}</AlertDialog.Cancel>
			<AlertDialog.Action onclick={del}>{m.submit()}</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
