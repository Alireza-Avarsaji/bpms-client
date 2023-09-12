export interface IMenu {
    route: string;
    name: string;
    type: 'child' | 'parent';
    icon: string;
    children?: IMenu[];
    qparam?: Object
}