import { elementsStore, timestamp, typesStore } from '@/hooks/store';
import type { IElement, IStructure, IType } from '@/hooks/types';

let elementsStore_local: IElement[];
let typesStore_local: IType[];
let timestamp_local: Date;

elementsStore.subscribe((value: IElement[]) => {
	elementsStore_local = value;
	console.log('new strucutre: ' + elementsStore_local.length);
});

typesStore.subscribe((value: IType[]) => {
	typesStore_local = value;
	console.log('new type: ' + typesStore_local.length);
});

timestamp.subscribe((value: Date) => {
	timestamp_local = value;
	console.log('new timestamp ' + new Date(value).toLocaleDateString());
});

export async function renameElement(id: string, name: string) {
	elementsStore_local = elementsStore_local.map((element) => {
		if (element.id === id) {
			return { ...element, name };
		}
		return element;
	});
	elementsStore.set(elementsStore_local);
}

export async function changeType(id: string, name: string, struct: boolean) {
	const type_local = typesStore_local.find((type) => type.name === name);

	if (!type_local) {
		if (struct) {
			await createtypesStoretruct(name);
		} else {
			const type: IType = {
				name: name,
				struct: false
			};
			typesStore_local.push(type);
			typesStore.set(typesStore_local);
		}
	}

	elementsStore_local = elementsStore_local.map((element) => {
		if (element.id === id) {
			if (type_local?.struct) {
				return { ...element, type: name, struct: true };
			}
			return { ...element, type: name, struct: false };
		}
		return element;
	});
	elementsStore.set(elementsStore_local);
}

export async function changeMultiplicity(id: string, multiplicity: number) {
	elementsStore_local = elementsStore_local.map((element) => {
		if (element.id === id) {
			return { ...element, multiplicity };
		}
		return element;
	});
	elementsStore.set(elementsStore_local);
}

export async function deleteElement(id: string) {
	const element = elementsStore_local.find((el) => el.id === id);
	if (!element.id_parent) {
		// IElement is the creator of his type
		// Delete this type and change the type of the other reference
		const type_name = element.type;
		typesStore_local = typesStore_local.filter((type) => type.name !== type_name);
		typesStore.set(typesStore_local);

		elementsStore_local = elementsStore_local.map((element) => {
			if (element.type == type_name) {
				return { ...element, type: 'na', struct: false };
			}
			return element;
		});
	}

	elementsStore_local = elementsStore_local.filter((element) => element.id !== id);
	elementsStore.set(elementsStore_local);
}

export async function addElement(element: IElement) {
	elementsStore_local.push(element);
	elementsStore.set(elementsStore_local);
}

export async function createElement(id_parent: string) {
	const parent: IElement = elementsStore_local.find((el: Element) => el.id === id_parent);
	const element: IElement = {
		id: await genUID(),
		name: 'CHANGEME',
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

export async function createtypesStoretruct(name: string) {
	let type_created: IType = {
		name,
		struct: true
	};
	typesStore_local.push(type_created);
	typesStore.set(typesStore_local);

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
	elementsStore_local = elementsStore_local.map((element) => {
		if (element.id === id) {
			return { ...element, description };
		}
		return element;
	});
	elementsStore.set(elementsStore_local);
}

export async function loadStructure(structureL: IStructure) {
	elementsStore_local = structureL.elementsStore;
	typesStore_local = structureL.typesStore;
	timestamp_local = structureL.timestamp;
	elementsStore.set(elementsStore_local);
	typesStore.set(typesStore_local);
	timestamp.set(timestamp_local);
}

export async function exportStructure() {
	const structureL: IStructure = {
		timestamp: timestamp_local,
		elementsStore: elementsStore_local,
		typesStore: typesStore_local
	};
	return structureL;
}

export async function change_colors() {
	elementsStore_local.forEach(async (el: IElement) => {
		let color = el.color;
		const new_color = await genColor();
		if (color !== new_color) {
			el.color = new_color;
		}
	});
	elementsStore.set(elementsStore_local);
}

const Colors = ['blue', 'purple', 'orange', 'green', 'rose'];
const Teints = [900, 750, 600, 400, 200];

export async function genColor(): Promise<string> {
	const randomIndex = Math.floor(Math.random() * Colors.length);
	const randomTeint = Math.floor(Math.random() * Teints.length);
	return Promise.resolve(`${Colors[randomIndex]}-${Teints[randomTeint]}`);
}

export async function genUID() {
	return Math.random().toString(36).substr(2, 9);
}

export function capitalizeFirstLetter(word: string) {
	return word.charAt(0).toUpperCase() + word.slice(1);
}
