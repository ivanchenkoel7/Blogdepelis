export const saveStorage = (clave, elemento) => {
    let elementos = JSON.parse(localStorage.getItem(clave));

    // Comprobar si hay elementos en el localStorage
    if (Array.isArray(elementos)) {
        elementos.push(elemento);
    } else {
        elementos = [elemento];
    }

    localStorage.setItem(clave, JSON.stringify(elementos));

    return elemento;
}