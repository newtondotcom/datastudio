import { structure, types } from '$lib/scripts/store';
import type { IElement } from '../../ambient';

let structure_local: IElement[];
let types_local: IType[];

structure.subscribe((value: Element[]) => {
	structure_local = value;
	console.log('new strucutre: ' + structure_local);
});

types.subscribe((value: Type[]) => {
	types_local = value;
	console.log('new type: ' + types_local);
});

export async function renameElement(id: string, name: string) {
	structure_local = structure_local.map((element) => {
		if (element.id === id) {
			return { ...element, name };
		}
		return element;
	});
	structure.set(structure_local);
}

export async function changeType(id: string, name: string, struct: boolean) {
	const type_local = types_local.find((type) => type.name === name);

	if (!type_local) {
		await createTypestruct(name);
	}

	structure_local = structure_local.map((element) => {
		if (element.id === id) {
			return { ...element, type: name };
		}
		return element;
	});
	structure.set(structure_local);
}

export async function changeMultiplicity(id: string, multiplicity: number) {
	structure_local = structure_local.map((element) => {
		if (element.id === id) {
			return { ...element, multiplicity };
		}
		return element;
	});
	structure.set(structure_local);
}

export async function deleteElement(id: string) {
	const element = structure_local.find((el) => el.id === id);
	if (!element.id_parent) {
		// IElement is the creator of his type
		// Delete this type and change the type of the other reference
		const type_name = element.type;
		types_local = types_local.filter((type) => type.name !== type_name);
		types.set(types_local);

		structure_local = structure_local.map((element) => {
			if (element.type == type_name) {
				return { ...element, type: 'na' };
			}
			return element;
		});
	}

	structure_local = structure_local.filter((element) => element.id !== id);
	structure.set(structure_local);
}

export async function addElement(element: IElement) {
	structure_local.push(element);
	structure.set(structure_local);
}

export async function createIElement(id_parent: string) {
	const parent: IElement = structure_local.find((el: Element) => el.id === id_parent);
	const element: IElement = {
		id: await genUID(),
		name: 'edit',
		type: 'string',
		multiplicity: 0,
		id_parent: id_parent,
		color: await genColor(),
		indent: parent.indent + 1
	};
	await addElement(element);
}

export async function createTypestruct(name: string) {
	let type_created: IType = {
		name,
		struct: true
	};
	types_local.push(type_created);
	types.set(types_local);

	const newIElement: IElement = {
		id: await genUID(),
		id_parent: null,
		name,
		type: name,
		multiplicity: 0,
		color: await genColor(),
		indent: 0
	};
	await addElement(newIElement);
}

const Colors = ['blue', 'purple', 'orange', 'green', 'rose'];

export async function genColor(): Promise<string> {
	//const teints = [950, 800, 600, 400, 200];
	const randomIndex = Math.floor(Math.random() * Colors.length);
	return Promise.resolve(`${Colors[randomIndex]}-600`);
}

export async function genUID() {
	return Math.random().toString(36).substr(2, 9);
}

export function capitalizeFirstLetter(word: string) {
	return word.charAt(0).toUpperCase() + word.slice(1);
}
