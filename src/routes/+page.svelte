<script lang="ts">
	import RecursiveElement from '$lib/RecursiveElement.svelte';
	import type { Element } from '../ambient';

	const elements: Element[] = [
		{
			id: '1',
			name: 'Person',
			type: 'struc',
			multiplicity: 1,
			id_parent: null
		},
		{
			id: '1.1',
			name: 'Name',
			type: 'struc',
			multiplicity: 1,
			id_parent: '1'
		},
		{
			id: '1.1.1',
			name: 'First Name',
			type: 'string',
			multiplicity: 1,
			id_parent: '1.1'
		},
		{
			id: '1.1.2',
			name: 'Last Name',
			type: 'string',
			multiplicity: 1,
			id_parent: '1.1'
		},
		{
			id: '1.2',
			name: 'Address',
			type: 'struc',
			multiplicity: 1,
			id_parent: '1'
		},
		{
			id: '1.2.1',
			name: 'Street',
			type: 'string',
			multiplicity: 1,
			id_parent: '1.2'
		},
		{
			id: '1.2.2',
			name: 'City',
			type: 'string',
			multiplicity: 1,
			id_parent: '1.2'
		},
		{
			id: '1.2.3',
			name: 'State',
			type: 'string',
			multiplicity: 1,
			id_parent: '1.2'
		},
		{
			id: '1.2.4',
			name: 'Postal Code',
			type: 'string',
			multiplicity: 1,
			id_parent: '1.2'
		},
		{
			id: '1.3',
			name: 'Contact',
			type: 'struc',
			multiplicity: 1,
			id_parent: '1'
		},
		{
			id: '1.3.1',
			name: 'Email',
			type: 'string',
			multiplicity: 1,
			id_parent: '1.3'
		},
		{
			id: '1.3.2',
			name: 'Phone',
			type: 'string',
			multiplicity: 1,
			id_parent: '1.3'
		},
		{
			id: '1.4',
			name: 'Family',
			type: 'struc',
			multiplicity: 1,
			id_parent: '1'
		},
		{
			id: '1.4.1',
			name: 'Spouse',
			type: 'struc',
			multiplicity: 1,
			id_parent: '1.4'
		},
		{
			id: '1.4.1.1',
			name: 'First Name',
			type: 'string',
			multiplicity: 1,
			id_parent: '1.4.1'
		},
		{
			id: '1.4.1.2',
			name: 'Last Name',
			type: 'string',
			multiplicity: 1,
			id_parent: '1.4.1'
		},
		{
			id: '1.4.2',
			name: 'Children',
			type: 'struc',
			multiplicity: 1,
			id_parent: '1.4'
		},
		{
			id: '1.4.2.1',
			name: 'Child 1',
			type: 'struc',
			multiplicity: 1,
			id_parent: '1.4.2'
		},
		{
			id: '1.4.2.1.1',
			name: 'First Name',
			type: 'string',
			multiplicity: 1,
			id_parent: '1.4.2.1'
		},
		{
			id: '1.4.2.1.2',
			name: 'Last Name',
			type: 'string',
			multiplicity: 1,
			id_parent: '1.4.2.1'
		},
		{
			id: '1.4.2.1.3',
			name: 'Age',
			type: 'number',
			multiplicity: 1,
			id_parent: '1.4.2.1'
		},
		{
			id: '1.4.2.2',
			name: 'Child 2',
			type: 'struc',
			multiplicity: 1,
			id_parent: '1.4.2'
		},
		{
			id: '1.4.2.2.1',
			name: 'First Name',
			type: 'string',
			multiplicity: 1,
			id_parent: '1.4.2.2'
		},
		{
			id: '1.4.2.2.2',
			name: 'Last Name',
			type: 'string',
			multiplicity: 1,
			id_parent: '1.4.2.2'
		},
		{
			id: '1.4.2.2.3',
			name: 'Age',
			type: 'number',
			multiplicity: 1,
			id_parent: '1.4.2.2'
		},
		{
			id: '1.5',
			name: 'Occupation',
			type: 'struc',
			multiplicity: 1,
			id_parent: '1'
		},
		{
			id: '1.5.1',
			name: 'Job Title',
			type: 'string',
			multiplicity: 1,
			id_parent: '1.5'
		},
		{
			id: '1.5.2',
			name: 'Company',
			type: 'struc',
			multiplicity: 1,
			id_parent: '1.5'
		},
		{
			id: '1.5.2.1',
			name: 'Company Name',
			type: 'string',
			multiplicity: 1,
			id_parent: '1.5.2'
		},
		{
			id: '1.5.2.2',
			name: 'Company Address',
			type: 'struc',
			multiplicity: 1,
			id_parent: '1.5.2'
		},
		{
			id: '1.5.2.2.1',
			name: 'Street',
			type: 'string',
			multiplicity: 1,
			id_parent: '1.5.2.2'
		},
		{
			id: '1.5.2.2.2',
			name: 'City',
			type: 'string',
			multiplicity: 1,
			id_parent: '1.5.2.2'
		},
		{
			id: '1.5.2.2.3',
			name: 'State',
			type: 'string',
			multiplicity: 1,
			id_parent: '1.5.2.2'
		},
		{
			id: '1.5.2.2.4',
			name: 'Postal Code',
			type: 'string',
			multiplicity: 1,
			id_parent: '1.5.2.2'
		}
	];
</script>

<RecursiveElement indent={0} structure={elements} id={elements[0].id} />
