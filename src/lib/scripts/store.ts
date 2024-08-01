import { writable } from 'svelte/store';

export const elements: IElement[] = writable([]);

export const types: ITypes[] = writable([]);

export const timestamp: Date = writable(new Date());

elements.set([
	{
		id: 'c8hs80nis',
		id_parent: null,
		name: 'name',
		type: 'na',
		multiplicity: 0,
		color: 'blue-950',
		indent: 0
	},
	{
		id: 'uhhmwwa8o',
		name: 'edit',
		type: 'integer',
		multiplicity: 2,
		id_parent: 'c8hs80nis',
		color: 'blue-800',
		indent: 1
	}
]);

types.set([
	{
		name: 'string',
		struct: false
	},
	{
		name: 'integer',
		struct: false
	},
	{
		name: 'na',
		struct: false
	},
	{
		name: 'date',
		struct: false
	}
]);
