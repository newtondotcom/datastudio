<script lang="ts">
	import { Button } from '@/components/ui/button/index.js';
	import { Checkbox } from '@/components/ui/checkbox';
	import * as Command from '@/components/ui/command/index.js';
	import { Input } from '@/components/ui/input/index.js';
	import { Label } from '@/components/ui/label/index.js';
	import * as Popover from '@/components/ui/popover/index.js';
	import * as Sheet from '@/components/ui/sheet/index.js';
	import { capitalizeFirstLetter, changeType } from '@/hooks/functions';
	import { m } from '@/paraglide/messages.js';
	import { elementsStore, typesStore } from '@/hooks/store';
	import { cn } from '@/hooks/utils';
	import Check from '@lucide/svelte/icons/check';
	import ChevronsUpDown from '@lucide/svelte/icons/chevrons-up-down';
	import { tick } from 'svelte';
	import { run } from 'svelte/legacy';
	import type { IElement, IType } from '@/hooks/types';

	interface Props {
		id: string;
	}

	let { id }: Props = $props();

	let open = $state(false);
	let selectedValue: string = $state("");
	let search: string = $state("");
	let name: string = $state("");
	let struct: boolean = $state(false);

	let elementsStore_local: IElement[];
	let typesStore_select: { value: string; label: string }[] = $state();
	let typesStore_local: IType[] = $state([]);
	let el_local: IElement;
	let el_parent: IElement;

	let triggerId = $state('type-trigger');

	elementsStore.subscribe((value: IElement[]) => {
		elementsStore_local = value;

		// The element just got deleted
		if (!value.find((el) => el.id === id)) {
			return;
		}

		el_local = value.find((el) => el.id === id);
		if (!el_local) {
			return;
		} else {
			selectedValue = el_local.type;
		}
		el_parent = value.find((el) => el.id === el_local.id_parent);
	});

	typesStore.subscribe((value: IType[]) => {
		typesStore_local = value;
		typesStore_select = value
			.map((type: IType) => {
				if (type.name == el_parent.type) {
					return null;
				}
				return {
					value: type.name,
					label: capitalizeFirstLetter(type.name)
				};
			})
			.filter((item) => item !== null);
	});

	run(() => {
		search =
			selectedValue !== ''
				? capitalizeFirstLetter(selectedValue)
				: (typesStore_local.find((f) => f.value === search)?.label ?? 'Select a type');
	});

	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}

	async function setType(name: string, struct: boolean) {
		await changeType(id, name, !struct);
		closeAndFocusTrigger();
	}
</script>

<Sheet.Root>
	<Popover.Root bind:open>
		{#snippet children({ ids })}
			<Popover.Trigger asChild>
				{#snippet children({ builder })}
					<Button
						builders={[builder]}
						variant="outline"
						role="combobox"
						aria-expanded={open}
						class="mx-1 w-[200px] justify-between"
					>
						{search}
						<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				{/snippet}
			</Popover.Trigger>
			<Popover.Content class="w-[200px] p-0">
				<Command.Root>
					<Command.Input placeholder="Search a type..." />
					<Command.Empty>{m.type_notfound()}</Command.Empty>
					<Command.Group>
						{#each typesStore_select as framework}
							<Command.Item
								value={framework.value}
								onSelect={async (currentValue) => {
									await setType(currentValue, false);
									triggerId = ids.trigger;
									closeAndFocusTrigger();
								}}
							>
								<Check
									class={cn(
										'mr-2 h-4 w-4',
										selectedValue !== framework.value && 'text-transparent'
									)}
								/>
								{framework.label}
							</Command.Item>
						{/each}
						<Sheet.Trigger
							onclick={() => {
								console.log('triggerId', triggerId);
								triggerId = ids.trigger;
								closeAndFocusTrigger();
							}}
						>
							<Command.Item>
								<Check class="mr-2 h-4 w-4 text-transparent" />
								{m.type_create()}
							</Command.Item>
						</Sheet.Trigger>
					</Command.Group>
				</Command.Root>
			</Popover.Content>
		{/snippet}
	</Popover.Root>

	<Sheet.Content>
		<Sheet.Header>
			<Sheet.Title>{m.type_create()}</Sheet.Title>
			<Sheet.Description>
				{m.type_create_description()}
			</Sheet.Description>
		</Sheet.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="name" class="text-right">{m.type_name()}</Label>
				<Input bind:value={name} id="name" class="col-span-3" />
			</div>
			<div class="items-top flex space-x-2">
				<Checkbox bind:checked={struct} id="terms1" />
				<div class="grid gap-1.5 leading-none">
					<Label
						for="terms1"
						class="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						{m.type_isstruct()}
					</Label>
					<p class="text-sm text-muted-foreground">
						{m.type_isstruct_desc()}
					</p>
				</div>
			</div>
		</div>
		<Sheet.Footer>
			<Sheet.Close asChild>
				{#snippet children({ builder })}
					<Button
						onclick={async () => {
							await setType(name, struct);
						}}
						builders={[builder]}
						variant="outline">{m.submit()}</Button
					>
				{/snippet}
			</Sheet.Close>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
