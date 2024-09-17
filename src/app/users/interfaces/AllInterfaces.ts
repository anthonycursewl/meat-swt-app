export interface IUsers {
    id: string;
    configuracion: any;
    permissions: Array<string> | any;
    username: string;
    userIsProtected: boolean
}