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
		id: 'ylde03zxx',
		name: 'Conducteur',
		type: 'Humain',
		multiplicity: 1,
		id_parent: '3g2j075uy',
		color: 'rose-600',
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
		multiplicity: 0,
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
	}
]);
