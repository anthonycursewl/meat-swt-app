export const getCookie = (nombre: string) => {
    const cookies = document.cookie.split(';');
  
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(nombre + '=')) {
        return cookie.substring(nombre.length + 1);
      }
    }
  
    return null;
}