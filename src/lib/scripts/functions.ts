import { elements, types, timestamp } from '$lib/scripts/store';
import type { IElement, IStructure, IType } from '../../ambient';

let elements_local: IElement[];
let types_local: IType[];
let timestamp_local: Date;

elements.subscribe((value: Element[]) => {
	elements_local = value;
	console.log('new strucutre: ' + elements_local.length);
});

types.subscribe((value: Type[]) => {
	types_local = value;
	console.log('new type: ' + types_local.length);
});

timestamp.subscribe((value: Date) => {
	timestamp_local = value;
	console.log('new timestamp ' + new Date(value).toLocaleDateString());
});

export async function renameElement(id: string, name: string) {
	elements_local = elements_local.map((element) => {
		if (element.id === id) {
			return { ...element, name };
		}
		return element;
	});
	elements.set(elements_local);
}

export async function changeType(id: string, name: string, struct: boolean) {
	const type_local = types_local.find((type) => type.name === name);

	if (!type_local) {
		await createTypestruct(name);
	}

	elements_local = elements_local.map((element) => {
		if (element.id === id) {
			if (type_local?.struct) {
				return { ...element, type: name, struct: true };
			}
			return { ...element, type: name, struct: false };
		}
		return element;
	});
	elements.set(elements_local);
}

export async function changeMultiplicity(id: string, multiplicity: number) {
	elements_local = elements_local.map((element) => {
		if (element.id === id) {
			return { ...element, multiplicity };
		}
		return element;
	});
	elements.set(elements_local);
}

export async function deleteElement(id: string) {
	const element = elements_local.find((el) => el.id === id);
	if (!element.id_parent) {
		// IElement is the creator of his type
		// Delete this type and change the type of the other reference
		const type_name = element.type;
		types_local = types_local.filter((type) => type.name !== type_name);
		types.set(types_local);

		elements_local = elements_local.map((element) => {
			if (element.type == type_name) {
				return { ...element, type: 'na' };
			}
			return element;
		});
	}

	elements_local = elements_local.filter((element) => element.id !== id);
	elements.set(elements_local);
}

export async function addElement(element: IElement) {
	elements_local.push(element);
	elements.set(elements_local);
}

export async function createElement(id_parent: string) {
	const parent: IElement = elements_local.find((el: Element) => el.id === id_parent);
	const element: IElement = {
		id: await genUID(),
		name: 'edit',
		type: 'string',
		multiplicity: 0,
		id_parent: id_parent,
		color: await genColor(),
		indent: parent.indent + 1,
		description: '',
		struct: false
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
		indent: 0,
		description: '',
		struct: true
	};
	await addElement(newIElement);
}

export async function changeDesc(id: string, description: string) {
	elements_local = elements_local.map((element) => {
		if (element.id === id) {
			return { ...element, description };
		}
		return element;
	});
	elements.set(elements_local);
}

export async function loadStructure(structureL: IStructure) {
	elements_local = structureL.elements;
	types_local = structureL.types;
	timestamp_local = structureL.timestamp;
	elements.set(elements_local);
	types.set(types_local);
	timestamp.set(timestamp_local);
}

export async function exportStructure() {
	const structureL: IStructure = {
		timestamp: timestamp_local,
		elements: elements_local,
		types: types_local
	};
	return structureL;
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
