export interface IElement {
	id: string;
	name: string;
	type: string;
	multiplicity: number;
	id_parent?: string;
	color: string;
	indent: number;
}

export interface IType {
	name: string;
	struct: boolean;
}
