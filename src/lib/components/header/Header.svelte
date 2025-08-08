
<header class="flex flex-col bg-secondary">
	<Drawer.Root>
		<Drawer.Trigger class={cn(buttonVariants({ variant: "outline" }),"fixed top-4 left-4")}>
			<ChevronDown class="mr-2 h-4 w-4" />
			{m.actions()}
		</Drawer.Trigger>
		<Drawer.Content>
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
		</Drawer.Content>
	  </Drawer.Root>
</header>

<script lang="ts">

import * as Drawer from "$lib/components/ui/drawer/index.js";
	import { m } from '@/paraglide/messages.js';
	import { Button, buttonVariants } from "$lib/components/ui/button";
    import Export from '@/components/header/Export.svelte';
    import Import from '@/components/header/Import.svelte';
    import Save from '@/components/header/Save.svelte';
	import { cn } from "@/utils";
	import { ChevronDown } from "@lucide/svelte";
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