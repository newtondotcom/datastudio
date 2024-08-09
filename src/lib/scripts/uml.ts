import type { IElement, IStructure, IType } from '../../ambient';
import { capitalizeFirstLetter } from './functions';

let umlstring: string = '';

export async function exportUML(structure: IStructure) {
	const elements: IElement[] = structure.elements;
	const types: IType[] = structure.types;

	const types_struct = types.filter((type: IType) => type.struct);

	types_struct.forEach((type: IType) => {
		const parent: IElement = elements.find(
			(el: IElement) => el.id_parent === null && el.type == type.name
		);
		const children: IElement[] = elements.filter((el: IElement) => el.id_parent === parent.id);

		let local_string = 'class ' + capitalizeFirstLetter(parent.type) + '{ \n';
		children.map((child: IElement) => {
			local_string += '+' + child.name + ' : ' + capitalizeFirstLetter(child.type) + '\n';
		});
		local_string += '}\n';
		umlstring += local_string;
	});

	return umlstring;
}
