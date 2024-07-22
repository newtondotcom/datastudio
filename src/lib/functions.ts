import { structure, types } from '$lib/store';

let structure_local: Element[];
let types_local: Type[];

structure.subscribe((value) => {
	structure_local = value;
});

types.subscribe((value) => {
	types_local = value;
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

export async function changeType(id: string, name: string, abstract: boolean) {
	const type_local = types_local.find((type) => type.name === name);

	/*
    if (type_local){
        // Type already exists
        // Find the parent of the element referenced with this type
        let element = structure_local.find(type_local.id);
    */

	if (!type_local) {
		// Create the type
		let type_created: Type = {
			name,
			abstract
		};
		if (abstract) {
			type_created.id_referenced = id;
		}
		types_local.push(type_created);
	}
	types.set(types_local);

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
	structure_local = structure_local.filter((element) => element.id !== id);
	structure.set(structure_local);

	// check if the element if refence of a type

	// check if parent has children
}

export async function addElement(element: Element) {
	structure_local.push(element);
	structure.set(structure_local);
}

export async function createOrigin(name: string, type: string) {
	const id = await genUID();

	// Create the new element
	const newElement: Element = {
		id,
		id_parent: null,
		name,
		type,
		multiplicity: 0,
		color: await genColor(0),
		indent: 0
	};
	addElement(newElement);

	// Create the new type
	const type_local: Type = {
		name,
		abstract: true,
		id_referenced: true
	};
	types_local.push(type_local);
	types.set(types_local);
}

export async function genColor(indent: number) {
	const teints = [950, 800, 600, 400, 200];
	return 'orange-' + teints[indent];
}

export async function genUID() {
	return Math.random().toString(36).substr(2, 9);
}

export function capitalizeFirstLetter(word: string) {
	return word.charAt(0).toUpperCase() + word.slice(1);
}
