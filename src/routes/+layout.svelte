<script lang="ts">
	import '../app.css';
	import { Button } from '$lib/components/ui/button/index.js';
	import Save from '$lib/components/header/Save.svelte';
	import Import from '$lib/components/header/Import.svelte';
	import Uml from '$lib/components/header/Uml.svelte';
	import t from '$lib/scripts/locales';
	import { Toaster } from '$lib/components/ui/sonner';
</script>

<Toaster />
<header class="flex flex-col">
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
			<Uml />
			<Button disabled>{t('header_xsd')}</Button>
			<Button disabled>{t('header_pyspark')}</Button>
			<Button disabled>{t('header_scala')}</Button>
			<Button disabled>{t('header_test')}</Button>
			<Button disabled>{t('header_sql')}</Button>
			<Button disabled>{t('header_hql')}</Button>
			<Button disabled>{t('header_md')}</Button>
		</div>
	</div>
</header>
<div
	class="flex h-full flex-col items-center justify-center overflow-scroll px-4 text-center align-middle"
>
	<slot />
</div>
<footer></footer>
