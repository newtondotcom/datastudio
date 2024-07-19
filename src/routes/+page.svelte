<script lang="ts">
	import RecursiveElement from '$lib/RecursiveElement.svelte';
	import type { Element } from '../ambient';

	const elements: Element[] = [
		{
			id: '1',
			name: 'Element 1',
			type: 'string',
			multiplicity: {
				with: 'Structure',
				number: 1
			},
			id_parent: null,
			children: [
				{
					id: '1.1',
					name: 'Element 1.1',
					type: 'number',
					multiplicity: {
						with: 'Element 1',
						number: 0
					},
					id_parent: '1',
					children: []
				},
				{
					id: '1.2',
					name: 'Element 1.2',
					type: 'struc',
					multiplicity: {
						with: 'Element 1',
						number: 1
					},
					id_parent: '1',
					children: [
						{
							id: '1.2.1',
							name: 'Element 1.2.1',
							type: 'date',
							multiplicity: {
								with: 'Element 1.2',
								number: 1
							},
							id_parent: '1.2',
							children: []
						},
						{
							id: '1.2.4',
							name: 'Element 1.2.4',
							type: 'date',
							multiplicity: {
								with: 'Element 1.4',
								number: 1
							},
							id_parent: '1.1',
							children: []
						}
					]
				},
				{
					id: '1.3',
					name: 'Element 1.3',
					type: 'string',
					multiplicity: {
						with: 'Element 1',
						number: 1
					},
					id_parent: '1',
					children: []
				}
			]
		}
	];
</script>

{#each elements as element}
	<RecursiveElement
		children={element.children}
		indent={0}
		structure={elements}
		name={element.name}
	/>
{/each}
