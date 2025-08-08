<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { deleteElement } from '$lib/scripts/functions';
	import t from '$lib/scripts/locales';
	import { Trash2 } from 'lucide-svelte';

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
			<AlertDialog.Title>{t('delete_title')}</AlertDialog.Title>
			<AlertDialog.Description>
				{t('delete_desc')}
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>{t('cancel')}</AlertDialog.Cancel>
			<AlertDialog.Action on:click={del}>{t('submit')}</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
