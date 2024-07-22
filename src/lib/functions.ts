import { structure, types } from '$lib/store';

let structure_local: Element[];
let types_local: Type[];

structure.subscribe((value) => {
	structure_local = value;
});

types.subscribe((value) => {
	types_local = value;
});

export function renameElement(id: string, name: string) {
	structure_local = structure_local.map((element) => {
		if (element.id === id) {
			return { ...element, name };
		}
		return element;
	});
}

export function changeType(id: string, name: string, abstract: boolean) {
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

	structure_local = structure_local.map((element) => {
		if (element.id === id) {
			return { ...element, type: name };
		}
		return element;
	});
}

export function changeMultiplicity(id: string, multiplicity: number) {
	structure_local = structure_local.map((element) => {
		if (element.id === id) {
			return { ...element, multiplicity };
		}
		return element;
	});
}

export function deleteElement(id: string) {
	structure_local = structure_local.filter((element) => element.id !== id);
}

export function addElement(element: Element) {
	structure_local.push(element);
}
