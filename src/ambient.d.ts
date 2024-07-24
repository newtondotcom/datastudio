export interface Element {
	id: string;
	name: string;
	type: string;
	multiplicity: number;
	id_parent?: string;
	color: string;
	indent: number;
}

export interface Type {
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
