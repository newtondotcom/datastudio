<script lang="ts">
	import '../app.css';

	import Export from '$lib/components/header/Export.svelte';
	import Import from '$lib/components/header/Import.svelte';
	import Save from '$lib/components/header/Save.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import t from '$lib/scripts/locales';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	const exportTypes = [
		{ type: 'header_uml' },
		{ type: 'header_md' },
		{ type: 'header_hql', disabled: true },
		{ type: 'header_pyspark', disabled: true },
		{ type: 'header_sql', disabled: true },
		{ type: 'header_test', disabled: true },
		{ type: 'header_xsd', disabled: true },
		{ type: 'header_scala', disabled: true } // Example of a disabled button
	];
</script>

<Toaster />
<header class="flex flex-col bg-secondary">
	<div
		class="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center p-4 pt-20 md:pt-0"
	>
		<h1
			class="bg-opacity-50 bg-gradient-to-b from-neutral-500 to-neutral-900 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl"
		>
			DataStudio
		</h1>
		<p class="mt-4 max-w-3xl text-center text-base font-normal text-neutral-600">
			<b>DataStudio</b>
			{t('description')}
		</p>
		<div class="mt-4 flex w-full flex-wrap justify-center space-x-4 space-y-2">
			<Import />
			<Save />
			{#each exportTypes as { type, disabled = false }}
				<Export button_content={type} {disabled} />
			{/each}
		</div>
	</div>
</header>
<div
	class="flex h-full flex-col items-center justify-center overflow-scroll bg-secondary px-4 text-center align-middle"
>
	{@render children?.()}
</div>
<footer></footer>
