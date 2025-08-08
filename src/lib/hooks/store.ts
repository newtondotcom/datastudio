import { writable } from 'svelte/store';
import type { IElement, IType } from '@/hooks/types';

export const elements: IElement[] = writable([]);

export const types: IType[] = writable([]);

export const timestamp: Date = writable(new Date());

elements.set([
	{
		id: '3g2j075uy',
		id_parent: null,
		name: 'Car',
		type: 'Car',
		multiplicity: 0,
		color: 'green-600',
		indent: 0,
		description: '',
		struct: true
	},
	{
		id: '0lludwr84',
		name: 'Brand',
		type: 'string',
		multiplicity: 1,
		id_parent: '3g2j075uy',
		color: 'purple-600',
		indent: 1,
		description: '',
		struct: false
	},
	{
		id: 'tuobw7d2p',
		id_parent: null,
		name: 'Human',
		type: 'Human',
		multiplicity: 0,
		color: 'rose-600',
		indent: 0,
		description: '',
		struct: true
	},
	{
		id: 'ssjvn1kcl',
		name: 'name',
		type: 'string',
		multiplicity: 1,
		id_parent: 'tuobw7d2p',
		color: 'green-600',
		indent: 1,
		description: '',
		struct: false
	},
	{
		id: 'b8qcfhtfs',
		name: 'Passengers',
		type: 'Human',
		multiplicity: 2,
		id_parent: '3g2j075uy',
		color: 'purple-600',
		indent: 1,
		description: '',
		struct: true
	},
	{
		id: '1kpsy7tej',
		id_parent: null,
		name: 'Smartphone',
		type: 'Smartphone',
		multiplicity: 0,
		color: 'green-600',
		indent: 0,
		description: '',
		struct: true
	},
	{
		id: 'kqx4lkqk0',
		name: 'Iphone',
		type: 'Smartphone',
		multiplicity: 0,
		id_parent: 'tuobw7d2p',
		color: 'rose-600',
		indent: 1,
		description: '',
		struct: true
	},
	{
		id: '9ungvdtfs',
		name: 'brand',
		type: 'string',
		multiplicity: 1,
		id_parent: '1kpsy7tej',
		color: 'blue-600',
		indent: 1,
		description: '',
		struct: false
	},
	{
		id: '32jnxuvso',
		name: 'Model',
		type: 'string',
		multiplicity: 1,
		id_parent: '1kpsy7tej',
		color: 'blue-600',
		indent: 1,
		description: '',
		struct: false
	},
	{
		id: 'qwf9nf6xx',
		name: 'Age',
		type: 'Integer',
		multiplicity: 1,
		id_parent: '1kpsy7tej',
		color: 'blue-600',
		indent: 1,
		description: '',
		struct: false
	}
]);

types.set([
	{
		name: 'Car',
		struct: true
	},
	{
		name: 'Human',
		struct: true
	},
	{
		name: 'Smartphone',
		struct: true
	},
	{
		name: 'Integer',
		struct: false
	},
	{
		name: 'String',
		struct: false
	}
]);
