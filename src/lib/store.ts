import { writable } from 'svelte/store';

export const structure: Element[] = writable([]);

export const types: Types[] = writable([]);

structure.set([
	{
		id: 'c8hs80nis',
		id_parent: null,
		name: 'name',
		type: 'type',
		multiplicity: 0,
		color: 'orange-950',
		indent: 0
	},
	{
		id: 'uhhmwwa8o',
		name: 'edit',
		type: 'string',
		multiplicity: 0,
		id_parent: 'c8hs80nis',
		color: 'orange-800',
		indent: 1
	}
]);

types.set([
	{
		name: 'string',
		abstract: false
	}
]);
