<script lang="ts">
	import '../app.css';
	import favicon from '@/assets/favicon.svg';
	import { m } from '@/paraglide/messages.js';
	import { locales, localizeHref } from '@/paraglide/runtime';
	import { page } from '$app/state';

	import Export from '@/components/header/Export.svelte';
	import Import from '@/components/header/Import.svelte';
	import Save from '@/components/header/Save.svelte';
	import { Toaster } from '@/components/ui/sonner';

	let { children } = $props();

	const exporttypesStore = [
		{ type: 'header_uml' },
		{ type: 'header_md' },
		{ type: 'header_hql', disabled: true },
		{ type: 'header_pyspark', disabled: true },
		{ type: 'header_sql', disabled: true },
		{ type: 'header_test', disabled: true },
		{ type: 'header_xsd', disabled: true },
		{ type: 'header_scala', disabled: true }
	];
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

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
			{m.description()}
		</p>
		<div class="mt-4 flex w-full flex-wrap justify-center space-y-2 space-x-4">
			<Import />
			<Save />
			{#each exporttypesStore as { type, disabled = false }}
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

+
<div style="display:none">
	+ {#each locales as locale}
		+ <a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
		+
	{/each}
	+
</div>
