<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import * as Command from '$lib/components/ui/command/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { capitalizeFirstLetter, changeType } from '$lib/scripts/functions';
	import t from '$lib/scripts/locales';
	import { elements, types } from '$lib/scripts/store';
	import { cn } from '$lib/scripts/utils';
	import Check from 'lucide-svelte/icons/check';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import { tick } from 'svelte';
	import type { IElement, IType } from '../../../ambient';

	export let id: string;

	let open = false;
	let selectedValue: string;
	let search: string;
	let name: string;
	let struct: boolean;

	let elements_local: IElement[];
	let types_select: { value: string; label: string }[];
	let types_local: IType[];
	let el_local: IElement;
	let el_parent: IElement;

	let triggerId = 'type-trigger';

	elements.subscribe((value: IElement[]) => {
		elements_local = value;

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

	types.subscribe((value: IType[]) => {
		types_local = value;
		types_select = value
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

	$: search =
		selectedValue !== ''
			? capitalizeFirstLetter(selectedValue)
			: (types_local.find((f) => f.value === search)?.label ?? 'Select a type');

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
	<Popover.Root bind:open let:ids>
		<Popover.Trigger asChild let:builder>
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
		</Popover.Trigger>
		<Popover.Content class="w-[200px] p-0">
			<Command.Root>
				<Command.Input placeholder="Search a type..." />
				<Command.Empty>{t('type_notfound')}</Command.Empty>
				<Command.Group>
					{#each types_select as framework}
						<Command.Item
							value={framework.value}
							onSelect={async (currentValue) => {
								await setType(currentValue, false);
								triggerId = ids.trigger;
								closeAndFocusTrigger();
							}}
						>
							<Check
								class={cn('mr-2 h-4 w-4', selectedValue !== framework.value && 'text-transparent')}
							/>
							{framework.label}
						</Command.Item>
					{/each}
					<Sheet.Trigger
						on:click={() => {
							console.log('triggerId', triggerId);
							triggerId = ids.trigger;
							closeAndFocusTrigger();
						}}
					>
						<Command.Item>
							<Check class="mr-2 h-4 w-4 text-transparent" />
							{t('type_create')}
						</Command.Item>
					</Sheet.Trigger>
				</Command.Group>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>

	<Sheet.Content>
		<Sheet.Header>
			<Sheet.Title>{t('type_create')}</Sheet.Title>
			<Sheet.Description>
				{t('type_create_description')}
			</Sheet.Description>
		</Sheet.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="name" class="text-right">{t('type_name')}</Label>
				<Input bind:value={name} id="name" class="col-span-3" />
			</div>
			<div class="items-top flex space-x-2">
				<Checkbox bind:checked={struct} id="terms1" />
				<div class="grid gap-1.5 leading-none">
					<Label
						for="terms1"
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						{t('type_isstruct')}
					</Label>
					<p class="text-sm text-muted-foreground">
						{t('type_isstruct_desc')}
					</p>
				</div>
			</div>
		</div>
		<Sheet.Footer>
			<Sheet.Close asChild let:builder>
				<Button
					on:click={async () => {
						await setType(name, struct);
					}}
					builders={[builder]}
					variant="outline">{t('submit')}</Button
				>
			</Sheet.Close>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
