<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { exportStructure } from '$lib/scripts/functions';
	import { exportUML } from '$lib/scripts/uml';
	import type { IStructure } from '../../../ambient';

	async function exportation() {
		const structure: IStructure = await exportStructure();
		const uml: string = await exportUML(structure);
		console.log(uml);
	}
</script>

<Button on:click={exportation}>Export to UML Diagram</Button>
