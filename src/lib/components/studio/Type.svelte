<script lang="ts">
	import Check from 'lucide-svelte/icons/check';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { cn } from '$lib/utils.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { tick } from 'svelte';
	import { Checkbox } from '$lib/components/ui/checkbox';

	export let id: string;

	let open = false;
	let selectedValue: string;
	let search: string;
	let name: string;
	let abstract: boolean;

	import { types, structure } from '$lib/store';
	import { capitalizeFirstLetter, changeType } from '$lib/functions';
	let types_select: { value: string; label: string }[];
	let types_local: Type[];
	types.subscribe((value: Type[]) => {
		types_local = value;
		types_select = value.map((type: Type) => {
			return {
				value: type.name,
				label: capitalizeFirstLetter(type.name)
			};
		});
	});
	let structure_local: Element[];
	structure.subscribe((value: Element[]) => {
		structure_local = value;

		// The element just got deleted
		if (!value.find((el) => el.id === id)) {
			return;
		}

		const el = value.find((el) => el.id === id);
		if (!el) {
			return;
		} else {
			selectedValue = el.type;
		}
	});

	$: search =
		selectedValue !== ''
			? capitalizeFirstLetter(selectedValue)
			: (types_local.find((f) => f.value === search)?.label ?? 'Select a type');

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}

	async function setType(name: string, abstract: boolean) {
		await changeType(id, name, !abstract);
	}
</script>

<Popover.Root bind:open let:ids>
	<Popover.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="outline"
			role="combobox"
			aria-expanded={open}
			class="w-[200px] justify-between"
		>
			{search}
			<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-[200px] p-0">
		<Command.Root>
			<Command.Input placeholder="Search a type..." />
			<Command.Empty>No framework found.</Command.Empty>
			<Command.Group>
				{#each types_select as framework}
					<Command.Item
						value={framework.value}
						onSelect={async (currentValue) => {
							await setType(currentValue, false);
							closeAndFocusTrigger(ids.trigger);
						}}
					>
						<Check
							class={cn('mr-2 h-4 w-4', selectedValue !== framework.value && 'text-transparent')}
						/>
						{framework.label}
					</Command.Item>
				{/each}
				<Sheet.Root>
					<Sheet.Trigger>
						<Command.Item>
							<Check class="mr-2 h-4 w-4 text-transparent" />
							Create a type
						</Command.Item>
					</Sheet.Trigger>
					<Sheet.Content>
						<Sheet.Header>
							<Sheet.Title>Create a type</Sheet.Title>
							<Sheet.Description>
								You can create a new type by providing a name and selecting the type of the new
								type.
							</Sheet.Description>
						</Sheet.Header>
						<div class="grid gap-4 py-4">
							<div class="grid grid-cols-4 items-center gap-4">
								<Label for="name" class="text-right">Type Name</Label>
								<Input bind:value={name} id="name" class="col-span-3" />
							</div>
							<div class="items-top flex space-x-2">
								<Checkbox bind:checked={abstract} id="terms1" />
								<div class="grid gap-1.5 leading-none">
									<Label
										for="terms1"
										class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										Is this not an abstract type ?
									</Label>
									<p class="text-sm text-muted-foreground">
										If you select this option, the type will be created as a concrete type (ex :
										String, Integer, Float, Boolean, Date)
									</p>
								</div>
							</div>
						</div>
						<Sheet.Footer>
							<Sheet.Close asChild let:builder>
								<Button
									on:click={async () => {
										await setType(name, abstract);
										closeAndFocusTrigger(ids.trigger);
									}}
									builders={[builder]}
									variant="outline">Submit</Button
								>
							</Sheet.Close>
						</Sheet.Footer>
					</Sheet.Content>
				</Sheet.Root>
			</Command.Group>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
