import type { IElement, IStructure, IType } from '@/hooks/types';

import { capitalizeFirstLetter } from '../functions';

export async function exportUML(structure: IStructure) {
	let umlstring: string = '';

	const elementsStore: IElement[] = structure.elementsStore;
	const typesStore: IType[] = structure.typesStore;

	const typesStore_struct = typesStore.filter((type: IType) => type.struct);

	// Generate Classes
	typesStore_struct.forEach((type: IType) => {
		const parent: IElement = elementsStore.find(
			(el: IElement) => el.id_parent === null && el.type == type.name
		);
		const children: IElement[] = elementsStore.filter(
			(el: IElement) => el.id_parent === parent.id && el.struct === false
		);

		let local_string = 'class ' + capitalizeFirstLetter(parent.type) + '{ \n';
		children.map((child: IElement) => {
			local_string += '+' + child.name + ' : ' + capitalizeFirstLetter(child.type) + '\n';
		});
		local_string += '}\n';
		umlstring += local_string;
	});

	umlstring += '\n';

	// Generate Links
	typesStore_struct.forEach((type: IType) => {
		const parent: IElement = elementsStore.find(
			(el: IElement) => el.id_parent === null && el.type == type.name
		);
		const children_struc: IElement[] = elementsStore.filter(
			(el: IElement) => el.id_parent === parent.id && el.struct === true
		);

		let local_string = '';
		children_struc.map((child: IElement) => {
			let multiplicity: string;
			switch (child.multiplicity) {
				case 0:
					multiplicity = `"0..*" `;
					break;
				case 1:
					multiplicity = `"1" `;
					break;
				case 2:
					multiplicity = `"1..*" `;
					break;
				default:
					multiplicity = '';
					break;
			}

			local_string +=
				capitalizeFirstLetter(parent.type) +
				' *-- ' +
				multiplicity +
				capitalizeFirstLetter(child.type) +
				'\n';
		});
		umlstring += local_string;
	});

	return umlstring;
}
