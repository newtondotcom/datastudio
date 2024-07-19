<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import { SquareM } from 'lucide-svelte';
</script>

<div class="flex flex-row items-center text-lg">
	<div class="mx-1"><SquareM /></div>
	<Select.Root>
		<Select.Trigger class="w-[80px]">
			<Select.Value placeholder="Value" />
		</Select.Trigger>
		<Select.Content>
			<Select.Item value="1">1</Select.Item>
			<Select.Item value="n">n</Select.Item>
		</Select.Content>
	</Select.Root>
</div>
