export const eliminarCookie = (nombre: string) => {
    document.cookie = `${nombre}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/`;
  }