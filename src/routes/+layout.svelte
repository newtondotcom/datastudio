<script lang="ts">
	import '../app.css';
	import { Button } from '$lib/components/ui/button/index.js';
	import Save from '$lib/components/header/Save.svelte';
	import Import from '$lib/components/header/Import.svelte';
</script>

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
			<b>DataStudio</b> is an Integrated Development Environment (IDE) specifically designed for data
			engineers and scientists working with large and complex data schemas. With DataStudio, you can
			easily create, visualize, and manipulate your data schemas, as well as export them in various formats
			for use in different environments and tools. It can also generate a test dataset based on the criteria
			of the schema.
		</p>
		<div class="mt-4 flex w-full flex-wrap justify-center space-x-4 space-y-2">
			<Import />
			<Save />
			<Button>Export to XSD</Button>
			<Button>Export to UML Diagram</Button>
			<Button>Export to PySpark</Button>
			<Button>Export to Scala</Button>
			<Button>Generate test data</Button>
			<Button>Generate SQL structure</Button>
			<Button>Generate HQL structure</Button>
			<Button>Generate Mardown array describing</Button>
		</div>
	</div>
</header>
<div class="flex h-full flex-col items-center justify-center px-4 text-center align-middle">
	<slot />
</div>
<footer></footer>
