<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { loadStructure } from '$lib/scripts/functions';
	import type { IStructure } from '../../../ambient';

	let structureL: IStructure;

	async function load() {
		const fileInput = document.getElementById('fileInput') as HTMLInputElement;
		if (fileInput.files && fileInput.files.length > 0) {
			const file = fileInput.files[0];
			try {
				const data = await readFileAsJSON(file);
				structureL = data;
				await loadStructure(structureL);
			} catch (error) {
				console.error('There was a problem reading the file:', error);
			}
		} else {
			console.error('No file selected');
		}
	}

	function readFileAsJSON(file: File): Promise<IStructure> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = (event) => {
				try {
					const result = event.target?.result;
					if (typeof result === 'string') {
						const data = JSON.parse(result);
						resolve(data);
					} else {
						reject(new Error('File reading failed'));
					}
				} catch (error) {
					reject(error);
				}
			};
			reader.onerror = () => reject(reader.error);
			reader.readAsText(file);
		});
	}
</script>

<div class="mx-1 flex flex-row items-center text-lg">
	<Dialog.Root>
		<Dialog.Trigger>
			<Button>Load a structure</Button>
		</Dialog.Trigger>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>Load a structure</Dialog.Title>
				<Dialog.Description>Please pick a JSON DataStudio generated structure.</Dialog.Description>
			</Dialog.Header>
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="username" class="text-right">File</Label>
					<Input type="file" id="fileInput" accept=".json" class="col-span-3" />
				</div>
			</div>
			<Dialog.Footer>
				<Dialog.Close>
					<Button on:click={load} type="submit">Save changes</Button>
				</Dialog.Close>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
</div>
