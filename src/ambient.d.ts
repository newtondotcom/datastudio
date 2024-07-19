export interface Element {
    id?: string;
    name: string;
    type: string;
    multiplicity: {
      with: string;
      number: number;
    };
    id_parent: string;
    children? : Element[];
}