<div class="flex flex-row text-lg items-center">
    <div>Mltp </div>
    <Select.Root>
        <Select.Trigger class="w-[80px]">
          <Select.Value placeholder="Value" />
        </Select.Trigger>
        <Select.Content>
            <Select.Item value="0">0</Select.Item>
            <Select.Item value="1">1</Select.Item>
            <Select.Item value="n">n</Select.Item>
        </Select.Content>
      </Select.Root>
    <div>:</div>
    <Select.Root>
        <Select.Trigger class="w-[80px]">
          <Select.Value placeholder="Value" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="0">0</Select.Item>
          <Select.Item value="1">1</Select.Item>
          <Select.Item value="n">n</Select.Item>
        </Select.Content>
      </Select.Root>
      <div>with</div>
    <Select.Root>
        <Select.Trigger class="w-[180px]">
          <Select.Value placeholder="Field" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="light">Light</Select.Item>
          <Select.Item value="dark">Dark</Select.Item>
          <Select.Item value="system">System</Select.Item>
        </Select.Content>
      </Select.Root>
</div>

<script lang="ts">
    import * as Select from "$lib/components/ui/select";
  </script>