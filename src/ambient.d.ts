export interface IElement {
	id: string;
	name: string;
	type: string;
	multiplicity: number;
	id_parent?: string;
	color: string;
	indent: number;
	description: string;
}

export interface IType {
	name: string;
	struct: boolean;
}

export interface IStructure {
	timestamp: Date;
	elements: IElement[];
	types: IType[];
}
