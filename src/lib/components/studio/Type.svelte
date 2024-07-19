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

	const frameworks = [
		{
			value: 'string',
			label: 'String'
		},
		{
			value: 'integer',
			label: 'Integer'
		},
		{
			value: 'float',
			label: 'Float'
		},
		{
			value: 'boolean',
			label: 'Boolean'
		},
		{
			value: 'data',
			label: 'Date'
		}
	];

	let open = false;
	let value = '';

	$: selectedValue = frameworks.find((f) => f.value === value)?.label ?? 'Select a framework...';

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
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
			{selectedValue}
			<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-[200px] p-0">
		<Command.Root>
			<Command.Input placeholder="Search framework..." />
			<Command.Empty>No framework found.</Command.Empty>
			<Command.Group>
				{#each frameworks as framework}
					<Command.Item
						value={framework.value}
						onSelect={(currentValue) => {
							value = currentValue;
							closeAndFocusTrigger(ids.trigger);
						}}
					>
						<Check class={cn('mr-2 h-4 w-4', value !== framework.value && 'text-transparent')} />
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
								This action cannot be undone. This will permanently delete your account and remove
								your data from our servers.
							</Sheet.Description>
						</Sheet.Header>
						<div class="grid gap-4 py-4">
							<div class="grid grid-cols-4 items-center gap-4">
								<Label for="name" class="text-right">Type Name</Label>
								<Input id="name" value="Pedro Duarte" class="col-span-3" />
							</div>
							<div class="items-top flex space-x-2">
								<Checkbox id="terms1" />
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
								<Button builders={[builder]} type="submit">Save changes</Button>
							</Sheet.Close>
						</Sheet.Footer>
					</Sheet.Content>
				</Sheet.Root>
			</Command.Group>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
