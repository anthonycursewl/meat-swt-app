export const crearCookie = (nombre: string, valor: string, fechaExpiracion: any) => {
    document.cookie = `${nombre}=${valor}; expires=${fechaExpiracion}; path=/`;
}