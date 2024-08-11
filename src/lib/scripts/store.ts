import { writable } from 'svelte/store';
import type { IElement, IType } from '../../ambient';

export const elements: IElement[] = writable([]);

export const types: IType[] = writable([]);

export const timestamp: Date = writable(new Date());

elements.set([
	{
		id: '3g2j075uy',
		id_parent: null,
		name: 'Voiture',
		type: 'Voiture',
		multiplicity: 0,
		color: 'green-600',
		indent: 0,
		description: '',
		struct: true
	},
	{
		id: '0lludwr84',
		name: 'Marque',
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
		name: 'Humain',
		type: 'Humain',
		multiplicity: 0,
		color: 'rose-600',
		indent: 0,
		description: '',
		struct: true
	},
	{
		id: 'ssjvn1kcl',
		name: 'nom',
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
		name: 'Passagers',
		type: 'Humain',
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
		name: 'telephone',
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
		name: 'marque',
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
		name: 'Modele',
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
		name: 'Voiture',
		struct: true
	},
	{
		name: 'Humain',
		struct: true
	},
	{
		name: 'Smartphone',
		struct: true
	},
	{
		name: 'Integer',
		struct: false
	}
]);
