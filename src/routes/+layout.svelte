<script lang="ts">
	import '../app.css';
	import { Button } from '$lib/components/ui/button/index.js';
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
		<p class="mt-4 max-w-lg text-center text-base font-normal text-neutral-600">
			Spotlight effect is a great way to draw attention to a specific part of the page. Here, we are
			drawing the attention towards the text section of the page. I don't know why but I'm running
			out of copy.
		</p>
		<div class="mt-4 flex w-full flex-wrap justify-center space-x-4">
			<Button>Import a structure</Button>
			<Button>Download the structure</Button>
			<Button>Export to XSD</Button>
			<Button>Export to UML Diagram</Button>
			<Button>Export to PySpark</Button>
			<Button>Export to Scala</Button>
		</div>
	</div>
</header>
<div class="flex h-full flex-col items-center justify-center px-4 text-center align-middle">
	<slot />
</div>
<footer></footer>
