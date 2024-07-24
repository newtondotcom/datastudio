export interface IIElement {
	id: string;
	name: string;
	type: string;
	multiplicity: number;
	id_parent?: string;
	color: string;
	indent: number;
}

export interface IIType {
	name: string;
	struct: boolean;
}

export enum Colors {
	blue,
	purple,
	orange,
	green,
	rose
}
