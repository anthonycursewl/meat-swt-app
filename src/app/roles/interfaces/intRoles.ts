export interface IRoles {
    id: string;
    nombre: string;
    permisos: Array<string>;
    setActive: (active: boolean) => void;
    active: boolean;
    handleOpenModal: () => void;
}