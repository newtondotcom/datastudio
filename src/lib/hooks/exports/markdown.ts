import type { IElement, IStructure, IType } from '@/hooks/types';

import { capitalizeFirstLetter } from '../functions';

export async function exportMarkdown(structure: IStructure) {
	let markdownString: string = '';

	const elementsStore: IElement[] = structure.elementsStore;
	const typesStore: IType[] = structure.typesStore;

	const typesStore_struct = typesStore.filter((type: IType) => type.struct);

	// Generate Markdown Tables
	typesStore_struct.forEach((type: IType) => {
		const parent = elementsStore.find((el: IElement) => !el.id_parent && el.type == type.name);
		if (!parent) {
			console.log('parent not found for type', type.name);
			return;
		}

		const children: IElement[] = elementsStore.filter((el: IElement) => el.id_parent === parent.id);

		let localString = `### ${capitalizeFirstLetter(parent.type)}\n`;
		localString += `| Name         | Type       | Multiplicity | Description |\n`;
		localString += `|--------------|------------|--------------|-------------|\n`;

		children.map((child: IElement) => {
			let multiplicity = child.multiplicity ? child.multiplicity.toString() : '';
			localString += `| ${child.name} | ${capitalizeFirstLetter(child.type)} | ${multiplicity} | ${child.description || ''} |\n`;
		});

		localString += `\n`;
		markdownString += localString;
	});

	return markdownString;
}
