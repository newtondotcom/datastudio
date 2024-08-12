import type { IElement, IStructure, IType } from '../../../ambient';
import { capitalizeFirstLetter } from '../functions';

export async function exportMarkdown(structure: IStructure) {
	let markdownString: string = '';

	const elements: IElement[] = structure.elements;
	const types: IType[] = structure.types;

	const types_struct = types.filter((type: IType) => type.struct);

	// Generate Markdown Tables
	types_struct.forEach((type: IType) => {
		const parent: IElement = elements.find(
			(el: IElement) => el.id_parent === null && el.type == type.name
		);
		const children: IElement[] = elements.filter((el: IElement) => el.id_parent === parent.id);

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
