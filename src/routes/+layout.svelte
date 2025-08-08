<script lang="ts">
	import '../app.css';
	import favicon from '@/assets/favicon.svg';
	import { locales, localizeHref } from '@/paraglide/runtime';
	import { page } from '$app/state';
	import { Toaster } from '@/components/ui/sonner';
	import Header from '@/components/header/Header.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Toaster />
<Header /> 
<div
	class="flex h-full flex-col items-center justify-center overflow-scroll bg-secondary px-4 text-center align-middle"
>
	{@render children?.()}
</div>
<footer></footer>

+
<div style="display:none">
	{#each locales as locale}
		 <a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
	{/each}
</div>
