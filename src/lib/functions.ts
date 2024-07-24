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
		// Element is the creator of his type
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

export async function addElement(element: Element) {
	structure_local.push(element);
	structure.set(structure_local);
}

export async function createElement(id_parent: string) {
	const element: Element = {
		id: await genUID(),
		name: 'edit',
		type: 'string',
		multiplicity: 0,
		id_parent: id_parent,
		color: await genColor(),
		indent: 0
	};
	await addElement(element);
}

export async function createTypestruct(name: string) {
	let type_created: Type = {
		name,
		struct: true
	};
	types_local.push(type_created);
	types.set(types_local);

	const newElement: Element = {
		id: await genUID(),
		id_parent: null,
		name,
		type: name,
		multiplicity: 0,
		color: await genColor(),
		indent: 0
	};
	await addElement(newElement);
}

export async function genColor(): Promise<string> {
	const teints = [950, 800, 600, 400, 200];
	const colors = ['blue', 'purple', 'orange', 'green', 'rose'];
	const randomIndex = Math.floor(Math.random() * colors.length);
	return Promise.resolve(`${colors[randomIndex]}-600`);
}

export async function genUID() {
	return Math.random().toString(36).substr(2, 9);
}

export function capitalizeFirstLetter(word: string) {
	return word.charAt(0).toUpperCase() + word.slice(1);
}
